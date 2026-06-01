import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded or safely-handled Google GenAI client to avoid crashes if keys are missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY environment variable is not defined or is set to a placeholder.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// AI Baking Consultant Endpoint
app.post("/api/baking/consult", async (req, res) => {
  const { prompt, history, type } = req.body;

  try {
    const ai = getAiClient();
    
    // Core system command for KCT's specialized elite AI Baking Engineer
    const systemInstruction = 
      "당신은 KCT (Korea Creative Techniques)의 스마트 베이킹 솔루션 소속 수석 AI 베이킹 시스템 엔지니어입니다. " +
      "1인 프리미엄 카페 오너들을 위해 과학적 밀가루 크러스트 수화 반응, 단백질 결합, 효모 장기 발효 과학, " +
      "KCT Smart Pro 기기의 완벽한 복합 발효(도우컨디셔너) 및 오븐 제어 매개변수를 제안해야 합니다. " +
      "모든 답변은 전문적이고, 이성적이며, 진중한 신뢰성을 가지고 한국어(Korean)로 기재되어야 합니다. " +
      "사용자가 커스텀 생지 조절법을 묻거나 빵에 대한 문제해결을 원할 시, 과학적 정량 매개변수 값 " +
      "(예: 해동 온도, 발효 온도/습도/시간, 오븐 온도/시간, 스팀 여부)을 반드시 함께 기재해 주십시오." +
      "이모지는 사용하지 않거나 최소한으로 격식있게만 사용하십시오. 무례하거나 캐주얼한 반말은 금지합니다.";

    if (type === "recommendation") {
      // Return structured recipe recommendation parameters along with explanation
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `다음 생지 혹은 빵 종류에 최적인 KCT Smart Pro 설정값과 베이킹 원리를 가르쳐주세요: "${prompt}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              doughName: { type: Type.STRING, description: "생지 종류 혹은 빵 이름" },
              defrostTemp: { type: Type.INTEGER, description: "최적 해동 온도 (°C)" },
              fermentTemp: { type: Type.INTEGER, description: "최적 도우컨디셔너 발효 온도 (°C)" },
              fermentHumidity: { type: Type.INTEGER, description: "최적 도우컨디셔너 발효 습도 (%)" },
              fermentDuration: { type: Type.INTEGER, description: "최적 발효 시간 (분)" },
              bakingTemp: { type: Type.INTEGER, description: "최적 오븐 베이킹 온도 (°C)" },
              bakingDuration: { type: Type.INTEGER, description: "최적 베이킹 시간 (분)" },
              steam: { type: Type.BOOLEAN, description: "미세 고압 스팀 활성 여부" },
              scientificExplanation: { type: Type.STRING, description: "기포 및 단백질 발효에 대한 과학적 원리 설명" },
            },
            required: [
              "doughName",
              "defrostTemp",
              "fermentTemp",
              "fermentHumidity",
              "fermentDuration",
              "bakingTemp",
              "bakingDuration",
              "steam",
              "scientificExplanation"
            ]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response from Gemini API");
      }
      return res.json(JSON.parse(responseText.trim()));

    } else {
      // Standard professional chat conversation
      const contents = [];
      
      // Append historical messages if available
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contents.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      
      // Append current prompt
      contents.push({
        role: "user",
        parts: [{ text: prompt }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text;
      if (!responseText) {
         throw new Error("Empty response from Gemini API");
      }
      return res.json({ text: responseText });
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    // Graceful fallback for demo if API credentials are not set
    if (type === "recommendation") {
      return res.json({
        doughName: prompt || "커스텀 사워도우 생지",
        defrostTemp: 22,
        fermentTemp: 27,
        fermentHumidity: 80,
        fermentDuration: 100,
        bakingTemp: 220,
        bakingDuration: 25,
        steam: true,
        scientificExplanation: `(주의: GEMINI_API_KEY 미설정 데모 모드) 사워도우 생지는 장기 발효 균주 밀도가 높으므로 저온(26-27°C) 다습 발효 환경에서 반죽 내 탄산효과를 보존해야 합니다. 높은 스팀 주입은 초기 글루텐 팽창을 도와 볼륨감 있는 오븐 스프링을 보장합니다.`
      });
    } else {
      return res.json({
        text: `안녕하세요. 현재 리얼타임 AI 베이킹 서버와 연동 중입니다만, API 키가 구성되지 않아 기본 스마트 응답으로 제공합니다. KCT 스마트 기기는 발효 전 단계의 온습도를 초격차 제어하여 수분이 날아가는 것을 철저히 방어합니다. 궁금하신 사항에 맞춰 최적의 발효 과학을 적용해보세요! (에러 상세: ${error.message})`
      });
    }
  }
});

// Serve API check/health
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// Mount Vite middleware for asset serving or static fallback
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted for local development");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static file server initiated for production mode");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`KCT server successfully running on port ${PORT}`);
  });
}

initializeServer().catch((err) => {
  console.error("Failed to start KCT full-stack server:", err);
});
