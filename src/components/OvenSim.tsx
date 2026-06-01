import React, { useState, useEffect, useRef } from "react";
import { 
  ScanLine, 
  Play, 
  Square, 
  Flame, 
  Wind, 
  Thermometer, 
  Droplets, 
  Sparkles, 
  Cpu, 
  Clock, 
  Send,
  HelpCircle,
  Wifi,
  ChevronRight,
  RefreshCw
} from "lucide-react";
import { DoughItem, DeviceMode, OvenState, ChatMessage, BakingRecommendation } from "../types";

interface OvenSimProps {
  doughs: DoughItem[];
  onSetSimulationDough: (dough: DoughItem) => void;
}

export default function OvenSim({ doughs, onSetSimulationDough }: OvenSimProps) {
  // Device State
  const [ovenState, setOvenState] = useState<OvenState>({
    mode: "idle",
    currentTemp: 21.4,
    targetTemp: 0,
    currentHumidity: 45,
    targetHumidity: 0,
    timeRemaining: 0,
    totalDuration: 0,
    isActive: false,
    scannedDoughId: null,
    steamActivated: false,
  });

  // Simulator speed multiplying factor: 1 second of real-time = 1 minute of baking
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [selectedPresetDoughId, setSelectedPresetDoughId] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("생지 바코드를 스캔하여 발효 레시피를 인위적으로 기기에 세팅해 주십시오.");
  
  // Custom AI input
  const [customInput, setCustomInput] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiRecommendation, setAiRecommendation] = useState<BakingRecommendation | null>(null);

  // AI Chat Assistant
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      sender: "bot",
      text: "안녕하세요. 에브리베이크(EveryBake) 수석 스마트 베이킹 AI 어시스턴트입니다. 오븐 스팀 주입 타이밍, 효모 장기 발효 매개변수 혹은 글루텐 링 상태에 대한 의심 사항을 편안하게 질문해 주십시오.",
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle Oven physics & cycle countdown simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (ovenState.isActive && ovenState.timeRemaining > 0) {
      timer = setInterval(() => {
        setOvenState((prev) => {
          // Temperature and humidity convergence towards target values (gradual simulation)
          const tempDiff = prev.targetTemp - prev.currentTemp;
          const tempStep = Math.abs(tempDiff) < 1.0 ? tempDiff : (tempDiff > 0 ? 0.8 : -0.8);
          let newTemp = prev.currentTemp + tempStep;
          if (prev.mode === "bake") {
            // Hot baking coil fluctuations
            newTemp += (Math.random() - 0.5) * 0.4;
          } else {
            // General climate fluctuations
            newTemp += (Math.random() - 0.5) * 0.15;
          }

          const humDiff = prev.targetHumidity - prev.currentHumidity;
          const humStep = Math.abs(humDiff) < 2 ? humDiff : (humDiff > 0 ? 3 : -3);
          let newHum = prev.currentHumidity + humStep;
          newHum = Math.min(100, Math.max(10, newHum)) + Math.floor((Math.random() - 0.5) * 1.5);

          const nextTime = prev.timeRemaining - 1;

          // Check for automatically moving to the next cycle:
          // In a simplified showcase, we progress through active stages:
          // DEFROST -> FERMENT (Proofing) -> BAKE
          let nextMode = prev.mode;
          let nextTargetTemp = prev.targetTemp;
          let nextTargetHum = prev.targetHumidity;
          let nextDuration = prev.timeRemaining;
          let message = statusMessage;

          if (nextTime <= 0) {
            // Determine transitions
            const matchedDough = prev.scannedDoughId ? doughs.find(d => d.id === prev.scannedDoughId) : null;
            const settings = matchedDough ? matchedDough.settings : (aiRecommendation ? {
              defrostTemp: aiRecommendation.defrostTemp,
              defrostTime: 20, // default simulation min
              fermentTemp: aiRecommendation.fermentTemp,
              fermentHumidity: aiRecommendation.fermentHumidity,
              fermentTime: aiRecommendation.fermentDuration,
              bakeTemp: aiRecommendation.bakingTemp,
              bakeTime: aiRecommendation.bakingDuration,
              steam: aiRecommendation.steam,
            } : null);

            if (prev.mode === "defrost" && settings) {
              nextMode = "ferment_hot";
              nextTargetTemp = settings.fermentTemp;
              nextTargetHum = settings.fermentHumidity;
              nextDuration = settings.fermentTime;
              message = `[발효 과학 단계] 메인 명장의 비밀 습도 ${settings.fermentHumidity}% 보존 장기 미세 기포 수화 진행 중`;
            } else if (prev.mode === "ferment_hot" && settings) {
              nextMode = "bake";
              nextTargetTemp = settings.bakeTemp;
              nextTargetHum = 0; // dry baking
              nextDuration = settings.bakeTime;
              message = `[오븐 소성 단계] 섭씨 ${settings.bakeTemp}도 고화력 화력 발포 및 구움 크러스트 단단화 작동 중`;
            } else if (prev.mode === "bake") {
              nextMode = "complete";
              nextTargetTemp = 24; // cooling
              nextTargetHum = 40;
              nextDuration = 0;
              message = "🎉 베이킹 완벽 종료! 오븐에서 황금빛 크러스트 빵을 즉각 수거해 주십시오.";
            } else {
              nextMode = "idle";
              nextTargetTemp = 21;
              nextTargetHum = 45;
              nextDuration = 0;
              message = "기기가 대기 상태로 전환되었습니다.";
            }
          }

          return {
            ...prev,
            currentTemp: parseFloat(newTemp.toFixed(1)),
            currentHumidity: Math.min(100, Math.max(0, Math.round(newHum))),
            timeRemaining: nextTime <= 0 ? nextDuration : nextTime,
            mode: nextTime <= 0 ? nextMode : prev.mode,
            targetTemp: nextTime <= 0 ? nextTargetTemp : prev.targetTemp,
            targetHumidity: nextTime <= 0 ? nextTargetHum : prev.targetHumidity,
            isActive: nextTime <= 0 ? (nextMode !== "complete" && nextMode !== "idle") : prev.isActive,
          };
        });
      }, 1000 / simSpeed);
    } else if (ovenState.isActive && ovenState.timeRemaining === 0) {
      setOvenState(prev => ({ ...prev, isActive: false, mode: "complete" }));
      setStatusMessage("🎉 프리미엄 로스팅 완료! 최상의 볼륨감을 확인하십시오.");
    }

    return () => clearInterval(timer);
  }, [ovenState.isActive, ovenState.timeRemaining, simSpeed, doughs, aiRecommendation]);

  // Simulate scanning of custom barcodes
  const handleScanBarcode = (doughId: string) => {
    const matched = doughs.find((d) => d.id === doughId);
    if (!matched) return;

    onSetSimulationDough(matched);
    setSelectedPresetDoughId(doughId);

    setOvenState({
      mode: "defrost",
      currentTemp: 21.4,
      targetTemp: matched.settings.defrostTemp,
      currentHumidity: 45,
      targetHumidity: 50, // default defrost humidity
      timeRemaining: matched.settings.defrostTime, // simulated minutes as seconds
      totalDuration: matched.settings.defrostTime + matched.settings.fermentTime + matched.settings.bakeTime,
      isActive: true,
      scannedDoughId: doughId,
      steamActivated: matched.settings.steam,
    });
    
    setStatusMessage(`[자동 해동 단계] 바코드스캔 식별: ${matched.name}. 명장의 콜드체인 해동 제어 개시.`);
  };

  // Perform Gemini Smart Recipe recommendation lookup
  const handleAiLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    setIsAiLoading(true);
    setAiRecommendation(null);

    try {
      const response = await fetch("/api/baking/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: customInput, type: "recommendation" }),
      });
      const data = await response.json();
      setAiRecommendation(data);
      setStatusMessage(`[AI 커스텀 설계 장착] ${data.doughName} 레시피가 연장 생성되었습니다. 기기 주입이 사용 가능합니다.`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Inject Gemini AI Recommended Settings to OvenState
  const handleInjectAiSettings = () => {
    if (!aiRecommendation) return;

    setOvenState({
      mode: "defrost",
      currentTemp: 21.4,
      targetTemp: aiRecommendation.defrostTemp,
      currentHumidity: 45,
      targetHumidity: 55,
      timeRemaining: 15, // fast-track simulation phase 1
      totalDuration: 15 + aiRecommendation.fermentDuration + aiRecommendation.bakingDuration,
      isActive: true,
      scannedDoughId: "custom_ai",
      steamActivated: aiRecommendation.steam,
    });

    setStatusMessage(`[AI 세팅 세그동 개시] 주입 완료: ${aiRecommendation.doughName}. 특수 진공 환경 해동부터 연쇄 발효 과학이 작동됩니다.`);
  };

  // AI Chat Assistant message sending
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: chatInput,
      timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      // Create simplified chat history array for API route structure
      const apiHistory = chatMessages.slice(-6).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch("/api/baking/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg.text, history: apiHistory, type: "chat" }),
      });
      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: data.text,
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleStopRun = () => {
    setOvenState((prev) => ({
      ...prev,
      isActive: false,
      mode: "idle",
      targetTemp: 21,
      targetHumidity: 40,
    }));
    setStatusMessage("사용자에 의해 모든 공정 프로세스가 중단 및 안전 감압되었습니다.");
  };

  // Translate mode to friendly Korean display tags
  const getModeLabelKorea = (m: DeviceMode) => {
    switch (m) {
      case "idle": return "대기 중 (Idle)";
      case "defrost": return "콜드체인 해동 과학 (Defrost)";
      case "ferment_cold": return "저온 휴지 저해 단계 (Resting)";
      case "ferment_hot": return "액티브 유도 발효 (Warm-Fermentation)";
      case "bake": return "초정밀 균일 소성 (Bake Oven Mode)";
      case "complete": return "베이킹 완성 (Process Complete)";
      default: return "대기 중";
    }
  };

  return (
    <div className="bg-stone-50 border border-stone-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PHYSICAL 3D UNIT INTERACTIVE VISUAL (Left Col) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-stone-900 rounded-2xl p-6 text-white relative shadow-inner [perspective:1000px]">
          <div className="absolute top-4 left-4 flex items-center gap-1 text-[10px] uppercase font-bold text-stone-400">
            <Wifi className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>EveryBake Smart Cloud</span>
          </div>

          {/* Smart Panel Badge */}
          <div className="w-full mt-4 bg-stone-950 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-between font-mono text-[11px] mb-8 shadow">
            <div className="flex justify-between text-stone-500">
              <span>DEVICE TYPE:</span>
              <span className="text-orange-400 font-bold">EVERYBAKE-PRO</span>
            </div>
            <div className="flex justify-between text-stone-500 mt-1">
              <span>ACTUAL SYS:</span>
              <span className={`font-bold uppercase ${ovenState.isActive ? "text-emerald-400" : "text-amber-500"}`}>
                ● {ovenState.mode}
              </span>
            </div>
            <div className="flex justify-between text-stone-500 mt-2 border-t border-stone-900 pt-1.5">
              <span>SPEED:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSimSpeed(1)} 
                  className={`px-1 rounded ${simSpeed === 1 ? 'bg-amber-500 text-black' : 'hover:bg-stone-800 text-stone-400'}`}
                >
                  1x
                </button>
                <button 
                  onClick={() => setSimSpeed(5)} 
                  className={`px-1 rounded ${simSpeed === 5 ? 'bg-amber-500 text-black' : 'hover:bg-stone-800 text-stone-400'}`}
                >
                  5x
                </button>
                <button 
                  onClick={() => setSimSpeed(20)} 
                  className={`px-1 rounded ${simSpeed === 20 ? 'bg-amber-500 text-black' : 'hover:bg-stone-800 text-stone-400'}`}
                >
                  20x
                </button>
              </div>
            </div>
          </div>

          {/* Stacked Cabinet 3D Modeling Section */}
          <div className="w-48 h-80 bg-stone-850 rounded-xl border-x-4 border-t-8 border-b-12 border-stone-800 relative shadow-2xl flex flex-col overflow-hidden [transform:rotateX(5deg)] transition-all">
            
            {/* OVEN CHAMBER (Upper Half) */}
            <div className={`flex-1 border-b-4 border-stone-850 relative transition-all duration-700 flex items-center justify-center ${
              ovenState.mode === "bake" ? "bg-amber-950/40" : "bg-stone-900"
            }`}>
              {/* Heating Coil Glow and Heat lines */}
              {ovenState.mode === "bake" && (
                <>
                  <div className="absolute top-0 inset-x-0 h-1 bg-red-500 shadow-[0_0_15px_#ff3b30] animate-pulse" />
                  <div className="absolute top-2 inset-x-8 h-0.5 bg-amber-500/80 shadow-[0_0_10px_#ff9500]" />
                  <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none" />
                  <div className="absolute text-[8px] tracking-wider uppercase font-bold text-red-500/60 animate-pulse">
                    OVEN HEATING
                  </div>
                </>
              )}
              {ovenState.steamActivated && ovenState.isActive && (
                <div className="absolute bottom-2 left-2 text-blue-400/40 animate-bounce flex items-center gap-1 text-[8px] font-mono">
                  <Droplets className="w-2 h-2" /> STEAM
                </div>
              )}
              <div className="text-[10px] text-stone-600 font-mono tracking-wide">
                UPPER: OVEN
              </div>
            </div>

            {/* DOUGH CONDITIONER PROOFING CHAMBER (Lower Half) */}
            <div className={`flex-1 relative transition-all duration-700 flex flex-col items-center justify-center ${
              ["defrost", "ferment_hot", "ferment_cold"].includes(ovenState.mode) 
                ? "bg-stone-800/80" 
                : "bg-stone-900"
            }`}>
              {ovenState.mode === "defrost" && (
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse flex items-center justify-center text-[8px] font-mono text-blue-400/40">
                  DEFROSTING ACTIVE
                </div>
              )}
              {ovenState.mode === "ferment_hot" && (
                <div className="absolute inset-0 bg-amber-500/5 animate-pulse flex items-center justify-center text-[8px] font-mono text-amber-500/40">
                  WARM PROOFING ({ovenState.currentHumidity}%)
                </div>
              )}
              <div className="text-[10px] text-stone-600 font-mono tracking-wide">
                LOWER: PROOFER
              </div>
            </div>

            {/* Simulated rack rows */}
            <div className="absolute inset-y-8 inset-x-4 border-l border-r border-dashed border-stone-700/30 flex flex-col justify-between pointer-events-none">
              <div className="h-0.5 w-full bg-stone-700/25" />
              <div className="h-0.5 w-full bg-stone-700/25" />
              <div className="h-0.5 w-full bg-stone-700/25" />
              <div className="h-0.5 w-full bg-stone-700/25" />
            </div>
          </div>

          <div className="text-[10px] text-stone-500 font-mono text-center mt-4">
            직하형 수직 일체형 공간 효율 특허 취득
          </div>
        </div>

        {/* CONTROLLER TERMINAL DIALS (Middle Col) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
              <h3 className="text-md font-extrabold text-stone-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-stone-500" />
                기기 통합 실시간 모니터 원장
              </h3>
              <div className="flex items-center gap-1.5 bg-stone-200/50 text-stone-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>ONLINE</span>
              </div>
            </div>

            {/* Preset Barcode Scanner Select */}
            <div className="p-4 bg-amber-50 border border-amber-200/50 rounded-2xl mb-6">
              <label className="block text-[10px] uppercase font-extrabold tracking-widest text-amber-800/80 mb-2 flex items-center gap-1">
                <ScanLine className="w-3.5 h-3.5" />
                가상 바코드 원격 스포이드 주입 (데모)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={selectedPresetDoughId}
                  onChange={(e) => handleScanBarcode(e.target.value)}
                  className="bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-stone-800 font-semibold outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
                >
                  <option value="">-- 생지 모의 바코드 스캔 --</option>
                  {doughs.map((dough) => (
                    <option key={dough.id} value={dough.id}>
                      [{dough.region}] {dough.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  disabled={!selectedPresetDoughId}
                  onClick={() => handleScanBarcode(selectedPresetDoughId)}
                  className="bg-stone-900 text-white rounded-xl px-4 py-2 text-xs font-bold hover:bg-stone-800 disabled:bg-stone-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  스캔 신호 재전송
                </button>
              </div>
            </div>

            {/* Controller Feedback Message */}
            <div className="bg-stone-900 text-stone-100 rounded-2xl p-4 font-mono text-xs whitespace-normal leading-relaxed border-l-4 border-amber-500 mb-6 flex flex-col gap-1.5 shadow-md">
              <span className="text-[10px] text-stone-400 font-extrabold tracking-wider uppercase">SYSTEM LOG:</span>
              <p className="font-semibold text-stone-200">{statusMessage}</p>
            </div>

            {/* Dials & Progress */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Temperature block */}
              <div className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase">TEMPERATURE</span>
                  <Thermometer className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900 tracking-tight font-mono">
                    {ovenState.currentTemp}°C
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">
                    설정값: <span className="font-bold font-mono">{ovenState.targetTemp}°C</span>
                  </div>
                </div>
              </div>

              {/* Humidity block */}
              <div className="bg-white border border-stone-200 p-4 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="flex items-center justify-between text-stone-400 mb-2">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase">HUMIDITY</span>
                  <Droplets className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-black text-stone-900 tracking-tight font-mono">
                    {ovenState.currentHumidity}%
                  </div>
                  <div className="text-[10px] text-stone-500 mt-1">
                    설정값: <span className="font-bold font-mono">{ovenState.targetHumidity}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Timer Indicator */}
            {ovenState.isActive && (
              <div className="bg-stone-100 border border-stone-200 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-stone-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    현재 단계 남은시간
                  </span>
                  <span className="font-bold font-mono text-stone-900">
                    {ovenState.timeRemaining}분 (가속모드 중)
                  </span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-1.5">
                  <div 
                    className="bg-stone-900 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(ovenState.timeRemaining / 90) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            {ovenState.isActive ? (
              <button
                onClick={handleStopRun}
                className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
              >
                <Square className="w-4 h-4" />
                공정 프로세스 중단
              </button>
            ) : (
              <button
                disabled={!selectedPresetDoughId && !aiRecommendation}
                onClick={() => {
                  if (selectedPresetDoughId) handleScanBarcode(selectedPresetDoughId);
                  else if (aiRecommendation) handleInjectAiSettings();
                }}
                className="flex-1 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
              >
                <Play className="w-4 h-4" />
                베이킹 자동 세팅 가동
              </button>
            )}
          </div>
        </div>

        {/* AI CONSULTANT INTERACTIVE LAB (Right Col) */}
        <div className="lg:col-span-3 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-200 pt-6 lg:pt-0 lg:pl-6">
          <div className="flex flex-col h-[400px]">
            {/* Header tab controller */}
            <div className="flex gap-2 mb-4 border-b border-stone-100 pb-2">
              <button
                onClick={() => setChatOpen(false)}
                className={`flex-1 py-1 px-3 text-center text-xs font-extrabold tracking-tight rounded-lg ${
                  !chatOpen ? "bg-stone-900 text-white" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                AI 생지 연구소
              </button>
              <button
                onClick={() => setChatOpen(true)}
                className={`flex-1 py-1 px-3 text-center text-xs font-extrabold tracking-tight rounded-lg flex items-center justify-center gap-1 ${
                  chatOpen ? "bg-stone-900 text-white" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                AI 매장 컨설턴트
              </button>
            </div>

            {/* TAB 1: AI Recipe Generator Lookup */}
            {!chatOpen ? (
              <div className="flex-1 flex flex-col justify-between min-h-0">
                <div className="overflow-y-auto pr-1">
                  <p className="text-xs text-stone-500 mb-3 leading-relaxed">
                    프리바이오틱스 효모, 사워도우, 호밀빵 등 규격화되지 않은 도우 레시피를 기재하면 AI 과학자가 최고 품질의 해동·밀도 온도 설계를 창출합니다.
                  </p>

                  <form onSubmit={handleAiLookup} className="space-y-2 mb-4">
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="예: 천연발효 사워도우 생지인데, 겉바속촉 크러스트를 살리는 최적 구움과 스팀 타이밍 추천해줘"
                      rows={2}
                      className="w-full text-xs rounded-xl border border-stone-200 bg-white p-2.5 outline-hidden focus:ring-1 focus:ring-stone-950 focus:border-stone-950 resize-hidden"
                    />
                    <button
                      type="submit"
                      disabled={isAiLoading || !customInput.trim()}
                      className="w-full py-2 bg-stone-950 hover:bg-stone-850 disabled:bg-stone-300 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    >
                      {isAiLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          발효 글루텐 콤포저 분석 중...
                        </>
                      ) : (
                        <>
                          <Cpu className="w-3.5 h-3.5" />
                          AI 발효·베이킹 설계도 추출
                        </>
                      )}
                    </button>
                  </form>

                  {/* AI Recipe Results Render */}
                  {aiRecommendation && (
                    <div className="border border-amber-200 bg-amber-50/50 rounded-xl p-3.5 space-y-2.5 animate-scale-up">
                      <div className="flex justify-between items-center text-[10px] font-extrabold text-amber-800 tracking-wider">
                        <span>AI RECOMMENDED PARAMETERS</span>
                        <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                          과학적 검증
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold text-stone-900 truncate">
                        {aiRecommendation.doughName}
                      </h4>

                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                        <div className="bg-white p-1.5 rounded border border-stone-100">
                          <span className="text-stone-400 block">해동 온도</span>
                          <span className="font-bold text-stone-800">{aiRecommendation.defrostTemp}°C</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-stone-100">
                          <span className="text-stone-400 block">발효 온습도</span>
                          <span className="font-bold text-stone-800">{aiRecommendation.fermentTemp}°C / {aiRecommendation.fermentHumidity}%</span>
                        </div>
                        <div className="bg-white p-1.5 rounded border border-stone-100 col-span-2">
                          <span className="text-stone-400 block">오븐 세팅 (베이킹)</span>
                          <span className="font-bold text-stone-800">
                            {aiRecommendation.bakingTemp}°C · {aiRecommendation.bakingDuration}분 (스팀: {aiRecommendation.steam ? "ON" : "OFF"})
                          </span>
                        </div>
                      </div>

                      <p className="text-[10px] text-stone-600 leading-normal line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                        {aiRecommendation.scientificExplanation}
                      </p>

                      <button
                        type="button"
                        onClick={handleInjectAiSettings}
                        className="w-full py-1.5 bg-amber-500 hover:bg-amber-600 text-black rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        기기에 세팅 주입
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* TAB 2: AI Real-time Interactive Chatbot */
              <div className="flex-1 flex flex-col justify-between min-h-0 bg-white border border-stone-200 rounded-2xl p-3 shadow-xs">
                {/* Chat dialogue window */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1 min-h-0 text-[11px]">
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-xl p-2.5 ${
                        msg.sender === "user" 
                          ? "bg-stone-900 text-white rounded-br-none" 
                          : "bg-stone-100 text-stone-850 rounded-bl-none"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-stone-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex items-center gap-2 text-stone-400">
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-200" />
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input action */}
                <form onSubmit={handleSendChat} className="flex gap-1.5">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="오븐 글루텐 볼륨 수치..."
                    className="flex-1 text-[11px] rounded-lg border border-stone-200 px-2.5 py-1.5 outline-hidden focus:ring-1 focus:ring-stone-950 focus:border-stone-950"
                  />
                  <button
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-stone-900 hover:bg-stone-800 disabled:bg-stone-200 p-2 text-white rounded-lg flex items-center justify-center cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
