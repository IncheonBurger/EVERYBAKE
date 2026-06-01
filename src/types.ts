export interface DoughItem {
  id: string;
  name: string;
  masterName: string;
  region: string;
  price: number;
  description: string;
  stockStatus: "in" | "low" | "out";
  statusText: string;
  barcode: string;
  category: "master" | "global";
  subCategory: "hard" | "pastry" | "soft";
  imageLabel: string;
  iconBg: string;
  // Recommended baking settings
  settings: {
    defrostTemp: number; // °C
    defrostTime: number; // min
    fermentTemp: number; // °C
    fermentHumidity: number; // %
    fermentTime: number; // min
    bakeTemp: number; // °C
    bakeTime: number; // min
    steam: boolean;
  };
}

export type DeviceMode = "idle" | "defrost" | "ferment_cold" | "ferment_hot" | "bake" | "complete";

export interface OvenState {
  mode: DeviceMode;
  currentTemp: number;
  targetTemp: number;
  currentHumidity: number;
  targetHumidity: number;
  timeRemaining: number; // in seconds for simulation speed
  totalDuration: number; // in seconds
  isActive: boolean;
  scannedDoughId: string | null;
  steamActivated: boolean;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface BakingRecommendation {
  doughName: string;
  defrostTemp: number;
  fermentTemp: number;
  fermentHumidity: number;
  fermentDuration: number;
  bakingTemp: number;
  bakingDuration: number;
  steam: boolean;
  scientificExplanation: string;
}
