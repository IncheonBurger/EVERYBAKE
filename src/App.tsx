import React, { useState, useEffect, useRef } from "react";
import {
  Laptop,
  Cpu,
  Layers,
  Flame,
  Wifi,
  TrendingUp,
  Award,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Star,
  MessageSquare,
  Send,
  CheckCircle2,
  Calendar,
  Building2,
  User,
  Phone,
  Check,
  Smartphone,
  Inbox,
  ArrowRight,
  ThumbsUp,
  HelpCircle,
  FileText,
  Clock,
  Zap,
  Info,
  MapPin,
  Menu,
  ShoppingBag,
  Bell,
  ChevronUp,
  ChevronDown,
  Search,
  CreditCard,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import OvenSim from "./components/OvenSim";
import KoreaMap from "./components/KoreaMap";
import GlobalMap from "./components/GlobalMap";
import DoughCard from "./components/DoughCard";
import PartnerPortal from "./components/PartnerPortal";
import EventsView from "./components/EventsView";
import AiPosDetail from "./components/AiPosDetail";
import {
  CURATED_DOUGHS,
  INGREDIENTS_DATA,
  IngredientItem,
  COFFEE_DATA,
  CoffeeItem,
} from "./data";
import { DoughItem } from "./types";
import ovenImage from "./assets/images/stainless_steel_combo_oven_1780301837442.png";
import everyBakeLogo from "./assets/images/everybake_logo_1780361685384.png";

// Helper function to return deterministic premium sales count
export const getDoughSales = (id: string): number => {
  const salesMap: Record<string, number> = {
    "s-001": 3420, // 신안 소금빵
    "t-007": 3280, // 동네소금빵
    "t-003": 3110, // 동네크루아상
    "t-006": 2950, // 동네메론빵
    "m-001": 2890, // 크루아상
    "g-001": 2750, // 긴자 메론빵
    "t-001": 2680, // 동네깜빠뉴
    "t-005": 2520, // 동네더티초코
    "g-002": 2410, // 프렌치 바게트
    "t-002": 2350, // 동네사워도우
    "t-004": 2220, // 동네애플파이
    "m-002": 2120, // 애플파이
    "s-003": 1980, // 밤식빵
    "p-001": 1940, // 발로나 더티초코
    "h-001": 1840, // 깜빠뉴
    "h-002": 1590, // 사워도우
    "h-004": 1450, // 치아바타
    "m-003": 1380, // 뺑오쇼콜라
    "h-006": 1250, // 베이글
    "p-002": 1185, // 몽블랑
    "p-005": 980, // 크로플
  };
  if (salesMap[id]) return salesMap[id];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 450) + 210;
};
import artisanBakerDetailImage from "./assets/images/artisan_baker_detail_1780289872811.png";
import modernSmartOvenImage from "./assets/images/modern_smart_oven_close_1780289886400.png";
import kctActualOvenStoryImage from "./assets/images/kct_actual_oven_story_1780296704183.png";
import tallSmartOvenImage from "./assets/images/tall_smart_oven_1780277904002.png";

interface CartItem {
  item: DoughItem;
  quantity: number;
}

interface Review {
  id: string;
  author: string;
  stars: number;
  content: string;
  date: string;
}

interface Inquiry {
  id: string;
  company: string;
  manager: string;
  category: string;
  details: string;
  date: string;
  status: "reception" | "reviewing" | "completed";
  answer?: string;
  phone?: string;
}

interface GeneralComment {
  id: string;
  author: string;
  content: string;
  date: string;
  replies?: { author: string; content: string; date: string }[];
}

interface CommunityPost {
  id: string;
  category: "dough" | "coffee" | "raw" | "trouble";
  title: string;
  content: string;
  author: string;
  date: string;
  votes: number;
  status: string;
  votedByMe?: boolean;
  comments?: { id: string; author: string; content: string; date: string }[];
  replies?: { id: string; author: string; content: string; date: string }[];
}

interface PlazaComment {
  id: string;
  author: string;
  role?: string;
  content: string;
  date: string;
  isCustom?: boolean;
}

interface PlazaPost {
  id: string;
  category: "coop" | "interior" | "marketing" | string;
  title: string;
  content: string;
  author: string;
  date: string;
  targetAmount?: string;
  currentAmount?: number;
  participantsCount?: number;
  progressPercent?: number;
  barcodes?: string;
  location?: string;
  detailInfo?: string;
  priceInfo?: string;
  urgentsInfo?: string;
  comments: PlazaComment[];
}

// Beautifully-styled photorealistic interactive physical mockup of the compact 60cm tabletop oven + dough conditioner
// Styled to look exactly like a premium built-in clean kitchen design: matte graphite, dark double-glass doors, and integrated sleek OLED controls.
function KCTMiniOvenIllust({
  className = "",
  scale = 1,
}: {
  className?: string;
  scale?: number;
}) {
  return (
    <div
      style={{ transform: `scale(${scale})` }}
      className={`relative flex flex-col items-center select-none origin-center transition-all duration-300 ${className}`}
    >
      {/* Outer premium chassis styled to look like an integrated high-end kitchen appliance */}
      <div className="w-[240px] h-[300px] bg-gradient-to-r from-[#171719] via-[#242426] via-[#1b1b1d] via-[#212123] to-[#121214] rounded-xl p-3 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85),_0_0_0_1px_rgba(255,255,255,0.04)_inset] border border-[#2c2c2f] flex flex-col relative overflow-hidden">
        
        {/* Anti-glare soft vertical reflection sheen */}
        <div className="absolute inset-y-0 left-12 w-6 bg-gradient-to-r from-transparent via-white/3 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-20 w-8 bg-gradient-to-r from-transparent via-white/2 to-transparent pointer-events-none" />

        {/* 1. TOP CONTROL PANEL STRIP (Pure Black Glass Touch Interface - Styled exact to Dacor image) */}
        <div className="w-full h-[52px] bg-stone-950 rounded-lg border border-[#1e1e20] p-1 flex items-center justify-between relative shadow-inner overflow-hidden">
          {/* Subtle horizontal hair-thin metallic chamfer line */}
          <div className="absolute top-[1px] inset-x-0 h-[0.5px] bg-[#333336]/30" />

          {/* Touch labels group left */}
          <div className="flex flex-col gap-1 items-start text-left pl-1.5 z-10 scale-90 origin-left">
            <span className="text-[4px] font-semibold text-stone-550 tracking-widest font-sans uppercase">TIMER</span>
            <span className="text-[4px] font-semibold text-stone-550 tracking-widest font-sans uppercase">SETTINGS</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[3.5px] font-bold text-[#8b5cf6]/80 font-mono">LINK_OK</span>
              <span className="w-1 h-1 bg-[#10b981] rounded-full animate-pulse shadow-[0_0_4px_/#10b981]" />
            </div>
          </div>

          {/* Central High-Resolution Dark OLED Touch Display screen */}
          <div className="flex-1 max-w-[110px] h-[40px] bg-[#0c0c0e] rounded-md border border-[#1d1d20]/50 flex flex-col justify-center items-center relative py-1 px-1 z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)]">
            <div className="text-[3.8px] text-stone-500 font-medium tracking-widest uppercase font-sans mb-0.5 scale-90">
              스팀 베이크 · STEAM BAKE
            </div>
            
            {/* Elegant high-precision white digital readout */}
            <div className="text-[12.5px] font-extralight tracking-wide text-white drop-shadow-[0_0_3px_rgba(255,255,255,0.45)] leading-none my-0.5 font-sans">
              175<span className="text-[8.5px] font-light">°C</span>
            </div>

            <div className="flex items-center gap-1 px-1 mt-0.5 scale-80">
              <div className="px-0.5 py-px border border-[#dc2626]/40 rounded-[1px] bg-[#dc2626]/5 text-[#dc2626] text-[3px] font-medium font-sans uppercase tracking-tight">
                ACTIVE
              </div>
              <span className="text-[3.5px] text-[#10b981]/90 font-mono font-medium tracking-tighter">
                60cm_SM_SYSTEM
              </span>
            </div>
          </div>

          {/* Touch labels group right */}
          <div className="flex flex-col gap-1 items-end text-right pr-1.5 z-10 scale-90 origin-right">
            <span className="text-[4px] font-semibold text-stone-550 tracking-widest font-sans uppercase">OFF</span>
            <span className="text-[4px] font-semibold text-stone-550 tracking-widest font-sans uppercase">LIGHT</span>
            <span className="text-[3px] font-bold text-stone-600 font-mono tracking-tighter mt-0.5">OPEN/CLOSE</span>
          </div>
        </div>

        {/* Dynamic vertical space stack */}
        <div className="flex-1 flex flex-col justify-between gap-2.5 mt-2.5 w-full h-[80%] z-10">
          
          {/* 2. MAIN CHAMBER: HIGH-TEMP STEAM OVEN (Sleek Black Glass Door with deep luxury window view) */}
          <div className="h-[46%] bg-[#121214] rounded-lg border border-[#232326] shadow-[0_8px_20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative group">
            
            {/* Door Frame Inner Frit Bevel */}
            <div className="absolute inset-0 border-[5px] border-stone-950 z-20 pointer-events-none rounded-lg" />
            
            {/* Highly Realistic Oven Window Frame */}
            <div className="flex-1 m-[5px] bg-[#09090b] rounded-sm relative flex flex-col overflow-hidden shadow-[inset_0_4px_16px_rgba(0,0,0,1)] ring-1 ring-[#1b1b1e]">
              
              {/* Halogen internal baking light beam (Warm luxury copper glow) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#451a03_0%,#1c1917_50%,#09090b_100%)] opacity-85 z-10" />
              
              {/* Sleek horizontal thin metallic shelf rails - Perfect wire resolution */}
              <div className="absolute inset-x-2 top-[30%] h-[1px] bg-stone-800/80 z-10" />
              <div className="absolute inset-x-2 top-[60%] h-[1px] bg-stone-750/90 z-10 flex justify-between px-2">
                {/* Thin chrome grill segments */}
                <div className="w-[1px] h-3 bg-stone-700/60" />
                <div className="w-[1px] h-3 bg-stone-700/60" />
                <div className="w-[1px] h-3 bg-stone-700/60" />
                <div className="w-[1px] h-3 bg-stone-700/60" />
                <div className="w-[1px] h-3 bg-stone-700/60" />
                <div className="w-[1px] h-3 bg-stone-700/60" />
              </div>
              
              {/* Gourmet pastry silhouette sitting on the lower oven grid */}
              <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-3 z-20 opacity-85 scale-90">
                <div className="relative">
                  <div className="absolute -bottom-px left-0.5 w-4.5 h-1 bg-[#1c1917] rounded-full blur-[1px]" />
                  {/* Highly polished croissant gradient */}
                  <div className="w-5 h-2.5 bg-gradient-to-b from-amber-600 via-amber-800 to-amber-950 rounded-full border border-stone-950/40" />
                </div>
                <div className="relative">
                  <div className="absolute -bottom-px left-0.5 w-5 h-1 bg-[#1c1917] rounded-full blur-[1px]" />
                  <div className="w-5.5 h-2.5 bg-gradient-to-b from-yellow-600 via-amber-700 to-stone-950 rounded-full border border-stone-950/40" />
                </div>
              </div>

              {/* Laser-engraved tiny luxurious KCT badge inside glass */}
              <div className="absolute bottom-1 left-2 z-20 scale-75 origin-left">
                <div className="border border-stone-800/80 px-1 py-0.5 rounded-[1px] bg-stone-950/80 text-[4px] font-black tracking-widest text-stone-500 font-sans uppercase">
                  KCT
                </div>
              </div>
            </div>

            {/* Seamless architectural horizontal cylindrical handle bar */}
            <div className="absolute top-[8px] inset-x-5 h-[12px] flex items-center justify-center z-30">
              {/* Minimal metal handle mounts */}
              <div className="absolute left-[8px] w-1.5 h-2.5 bg-gradient-to-b from-[#2a2a2d] to-[#121214] border border-[#3e3e42]/60 rounded-xs" />
              <div className="absolute right-[8px] w-1.5 h-2.5 bg-gradient-to-b from-[#2a2a2d] to-[#121214] border border-[#3e3e42]/60 rounded-xs" />
              {/* High-end slim graphite metal tube bar */}
              <div className="w-[185px] h-1 bg-gradient-to-b from-[#4a4a4f] via-[#1c1c1e] to-[#0c0c0d] rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.5)] border-r border-[#3e3e42]/40 cursor-pointer transform transition-all duration-300 hover:brightness-125 hover:translate-y-[0.5px] active:scale-98" />
            </div>

          </div>

          {/* Elegant microscopic horizontal separation recess */}
          <div className="w-full h-[3px] bg-stone-950 border-y border-[#18181a]/80 shadow-[inset_0_-1px_1px_rgba(0,0,0,0.8)]" />

          {/* 3. PROOFER CABINET: CLOSED-SYSTEM DOUGH CONDITIONER (Symmetric matching black glass door) */}
          <div className="h-[46%] bg-[#121214] rounded-lg border border-[#232326] shadow-[0_8px_20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col relative group">
            
            {/* Door Frame Inner Frit Bevel */}
            <div className="absolute inset-0 border-[5px] border-stone-950 z-20 pointer-events-none rounded-lg" />
            
            {/* Highly Realistic Window Frame */}
            <div className="flex-1 m-[5px] bg-[#09090b] rounded-sm relative flex flex-col overflow-hidden shadow-[inset_0_4px_16px_rgba(0,0,0,1)] ring-1 ring-[#1b1b1e]">
              
              {/* Soft interior humid mist light beam (Calm emerald/teal luxury environment lamp) */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#064e3b_0%,#111827_60%,#09090b_100%)] opacity-80 z-10 animate-pulse" style={{ animationDuration: "6s" }} />
              
              {/* Puffy proofing dough bundles resting symmetrically in dark metal pans */}
              <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-3.5 z-20 opacity-80 scale-90">
                <div className="relative">
                  <div className="absolute -bottom-px left-0.5 w-4.5 h-1 bg-[#022c22] rounded-full blur-[1px]" />
                  <div className="w-5 h-3 bg-stone-200/90 rounded-t-sm border border-stone-800" />
                </div>
                <div className="relative">
                  <div className="absolute -bottom-px left-0.5 w-4.5 h-1 bg-[#022c22] rounded-full blur-[1px]" />
                  <div className="w-5 h-3 bg-stone-100/90 rounded-t-sm border border-stone-800" />
                </div>
              </div>

              {/* Live Atmosphere Probe OLED status tag overlay inside door glass */}
              <div className="absolute bottom-1.5 left-2.5 text-[4px] font-mono font-medium text-[#10b981] flex items-center gap-1 z-20 scale-85 bg-stone-950/75 px-1 py-0.5 rounded-[1px] border border-[#10b981]/20">
                <span className="w-0.5 h-0.5 bg-[#10b981] rounded-full animate-ping" />
                <span>스마트 발효 · 28°C / 85% RH</span>
              </div>
            </div>

            {/* Seamless architectural horizontal cylindrical handle bar (Matches top for absolute layout symmetry) */}
            <div className="absolute top-[8px] inset-x-5 h-[12px] flex items-center justify-center z-30">
              {/* Minimal metal handle mounts */}
              <div className="absolute left-[8px] w-1.5 h-2.5 bg-gradient-to-b from-[#2a2a2d] to-[#121214] border border-[#3e3e42]/60 rounded-xs" />
              <div className="absolute right-[8px] w-1.5 h-2.5 bg-gradient-to-b from-[#2a2a2d] to-[#121214] border border-[#3e3e42]/60 rounded-xs" />
              {/* High-end slim graphite metal tube bar */}
              <div className="w-[185px] h-1 bg-gradient-to-b from-[#4a4a4f] via-[#1c1c1e] to-[#0c0c0d] rounded-full shadow-[0_3px_5px_rgba(0,0,0,0.5)] border-r border-[#3e3e42]/40 cursor-pointer transform transition-all duration-300 hover:brightness-125 hover:translate-y-[0.5px] active:scale-98" />
            </div>

          </div>

        </div>

        {/* Support rubber isolation cushions at the bottom corners */}
        <div className="absolute -bottom-[2px] left-6 w-5 h-1.5 bg-stone-950 rounded-b-sm border-t border-stone-900/40" />
        <div className="absolute -bottom-[2px] right-6 w-5 h-1.5 bg-stone-950 rounded-b-sm border-t border-stone-900/40" />

      </div>

      {/* Luxury integrated countertop mounting trim platform */}
      <div className="w-[258px] h-2 bg-gradient-to-r from-[#171719] via-[#2d2d31] via-[#3c3c43] via-[#1a1a1c] to-[#121214] rounded-sm mt-1.5 border-t border-[#444449]/40 shadow-sm flex items-center justify-between px-3 text-[5px] font-bold text-stone-500 tracking-widest font-mono">
        <span className="text-[4.5px] text-stone-400 font-extrabold">KCT MULTI-FLOW SYSTEM</span>
        <span className="text-[4.5px] text-stone-550">INTEGRATED 600mm</span>
      </div>
    </div>
  );
}

export default function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navigation View Tracking
  // Current view can be: "home" | "equip-list" | "equip-detail" | "dough-main" | "dough-detail" | "coffee" | "community" | "inquiry" | "login" | "partner-portal"
  const [currentView, setCurrentView] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredPanel, setHoveredPanel] = useState<"left" | "right" | null>(
    null,
  );
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const heroTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recommendScrollRef = useRef<HTMLDivElement | null>(null);

  const resetHeroTimer = () => {
    if (heroTimerRef.current) {
      clearInterval(heroTimerRef.current);
    }
    heroTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
  };

  useEffect(() => {
    if (currentView === "home") {
      resetHeroTimer();
    } else {
      if (heroTimerRef.current) {
        clearInterval(heroTimerRef.current);
        heroTimerRef.current = null;
      }
    }
    return () => {
      if (heroTimerRef.current) {
        clearInterval(heroTimerRef.current);
      }
    };
  }, [currentView]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    resetHeroTimer();
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    resetHeroTimer();
  };

  // B2B Partner Portal login states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userStoreName, setUserStoreName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Pending item trying to add to cart before login
  const [pendingCartItem, setPendingCartItem] = useState<DoughItem | null>(
    null,
  );

  // Selected dough for the detail view
  const [selectedDoughId, setSelectedDoughId] = useState<string>("m-001");

  // Selected equipment for the detail view
  const [selectedEquipId, setSelectedEquipId] = useState<string>("eq-pro-01");

  // Media tab state for equipment details: "product" (single shot) | "fit" (in-store fit)
  const [detailMediaTab, setDetailMediaTab] = useState<"product" | "fit">("product");

  // Define beautiful details data object for all equipments
  const equipData: Record<
    string,
    {
      id: string;
      code: string;
      name: string;
      tag: string;
      image: string;
      desc: string;
      price: number;
      badgeColor: string;
      textAccent: string;
      specs: { title: string; subtitle: string; desc: string }[];
    }
  > = {
    "eq-pro-01": {
      id: "eq-pro-01",
      code: "KCT-SM-PRO (170cm)",
      name: "KCT Smart Pro",
      tag: "KCT EXCLUSIVE · AI SMART HARDWARE",
      image: ovenImage,
      desc: "성인 키 높이의 170cm 수직 올인원 스테이션. 전용 통신 칩이 대량 제과 명인의 냉동 생지 바코드 데이터를 수신하여 실시간 숙성 발효 및 고화력 열 소성을 정밀 조정해냅니다. 단 1평 공간에 최적화된 명장 인증 하드웨어입니다.",
      price: 6500000,
      badgeColor: "bg-blue-50 border-blue-100",
      textAccent: "text-[#2563eb]",
      specs: [
        {
          title: "Chamber Height",
          subtitle: "170cm 인체공학적 수직 배치",
          desc: "서서 작업하는 작업자의 최적 관절 감각과 매장 내 쾌적한 보행 선형을 극대화한 스마트 챔버.",
        },
        {
          title: "Connectivity",
          subtitle: "자동 동기화 무선 WiFi 칩 내장",
          desc: "자체 바코드 센서와 전용 태블릿 앱 데이터 연집 방식으로 오븐/발효 세팅 자동 조율.",
        },
        {
          title: "Fermentation",
          subtitle: "AI 능동 온습도 제어 시스템",
          desc: "바깥 기온과 미세 수분 차이를 파악하여 이스트 발효 팽창력을 최상으로 유지하는 인공 지능 기법.",
        },
        {
          title: "Baking Power",
          subtitle: "고안개 고압 스팀 분출 & 세라믹 하우징",
          desc: "정밀 EVERYBAKE 스타일 브리오슈와 바게트 등 크러스트 형성을 위한 스팀 다류 통제 기능 기본 제공.",
        },
      ],
    },
    "eq-home-01": {
      id: "eq-home-01",
      code: "KCT-SM-HOME",
      name: "KCT 컴팩트 홈베이크",
      tag: "가정용 프리미엄 홈베이킹 패밀리 가전",
      image: modernSmartOvenImage,
      desc: "주방 아일랜드에 알맞춤한 콤팩트 명품. 상부 스팀오븐 1단 + 하부 해동도우컨디셔너 1베이가 일체화되어 가정에서도 제과점 수준의 오븐 스텍과 숙성 컨트롤을 완벽하게 재현합니다.",
      price: 1500000,
      badgeColor: "bg-amber-50 border-amber-100",
      textAccent: "text-amber-600",
      specs: [
        {
          title: "Chamber Height",
          subtitle: "주방 가구 일체형 콤팩트 규격",
          desc: "빌트인 아일랜드 장형 또는 주방 조리대 싱글 상판 상에 완벽 안착되는 우수 비례.",
        },
        {
          title: "Connectivity",
          subtitle: "모바일 연동 블루투스 컨트롤",
          desc: "스마트폰 앱과의 간편한 원터치 페어링을 통해 전 장인의 숙성 가이드를 무선 레시피로 입력.",
        },
        {
          title: "Fermentation",
          subtitle: "스마트 저온 숙성 및 저진동 설계",
          desc: "가정집의 고요한 침묵을 보호하는 무진동 초저진동 컴프레서 장착으로 소음 최소화.",
        },
        {
          title: "Baking Power",
          subtitle: "미세 초음파 스팀 미스트 분사",
          desc: "가니쉬 크로와상을 구울 때 풍부한 표면 수축과 파삭함을 지키는 정점 분사 노즐.",
        },
      ],
    },
    "eq-mini-01": {
      id: "eq-mini-01",
      code: "KCT-SM-MINI",
      name: "KCT Smart Mini (60cm)",
      tag: "KCT EXCLUSIVE · SMART MINI HARDWARE",
      image: modernSmartOvenImage,
      desc: "1인 카페 카운터나 가정집 아일랜드 테이블 위에 빌트인 배치되는 60cm 초컴팩트 스마트 오븐 스테이션. 도우컨디셔너 1판(해동·발효)과 오븐 1판(소성·스팀)의 미니 싱글 트레이 구조로 공간과 비용 부담은 낮추면서 스마트 바코드 레시피 동기화를 완벽하게 제공합니다.",
      price: 800000,
      badgeColor: "bg-emerald-50 border-emerald-100",
      textAccent: "text-emerald-600",
      specs: [
        {
          title: "Chamber Height",
          subtitle: "60cm 컴팩트 데스크톱 오븐",
          desc: "초소형 매장 및 푸드 트럭 카운터에도 여유롭게 자리 잡는 최적의 공간 절약 비례. 오븐 한판, 도우컨 한판만 들어가는 초미니 고효율 시스템.",
        },
        {
          title: "Connectivity",
          subtitle: "바코드 스마트 클라우드 동기화",
          desc: "원자재 주문 시 스마트 냉동 생지 바코드를 태그하면 맞춤 자동 구성을 스마트 오븐에 실시간 원격 동기화.",
        },
        {
          title: "Fermentation",
          subtitle: "단 1판 발효 숙성 전용 챔버",
          desc: "매장 공간 점유를 최소화하면서도, 최고의 이스트 팽창력을 확보하는 세밀한 전원 숙성 조절 시스템.",
        },
        {
          title: "Baking Power",
          subtitle: "오븐 한판 맞춤형 스팀 소성",
          desc: "소량 배치(Single Tray)에 완벽 최적화된 마이크로 도류 조절 스팀 가열 방식으로 최고 밀도의 결과물 완성.",
        },
      ],
    },
  };

  const currentDevice = equipData[selectedEquipId] || equipData["eq-pro-01"];

  // Dough lineup sub-tabs: "master" | "global" | "tasty"
  const [activeDoughTab, setActiveDoughTab] = useState<
    "master" | "global" | "tasty"
  >("master");
  const [activeDoughSubCategory, setActiveDoughSubCategory] = useState<
    "all" | "hard" | "pastry" | "soft"
  >("all");

  // Shopping / Cart drawer state
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Checkout & PG Payment states
  const [checkoutContact, setCheckoutContact] = useState<string>("");
  const [checkoutDeliveryDate, setCheckoutDeliveryDate] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "card" | "naverpay" | "kakaopay"
  >("card");
  const [isPaymentProcessing, setIsPaymentProcessing] =
    useState<boolean>(false);
  const [paymentSuccessOrder, setPaymentSuccessOrder] = useState<any | null>(
    null,
  );

  useEffect(() => {
    if (currentView !== "pg-payment" && currentView !== "checkout-form") {
      setPaymentSuccessOrder(null);
    }
  }, [currentView]);

  // Durable client persistence for finished checkouts
  const [orderHistory, setOrderHistory] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("everybake_orders");
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("everybake_orders", JSON.stringify(orderHistory));
    } catch (_) {}
  }, [orderHistory]);

  // Shared interactive map states
  const [selectedKoreaPin, setSelectedKoreaPin] = useState<string | null>(null);
  const [selectedGlobalPin, setSelectedGlobalPin] = useState<string | null>(
    null,
  );
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [ovenActiveDoughId, setOvenActiveDoughId] = useState<string | null>(
    null,
  );
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // States for Interactive AI POS system
  const [posVoiceTranscript, setPosVoiceTranscript] = useState<string>("");
  const [posParsedItems, setPosParsedItems] = useState<{name: string; qty: number; price: number}[]>([]);
  const [posOvenSignalSent, setPosOvenSignalSent] = useState<boolean>(false);
  const [posActiveStatus, setPosActiveStatus] = useState<string>("대기중... (주문 입력을 기다리는 중)");
  const [posWeatherState, setPosWeatherState] = useState<string>("맑음 (24°C)");
  const [isParsingVoice, setIsParsingVoice] = useState<boolean>(false);

  // States for reviews on KCT Smart Pro Machine (equip-detail)
  const [equipReviews, setEquipReviews] = useState<Review[]>([
    {
      id: "eqr-01",
      author: "서울 성수동 A카페 사장님",
      stars: 5,
      content:
        "혼자서 매장 보느라 빵 구울 시간이 없었는데, EveryBake 기기 앱 알림 덕분에 발효 실패율이 0%가 되었습니다. 수직형이라 좁은 바에도 쏙 들어갑니다.",
      date: "2026-05-18",
    },
    {
      id: "eqr-02",
      author: "부산 해운대 B카페",
      stars: 5,
      content:
        "스마트폰으로 알림 오는게 너무 편합니다. 저온 발효 정밀 제어가 최고네요. 일시불로 구매한 게 신의 한 수입니다.",
      date: "2026-05-25",
    },
  ]);
  const [newEquipAuthor, setNewEquipAuthor] = useState("");
  const [newEquipStars, setNewEquipStars] = useState(5);
  const [newEquipContent, setNewEquipContent] = useState("");

  // States for reviews on Dough Items (dough-detail)
  const [doughReviews, setDoughReviews] = useState<Record<string, Review[]>>({
    "m-001": [
      {
        id: "dr-01",
        author: "카페 오브제 사장님",
        stars: 5,
        content:
          "우리 매장 시그니처 메뉴가 되었습니다. 결이 진짜 살아있고 기기가 자동으로 최적 발효를 해주니까 초보 직원이 구워도 완벽한 퀄리티가 나옵니다.",
        date: "2026-05-20",
      },
    ],
    "m-002": [
      {
        id: "dr-02",
        author: "브레드 정원 점주님",
        stars: 5,
        content:
          "영주 절임 사과 아삭함이 대박입니다. 구울 때 매장에 시나몬 버터향이 가득 퍼져서 손님들이 냄새 맡고 주문을 계속 하시네요.",
        date: "2026-05-14",
      },
    ],
  });
  const [newDoughAuthor, setNewDoughAuthor] = useState("");
  const [newDoughStars, setNewDoughStars] = useState(5);
  const [newDoughContent, setNewDoughContent] = useState("");

  // States query feed for coffee page
  const [coffeeFeed, setCoffeeFeed] = useState<GeneralComment[]>([
    {
      id: "cf-1",
      author: "로스터리 K 사장님",
      content:
        "CJ 프레시웨이 마스터 로스팅 원두 가성비가 최고 수준입니다. 매번 따로 발주해 마스터하기 번거로웠는데 에브리베이크 한 채널에서 스마트 도우랑 같이 묶음 발재할 수 있어서 매장 운영 코스트가 확실히 줄어들었습니다.",
      date: "2026-05-27",
      replies: [
        {
          author: "EveryBake MD팀 답변",
          content:
            "만족해주셔서 기쁩니다! 사장님들의 통합 구매력을 활용해 최고의 원자재 단가를 상시 유지하겠습니다.",
          date: "2026-05-28",
        },
      ],
    },
  ]);
  const [newCoffeeAuthor, setNewCoffeeAuthor] = useState("");
  const [newCoffeeContent, setNewCoffeeContent] = useState("");

  // States for Community board (replacing raw view)
  const [activeCommTab, setActiveCommTab] = useState<
    "dough" | "coffee" | "raw" | "trouble"
  >("dough");
  const [isWritingPost, setIsWritingPost] = useState<boolean>(false);
  const [unifiedSubCat, setUnifiedSubCat] = useState<string>("dough");
  const [unifiedTitle, setUnifiedTitle] = useState("");
  const [unifiedContent, setUnifiedContent] = useState("");
  const [unifiedAuthor, setUnifiedAuthor] = useState("");
  const [unifiedLocation, setUnifiedLocation] = useState("");
  const [unifiedPriceInfo, setUnifiedPriceInfo] = useState("");
  const [unifiedTargetAmount, setUnifiedTargetAmount] = useState("");
  const [unifiedUrgentsInfo, setUnifiedUrgentsInfo] = useState("");
  const [newCommTitle, setNewCommTitle] = useState("");
  const [newCommContent, setNewCommContent] = useState("");
  const [newCommAuthor, setNewCommAuthor] = useState("");
  const [newTroubleTitle, setNewTroubleTitle] = useState("");
  const [newTroubleContent, setNewTroubleContent] = useState("");
  const [newTroubleAuthor, setNewTroubleAuthor] = useState("");
  const [expandedCommunityPostId, setExpandedCommunityPostId] = useState<
    string | null
  >(null);
  const [newCommCommentAuthor, setNewCommCommentAuthor] = useState("");
  const [newCommCommentText, setNewCommCommentText] = useState("");

  const handleCreateUnifiedPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("글을 작성하려면 로그인이 필요합니다.");
      setCurrentView("login");
      return;
    }
    if (!unifiedTitle.trim() || !unifiedContent.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    const category = unifiedSubCat;
    const authorName = unifiedAuthor.trim() || userStoreName || "에베인 정회원 매장";

    if (["dough", "coffee", "raw", "trouble"].includes(category)) {
      // This goes into communityPosts
      const newPost: CommunityPost = {
        id: `cp-${Date.now()}`,
        category: category as any,
        title: unifiedTitle.trim(),
        content: unifiedContent.trim(),
        author: authorName,
        date: new Date().toISOString().split("T")[0],
        votes: 1,
        status: category === "trouble" ? "답변 완료 대기" : "추천 대기",
        votedByMe: true,
        comments: [],
        replies: category === "trouble" ? [] : undefined,
      };
      setCommunityPosts([newPost, ...communityPosts]);
      
      // Select the category so they can see their post
      setActiveMainTab(category === "trouble" ? "trouble" : "why-not-sell");
      setActiveCommTab(category as any);
    } else {
      // This goes into plazaPosts
      const newPost: PlazaPost = {
        id: `plaza-post-${Date.now()}`,
        category: category as any,
        title: unifiedTitle.trim(),
        content: unifiedContent.trim(),
        author: authorName,
        location: unifiedLocation.trim() || "서울 마포구",
        date: new Date().toISOString().split("T")[0],
        priceInfo: unifiedPriceInfo.trim() || "협의 제안",
        targetAmount: unifiedTargetAmount.trim() || "제한 없음",
        urgentsInfo: unifiedUrgentsInfo.trim() || "기타 사양 참조",
        joinedByMe: false,
        participantsCount: 0,
        votes: 1,
        comments: [],
        status: "모집중",
      } as any;
      setPlazaPosts((prev) => [newPost, ...prev]);

      // Select the category so they can see their post
      if (category === "interior") {
        setActiveMainTab("interior");
      } else {
        setActiveMainTab("flea-market");
        setActivePlazaTab(category as any);
      }
    }

    // Reset unified writing states
    setUnifiedTitle("");
    setUnifiedContent("");
    setUnifiedAuthor("");
    setUnifiedLocation("");
    setUnifiedPriceInfo("");
    setUnifiedTargetAmount("");
    setUnifiedUrgentsInfo("");
    setIsWritingPost(false);
    setSelectedPlazaPostId(null);

    setNotifications((prev) => [
      `📝 새 글이 에브리베이크 실시간 채널에 배포되었습니다.`,
      ...prev,
    ]);
  };

  const handleCreateTroublePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTroubleTitle.trim() || !newTroubleContent.trim() || !newTroubleAuthor.trim())
      return;

    const newPost: CommunityPost = {
      id: `cp-${Date.now()}`,
      category: "trouble",
      title: newTroubleTitle.trim(),
      content: newTroubleContent.trim(),
      author: newTroubleAuthor.trim(),
      date: new Date().toISOString().split("T")[0],
      votes: 1,
      status: "추천 대기",
      votedByMe: true,
      comments: [],
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewTroubleTitle("");
    setNewTroubleContent("");
    setNewTroubleAuthor("");
  };
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: "cp-1",
      category: "dough",
      title: "🥐 요즘 대세인 시그니처 크루키(Crookey) 생지 출시 가능할까요?",
      content:
        "크로와상 생지 위에 초코칩 쿠키 도우 가득 올린 디저트가 대유행입니다. 가맹점 매출 수직상승 비결인데 본사 차원에서 명작 크루키 생지 단가 낮춰 공급해 주셨으면 합니다.",
      author: "수지 아뜰리에 점주",
      date: "2026-05-28",
      votes: 42,
      status: "MD 검토 중",
      comments: [
        {
          id: "cm-cc-1",
          author: "정릉 오가닉베이커리",
          content:
            "크루키 진짜 요즘 인스타 숏폼 휩쓸고 있네요! 생지로 나오면 가벼운 오븐 베이킹만으로 엄청 잘 팔릴 거 같아요.",
          date: "2026-05-28 14:22",
        },
        {
          id: "cm-cc-2",
          author: "망원 브레드존 점주",
          content:
            "동감합니다. 직접 성형하려면 쿠키 반죽 치는 게 일인데, 결합 생지 나오면 바로 발주합니다.",
          date: "2026-05-29 09:10",
        },
      ],
    },
    {
      id: "cp-2",
      category: "dough",
      title: "🍞 천연 쌀 치아바타 대용량 벌크 입고 요청",
      content:
        "비건/기타 장질환 유발 없는 프리미엄 쌀 반죽 치아바타를 찾는 손님이 폭증했습니다. 샌드위치용으로 대용량 포장 묶음으로 입고 희망합니다.",
      author: "정릉 오가닉베이커리",
      date: "2026-05-31",
      votes: 18,
      status: "추천 대기",
      comments: [
        {
          id: "cm-cc-3",
          author: "수지 아뜰리에 점주",
          content:
            "밀가루 소화 안 된다는 어르신들이 쌀 베이킹을 무척 선호하시더라구요. 꼭 공동 입점되었으면!",
          date: "2026-05-31 18:05",
        },
      ],
    },
    {
      id: "cp-3",
      category: "coffee",
      title: "☕ 수제 밀크크림 디카페인 에티오피아 원두 공동발주 건의",
      content:
        "카페인에 민감한 저녁 고객 손님 유치용으로 싱글 디카페인을 소단위로도 담을 수 있게 공급망 입점 제안합니다.",
      author: "은평 밤부로스팅",
      date: "2026-06-01",
      votes: 31,
      status: "MD 검토 중",
      comments: [
        {
          id: "cm-cc-4",
          author: "로스터리 K 사장님",
          content:
            "디카페인 수요 예전같지 않게 진짜 매달 폭증하고 있는 상태입니다. 1kg 백 단위 공구도 좋습니다.",
          date: "2026-06-01 11:15",
        },
      ],
    },
    {
      id: "cp-4",
      category: "raw",
      title: "🌾 프랑스 명물 포리쉐 T55 프랑스 밀가루 공동 단가 입점",
      content:
        "자가 제빵하는 소규모 매장에 핵심인 프랑스 국보 밀가루 공급을 오븐 바코드 연동 포장백 구성과 합쳐서 대량 구매 입점 희망합니다. 기압 수율 극대화 가능합니다.",
      author: "빵돌이 브레드 사장",
      date: "2026-05-15",
      votes: 56,
      status: "MD 검토 완료 (입점 예정)",
      comments: [
        {
          id: "cm-cc-5",
          author: "서교동 바게트왕",
          content:
            "포리쉐 T55는 바게트 풍미 핵심 자재죠! 대량 계약으로 포털 단가 낮추는 거 대환영입니다.",
          date: "2026-05-16 10:00",
        },
      ],
    },
    {
      id: "cp-trouble-1",
      category: "trouble",
      title:
        "❓ 요즘 어떤 자재가 좋을까요? 창업할 때 어떤 제품을 사는게 좋을까요?",
      content:
        "개 개인 제과점 1인 매장 창업을 준비하고 있는데, 마가린을 쓰자니 풍미가 아쉽고 벨기에산 고가 버터를 쓰자니 원가율 맞추기가 너무 빡빡합니다. 보통 가성비와 퀄리티를 다 잡으려면 수입 버터 중 어떤 유제품 브랜드를 매칭하는 게 좋을까요? 생지와 기기 설계도 조언 부탁드립니다!",
      author: "예비창업자 김씨",
      date: "2026-06-03",
      votes: 24,
      status: "답변 완료",
      comments: [
        {
          id: "cm-tr-1-1",
          author: "서교동 바게트왕",
          content:
            "마가린은 절대로 안 됩니다. 맛에 민감한 요즘 손님들은 버터 향과 풍미 차이를 즉각 눈치채요. 초반 마진 확보가 목적이시라면 뉴질랜드산 앵커 에이프런 버터나 프랑스 엘르앤비르 기획 롤버터를 적절히 블렌딩해 쓰는 방식을 강력하게 추천해 드립니다!",
          date: "2026-06-03 14:32",
        },
        {
          id: "cm-tr-1-2",
          author: "EveryBake MD팀",
          content:
            "안녕하세요 예비 점주님! 에브리베이크 론칭 신규 전용 도매 품목 중 프랑스 국산 엘르앤비르 보정용 고메 버터 상생 입점 세트를 이용하시면, 개별 수입 물류 사입 대비 원가 비용을 최대 35% 이상 직접 환원 세이브 해드립니다.",
          date: "2026-06-03 16:10",
        },
        {
          id: "cm-tr-1-3",
          author: "정릉 오가닉베이커리",
          content:
            "자재 품질도 진짜 중요하지만, 장비 설계 단계가 핵심입니다. 데크오븐이랑 도우컨디셔너를 무조건 올인원 세트로 쓰세요. 새벽 출근 노동 강도에서 1.5인분 인건비가 날아갑니다.",
          date: "2026-06-03 17:45",
        },
      ],
    },
    {
      id: "cp-trouble-2",
      category: "trouble",
      title:
        "🍯 요즘 이 자재로 이런 빵을 만들어 봤는데 맛이 좀 별로인 것 같은데 여기에 뭘 추가하면 좋아질까요?",
      content:
        "이번에 들여온 천연 유기농 통밀가루 100% 자재로 심혈을 기울여 깜빠뉴를 구워봤는데요. 단골 고객님들 시식 평이 너무 푸석하고 모래알 씹는 듯 퍽퍽하다네요. 고소하고 촉촉함은 극대화하면서도 대중적인 입맛을 완벽하게 저격할 수 있는 레시피 보충제나 계량비율 꿀팁이 있을까요?",
      author: "초보 제빵사 빵긋",
      date: "2026-06-04",
      votes: 15,
      status: "토론 활발",
      comments: [
        {
          id: "cm-tr-2-1",
          author: "명장 문하생",
          content:
            "통밀 100% 빵은 물성을 컨트롤하기 무척 난해합니다. 반죽 시작 전에 통밀가루와 설계상 가수량 전체 물만 먼저 가볍게 섞어둔 채 1시간 이상 휴지시키는 '오토리즈(Autolyse)' 기법을 추가하십시오. 글루텐 결합 효율이 올라가 촉촉함이 오랫동안 증폭됩니다.",
          date: "2026-06-04 10:12",
        },
        {
          id: "cm-tr-2-2",
          author: "수지 아뜰리에 점주",
          content:
            "반죽 칠 때 천연 올리브 오일이나 아카시아 생꿀을 딱 2% 수준으로만 극소량 첨가하면 노화 방지 기능도 겸해져서 마법처럼 쫀득쫀득 촉촉해집니다! 저희 매장 시그니처 비법이에요.",
          date: "2026-06-04 11:35",
        },
        {
          id: "cm-tr-2-3",
          author: "망원 브레드존 점주",
          content:
            "호두나 마카다미아, 졸인 무화과나 건크랜베리 토핑을 반죽 후반에 도톰히 크래싱해 넣으면 풍취도 무척 화려해지고 건조함이 근사하게 상쇄되어 대중들이 편하게 집어갑니다.",
          date: "2026-06-04 12:05",
        },
      ],
    },
    {
      id: "cp-trouble-3",
      category: "trouble",
      title:
        "⚡ 여기 오븐을 삿는데 케이씨티에서 만든 AI 기능이 탑재된 하이브리드 도우컨 오븐을 사는게 더 좋을까요?",
      content:
        "얼마 전에 일반 중고 3단 데크오븐이랑 구형 타사 도우컨디셔너를 세트로 저렴하게 도입했는데요. 매일 새벽 4시 반에 차가운 겨울바람 맞으며 졸린 운전으로 출근 시각 맞추려니 체력적으로 도저히 버틸 재간이 없습니다. KCT에서 출시한 스마트 AI 탑재 원격 하이브리드 도우컨 오븐으로 장기 리스 변경하면, 수면 패턴과 출근 여유를 기적처럼 되찾을 수 있을까요?",
      author: "지친 새벽베이커",
      date: "2026-06-05",
      votes: 48,
      status: "강력 추천",
      comments: [
        {
          id: "cm-tr-3-1",
          author: "신길 카페로 점주",
          content:
            "고민은 지각과 체력 방출만 늦출 뿐입니다! KCT 스마트 오븐으로 무조건 갈아타세요. 저는 매일 아침 침대에 누워서 새벽 2시에 스마트폰 위젯 스와이프 한 번으로 '냉동 원터치 보관 상태'에서 '자동 저온 발효 보정'으로 실시간 전환 지시 내립니다. 아침 7시 반에 세련되게 출근해서 세면하고 바로 구워냅니다. 행복 지수가 다릅니다 진짜.",
          date: "2026-06-05 06:14",
        },
        {
          id: "cm-tr-3-2",
          author: "EveryBake MD팀",
          content:
            "안녕하세요 점주님! KCT 하이브리드 지능형 도우컨 시스템은 외부 온습도 정점 예측 제어 및 미세 특수 스팀 밀도 제어로 과발효를 완벽히 억제하는 AI 알고리즘 가동 시스템이 호환됩니다. 본 가입 시 점주 전용 무이자 리스 지원 및 특별 매칭을 함께 승인받으실 수 있습니다.",
          date: "2026-06-05 08:33",
        },
        {
          id: "cm-tr-3-3",
          author: "상동 베이글마니아",
          content:
            "투자비 아깝다고 옛날 구형 아날로그 장비 고수하면 허리 디스크랑 새벽 수면 부족으로 병원비가 배로 폭발합니다. 일종의 매출 상승용 자동 영양제라고 보시는 게 정신 건강에 탁월합니다.",
          date: "2026-06-05 09:50",
        },
      ],
    },
    {
      id: "cp-trouble-4",
      category: "trouble",
      title:
        "🥐 크루아상 버터 격자 층이 자꾸 뭉개지고 떡이 지는데 원인이 뭘까요?",
      content:
        "크루아상 버터 롤 성형 시 16글 결이 깔끔하게 살지 않고 가열 시 밀가루 전분과 함께 혼합되어 동굴 없는 일반 버터 모닝빵 형태가 돼 버립니다. 벨기에 판형 버터와 도우 시터의 온도가 문제인가요?",
      author: "크루아상 사랑방",
      date: "2026-06-06",
      votes: 19,
      status: "토론 필요",
      comments: [
        {
          id: "cm-tr-4-1",
          author: "명장 문하생",
          content:
            "시터 작업실 온도가 22도를 초과하면 롤인 버터가 바로 반죽에 고체 상태를 잃고 액상 흡수되기 시작합니다! 밀어펴기 할 때 반죽과 버터를 각각 영하 2도에서 영상 2도 사이로 무조건 쨍하고 차갑게 유지하면서 신속하게 접어야 합니다.",
          date: "2026-06-06 14:15",
        },
        {
          id: "cm-tr-4-2",
          author: "수지 아뜰리에 점주",
          content:
            "맞아요. 접고 나서 냉동고에 20분 이상 무조건 단단하게 냉장 휴지 주시는 것만 잊지 않아도 층 분리가 훌륭하게 연출됩니다.",
          date: "2026-06-06 15:40",
        },
      ],
    },
    {
      id: "cp-trouble-5",
      category: "trouble",
      title:
        "🥖 바게트 칼집(쿠프)이 구울 때 시원하고 입체적으로 벌어지지 않습니다",
      content:
        "칼을 45도 각도로 정확히 눕혀 바게트에 쿠프를 넣고 스팀 주입 데크에 투입하는데도 구워지면 칼자국이 얌전하게 아물어버리기만 해요. 빵의 양 날개가 시원스러운 입술 모양으로 벌어지는 '토끼 귀 쿠프' 비법이 있나요?",
      author: "하드 계열 수련가",
      date: "2026-06-07",
      votes: 22,
      status: "답변 완료",
      comments: [
        {
          id: "cm-tr-5-1",
          author: "서교동 바게트왕",
          content:
            "바게트 표면이 과도한 습도로 눅눅해진 상태에서 칼집을 내면 탄력이 눌려서 벌어지지 않고 도로 붙어버려요. 칼을 치기 전에 3~5분간 반죽 표면의 수분을 건조시키는 팬닝 건조 과정을 주고, 면도칼에 올리브유나 물을 살짝 적셔 아주 날렵하게 비껴 그어 주시는 게 신의 한 수입니다.",
          date: "2026-06-07 11:20",
        },
        {
          id: "cm-tr-5-2",
          author: "망원 브레드존 점주",
          content:
            "돌판 온도가 240도 이상으로 강력하게 뜨거울 때 스팀이 즉시 분사되어야 에너지가 반죽 하단을 치고 밀어올려 멋지게 터집니다. 가화 효율이 정말 최고 중요합니다.",
          date: "2026-06-07 13:02",
        },
      ],
    },
    {
      id: "cp-trouble-6",
      category: "trouble",
      title: "🧉 여름철 커피 아이스크림 크림 콜라보 신메뉴 구상",
      content:
        "소프트 에스프레소 아포가토 위에 프랑스 바닐라빈 생크림을 올리는 이색 조합 음료를 리뉴얼 시그니처 구성으로 매치하고 싶은데, EveryBake 원두와 시너지 배합은 어떨까요?",
      author: "음료 장인 큐그레이더",
      date: "2026-06-08",
      votes: 11,
      status: "정보 안내",
      comments: [
        {
          id: "cm-tr-6-1",
          author: "로스터리 K 사장님",
          content:
            "EveryBake 밀크 아로마 프리미엄 다크 로스트 원두가 바닐라 리치 크림의 묵직한 당도가 섞였을 때 가히 환상적인 다크 너티 풍미를 자랑합니다! 꼭 두 번 배합해 보세요.",
          date: "2026-06-08T09:20:00Z",
        },
      ],
    },
  ]);

  // States for 에브리베이크 알뜰 광장 (Flea Market Mutual Aid)
  const [activeMainTab, setActiveMainTab] = useState<
    "why-not-sell" | "flea-market" | "interior" | "trouble"
  >("why-not-sell");
  const [activePlazaTab, setActivePlazaTab] = useState<
    "coop" | "used" | "share" | "job" | "interior"
  >("coop");
  const [selectedPlazaPostId, setSelectedPlazaPostId] = useState<string | null>(
    null,
  );
  const [shuffledLivePosts, setShuffledLivePosts] = useState<any[]>([]);
  const [currentLiveIndex, setCurrentLiveIndex] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [activeRecommendIndex, setActiveRecommendIndex] = useState(0);

  // Custom plaza post creation form states
  const [newPlazaTitle, setNewPlazaTitle] = useState("");
  const [newPlazaContent, setNewPlazaContent] = useState("");
  const [newPlazaAuthor, setNewPlazaAuthor] = useState("");
  const [newPlazaLocation, setNewPlazaLocation] = useState("");
  const [newPlazaDetailInfo, setNewPlazaDetailInfo] = useState("");
  const [newPlazaPriceInfo, setNewPlazaPriceInfo] = useState("");
  const [newPlazaTargetAmount, setNewPlazaTargetAmount] = useState("");
  const [newPlazaUrgentsInfo, setNewPlazaUrgentsInfo] = useState("");

  // Plaza new comment input state
  const [newPlazaCommentText, setNewPlazaCommentText] = useState("");
  const [newPlazaCommentAuthor, setNewPlazaCommentAuthor] = useState("");

  const [plazaPosts, setPlazaPosts] = useState<PlazaPost[]>([
    // Category 1: coop (공동구매)
    {
      id: "plaza-coop-1",
      category: "coop",
      title:
        "📦 [공구 진행중] 손잡이형 크라프트 쇼핑백 대량 공동구매 (단가 40% 절감)",
      content:
        "테이크아웃용 고품질 에코 무지 크라프트 쇼핑백 1만 개 타겟 대형 공동 발주를 개시합니다. 현재 참여도가 높아 단량 최대 혜택 확정되었습니다.",
      author: "망원 브레드존 점주",
      date: "2026-06-02",
      location: "서울 마포구",
      detailInfo:
        "무지 손잡이형 대형 가방 규격입니다. 에브리베이크 가맹점 스티커나 자체 맞춤 스탬프를 가볍게 찍어서 활용하기 정말 수월합니다. 벌크 할인 단가는 1박스(500장)당 원래 4.5만원 상당인 제품을 공구 성사 시 2.75만원에 득템하실 수 있습니다. 필요하신 수량을 박스 단위로 남겨 주세요!",
      targetAmount: "목표 20박스 / 현재 17박스 모집 완료 (85%)",
      priceInfo: "공구 할인가: 1박스(500장) 27,500원 (장당 55원)",
      participantsCount: 8,
      comments: [
        {
          id: "pc-c1-1",
          author: "서교 빵빵이 점주",
          role: "Special Member",
          content:
            "저희 2박스(1,000장) 신청하겠습니다! 저번에 써보니 재질이 짱짱하고 좋더라구요.",
          date: "2026-06-02 10:15",
        },
        {
          id: "pc-c1-2",
          author: "망원 2동 카페비엔나 사장",
          role: "Special Member",
          content:
            "저도 1박스 참여 희망합니다! 입금처나 신청 구글폼 공유 부탁드려도 될까요?",
          date: "2026-06-02 11:32",
        },
        {
          id: "pc-c1-3",
          author: "합정 베이크팩토리",
          role: "Special Member",
          content:
            "저희 매장도 3박스 신청할게요! 쉐어 모집 올려주셔서 늘 감사합니다.",
          date: "2026-06-02 11:45",
        },
        {
          id: "pc-c1-4",
          author: "상동 베이글마니아",
          role: "Premium Member",
          content:
            "혹시 택배 배송 가능한가요? 가능하다면 2박스 예약하고 싶어요.",
          date: "2026-06-02 12:01",
        },
      ],
    },
    {
      id: "plaza-coop-2",
      category: "coop",
      title: "📦 배달용 무지 종이봉투 12호 각대봉투 긴급 공구",
      content:
        "배달 및 대량 포장에 넉넉히 알맞은 12호 각대봉투 통합 발주 추진합니다. 5,000장 이상 단위 묶음으로 도매 할인 적용 가능합니다.",
      author: "성수 오븐스토리 점주",
      date: "2026-06-01",
      location: "서울 성동구",
      detailInfo:
        "식빵이나 깜빠뉴 등 큼직한 빵 포장에 유용하게 매치되는 크라프트 무지 봉투입니다. 매장별 개별 단가 발주 시 무시할 수 없는 비용인데, 통합 벤더 직접 조율로 대폭 인하하였습니다.",
      targetAmount: "목표 10,000장 / 현재 6,500장",
      priceInfo: "장당 35원 (일반 도매가 58원)",
      participantsCount: 5,
      comments: [
        {
          id: "pc-c2-1",
          author: "뚝섬 크루아상 점주",
          role: "Premium Member",
          content:
            "저희 2,000장 즉각 합류합니다! 정가보다 확실히 메리트 있네요.",
          date: "2026-06-01 15:40",
        },
        {
          id: "pc-c2-2",
          author: "한양대 베이킹 점주",
          role: "Special Member",
          content:
            "저희 매장도 1,500장 예약 부탁드립니다! 공동구매 최고입니다 정말.",
          date: "2026-06-01 17:12",
        },
      ],
    },
    {
      id: "plaza-coop-3",
      category: "coop",
      title: "📦 [친환경 자재] 고품질 생분해 종이 빨대 벌크 공동 구매",
      content:
        "여름 아이스 음료 시즌을 맞아 플라스틱 친환경 규제 완벽 이행 가능한 종이 빨대 대용량 100박스 공구를 진행합니다.",
      author: "여의도 베이커리 대표",
      date: "2026-05-31",
      location: "서울 영등포구",
      detailInfo:
        "시간이 지나도 눅눅해지지 않는 특수 코팅 친환경 종이 빨대입니다. 1,000개입 벌크 박스 사양으로 카페 음료 포지션이 있으신 사장님들께 강력 제안합니다.",
      targetAmount: "목표 100박스 / 현재 45박스",
      priceInfo: "1박스(1,000개) 8,900원 (최상급 원형 보정)",
      participantsCount: 4,
      comments: [
        {
          id: "pc-c3-1",
          author: "신길 카페로 점주",
          role: "Special Member",
          content:
            "박스당 단가가 너무 은혜롭네요. 저희 매장 5박스 단번에 주문하겠습니다!",
          date: "2026-05-31 16:15",
        },
        {
          id: "pc-c3-2",
          author: "여의도 IFC뒤편 사장",
          role: "Premium Member",
          content:
            "사용해봤던 제품인데 품질 보장됩니다. 저희도 3박스 줄 섭니다.",
          date: "2026-06-01 09:22",
        },
      ],
    },
    {
      id: "plaza-coop-4",
      category: "coop",
      title: "📦 리유저블 아이스컵 14oz & 컵홀더 통합 단체 발주",
      content:
        "여름 디저트 판매 대비 단체 맞춤 무지 리유저블 컵과 크라프트 엠보싱 슬리브 홀더 박스 통합 할인 발주를 진행합니다.",
      author: "인천 구월베이크 사장",
      date: "2026-05-29",
      location: "인천 남동구",
      detailInfo:
        "내수성과 그립감이 뛰어난 플라스틱 리유저블 세트입니다. 에브리베이크 빵과 테이크아웃 세트 메뉴 구성에 최적의 단가 합작을 보장합니다.",
      targetAmount: "목표 30박스 / 현재 28박스 (마감 임박)",
      priceInfo: "1박스(500세트) 34,000원",
      participantsCount: 12,
      comments: [
        {
          id: "pc-c4-1",
          author: "송도 베이커스 사장",
          role: "Special Member",
          content:
            "와 드디어 열렸네요! 소문 듣고 찾아왔습니다. 1박스 바로 선점할게요.",
          date: "2026-05-30 11:22",
        },
      ],
    },
    {
      id: "plaza-coop-5",
      category: "coop",
      title: "📦 [안전 위생자재] 투명 마스크 및 M사이즈 니트릴 장갑 통합 신청",
      content:
        "구청 위생 점검 대비 투명 위생 밴드 마스크 및 빵 반죽 성형용 파우더프리 니트릴 장갑 단체 도매 도크 발주 신청 받습니다.",
      author: "분당 서현베이커리 점주",
      date: "2026-05-28",
      location: "경기 성남시",
      detailInfo:
        "식품용 안전 공식 등급 인증을 획득한 니트릴 장갑과 조절식 다회용 투명 쉴드입니다. 손가락 밀착감과 통기성이 발군입니다.",
      targetAmount: "목표 50세트 / 현재 32세트",
      priceInfo: "1세트 (투명마스크 5개 + 장갑 200매) 11,000원",
      participantsCount: 3,
      comments: [
        {
          id: "pc-c5-1",
          author: "정자 멜론 점주",
          role: "Special Member",
          content:
            "밀가루 반죽 만질 때 꼭 필요했는데 마침 잘 되었네요. 2세트 가겠습니다.",
          date: "2026-05-28 14:02",
        },
        {
          id: "pc-c5-2",
          author: "판교 구름빵 사장",
          role: "Premium Member",
          content:
            "니트릴 장갑 이 등급 제품이 땀이 덜 나더군요! 저도 3세트 할게요.",
          date: "2026-05-29 09:10",
        },
      ],
    },

    // Category 2: used (중고장터)
    {
      id: "plaza-used-1",
      category: "used",
      title:
        "🤝 [상태최상] 우녹스 베이커럭스 오븐용 4단 트레이 랙 거치대 급처분",
      content:
        "매장 인테리어 확장 및 레이아웃 이전으로 사용하지 않는 올 스테인리스 4단 트레이 오븐 스탠드를 초특가에 처분합니다.",
      author: "합정 버터플라이 사장",
      date: "2026-06-02",
      location: "서울 마포구",
      detailInfo:
        "우녹스 오븐이 안정감 있게 딱 안착 고정되는 완벽한 전용 호환 제품입니다. 내식성과 강도가 뛰어난 올 스테인리스 재질이며, 이동 및 고정이 매우 기동력 높은 오렌지 브레이크 바퀴가 장착되어 있어 매장 동선 정리에 베스트입니다.",
      priceInfo: "중고 급처가: 90,000원 (신품 가격 24만원 상당)",
      participantsCount: 3,
      comments: [
        {
          id: "pc-u1-1",
          author: "공덕 베이커블 점주",
          role: "Special Member",
          content:
            "제가 정말 찾던 랙 거치대네요! SUV 뒷좌석 폴딩하면 실릴지 여쭤보고 싶습니다.",
          date: "2026-06-02 13:02",
        },
        {
          id: "pc-u1-2",
          author: "합정 버터플라이 사장",
          role: "Special Member",
          content:
            "네 사장님! 거치대 본체가 조립식은 아니라 부피는 조금 있지만 투싼이나 스포티지 급 SUV 뒷좌석을 폴딩하시면 가로로 충분히 적재됩니다! 저희 매장 앞에 가볍게 정차하시고 가져가시면 됩니다.",
          date: "2026-06-02 13:10",
        },
        {
          id: "pc-u1-3",
          author: "신촌 빵집짱 사장",
          role: "Premium Member",
          content:
            "혹시 앞선 거래가 불발되면 저에게 무조건 순번 넘겨주세요! 즉시 현장 계좌 이체 보장합니다.",
          date: "2026-06-02 13:25",
        },
      ],
    },
    {
      id: "plaza-used-2",
      category: "used",
      title: "🤝 [급매] 업소용 국산 20쿼터 반죽기 (스파 믹서 SPA-800)",
      content:
        "모터 기어 마모 일절 없는 영양 만점 스파 믹서 20쿼터 반죽기 판매합니다. 여분 믹싱 볼과 훅, 비터 포함 올 세트 구성.",
      author: "경기 일산 식사베이크 점주",
      date: "2026-06-01",
      location: "경기 고양시",
      detailInfo:
        "베이커리 가동에 최고의 내구성을 검증받은 국산 SPA-800 모델입니다. 빵 반죽부터 케이크 휘핑까지 아주 파워풀하게 돌아갑니다. 매장에 반죽기 늘리면서 여분으로 보관하다 정리합니다.",
      priceInfo: "중고 판매가: 1,150,000원 (신품 정가 220만원)",
      participantsCount: 2,
      comments: [
        {
          id: "pc-u2-1",
          author: "일산동 빵돌이 사장",
          role: "Special Member",
          content:
            "스파 반죽기 기어 소음이나 벨트 상태는 어떤가요? 이상 없다면 내일 용달차 불러서 가져가고 싶어요.",
          date: "2026-06-01 19:40",
        },
        {
          id: "pc-u2-2",
          author: "중산베이커 사장",
          role: "Premium Member",
          content:
            "모터 파워 진국인 명품 반죽기죠! 좋은 매물 엄청 저렴하게 올리셨네요.",
          date: "2026-06-01 20:10",
        },
      ],
    },
    {
      id: "plaza-used-3",
      category: "used",
      title:
        "🤝 [무료나눔/커피교환] 에브리베이크 일자형 식빵 전용 팬 10개 나눔",
      content:
        "매장 제빵 메뉴 개편 및 단종으로 인하여 정성껏 세척/시즈닝해 둔 식빵 전용 테플론 코팅 팬 10개 일괄 무상 나눔합니다.",
      author: "서울 서대문구 빵맛집",
      date: "2026-06-01",
      location: "서울 서대문구",
      detailInfo:
        "테플론 골드 코팅 상태 80% 이상 준수합니다. 에브리베이크 명작 식빵 생지 전용 패닝 프레임에 제격입니다. 매장 방문 수령 선호하며, 정 마음에 드시면 매장에서 직접 내리는 아이스 아메리카노 한 잔만 쏴주세요!",
      priceInfo: "무료 나눔 (따뜻한 응원/커피 교환 희망)",
      participantsCount: 6,
      comments: [
        {
          id: "pc-u3-1",
          author: "연희동 식빵러 점주",
          role: "Special Member",
          content:
            "헐 대박! 저희 식빵팬 엄청 모자랐는데 연희동 매장이라 10분 내로 픽업 갈 수 있습니다! 아메리카노가 아니라 명품 에스프레소 세트로 사갈게요!! 제발 저 픽스 주세요!!",
          date: "2026-06-01 16:50",
        },
      ],
    },
    {
      id: "plaza-used-4",
      category: "used",
      title: "🤝 리치몬드 정품 6구 머핀팬 5세트 일상 잡화 일괄 처분",
      content:
        "녹 방지 도금 및 열전도율 최상의 리치몬드 머핀팬 5세트 일괄 가져가실 점주님 구합니다. 코팅 상태 우수.",
      author: "부산 해운대 브레드클럽",
      date: "2026-05-30",
      location: "부산 해운대구",
      detailInfo:
        "구움과자나 제과 사이드 메뉴 가동용으로 탁월합니다. 개별 판매 없이 5개 일괄 일체형으로 깔끔하게 정리합니다.",
      priceInfo: "5세트 일괄 30,000원",
      participantsCount: 2,
      comments: [
        {
          id: "pc-u4-1",
          author: "광안리 디저트짱 점주",
          role: "Special Member",
          content:
            "해운대 사장님! 혹시 반값택배나 우체국 착불 택배 거래도 대응해 주시나요? 가능하다면 당장 계좌 이체 드리겠습니다.",
          date: "2026-05-30 18:11",
        },
        {
          id: "pc-u4-2",
          author: "좌동 브레드 매니저",
          role: "Premium Member",
          content: "픽업 대기 순번 걸어봅니다. 직거래 15분 대기 가능해요.",
          date: "2026-05-31 09:40",
        },
      ],
    },
    {
      id: "plaza-used-5",
      category: "used",
      title:
        "🤝 [장비급매] 하프 업소용 제빙기 50kg (네오트 브랜드) 필터 서비스",
      content:
        "아이스 생산 기계 풀셋 교체 완료로 정상 조작 및 완전 분해 청소 세정 소독 완료한 안심 네오트 50kg 제빙기를 긴급 분양합니다.",
      author: "동성로 가나안 카페 점주",
      date: "2026-05-28",
      location: "대구 중구",
      detailInfo:
        "일일 제빵 구동에 든든한 최고 전력입니다. 노후 필터 무상으로 새것으로 갈아 끼워 둔 상태로 배관 케이블 풀 패키징 연결 상태로 출고 대기 중입니다.",
      priceInfo: "중고 할인가: 350,000원 (실작동 여부 즉각 현장 검증)",
      participantsCount: 4,
      comments: [
        {
          id: "pc-u5-1",
          author: "반월당 사장",
          role: "Premium Member",
          content:
            "내일 아침 9시에 SUV 스타렉스 동원해서 직공 수령하러 내려가도 될까요? 구매 확정입니다.",
          date: "2026-05-28 22:50",
        },
      ],
    },

    // Category 3: share (무료나눔/소분)
    {
      id: "plaza-share-1",
      category: "share",
      title:
        "🎁 [밀가루 소분나눔] 프랑스 에밀리아 T55 밀가루 분할 쉐어 (10kg 분할 선착순)",
      content:
        "가을 도매 통합 벌크 계약으로 입고된 국보급 프랑스 전용 밀가루 25kg 포대를 개봉했는데, 매장에서 다 소진하기 벅차서 깨끗한 지퍼백에 2kg씩 5명께 무상 소분 나눔합니다!",
      author: "성수 밀가루장인 점주",
      date: "2026-06-02",
      location: "서울 성동구",
      detailInfo:
        "크루아상이나 깜빠뉴 빵 표면 오밀조밀한 겹 레이어와 구운 풍미를 극한으로 높여 주는 최상급 T55 프랑스 원산지 유기농 밀가루입니다. 습한 기온에 뭉치지 않게 철저히 실리카겔 동봉하여 2kg씩 이중 밀봉 완료해 두었습니다. 매장에 오셔서 따뜻하게 받아가세요!",
      targetAmount: "총 5팩 분량 / 현재 4팩 매칭 완료 (잔여 1팩)",
      participantsCount: 4,
      comments: [
        {
          id: "pc-s1-1",
          author: "성수동 크로플 점주",
          role: "Special Member",
          content:
            "안녕하세요! 성수역 바로 옆 골목 매장인데 혹시 지금 수령하러 달려가도 될까요? 명장의 향기 가득한 T55 꼭 테스트해보고 싶었습니다!",
          date: "2026-06-02 11:20",
        },
        {
          id: "pc-s1-2",
          author: "성수 밀가루장인 점주",
          role: "Special Member",
          content:
            "네 그럼요 사장님! 카운터 파트 직원에게 '나의공간 소분나눔 밀가루' 수령하러 방문했다고 안내해주시면 바로 2kg 신선 팩 건네드릴게요. 조심히 오세요!",
          date: "2026-06-02 11:25",
        },
        {
          id: "pc-s1-3",
          author: "뚝섬 베이크하우스",
          role: "Special Member",
          content:
            "우와 정이 넘치시네요! 저도 한 팩 무조건 줄서봅니다. 브레이크 타임인 3시 전후로 픽업 가능할까요?",
          date: "2026-06-02 11:42",
        },
        {
          id: "pc-s1-4",
          author: "한양대 밀 사장",
          role: "Premium Member",
          content:
            "퀵 요금 제가 선불 부담하고 오토바이 편으로 보내주실 수 있나요? 남았다면 무조건 배차하고 싶습니다!",
          date: "2026-06-02 12:05",
        },
      ],
    },
    {
      id: "plaza-share-2",
      category: "share",
      title: "🎁 기한 넉넉한 최고급 프랑스 이즈니 버터 Block 3kg 분량 나눔",
      content:
        "구움과자 한정 기획 신메뉴 제조 후 남아 있는 미개봉 버터 덩어리들을 가맹 회원분들을 위해 위생 냉동 소분 분양합니다.",
      author: "서울 마포구 연남동 디저트랩",
      date: "2026-06-01",
      location: "서울 마포구",
      detailInfo:
        "유통기한 약 3주 정도 여유 있게 확보된 엘르앤비르/이즈니 1등급 고메 버터 블록입니다. 500g 블록 단위로 슬라이스 이중 포장 완료하여 총 6인분으로 혜택 돌립니다.",
      targetAmount: "나눔 6블록 / 현재 5블록 배정 완료 (잔여 1블록)",
      participantsCount: 5,
      comments: [
        {
          id: "pc-s2-1",
          author: "연남 빵순이 점주",
          role: "Premium Member",
          content:
            "이즈니 버터라니 눈물이 앞을 가립니다... 내일 오픈 준비 때 매장 잽싸게 들르겠습니다! 한 팩 찜해도 될까요?",
          date: "2026-06-01 17:35",
        },
        {
          id: "pc-s2-2",
          author: "망원 버터수급 사장",
          role: "Special Member",
          content:
            "완전 줄 서봅니다! 신메뉴 프리팩 생지 테스트 오븐에 구워 보는 용도로 알뜰하게 잘 쓰겠습니다.",
          date: "2026-06-01 18:10",
        },
      ],
    },
    {
      id: "plaza-share-3",
      category: "share",
      title: "🎁 [천연 바닐라 수입액] 엑스트랙트 500ml -> 50ml 소분 나눔 혜택",
      content:
        "베이킹 매니아 가맹점주 및 일반 홈베이커 동행 회원을 위한 최고급 천연 바닐라빈 엑스트랙 소분 병 나눔을 개시합니다.",
      author: "수원 영통구 슬로우 베이커",
      date: "2026-05-30",
      location: "경기 수원시",
      detailInfo:
        "정말 고급 향신료 향이 특징인 하이엔드 바닐라 엑기스입니다. 갈빛 유리 미니 소분 스포이드 박스병에 50ml씩 한 땀 한 땀 담아 두었습니다.",
      targetAmount: "나눔 가능 수량 10병 / 현재 8병 수령 매칭 완료",
      participantsCount: 8,
      comments: [
        {
          id: "pc-s3-1",
          author: "망포 베이클 베이커",
          role: "Special Member",
          content:
            "구움과자 풍미 유행의 구원자네요! 소중한 50ml 한 병 예약 확보할 수 있을까요?",
          date: "2026-05-30 20:30",
        },
      ],
    },
    {
      id: "plaza-share-4",
      category: "share",
      title: "🎁 유기농 건강 호밀 가루 5kg 깔끔 나눔 (호밀빵 베이킹 특화)",
      content:
        "독일산 프리미엄 호밀가루 벌크 포대를 유상 구매해 쓰고 소량이 남아, 밀 수입이 전면 소통되는 마당에 이웃 사장님들과 무상 나눔합니다.",
      author: "인천 송도 브레드웜 점주",
      date: "2026-05-29",
      location: "인천 연수구",
      detailInfo:
        "풍미가 아주 고소하고 천연 제효가 수월해 깜빠뉴나 사워도우 만무할 때 아주 탁월한 무지 사양의 밀가루입니다.",
      targetAmount: "나눔 완료",
      participantsCount: 2,
      comments: [
        {
          id: "pc-s4-1",
          author: "송도 1동 스마트 점주",
          role: "Special Member",
          content:
            "인근 송도 매장이라 저녁 퇴근 길에 귀하게 받아와서 손님 디저트 서비스 구울 때 유용하게 연출했습니다. 천사 같은 배려 진심 모십니다!",
          date: "2026-05-30 09:12",
        },
      ],
    },
    {
      id: "plaza-share-5",
      category: "share",
      title: "🎁 [마감완료] 키즈 베이킹용 무독성 스프링클 5종 종합세트 나눔",
      content:
        "가정의 달 키즈 파티 원데이 클래스 정기 세션을 마치고 완전히 밀폐 보존하고 있는 미국산 수입 컬러 초코 스프링클 종합 선물 웰컴 세트를 양도합니다.",
      author: "부산 동래구 쿠키아웃",
      date: "2026-05-26",
      location: "부산 동래구",
      detailInfo:
        "총 1.5kg 상당이며 유라시아 프리미엄 코팅으로 오븐에 직접 구워도 원형 및 선명한 발색이 잘 보존되는 무독성 프리미엄 시럽 스프링클입니다.",
      targetAmount: "배송 수령 완전 완료",
      participantsCount: 1,
      comments: [
        {
          id: "pc-s5-1",
          author: "온천장 브레드 사장",
          role: "Special Member",
          content:
            "사장님 배려 덕에 우리 가맹점 찾아준 주말 꼬마 단골 손님들에게 너무 예쁜 메론빵 데코레이션을 기증할 수 있었습니다. 최고의 나눔 감사드립니다!",
          date: "2026-05-27 10:45",
        },
      ],
    },

    // Category 4: job (긴급구인)
    {
      id: "plaza-job-1",
      category: "job",
      title:
        "🚨 [단기/긴급-SOS] 내일 오전 제빵보조 및 크루아상 샌드위치 포장 헬퍼 긴급 구인 (당일지급)",
      content:
        "매장 전담 메인 베이킹 부기사님이 갑작스러운 중증 독감 판정으로 병원에 응급 입원하게 되어, 야간 해동 작업 완료된 명인 생지들의 새벽 성형 및 샌드위치 포장 도울 급전을 무장합니다.",
      author: "압구정 몽소 점주",
      date: "2026-06-02",
      location: "서울 강남구",
      detailInfo:
        "근무 시간: 내일 (6/3) 오전 06:00 ~ 12:00 (단 6시간 수용). 업무 내용: 야간 도우컨디셔너 해동 완벽 완료된 고메 벌크 생지 패닝 정밀 레이아웃 배열 배치, 오븐 타이머 관리 보조, 다 구워진 치아바타와 식빵 한 김 식혀 샌드위치 커팅 치즈 주입 및 전면 개별 랩핑 포장. 제빵 기본 기초가 있으신 학우분이나 동료 사장님들의 유경력자 구원의 조력을 긴급히 모십니다!",
      targetAmount: "모집 인원: 1명 / 예약 정원 투입 협의 조율 중",
      priceInfo:
        "시급 13,000원 상당 (총 6시간 가동 기준, 즉시 당일 퇴근 일시 이체 78,000원)",
      participantsCount: 3,
      comments: [
        {
          id: "pc-j1-1",
          author: "강남구 제빵학도",
          role: "Junior Baker",
          content:
            "안녕하세요! 압구정 한림 파티세리 소속 교육과정 1년차 수료생입니다! 내일 다행히 개인 연차 휴무라 새벽 시간 비어있는데 바로 오븐 다루고 포장 기계 세팅 완벽 도와드릴 수 있습니다!",
          date: "2026-06-02 14:15",
        },
        {
          id: "pc-j1-2",
          author: "압구정 몽소 점주",
          role: "Special Member",
          content:
            "앗! 정말 하늘에서 내려 온 구세주 같은 학생분이시군요! 압구정역 3번 출구 바로 앞 매장입니다. 오픈카카오톡 채널로 가벼운 이력 문자 하나만 남겨 주시면 당장 내일 새벽 조율 확정하여 출근 카드 기입해 놓겠습니다!",
          date: "2026-06-02 14:22",
        },
        {
          id: "pc-j1-3",
          author: "대치 브레드보조",
          role: "Senior Baker",
          content:
            "오성급 가맹 호텔 주방보조 출신 경력자입니다. 혹시 위에 계신 학도분 일정에 펑크 발생하거나 돌발 대비용 서브 비상 수단으로 번호 쪽지 전송해 둡니다. 필요시 연락 바랍니다!",
          date: "2026-06-02 14:40",
        },
      ],
    },
    {
      id: "plaza-job-2",
      category: "job",
      title:
        "🚨 [오늘 야간] 위생 안심 가동을 위한 오븐 2대 내부 정밀 고온 스팀 세척 헬퍼 (초보가능)",
      content:
        "식약처 위생 평가 시즌 대비하여, 고온 카본 찌든 때 지우는 고열 오븐 세척 및 냉장 쇼케이스 내부 필터 탈탈 털이 3시간 집중 헬퍼 단기 구인합니다.",
      author: "마포구 서교동 프랑스베이커리",
      date: "2026-06-01",
      location: "서울 마포구",
      detailInfo:
        "시간: 오늘 밤 21:00 ~ 24:00 (야간 3시간 가동). 보호 안경과 고무장갑, 고성능 친환경 탈산 세제는 전면 지급해 드립니다. 땀 한 바가지 시원하게 빼고 퇴근 빵 세트와 함께 일당 계좌로 두둑히 당장 보장해 드립니다.",
      priceInfo: "3시간 가동 일급 50,000원 즉시 보증",
      participantsCount: 2,
      comments: [
        {
          id: "pc-j2-1",
          author: "신촌 매니아",
          role: "Baker Friend",
          content:
            "군필자 체력 넘쳐납니다! 청소랑 뒤풀이 찌든 이물질 밀어내는 작업은 전문가 수준으로 확실히 비워낼 수 있습니다. 연락처 문자 드렸습니다!",
          date: "2026-06-01 18:40",
        },
        {
          id: "pc-j2-2",
          author: "이대 고인물",
          role: "Baker Friend",
          content:
            "손 진도 엄청 빠릅니다. 오븐 전해 가동 경험 풍부해요. 혹시 정원 다 찼나요?",
          date: "2026-06-01 19:10",
        },
      ],
    },
    {
      id: "plaza-job-3",
      category: "job",
      title:
        "🚨 [주말 대타] 토/일 오전 피크타임 쇼케이스 정돈 및 간편 포스 대타 소방수 모집",
      content:
        "사전 지정된 기존 주말 아르바이트생의 개인 관혼상제 연도 사정으로 이틀 동안 오전 피크 타임 매장 서빙 및 계산대 보조 급하게 수배합니다.",
      author: "서울 관악구 샤로수 베이크",
      date: "2026-05-31",
      location: "서울 관악구",
      detailInfo:
        "토요일, 일요일 양일간 08:00 ~ 14:00 (각 6시간씩 근무). 포스 계산 및 에브리베이크 장비에서 갓 구워져 나오는 크로와상들 쇼케이스 정밀 핀셋 배열 작업만 해주시면 됩니다.",
      priceInfo: "시급 11,000원 정산 지급",
      participantsCount: 4,
      comments: [
        {
          id: "pc-j3-1",
          author: "서울대입구 자취러",
          role: "Junior Clerk",
          content:
            "에브리베이크 메론빵 전문 계산 가맹점 근무 경력 8개월 정도 있습니다! 포스기 연동 버튼이랑 오븐 타이머 알람 즉시 캐치 가능해요. 주말 양일 전 타임 시원하게 지원합니다!",
          date: "2026-05-31 16:30",
        },
      ],
    },
    {
      id: "plaza-job-4",
      category: "job",
      title:
        "🚨 [천안] 6월 5일 단체 단팥빵 500알 패닝 및 포앙 보틀 보조 긴급 서포터 모집",
      content:
        "인근 고등학교 정기 중간고사 깜짝 간식 단체 발주 500세트를 수주받아, 전력 투구 일손이 딱 빵 반죽 계량 보탬 한 분 원합니다.",
      author: "충남 천안 뚜쥬루골목 점주",
      date: "2026-05-30",
      location: "충남 천안시",
      detailInfo:
        "근무 시간: 오전 07:00 ~ 13:00 (6시간). 숙련자분이 오셔서 정밀 성형을 한 손으로 짱짱하게 도와주시면 천안 최고 호두파이랑 명인 소금빵 보답 팩도 무상 포장해 드립니다.",
      priceInfo: "일당 85,000원 퇴근 즉시 정산 보장",
      participantsCount: 2,
      comments: [
        {
          id: "pc-j4-1",
          author: "천안 단대생 제빵인",
          role: "Junior Baker",
          content:
            "시간 딱 수용 가능합니다. 성형이랑 호두 계량 성실하고 정확하게 해낼게요. 믿어주십시오!",
          date: "2026-05-30 19:42",
        },
      ],
    },
    {
      id: "plaza-job-5",
      category: "job",
      title:
        "🚨 내일 디저트 카페 갓 오픈 전초 기지 청소 및 바이브 레이아웃 기물 세팅 조력",
      content:
        "새로운 오렌지 감각 인테리어를 마친 매장 창틀 유리 닦기와 정수 필터 구배 라인 배수 호스 결착 체크를 가볍게 돕는 단기 보조 일손 구해요.",
      author: "대전 서구 둔산카페 사장",
      date: "2026-05-28",
      location: "대전 서구",
      detailInfo:
        "노동 강도 아주 낮으며, 08:00 ~ 11:00 (단 3시간). 음료 전력 원두 세팅 에스프레소 시음도 넉넉하게 가능합니다.",
      priceInfo: "3시간 깔끔 일급 40,000원",
      participantsCount: 3,
      comments: [
        {
          id: "pc-j5-1",
          author: "탄방동 빵러버",
          role: "Baker Friend",
          content:
            "개점 축하드립니다! 기물 옴기기 및 포장 봉투 접기 제 역할 야무지게 해드릴게요. 당장 가능!",
          date: "2026-05-28 20:15",
        },
      ],
    },

    // Category 5: interior (인테리어 견적)
    {
      id: "plaza-interior-1",
      category: "interior",
      title:
        "🛠️ [견적요청] 12평 소형 베이커리 매장 도우컨 제빵실 유리 칸막이벽 및 급배수 연장 시공",
      content:
        "이번에 에브리베이크 나의공간을 통해 스마트 도우컨디셔너 대형 1대와 스마트 로터리 터치 오븐을 동시 추가 도입하게 되었습니다. 매장 안전 공간 확보를 위해 뒤편에 투명 강화유리 가벽 칸막이를 슬라이딩 도어 형태로 세우고 파워 업 배수라인 연장 공사 전문가 사장님들의 견적을 시원하게 소환합니다.",
      author: "용산 크루아상팩토리 사장",
      date: "2026-06-02",
      location: "서울 용산구",
      detailInfo:
        "총 전용면적 약 12평이며, 이 중 제빵 연구용 가용 공간 3.5평을 가벽으로 레이아웃 구획하고자 합니다. 바닥 타일은 방수 전용 세라믹 논슬립 타일 덧방 처리가 필요하며 오븐 가동 시 누전 차단 및 배수 찌꺼기 거름 호스 고정 배관 작업이 필수적입니다. 희망 예산은 가용 한계치 350만원 이하로 책정하고 있고, 손님 영업에 영향이 가지 않도록 다음 주 평일 야간 공사 세션(20시 ~ 익일 새벽 4시)으로 컴팩트 완료되길 원합니다. 오셔서 견적 가득 남겨 주십시요!",
      urgentsInfo:
        "예산 한계: 350만원 이내 부가세 포함 / 시공 희망일: 6월 중순 평일 야간 기동 가늠",
      participantsCount: 3,
      comments: [
        {
          id: "pc-i1-1",
          author: "🔧 공간디자인 연우 (시공전문)",
          role: "인테리어 전문업체",
          content:
            "안녕하세요 사장님! 서울 전역 상업 공간 요식업 설비 및 방수 가벽 시공을 15년째 집도하고 있는 '공간디자인 연우'입니다. 에브리베이크 콤보 오븐 및 밀 가습용 스마트 배수관 오차 없는 슬라이딩 3연동 섀시 시공을 기 당사 매장 제휴 가맹 8회 시공 경험으로 눈감고도 완벽 규격 밀착해 드릴 수 있습니다! 매장 도면 기본 CAD 레이아웃 시안 무료 서비스 제공 드립니다. 010-3323-XXXX 로 편안하게 콜이나 문자 주시면 즉시 내일 오전 사장님 둔산/용산 매장에 방문하여 공사 실측 해드리고, 마진 일체 비워내어 총합 320만원선(부가세 포함, 친환경 자재 마감)으로 깔끔하게 한밤중 야간 무소음 철거 완공 보장 드리겠습니다. 연락 부탁드립니다!",
          date: "2026-06-02 12:45",
        },
        {
          id: "pc-i1-2",
          author: "🛠️ 탑클래스 인테리어 기획",
          role: "상업시공업체",
          content:
            "용산구 한남 삼각지 현장 상주 중인 상업 인테리어 직영 시공팀 탑클래스입니다! 방수 조적 시공 및 세라믹 타일 덧방, 12mm 통강화유리 가벽 스틸 마감까지 하여 290만원 초특급 가성비 완공으로 마감 단차 1mm 하자 없이 책임 시공해 놓겠습니다! 포트폴리오 문자 전송 드렸으니 당장 협의 주십시요. (010-4491-xxxx)",
          date: "2026-06-02 13:01",
        },
        {
          id: "pc-i1-3",
          author: "📐 라온 하이브 디자인 대표",
          role: "설계전문업체",
          content:
            "도우컨디셔너 작동 시 순간 전력 배선 차단 트립과 고열 환풍 닥트 시로코팬 교차 기계 결합부 마감 불량이 화재 원인이 되곤 합니다. 저희는 전기안전 배선 자격증 및 소방 면허 전문 엔지니어가 포함되어 안심 구조로 원활하게 세팅해 드립니다. 카카오톡 제안서 발송해 드렸습니다!",
          date: "2026-06-02 13:20",
        },
      ],
    },
    {
      id: "plaza-interior-2",
      category: "interior",
      title:
        "🛠️ 5평 테이크아웃 전문점 합판 목공 카운터 대차 및 아크릴 간판 시공 견적",
      content:
        "자작나무 친환경 목재로 베이킹 쇼케이스 3단 하중 버티는 수공 카운터를 커스텀 제작하고, 외벽 전면에 분위기 좋은 에브리베이크 오렌지 아크릴 큐브 간판 부착 견적 요청합니다.",
      author: "서울 서초구 신상 디저트 사장",
      date: "2026-06-01",
      location: "서울 서초구",
      detailInfo:
        "아주 작은 소형 공간이나 손님 시선 초입 파사드가 가장 중요합니다. 카운터에는 내부 대용량 생지 보틀 냉장고가 들어갈 수 있게 슬롯 타공이 필요합니다.",
      urgentsInfo: "예산선: 500만원 내외 / 6월 이내 정식 완공 대기",
      participantsCount: 2,
      comments: [
        {
          id: "pc-i2-1",
          author: "🔧 테라디자인 목공소",
          role: "가구인테리어업체",
          content:
            "안녕하세요! 자작나무 합판 무독성 독일제 바니시 마감 가구 전문 제작팀 테라디자인입니다. 하부 빌트인 슬롯 매립 구조 설계에 능통하오니 연락주세요! 견적 450만원 선 조율 가능합니다.",
          date: "2026-06-01 10:45",
        },
        {
          id: "pc-i2-2",
          author: "🛠️ 우드스페이스",
          role: "가구인테리어업체",
          content:
            "최저 단가 정밀 시공 약속합니다! 쇼케이스 습기 누출 차단 단열 가공 포함 시방서 무료 제공 드리겠습니다.",
          date: "2026-06-01 11:15",
        },
      ],
    },
    {
      id: "plaza-interior-3",
      category: "interior",
      title:
        "🛠️ 오래된 전통 동네 빵집 중앙 바닥 논슬립 테라조 데코타일 8평 전면 시공",
      content:
        "기존 가루와 물기로 군데군데 때가 끼고 낡아 미끄러운 저가 장판 데코타일 8평분을 깔끔하게 다 걷어내고 내수성과 청결 전반에 기여하는 최고급 테라조 바닥 타일 시공 견적 구합니다.",
      author: "강원 춘천 브레드메이킹 점주",
      date: "2026-05-30",
      location: "강원 춘천시",
      detailInfo:
        "기존 점포 내부 쇼케이스들은 바닥 단차 받침대로 그대로 두고, 빵집 동선 라인만 야간에 깔끔하게 데코타일 전문 덧방 칼 마감 해주실 유능한 동네 전문가 사장님 우대합니다.",
      urgentsInfo: "희망 견적가: 120만원 내외 부가세 포함",
      participantsCount: 2,
      comments: [
        {
          id: "pc-i3-1",
          author: "🛠️ 강원타일 일체",
          role: "지역 타일업체",
          content:
            "춘천 시내 퇴게동 자재창고 보유 업체입니다! 번거로운 가구 이동 최소화하고 바닥 덧방 기준 친환경 이태리 프렐 아크릴 수성 접착제 가동하여 110만원에 올 마감 야간 원데이 처리해 드릴게요!",
          date: "2026-05-30 16:45",
        },
      ],
    },
    {
      id: "plaza-interior-4",
      category: "interior",
      title:
        "🛠️ 주방 열기 및 빵 굽는 습기 배출용 시로코팬 환풍기 1.5마력 업그레이드 연장 설치",
      content:
        "터치 오븐 연속 동작 시 배출되는 오븐 위 연기가 기존 팬으론 순환이 부족합니다. 시로코팬 1.5마력 최상 압력 모터로 증설하고 연장 배관 벽을 밖으로 3미터 올리는 마력 구동 견적 원해요.",
      author: "경기 수원 인계베이커리 점주",
      date: "2026-05-29",
      location: "경기 수원시",
      detailInfo:
        "현 배관 라인이 노후화되어 진동 및 소음 차단 댐퍼 고무 패킹 추가 결착이 함께 필요합니다. 이웃 점포 불만 없도록 무소음 특수 팬 보강도 검토바랍니다.",
      urgentsInfo: "시공 예산: 90만원 내외",
      participantsCount: 2,
      comments: [
        {
          id: "pc-i4-1",
          author: "🔧 수원닥트공사 대장",
          role: "지역 닥트시공사",
          content:
            "수원 인계동 상주 인력입니다! 저소음 이중 날개 설계 1.5마력 시로코팬과 진동 흡수 완충 패드, 외벽 칼브럭 지지대 마감 등 올인원 패키징으로 정확하게 80만원에 배기량 최고로 맞춰 드릴게요!",
          date: "2026-05-29 18:20",
        },
      ],
    },
    {
      id: "plaza-interior-5",
      category: "interior",
      title:
        "🛠️ [부분도색] 영 디자이너 비주얼 프레임 파사드 웨인스코팅 웨스턴 오렌지 컬러 도색",
      content:
        "아주 노후된 기존 연갈색 하이샷시 프레임들을 에브리베이크 명품 시그니처 오렌지 칼라 및 매트한 샌드 브라운 수입 세라믹 코팅 페인트로 도장 및 매장에 세련된 유럽풍 감각을 채워 넣고 싶습니다.",
      author: "대구 수성구 버터멜로우",
      date: "2026-05-27",
      location: "대구 수성구",
      detailInfo:
        "외부 노출 페인팅이라 직사광선 및 눈비에 가볍게 일어나지 않는 친환경 웨더쉴드 유성 페인트 혹은 실외 전용 방수 세라믹 실리콘 혼합 도료 필수 사용 요청합니다.",
      urgentsInfo: "예산: 150만원 이하 / 당일 야간 시공 지양",
      participantsCount: 2,
      comments: [
        {
          id: "pc-i5-1",
          author: "🎨 컬러하우스 대구 직영점",
          role: "전문 도색 도장업체",
          content:
            "수성구 상가 외부 수입 팬톤 페이트 조색 전문 시공사 컬러하우스입니다! 파사드 샌딩 연마 전처리 확실히 한 후에 하도 프라이머 2회 및 야외 우레탄 탑코트 2회 완격 도장하여 세월이 흘러도 변색 없는 쨍한 에브리 오레지로 연출해 드릴게요. 견적 130만원 제안합니다.",
          date: "2026-05-27 15:40",
        },
      ],
    },
  ]);

  // States for Inquiries and Corporate Partnerships
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>([
    {
      id: "inq-01",
      company: "(주)프랑스 브레드 파트너스",
      manager: "장 미쉘 이사",
      category: "냉동 생지 납품 제안",
      details:
        "저희가 공급 중인 고메 올가닉 샤랑트 푸아투 AOP 버터 데니쉬 생지 라인업을 KCT의 스마트 유통망 및 오븐 코드 연동에 등록하고 싶습니다. 샘플 발송을 위한 절차 코드를 부탁드립니다.",
      date: "2026-05-26",
      status: "completed",
      answer:
        "제안 감사드립니다. 상세 제안 확인 후 KCT 글로벌 수입 MD가 기재해주신 유선 번호로 직접 유선 가이드를 발송해 드렸습니다. 당사 오븐 호환 스캔 테스트 절차에 감사드립니다.",
    },
    {
      id: "inq-02",
      company: "로스터즈 팩토리 코리아",
      manager: "김민혁 대리",
      category: "커피 원두 및 머신 제안",
      details:
        "콜롬비아 엘 파라이소 리치 무산소 발효 원두의 독점 대량 유통을 제안하고 싶습니다.",
      date: "2026-05-29",
      status: "reviewing",
      answer:
        "제안에 깊이 감사드립니다. 요청주신 특수 가공 원 원두 생두에 대해 KCT 신사업개발팀에서 단가 마진 수용성 시뮬레이션을 진행하고 있으며, 금주 수요일 최종 피드백을 전달하겠습니다.",
    },
  ]);
  const [inqCompany, setInqCompany] = useState("");
  const [inqManager, setInqManager] = useState("");
  const [inqCategory, setInqCategory] = useState("냉동 생지 납품 제안");
  const [inqDetails, setInqDetails] = useState("");
  const [inqPhone, setInqPhone] = useState("");
  const [showInqSuccessAlert, setShowInqSuccessAlert] = useState(false);
  const [selectedIngredientSubCat, setSelectedIngredientSubCat] = useState<
    "powder" | "liquid" | "fat" | "sugar" | "ferment" | "additive"
  >("powder");
  const [selectedCoffeeMainCat, setSelectedCoffeeMainCat] = useState<
    "machine" | "bean" | "barista"
  >("machine");
  const [selectedCoffeeSubCat, setSelectedCoffeeSubCat] =
    useState<string>("all");

  // Core micro-interaction states
  interface BreadClickParticle {
    id: number;
    x: number;
    y: number;
    emoji: string;
  }
  const [clickParticles, setClickParticles] = useState<BreadClickParticle[]>(
    [],
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionFadeState, setTransitionFadeState] = useState<
    "idle" | "in" | "out"
  >("idle");
  const [pendingView, setPendingView] = useState<string | null>(null);

  // Global mouse cursor-click satisfying bread sprinkle pop
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Choose random cute baking emojis
      const emojis = ["🍞", "🥐", "🥖", "🥯", "🥨", "🥞", "🧁", "🍩", "🍪"];
      const rEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      const newP: BreadClickParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: rEmoji,
      };

      // Keep only up to 15 particles in DOM to maintain perfect lighter weight footprint
      setClickParticles((prev) => [...prev.slice(-14), newP]);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // 2초마다 커뮤니티 상황판 실시간 로테이션 및 클릭 핸들러
  useEffect(() => {
    const buildPool = () => {
      const pool: any[] = [];
      communityPosts.forEach((p) => {
        pool.push({
          id: p.id,
          source: "community",
          category: p.category,
          title: p.title,
          content: p.content,
          author: p.author,
          date: p.date,
          votes: p.votes,
          status: p.status,
        });
      });
      plazaPosts.forEach((p) => {
        pool.push({
          id: p.id,
          source: "plaza",
          category: p.category,
          title: p.title,
          content: p.content,
          author: p.author,
          date: p.date,
          votes: p.hasOwnProperty("participantsCount")
            ? (p as any).participantsCount
            : 10,
          status: p.hasOwnProperty("targetAmount")
            ? (p as any).targetAmount
            : "공구 진행중",
        });
      });
      return pool;
    };

    const updateAndShuffle = () => {
      const p = buildPool();
      if (p.length === 0) return;

      // Shuffle array
      const shuffled = [...p].sort(() => 0.5 - Math.random());
      setShuffledLivePosts(shuffled);
    };

    updateAndShuffle();
  }, [communityPosts, plazaPosts]);

  useEffect(() => {
    if (shuffledLivePosts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentLiveIndex((prev) => (prev + 1) % shuffledLivePosts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [shuffledLivePosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % 2);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const handleLivePostClick = (post: any) => {
    if (post.source === "community") {
      setCurrentView("community");
      if (post.category === "trouble") {
        setActiveMainTab("trouble");
        setExpandedCommunityPostId(post.id);
      } else {
        setActiveMainTab("why-not-sell");
        setActiveCommTab(post.category);
      }
    } else if (post.source === "plaza") {
      setCurrentView("community");
      setActiveMainTab("flea-market");
      setActivePlazaTab(post.category);
      setSelectedPlazaPostId(post.id);
    }
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentView("events");
  };

  const handleDoughClick = (doughId: string) => {
    setSelectedDoughId(doughId);
    setCurrentView("dough-detail");
  };

  // Premium Page transition sequence with requested custom slogan and cute flying breads
  const handleNav = (viewId: string) => {
    // Reset payment success receipt when user navigates away to view another page
    setPaymentSuccessOrder(null);

    // Reset specific subcategory states back to initial defaults on navigating
    if (viewId === "dough-main") {
      setActiveDoughTab("master");
      setSelectedKoreaPin(null);
      setSelectedGlobalPin(null);
    } else if (viewId === "coffee") {
      setSelectedCoffeeMainCat("machine");
      setSelectedCoffeeSubCat("all");
    } else if (viewId === "ingredients") {
      setSelectedIngredientSubCat("powder");
    } else if (viewId === "events") {
      setSelectedEventId(null);
    } else if (viewId === "community") {
      setActiveCommTab("dough");
    }

    const majorCategories = [
      "equip-list",
      "ai-pos",
      "dough-main",
      "coffee",
      "ingredients",
      "community",
      "events",
    ];
    const isMajorNav = majorCategories.includes(viewId);

    if (isMajorNav) {
      if (isTransitioning) return;

      setPendingView(viewId);
      setTransitionFadeState("in");
      setIsTransitioning(true);

      // Smooth transition steps:
      // 1. Change active view and scroll instantly when overlay is fully black
      setTimeout(() => {
        setCurrentView(viewId);
        window.scrollTo({ top: 0, behavior: "instant" });

        // 2. Play transition exit screen fade-out after user reads the slogan
        setTimeout(() => {
          setTransitionFadeState("out");

          // 3. Fully complete transition cycle
          setTimeout(() => {
            setIsTransitioning(false);
            setTransitionFadeState("idle");
            setPendingView(null);
          }, 300);
        }, 1000);
      }, 350);
    } else {
      // Instant transition without delay or overlay screen for subcategories, details, or other helper views
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  // Setup synchronous maps triggers or active filters
  const selectedDough =
    CURATED_DOUGHS.find((d) => d.id === selectedDoughId) || CURATED_DOUGHS[0];

  // Map dough lists depending on categories
  const masterDoughs = CURATED_DOUGHS.filter((d) => d.category === "master");
  const globalDoughs = CURATED_DOUGHS.filter((d) => d.category === "global");

  // Tasty pick can filter customized or highly requested catalog items!
  const tastyPickDoughs = CURATED_DOUGHS.filter((d) => d.category === "tasty");

  // Dynamic products rendering depending on what tab is selected
  const getTabDoughs = () => {
    switch (activeDoughTab) {
      case "master":
        // Filter by map if interactive pins are clicked
        if (selectedKoreaPin) {
          return masterDoughs.filter((d) => d.id === selectedKoreaPin);
        }
        return masterDoughs;
      case "global":
        if (selectedGlobalPin) {
          return globalDoughs.filter((d) => d.id === selectedGlobalPin);
        }
        return globalDoughs;
      case "tasty":
        return tastyPickDoughs;
      default:
        return masterDoughs;
    }
  };

  // Evein login state handlers
  const handleLoginSuccess = (uid: string, sname: string) => {
    setIsLoggedIn(true);
    setUserId(uid);
    setUserStoreName(sname);
    setCurrentView("partner-portal");

    if (pendingCartItem) {
      setCartItems((prev) => {
        const existing = prev.find((c) => c.item.id === pendingCartItem.id);
        if (existing) {
          return prev.map((c) =>
            c.item.id === pendingCartItem.id
              ? { ...c, quantity: c.quantity + 1 }
              : c,
          );
        }
        return [...prev, { item: pendingCartItem, quantity: 1 }];
      });
      const addedName = pendingCartItem.name;
      setPendingCartItem(null);
      setCartOpen(true);
      setTimeout(() => {
        alert(
          `🔓 에베인 인증이 완료되었습니다!\n선택하셨던 [${addedName}] 상품이 장바구니에 자동 추가되었으며 바로 에베인 특별 혜택가로 주문 신청이 가능합니다.`,
        );
      }, 400);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId("");
    setUserStoreName("");
    setPendingCartItem(null);
    setCurrentView("home");
  };

  const handleAddToCartFromPortal = (item: any) => {
    const existingDough = CURATED_DOUGHS.find((d) => d.id === item.id);
    if (existingDough) {
      handleAddToCart(existingDough);
    } else {
      const virtualItem: DoughItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        masterName:
          item.category === "coffee"
            ? "에브리베이크 원두 가공소"
            : "에베인 명인 생지",
        region: "에베인 제휴",
        description: "에베인 회원 전용 원클릭 신선 수급 보장 상품",
        stockStatus: "in",
        statusText: "동기화 즉시 배송",
        barcode: `880${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        category: "global",
        subCategory: "soft",
        imageLabel: "📦 비주얼 에베인 신선 원재료",
        iconBg: "bg-amber-100/60",
        settings: {
          defrostTemp: 22,
          defrostTime: 30,
          fermentTemp: 28,
          fermentHumidity: 85,
          fermentTime: 45,
          bakeTemp: 180,
          bakeTime: 15,
          steam: true,
        },
      };
      handleAddToCart(virtualItem);
    }
  };

  // Cart operations
  const handleAddToCart = (item: DoughItem) => {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  // Generic custom cart item creator for special sections like Coffee or auxiliary items
  const handleAddCustomToCart = (
    id: string,
    name: string,
    price: number,
    iconBg: string,
    brand: string,
  ) => {
    const virtualDoughItem: DoughItem = {
      id,
      name,
      masterName: brand,
      region: "수입원",
      price,
      description: `${brand}에서 엄선하여 공급하는 에베인 회원 전용 특선 품목입니다.`,
      stockStatus: "in",
      statusText: "당일 즉시 공급 가능",
      barcode: `880${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      category: "global",
      subCategory: "soft",
      imageLabel: "📦 비주얼 원재료 보장",
      iconBg,
      settings: {
        defrostTemp: 0,
        defrostTime: 0,
        fermentTemp: 0,
        fermentHumidity: 0,
        fermentTime: 0,
        bakeTemp: 0,
        bakeTime: 0,
        steam: false,
      },
    };
    handleAddToCart(virtualDoughItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((c) => {
          if (c.item.id === id) {
            const nextQty = c.quantity + delta;
            return { ...c, quantity: nextQty };
          }
          return c;
        })
        .filter((c) => c.quantity > 0);
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleNotification = (id: string) => {
    setNotifications((prev) => {
      if (prev.includes(id)) {
        return prev.filter((nId) => nId !== id);
      }
      return [...prev, id];
    });
  };

  const handleRemoveNotification = (id: string) => {
    setNotifications((prev) => prev.filter((nId) => nId !== id));
  };

  const handleScanShortcut = (doughId: string) => {
    setOvenActiveDoughId(doughId);
    handleNav("equip-detail");
    // Ensure the simulator matches the chosen recipe and is ready
    setTimeout(() => {
      const simButton = document.getElementById(`sim-shortcut-${doughId}`);
      if (simButton) simButton.click();
    }, 100);
  };

  // Review handlers
  const handleAddEquipReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEquipAuthor.trim() || !newEquipContent.trim()) return;

    const review: Review = {
      id: `eqr-${Date.now()}`,
      author: newEquipAuthor.trim(),
      stars: newEquipStars,
      content: newEquipContent.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    setEquipReviews([review, ...equipReviews]);
    setNewEquipAuthor("");
    setNewEquipContent("");
    setNewEquipStars(5);
  };

  const handleAddDoughReview = (e: React.FormEvent, doughId: string) => {
    e.preventDefault();
    if (!newDoughAuthor.trim() || !newDoughContent.trim()) return;

    const review: Review = {
      id: `dr-${Date.now()}`,
      author: newDoughAuthor.trim(),
      stars: newDoughStars,
      content: newDoughContent.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const currentList = doughReviews[doughId] || [];
    setDoughReviews({
      ...doughReviews,
      [doughId]: [review, ...currentList],
    });
    setNewDoughAuthor("");
    setNewDoughContent("");
    setNewDoughStars(5);
  };

  // Feedback triggers
  const handleAddCoffeeComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoffeeAuthor.trim() || !newCoffeeContent.trim()) return;

    const comment: GeneralComment = {
      id: `cf-${Date.now()}`,
      author: newCoffeeAuthor.trim(),
      content: newCoffeeContent.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    setCoffeeFeed([comment, ...coffeeFeed]);
    setNewCoffeeAuthor("");
    setNewCoffeeContent("");
  };

  const handleVotePost = (id: string) => {
    if (!isLoggedIn) {
      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "error",
          message: "🔒 로그인이 되어야 아이디어를 추천할 수 있습니다!"
        } as any,
        ...prev,
      ]);
      return;
    }
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const alreadyVoted = post.votedByMe;
          const nextVotes = post.votes + (alreadyVoted ? -1 : 1);

          let nextStatus = post.status;
          if (nextVotes >= 50) {
            nextStatus = "MD 검토 완료 (입점 예정)";
          } else if (nextVotes >= 30) {
            nextStatus = "MD 검토 중";
          } else {
            nextStatus = "추천 대기";
          }

          return {
            ...post,
            votes: nextVotes,
            votedByMe: !alreadyVoted,
            status: nextStatus,
          };
        }
        return post;
      }),
    );
  };

  const handleAddCommunityPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommTitle.trim() || !newCommContent.trim() || !newCommAuthor.trim())
      return;

    const newPost: CommunityPost = {
      id: `cp-${Date.now()}`,
      category: activeCommTab,
      title: newCommTitle.trim(),
      content: newCommContent.trim(),
      author: newCommAuthor.trim(),
      date: new Date().toISOString().split("T")[0],
      votes: 1,
      status: "추천 대기",
      votedByMe: true,
      comments: [],
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewCommTitle("");
    setNewCommContent("");
    setNewCommAuthor("");
  };

  const handleAddCommunityComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommCommentText.trim() || !newCommCommentAuthor.trim()) return;

    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const comments = post.comments || [];
          return {
            ...post,
            comments: [
              ...comments,
              {
                id: `cm-c-${Date.now()}`,
                author: newCommCommentAuthor.trim(),
                content: newCommCommentText.trim(),
                date:
                  new Date().toISOString().split("T")[0] +
                  " " +
                  new Date().toTimeString().split(" ")[0].slice(0, 5),
              },
            ],
          };
        }
        return post;
      }),
    );
    setNewCommCommentText("");
    setNewCommCommentAuthor("");
  };

  const handleJoinPlazaPost = (postId: string) => {
    setPlazaPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const alreadyJoined = post.joinedByMe;
          const delta = alreadyJoined ? -1 : 1;
          const updatedComments = [...post.comments];
          if (!alreadyJoined) {
            updatedComments.push({
              id: `pc-join-${Date.now()}`,
              author: "나의공간 점주 (나)",
              role: "가맹회원",
              content:
                post.category === "coop"
                  ? "🙋‍♂️ 저 공동구매 참전하겠습니다! 물량 확보 부탁드립니다."
                  : post.category === "job"
                    ? "🙋‍♂️ 일정 확인 후 지원 문의 남겼습니다! 쪽지나 유선 연락 부탁드립니다."
                    : post.category === "used"
                      ? "🙋‍♂️ 제가 먼저 직거래 구매 예약 요청드립니다! 답변 기다리겠습니다."
                      : post.category === "interior"
                        ? "🙋‍♂️ 저희 매장 구조에 대해 상세 견적 및 실측 문의 드렸습니다."
                        : "🙋‍♂️ 저도 참여(신청) 신청합니다!",
              date: new Date().toISOString().replace("T", " ").substring(0, 16),
            });
          } else {
            // Remove the auto-joined comment
            const idx = updatedComments.findIndex(
              (c) =>
                c.author === "나의공간 점주 (나)" &&
                c.id.startsWith("pc-join-"),
            );
            if (idx !== -1) updatedComments.splice(idx, 1);
          }
          return {
            ...post,
            joinedByMe: !alreadyJoined,
            participantsCount: post.participantsCount + delta,
            comments: updatedComments,
          };
        }
        return post;
      }),
    );
  };

  const handleAddPlazaComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setNotifications((prev) => [
        {
          id: Date.now(),
          type: "error",
          message: "🔒 댓글 및 견적 작성을 하려면 로그인이 필요합니다!"
        } as any,
        ...prev,
      ]);
      return;
    }
    if (!newPlazaCommentText.trim()) return;
    const author = newPlazaCommentAuthor.trim() || "나의공간 점주 (나)";
    const newComment: PlazaComment = {
      id: `pc-comment-${Date.now()}`,
      author,
      role:
        author.includes("업체") ||
        author.includes("시공") ||
        author.includes("디자인")
          ? "인테리어 전문업체"
          : "가맹회원",
      content: newPlazaCommentText.trim(),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      isCustom: true,
    };

    setPlazaPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }
        return post;
      }),
    );
    setNewPlazaCommentText("");
  };

  const handleCreatePlazaPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlazaTitle.trim() || !newPlazaContent.trim()) return;

    const newPost: PlazaPost = {
      id: `plaza-post-${Date.now()}`,
      category: activePlazaTab as any,
      title: newPlazaTitle.trim(),
      content: newPlazaContent.trim(),
      author: newPlazaAuthor.trim() || "나의공간 점주",
      location: newPlazaLocation.trim() || "서울 마포구",
      date: new Date().toISOString().split("T")[0],
      priceInfo: newPlazaPriceInfo.trim() || "협의 제안",
      targetAmount: newPlazaTargetAmount.trim() || "제한 없음",
      urgentsInfo: newPlazaUrgentsInfo.trim() || "기타 사양 참조",
      joinedByMe: false,
      participantsCount: 0,
      votes: 1,
      comments: [],
      status: "모집중",
    } as any;

    setPlazaPosts((prev) => [newPost, ...prev]);

    // Reset inputs
    setNewPlazaTitle("");
    setNewPlazaContent("");
    setNewPlazaAuthor("");
    setNewPlazaLocation("");
    setNewPlazaPriceInfo("");
    setNewPlazaTargetAmount("");
    setNewPlazaUrgentsInfo("");

    setNotifications((prev) => [
      `💡 실시간 공구 보드가 가청 채널에 성공적으로 배포되었습니다.`,
      ...prev,
    ]);
  };

  const handleAddInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqCompany.trim() || !inqManager.trim() || !inqDetails.trim()) return;

    let autoReply = "안녕하세요 파트너님! 소중한 제안 기획서가 실시간 접수되었습니다. 기술 특허 및 스마트 온습도 연동 테스트 타당성 검사 진행 후 3영업일 이내 문자로 1차 실무 미팅 소집 일정을 연락드리겠습니다. 대단히 감사합니다.";
    if (inqCategory === "AI포스 도입문의") {
      autoReply = "안녕하세요 점주님! EveryBake AI POS 도입 문의가 실시간 접수되었습니다. 담당 기술 지원팀에서 영업장의 빵 진열 환경 및 저울 연동 설치 규격을 파악하여 즉각 연락드리겠습니다. 에브리베이크와 함께 스마트 매장 무인화 솔루션을 성공적으로 구축해 보세요! 대단히 감사합니다.";
    }

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      company: inqCompany.trim(),
      manager: inqManager.trim(),
      category: inqCategory,
      phone: inqPhone.trim(),
      details: inqDetails.trim(),
      date: new Date().toISOString().split("T")[0],
      status: "reception",
      answer: autoReply,
    };

    setSubmittedInquiries((prev) => [newInquiry, ...prev]);
    setShowInqSuccessAlert(true);

    // Reset inputs
    setInqCompany("");
    setInqManager("");
    setInqPhone("");
    setInqDetails("");

    setTimeout(() => {
      setShowInqSuccessAlert(false);
    }, 5000);
  };

  const normalizedSearchProducts = [
    ...CURATED_DOUGHS.map((d: any) => ({
      id: d.id,
      name: d.name,
      originType: "dough",
      categoryLabel: "생지",
      badge: d.region,
      subCategoryLabel: d.masterName,
      desc: d.description,
      price: d.price,
      detailDesc: "",
    })),
    ...COFFEE_DATA.map((c: any) => ({
      id: c.id,
      name: c.name,
      originType: "coffee",
      categoryLabel: "커피",
      badge: c.brandType,
      subCategoryLabel: c.subCategoryLabel,
      desc: c.description,
      price: c.price,
      detailDesc: "",
    })),
    ...INGREDIENTS_DATA.map((i: any) => ({
      id: i.id,
      name: i.name,
      originType: "ingredient",
      categoryLabel: "원부자재",
      badge: i.brandType,
      subCategoryLabel: i.subCategoryLabel,
      desc: i.description,
      price: i.price,
      detailDesc: "",
    })),
  ];

  const filteredSearchProducts = normalizedSearchProducts.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return false;
    return (
      p.name.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.subCategoryLabel.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  });

  const checkoutSubtotal = cartItems.reduce(
    (acc, c) => acc + c.item.price * c.quantity,
    0,
  );
  const checkoutDeliveryFee =
    checkoutSubtotal > 150000 || checkoutSubtotal === 0 ? 0 : 5000;
  const checkoutTotal = checkoutSubtotal + checkoutDeliveryFee;

  return (
    <div className="min-h-screen bg-[#FCFBFA] text-stone-900 pb-16 antialiased relative">
      {/* Pristine high-end minimalist B2B ambient layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#FCFBFA]">
        <div className="absolute inset-0 bg-[#FCFBFA]" />
      </div>

      <Header
        cartCount={cartItems.reduce((s, c) => s + c.quantity, 0)}
        onCartToggle={() => setCartOpen(!cartOpen)}
        currentView={currentView}
        onNav={handleNav}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        notifications={notifications}
        onRemoveNotification={handleRemoveNotification}
        allDoughs={CURATED_DOUGHS}
        isLoggedIn={isLoggedIn}
        onRedirectLogin={() => {
          setCurrentView("login");
          setCartOpen(false);
        }}
        userStoreName={userStoreName}
        onGoToCheckout={() => {
          setCurrentView("checkout-form");
          setCartOpen(false);
        }}
      />
      <main className={`${currentView === "home" ? "pt-0" : "pt-20"} font-sans relative z-10`}>
        {searchQuery.trim() !== "" ? (
          <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in text-left">
            <div className="flex justify-between items-center pb-4 border-b border-stone-200 mb-6">
              <h2 className="text-xl font-black text-stone-900">
                검색 결과 ({filteredSearchProducts.length}개)
              </h2>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-stone-500 hover:text-stone-900"
              >
                검색 초기화
              </button>
            </div>
            {filteredSearchProducts.length === 0 ? (
              <div className="py-20 text-center text-stone-400 font-bold">
                검색 결과가 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSearchProducts.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-stone-200 rounded-2xl p-4 hover:shadow-lg transition-all group flex flex-col justify-between"
                    >
                      <div>
                        {/* Tag badges */}
                        <div className="flex gap-2 items-center mb-3">
                          <span
                            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                              item.originType === "dough"
                                ? "bg-orange-50 text-[#f97316] border border-orange-100/50"
                                : item.originType === "coffee"
                                  ? "bg-amber-50 text-amber-800 border border-amber-100/50"
                                  : item.originType === "ingredient"
                                    ? "bg-stone-100 text-stone-750 border border-stone-200/50"
                                    : "bg-blue-50 text-[#2563eb] border border-blue-100/50"
                            }`}
                          >
                            {item.categoryLabel}
                          </span>
                          <span className="text-[9.5px] uppercase font-mono font-extrabold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-150">
                            {item.badge}
                          </span>
                        </div>

                        <h3 className="text-[15px] font-black text-stone-900 group-hover:text-[#f97316] transition-colors leading-snug mb-1 text-left">
                          {item.name}
                        </h3>
                        {item.subCategoryLabel && (
                          <div className="text-[10px] text-stone-400 font-extrabold tracking-wider uppercase mb-2 text-left">
                            {item.subCategoryLabel}
                          </div>
                        )}
                        <p className="text-xs text-stone-500 line-clamp-2 md:line-clamp-3 leading-relaxed mb-4 text-left font-sans font-medium">
                          {item.desc || item.detailDesc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                        <span className="text-sm font-black text-stone-900">
                          ₩{(item.price || 0).toLocaleString()}{" "}
                          <span className="text-[10px] text-stone-450 font-normal">
                            / 최소 단위
                          </span>
                        </span>
                        <button
                          onClick={() => {
                            handleAddToCart(item as any);
                            setNotifications((prev) => [
                              `🛒 ${item.name} 에베인 담기 완료`,
                              ...prev,
                            ]);
                          }}
                          className="flex items-center gap-1 py-1.5 px-3 bg-stone-900 hover:bg-[#f97316] text-white rounded-lg text-[10px] font-black tracking-wider transition-all cursor-pointer"
                        >
                          에베인 담기{" "}
                          <span className="font-extrabold text-sm ml-0.5 font-mono">
                            +
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            {paymentSuccessOrder !== null ? (
              <div className="max-w-xl mx-auto px-6 py-12 animate-fade-in text-center">
                <div className="bg-white rounded-3xl border border-stone-250/80 shadow-xl p-8 text-left space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />

                  <div className="text-center space-y-2 pb-2">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-250">
                      <Check className="w-6 h-6 stroke-[3px]" />
                    </div>
                    <h2 className="text-xl font-black text-stone-900 tracking-tight font-sans">
                      에베인 주문 및 결제 승인 완료
                    </h2>
                    <p className="text-[11px] text-stone-400">
                      발송 등록 및 회원 전용 스마트 레시피 동기화 대기상태
                    </p>
                  </div>

                  <div className="border-t border-dashed border-stone-200 pt-4 space-y-3.5 text-xs text-stone-700 font-sans">
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium font-sans">
                        주문 승인 번호
                      </span>
                      <span className="font-mono font-bold text-stone-900 select-all">
                        {paymentSuccessOrder.orderId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium font-sans">
                        등록 회원 성명/상호
                      </span>
                      <span className="font-black text-stone-900">
                        {paymentSuccessOrder.shopName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium font-sans">
                        회원 연락처
                      </span>
                      <span className="font-bold text-stone-900">
                        {paymentSuccessOrder.contact}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium font-sans">
                        희망 배송 도착일
                      </span>
                      <span className="font-black text-[#f97316] font-sans">
                        {paymentSuccessOrder.deliveryDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium font-sans">
                        결제 완료 일시
                      </span>
                      <span className="font-bold text-stone-800">
                        {paymentSuccessOrder.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium font-sans">
                        결제 거래 방식
                      </span>
                      <span className="font-bold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200 text-[10px]">
                        {paymentSuccessOrder.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-stone-200/60 pt-4 font-sans">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-2 font-sans">
                      물량 유통 공급 현황
                    </p>
                    <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3 text-[10px] text-stone-600 space-y-1.5 leading-relaxed font-sans">
                      <p className="font-bold text-stone-850 flex items-center gap-1 font-sans">
                        🚚 콜드체인 영하 18도 냉동탑차 배송
                      </p>
                      <p className="font-medium font-sans font-sans">
                        전국 주요 물류 기지 및 스마트 허브로부터 기온 맞춤 특송
                        탑차가 기획 배차됩니다. 스마트 기기 앱 동기화가
                        활성화되었으므로 원클릭 다운로드 레시피 가이드가
                        전송됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="border border-stone-200 bg-stone-50/50 p-4 rounded-2xl flex items-start gap-2.5 font-sans">
                    <Sparkles className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-[10px] font-extrabold text-[#f97316]">
                        KCT 스마트 전산 연계 플러그인
                      </p>
                      <p className="text-[9px] text-stone-500 leading-relaxed mt-0.5 font-medium font-sans">
                        본 가상 거래 정보는 EveryBake 및 KCT Smart Cloud 원장에
                        즉각 무선 동기화되어, 매장의 도우컨디셔너와 스마트
                        오븐에 발효 맞춤 온습도 레시피 프리셋이 자동 업그레이드
                        세팅됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-stone-200 pt-5 text-center font-sans">
                    <p className="text-stone-400 text-[10px] font-medium font-sans">
                      계약 실 청구액 (부가세 면세 혜택 자동 계상)
                    </p>
                    <p className="text-2xl font-black text-stone-950 mt-1 font-sans">
                      ₩ {paymentSuccessOrder.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPaymentSuccessOrder(null);
                    setCurrentView("partner-portal");
                  }}
                  className="mt-6 w-full py-3.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 hover:scale-101"
                >
                  <span>에베인 마이에베인 나의공간으로 돌아가기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* ==================================================== */}
                {/* 1. HOME VIEW                                        */}
                {/* ==================================================== */}
                {currentView === "home" && (
                  <div className="animate-fade-in font-sans">
                    {/* Premium Dynamic Split Presentation (High-End Sliding Paper & Minimalist Aesthetic) */}
                    <div className="w-full h-screen bg-stone-950 overflow-hidden relative flex flex-col md:flex-row border-b border-stone-850">
                      
                                          {/* Left Half: AI Dough Conditioner (Intelligent Hardware - Light Theme Gallery Showroom) */}
                      <motion.div 
                        onMouseEnter={() => setHoveredPanel("left")}
                        onMouseLeave={() => setHoveredPanel(null)}
                        onClick={() => setHoveredPanel("left")}
                        animate={{ 
                          width: isMobile ? "100%" : hoveredPanel === "left" ? "75%" : hoveredPanel === "right" ? "25%" : "50%" 
                        }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-1/2 md:h-full flex flex-col justify-between pt-24 pb-6 sm:pb-10 md:pb-14 lg:pb-16 px-6 sm:px-10 md:px-14 lg:px-16 relative group overflow-hidden border-b md:border-b-0 border-stone-200 cursor-pointer select-none bg-[#f5f3f0] z-10"
                      >
                        {/* Clean showroom soft lighting */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3f0]/20 via-transparent to-white/60 pointer-events-none z-10" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(249,115,22,0.04)_0%,transparent_70%)] pointer-events-none z-10" />

                        {/* Foreground actual 170cm Dough Conditioner image with a realistic soft shadow */}
                        <div className="absolute right-4 sm:right-8 md:right-12 lg:right-16 top-[10%] sm:top-[14%] md:top-[18%] h-[30%] sm:h-[36%] md:h-[40%] lg:h-[44%] z-20 flex items-end justify-center pointer-events-none">
                          <div className="relative h-full flex items-end">
                            {/* Realistic physical shadow base */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[85%] h-5 bg-black/15 filter blur-xl rounded-full" />
                            <motion.img
                              src={ovenImage}
                              alt="EVERYBAKE Professional 170cm AI Dough Conditioner"
                              animate={{ 
                                scale: hoveredPanel === "left" ? 1.05 : hoveredPanel === "right" ? 0.92 : 1,
                                y: hoveredPanel === "left" ? -8 : 0
                              }}
                              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                              className="h-full w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Middle: Title & Quick Actions */}
                        <div className="z-30 text-left my-4 sm:my-6 space-y-3">
                          <div className={`transition-all duration-500 ${hoveredPanel === "right" ? "opacity-30 scale-95 origin-left" : "opacity-100 scale-100 origin-left"}`}>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-stone-900 tracking-[0.18em] uppercase font-sans text-stone-900-force">
                              AI DOUGH <span className="font-semibold text-[#f97316] text-orange-force">CONDITIONER</span>
                            </h2>
                          </div>

                          <div className={`transition-all duration-500 ${hoveredPanel === "right" ? "opacity-0 scale-90 translate-y-2 pointer-events-none" : "opacity-100 scale-100 translate-y-0"}`}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNav("equip-list");
                              }}
                              className="inline-flex items-center gap-2 px-5 py-2.5 border border-stone-900/30 hover:border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-[10px] font-bold tracking-widest transition-all duration-300 rounded-full cursor-pointer mt-2 uppercase font-sans text-stone-900-force bg-[#f5f3f0]/60 backdrop-blur-xs"
                            >
                              <span>도우컨디셔너 자세히보기</span>
                              <ArrowRight className="w-3.5 h-3.5 text-[#f97316] text-orange-force" />
                            </button>
                          </div>
                        </div>

                        {/* Bottom: Signature Phrase (Strict User Requirement) */}
                        <div className={`z-30 mt-auto text-left pt-6 transition-all duration-500 border-t border-stone-300/60 ${hoveredPanel === "right" ? "opacity-20 scale-95 origin-left" : "opacity-100 scale-100"}`}>
                          <div className="space-y-1 select-none">
                            <div className="signature-title-1">
                              당신의 식탁
                            </div>
                            <div className="signature-title-2">
                              당신의 매순간.
                            </div>
                            <div className="signature-brand mt-4 flex items-center gap-2">
                              <span>에브리 베이크</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Right Half: Premium Master Dough Library (Curated Selection - Dark Atmospheric Theme) */}
                      <motion.div 
                        onMouseEnter={() => setHoveredPanel("right")}
                        onMouseLeave={() => setHoveredPanel(null)}
                        onClick={() => setHoveredPanel("right")}
                        animate={{ 
                          width: isMobile ? "100%" : hoveredPanel === "right" ? "75%" : hoveredPanel === "left" ? "25%" : "50%" 
                        }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        className="h-1/2 md:h-full flex flex-col justify-between pt-24 pb-6 sm:pb-10 md:pb-14 lg:pb-16 px-6 sm:px-10 md:px-14 lg:px-16 relative group overflow-hidden border-t md:border-t-0 border-stone-850 cursor-pointer select-none bg-stone-900 z-20 shadow-[-30px_0_60px_rgba(0,0,0,0.85)]"
                      >
                        {/* Background full-bleed image of master artisan handcrafting dough */}
                        <div className="absolute inset-0 z-0">
                          <motion.img
                            src={artisanBakerDetailImage}
                            alt="Master Baker Artisanal Dough Craft"
                            animate={{ 
                              scale: hoveredPanel === "right" ? 1.05 : 1,
                              filter: hoveredPanel === "left" ? "brightness(0.3) contrast(1.1)" : "brightness(0.55) contrast(1.15)"
                            }}
                            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {/* High-end luxurious gradient masks for flawless text contrast */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15 z-10 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/10 z-10 pointer-events-none" />
                        </div>

                        {/* Middle: Title & Quick Actions */}
                        <div className="z-30 text-left my-4 sm:my-6 space-y-3">
                          <div className={`transition-all duration-500 ${hoveredPanel === "left" ? "opacity-30 scale-95 origin-left" : "opacity-100 scale-100 origin-left"}`}>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-[0.18em] uppercase font-sans text-white-force">
                              MASTER <span className="font-semibold text-amber-400 text-amber-force">DOUGH</span>
                            </h2>
                          </div>

                          <div className={`transition-all duration-500 ${hoveredPanel === "left" ? "opacity-0 scale-90 translate-y-2 pointer-events-none" : "opacity-100 scale-100 translate-y-0"}`}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNav("dough-main");
                              }}
                              className="premium-dough-btn inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-widest rounded-full cursor-pointer mt-2 uppercase font-sans"
                            >
                              <span>프리미엄생지 자세히보기</span>
                              <ArrowRight className="w-3.5 h-3.5 text-amber-400 text-amber-force" />
                            </button>
                          </div>
                        </div>

                        {/* Spacer to keep flex layout consistent */}
                        <div className="mt-auto h-0" />
                      </motion.div>

                    </div>

                    {/* ==================================================== */}
                    {/* DYNAMIC DASHBOARD SECTIONS REQUIRED BY USER          */}
                    {/* ==================================================== */}
                    
                    {/* 1) 에베인 실시간 커뮤니티 상황 (Full Width 50:50 Screen-filled Premium Layout) */}
                    <div className="w-full min-h-screen bg-white text-stone-900 overflow-hidden relative flex flex-col md:flex-row border-b border-stone-150">
                      
                      {/* Left Column (Fixed area with gold & white minimalist aesthetic) */}
                      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center items-start text-left p-8 sm:p-16 md:p-20 lg:p-24 xl:p-28 bg-white relative">
                        <div className="max-w-md space-y-6 md:space-y-8 z-10">
                          <span className="text-stone-400 font-semibold tracking-[0.25em] text-[11px] uppercase block font-sans">
                            ✦ LIVE NETWORK STATUS
                          </span>
                          
                          <h2 className="text-3xl sm:text-4.2xl md:text-[42px] xl:text-[48px] font-light text-stone-900 leading-tight tracking-wide font-serif-warm">
                            에베인 실시간
                            <br />
                            <span className="text-stone-950 font-bold tracking-widest block mt-2">커뮤니티 상황</span>
                          </h2>
                          
                          <p className="text-stone-500 text-sm md:text-base leading-relaxed font-sans max-w-sm font-light tracking-wide">
                            베이커리 점주뿐만 아니라 카페 창업을 꿈꾸는 예비 창업가, 그리고 집에서 따뜻한 온기를 굽는 홈베이커까지 모두를 위한 열린 소통 공간입니다. 
                            번뜩이는 아이디어와 따뜻한 피드백이 교차하는 생생한 에베인들의 이야기를 확인해 보세요.
                          </p>

                          <div className="pt-4">
                            <button
                              onClick={() => {
                                setCurrentView("community");
                                setActiveMainTab("why-not-sell");
                              }}
                              className="inline-flex items-center justify-between px-8 py-3.5 border border-stone-900 hover:bg-stone-950 text-stone-900 hover:text-white text-xs sm:text-sm font-medium tracking-[0.15em] transition-all duration-300 uppercase cursor-pointer"
                              style={{ width: '240px' }}
                            >
                              <span>커뮤니티로 이동하기</span>
                              <span className="text-base font-light">→</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column (High-quality rustic photo with interactive floating live card) */}
                      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen relative overflow-hidden flex items-center justify-center p-6 sm:p-12 md:p-16">
                        {/* Background Baguettes/Bakery Image */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=1200" 
                            alt="Premium Baguettes on Rustic Table" 
                            className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
                            referrerPolicy="no-referrer"
                          />
                          {/* Soft overlay gradient to melt edges */}
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/20 via-transparent to-stone-950/30" />
                        </div>

                        {/* Centered Floating Glassmorphism Post Display */}
                        <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.18)] border border-white/50 flex flex-col justify-between min-h-[280px] md:min-h-[300px]">
                          {/* Top & bottom light gradient masking inside the rolling text wrapper */}
                          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/95 to-transparent rounded-t-3xl pointer-events-none z-10" />
                          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/95 to-transparent rounded-b-3xl pointer-events-none z-10" />

                          <div className="relative h-[180px] flex items-center w-full z-2 py-4">
                            {shuffledLivePosts.length === 0 ? (
                              <div className="text-stone-400 text-xs sm:text-sm font-light w-full text-center">
                                실시간 피드를 수집하고 있습니다...
                              </div>
                            ) : (
                              <AnimatePresence mode="wait">
                                {(() => {
                                  const post = shuffledLivePosts[currentLiveIndex % shuffledLivePosts.length];
                                  if (!post) return null;
                                  return (
                                    <motion.div
                                      key={post.id}
                                      initial={{ opacity: 0, y: 35, filter: "blur(5px)" }}
                                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                      exit={{ opacity: 0, y: -25, filter: "blur(2px)" }}
                                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                      onClick={() => handleLivePostClick(post)}
                                      className="w-full text-left cursor-pointer group flex flex-col justify-between h-full space-y-4"
                                    >
                                      <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                                          <span className={`px-2.5 py-0.5 rounded-full ${
                                            post.source === "plaza"
                                              ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                                              : "bg-orange-500/10 text-[#f97316] border border-[#f97316]/20"
                                          }`}>
                                            {post.source === "plaza"
                                              ? "🛒 알뜰 광장 공구"
                                              : `💡 ${post.category === "trouble" ? "고민 창구" : "입점 제안"}`}
                                          </span>
                                          <span className="text-stone-400">
                                            {post.date}
                                          </span>
                                        </div>

                                        <h3 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-[#f97316] transition-colors leading-snug tracking-wide line-clamp-1">
                                          {post.title}
                                        </h3>

                                        <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 tracking-wide">
                                          {post.content}
                                        </p>
                                      </div>

                                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                                        <div className="flex items-center gap-2">
                                          <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px] text-stone-600 font-bold border border-stone-200">
                                            {post.author.slice(0, 1)}
                                          </div>
                                          <span className="text-xs font-semibold text-stone-500 max-w-[120px] truncate">
                                            {post.author}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                          <span className="text-stone-400">👍 {post.votes}</span>
                                          <span className="bg-stone-50 text-stone-500 px-2 py-0.5 rounded text-[9px] font-medium border border-stone-150 max-w-[110px] truncate">
                                            {post.status}
                                          </span>
                                        </div>
                                      </div>
                                    </motion.div>
                                  );
                                })()}
                              </AnimatePresence>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2) 에베인 진행 중인 특별 이벤트 (Full Width 50:50 Screen-filled Premium Layout - Reversed) */}
                    <div className="w-full min-h-screen bg-white text-stone-900 overflow-hidden relative flex flex-col md:flex-row-reverse border-b border-stone-150">
                      
                      {/* Right Column (Fixed area with elegant white/stone minimalist aesthetic) */}
                      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen flex flex-col justify-center items-start text-left p-8 sm:p-16 md:p-20 lg:p-24 xl:p-28 bg-white relative">
                        <div className="max-w-md space-y-6 md:space-y-8 z-10">
                          <span className="text-stone-400 font-semibold tracking-[0.25em] text-[11px] uppercase block font-sans">
                            ✦ SPECIAL BENEFIT & PROMOTION
                          </span>
                          
                          <h2 className="text-3xl sm:text-4.2xl md:text-[42px] xl:text-[48px] font-light text-stone-900 leading-tight tracking-wide font-serif-warm">
                            놓치지 말아야 할
                            <br />
                            <span className="text-stone-950 font-bold tracking-widest block mt-2">에베인 특별 혜택</span>
                          </h2>
                          
                          <p className="text-stone-500 text-sm md:text-base leading-relaxed font-sans max-w-sm font-light tracking-wide">
                            베이커리 점주뿐만 아니라 카페 창업가, 그리고 나만의 홈베이킹 라이프를 즐기는 모든 에베인분들을 위해 준비된 시즌 이벤트와 특별 혜택을 소개합니다. 
                            매주 업데이트되는 정기 혜택전부터 다양한 아이디어가 교차하는 빵천하제일대회까지 자유롭게 즐겨보세요.
                          </p>

                          <div className="pt-4">
                            <button
                              onClick={() => {
                                setCurrentView("events");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="inline-flex items-center justify-between px-8 py-3.5 border border-stone-900 hover:bg-stone-950 text-stone-900 hover:text-white text-xs sm:text-sm font-medium tracking-[0.15em] transition-all duration-300 uppercase cursor-pointer"
                              style={{ width: '240px' }}
                            >
                              <span>이벤트 전체보기</span>
                              <span className="text-base font-light">→</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Left Column (Rustic photo with floating glassmorphism event card changing automatically) */}
                      <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen relative overflow-hidden flex items-center justify-center p-6 sm:p-12 md:p-16">
                        {/* Background Baker Work Table Image */}
                        <div className="absolute inset-0 z-0">
                          <img 
                            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200" 
                            alt="Premium Baker Baking Counter with Flour" 
                            className="w-full h-full object-cover brightness-[0.8] contrast-[1.05]"
                            referrerPolicy="no-referrer"
                          />
                          {/* Soft overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-stone-950/20 via-transparent to-stone-950/30" />
                        </div>

                        {/* Floating Glassmorphism Event Display */}
                        <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.18)] border border-white/50 flex flex-col justify-between min-h-[280px] md:min-h-[300px]">
                          {/* Soft gradient mask for sliding */}
                          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/95 to-transparent rounded-t-3xl pointer-events-none z-10" />
                          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-white/95 to-transparent rounded-b-3xl pointer-events-none z-10" />

                          <div className="relative h-[200px] flex items-center w-full z-2 py-4">
                            <AnimatePresence mode="wait">
                              {currentEventIndex === 0 ? (
                                <motion.div
                                  key="event-monday"
                                  initial={{ opacity: 0, y: 35, filter: "blur(5px)" }}
                                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                  exit={{ opacity: 0, y: -25, filter: "blur(2px)" }}
                                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                  onClick={() => handleEventClick("monday-day")}
                                  className="w-full text-left cursor-pointer group flex flex-col justify-between h-full space-y-4"
                                >
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-[#f97316] border border-orange-500/20">
                                        🥐 정기 특가전
                                      </span>
                                      <span className="text-stone-450 flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-stone-400" /> ~ 06.08(월) 오전 11시
                                      </span>
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-[#f97316] transition-colors leading-snug tracking-wide line-clamp-2">
                                      베스트 상품, 더 알뜰하게 ~33% 특가 🥐
                                    </h3>

                                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 tracking-wide">
                                      매주 월요일 찾아오는 고정 수혜 라인업! 최대 33% 할인 혜택과 10% 추가 다운로더블 쿠폰 기회를 절대 놓치지 마세요.
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                                    <span className="text-xs font-semibold text-stone-500">
                                      참여 대상: 에브리베이크 회원 누구나
                                    </span>
                                    <span className="text-[10px] bg-stone-950 text-white px-2.5 py-1 rounded-md font-bold group-hover:bg-[#f97316] transition-colors">
                                      혜택 받기 →
                                    </span>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="event-baking"
                                  initial={{ opacity: 0, y: 35, filter: "blur(5px)" }}
                                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                  exit={{ opacity: 0, y: -25, filter: "blur(2px)" }}
                                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                  onClick={() => handleEventClick("baking-king")}
                                  className="w-full text-left cursor-pointer group flex flex-col justify-between h-full space-y-4"
                                >
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                                        🏆 명예의 전당
                                      </span>
                                      <span className="text-stone-450 flex items-center gap-1">
                                        <Award className="w-3 h-3 text-indigo-400" /> 누적 심사 집계중
                                      </span>
                                    </div>

                                    <h3 className="text-base sm:text-lg font-bold text-stone-950 group-hover:text-indigo-600 transition-colors leading-snug tracking-wide line-clamp-2">
                                      제 3회 에브리베이크 빵천하제일대회 🏆
                                    </h3>

                                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 tracking-wide">
                                      에베인들의 독창적인 생지 쿠프 기법과 온도 레시피 꿀팁을 겨루는 시간! 상생지원금 바우처와 명예의 훈장을 득템하세요.
                                    </p>
                                  </div>

                                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                                    <span className="text-xs font-semibold text-stone-500">
                                      참여 대상: 점주, 예비 창업자, 홈베이커
                                    </span>
                                    <span className="text-[10px] bg-stone-950 text-white px-2.5 py-1 rounded-md font-bold group-hover:bg-indigo-600 transition-colors">
                                      도전 하기 →
                                    </span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* ==================================================== */}
                {/* 3. SHARED PROMOTIONS AND ADDITIONAL LOWER CONTENTS    */}
                {/* ==================================================== */}
                {currentView === "home" && (
                  <>
                    {/* 3) EVERYBAKE 추천상품 - 100% full-screen width luxurious museum layout */}
                    <div className="w-full bg-white py-24 border-b border-stone-150 overflow-hidden">
                      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
                        
                        {/* Left Branding/Title Section */}
                        <div className="w-full lg:w-[360px] shrink-0 flex flex-col justify-between py-4 text-left">
                          <div className="space-y-6">
                            {/* Spinning luxury badge */}
                            <div className="relative w-28 h-28 flex items-center justify-center">
                              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" style={{ animation: "spin 18s linear infinite" }}>
                                <path id="circleTextPath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                                <text className="text-[7px] font-black tracking-[0.22em] fill-stone-350 uppercase">
                                  <textPath href="#circleTextPath">
                                    BEST PRODUCT ✦ EVERYBAKE RECOMMENDED ✦ 
                                  </textPath>
                                </text>
                              </svg>
                              {/* Inner static luxury circle or icon */}
                              <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center">
                                <span className="text-sm">✦</span>
                              </div>
                            </div>

                            <div className="space-y-3 pt-2">
                              <h2 className="text-3.5xl sm:text-4.5xl font-black text-stone-900 tracking-tight leading-tight">
                                EVERYBAKE 추천상품
                              </h2>
                              <p className="text-stone-500 text-sm font-light leading-relaxed max-w-xs">
                                베스트 셀러에서 엄선한 최상급 시그니처 생지 라인업. 미술관에 온 듯 깊은 맛의 예술을 감상해 보세요.
                              </p>
                            </div>
                          </div>

                          <div className="pt-8 lg:pt-0 space-y-6">
                            {/* Sliders navigation buttons */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => {
                                  if (recommendScrollRef.current) {
                                    recommendScrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
                                  }
                                }}
                                className="w-12 h-12 rounded-full border border-stone-250 hover:border-stone-900 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (recommendScrollRef.current) {
                                    recommendScrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
                                  }
                                }}
                                className="w-12 h-12 rounded-full border border-stone-250 hover:border-stone-900 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>

                            {/* Scroll progress bar */}
                            <div className="w-full max-w-[200px] bg-stone-100 h-[3px] relative rounded-full overflow-hidden">
                              <div 
                                className="bg-stone-900 h-full absolute transition-all duration-500 rounded-full"
                                style={{ 
                                  width: `${100 / 5}%`, 
                                  left: `${(activeRecommendIndex / 5) * 100}%` 
                                }} 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Right Carousel Slider Area */}
                        <div className="flex-1 overflow-hidden relative">
                          <div 
                            ref={recommendScrollRef}
                            onScroll={() => {
                              if (recommendScrollRef.current) {
                                const { scrollLeft, scrollWidth, clientWidth } = recommendScrollRef.current;
                                const maxScroll = scrollWidth - clientWidth;
                                const ratio = maxScroll > 0 ? scrollLeft / maxScroll : 0;
                                const index = Math.min(4, Math.max(0, Math.round(ratio * 4)));
                                setActiveRecommendIndex(index);
                              }
                            }}
                            className="flex gap-8 overflow-x-auto scrollbar-none pb-6 pt-2 select-none scroll-smooth"
                          >
                            {[
                              {
                                id: "m-001",
                                imgUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
                                discount: "30%"
                              },
                              {
                                id: "g-002",
                                imgUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
                                discount: "15%"
                              },
                              {
                                id: "h-001",
                                imgUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
                                discount: "20%"
                              },
                              {
                                id: "h-006",
                                imgUrl: "https://images.unsplash.com/photo-1541119638723-c51cbe2262aa?auto=format&fit=crop&q=80&w=800",
                                discount: "25%"
                              },
                              {
                                id: "h-009",
                                imgUrl: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=800",
                                discount: "10%"
                              }
                            ].map((item, index) => {
                              const dough = CURATED_DOUGHS.find((d) => d.id === item.id);
                              if (!dough) return null;
                              return (
                                <div
                                  key={dough.id}
                                  onClick={() => handleDoughClick(dough.id)}
                                  className="w-[280px] sm:w-[340px] md:w-[380px] shrink-0 group flex flex-col justify-between text-left cursor-pointer transition-all duration-300"
                                >
                                  {/* Big Premium Image Card Container */}
                                  <div className="aspect-square w-full bg-stone-50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-stone-100 group-hover:shadow-lg transition-all duration-500">
                                    <img
                                      src={item.imgUrl}
                                      alt={dough.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                      referrerPolicy="no-referrer"
                                    />
                                    {/* Number luxury overlay */}
                                    <div className="absolute top-4 left-4 font-mono text-[11px] text-stone-400 font-medium tracking-widest bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-stone-100 shadow-2xs">
                                      {String(index + 1).padStart(2, '0')}
                                    </div>
                                    
                                    {/* Quick Info Hover Overlay */}
                                    <div className="absolute inset-0 bg-stone-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                  </div>

                                  {/* Bottom Details (Luxurious Minimal Text style) */}
                                  <div className="mt-5 space-y-2 flex flex-col justify-between flex-1">
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-stone-400 font-semibold tracking-wider block uppercase">
                                        {dough.masterName || "EveryBake Master"}
                                      </span>
                                      <h3 className="text-stone-900 text-sm sm:text-base font-bold leading-tight tracking-wide group-hover:text-stone-950 transition-colors line-clamp-1">
                                        {dough.name}
                                      </h3>
                                      <p className="text-stone-500 text-xs font-light leading-relaxed line-clamp-2 mt-1">
                                        {dough.description}
                                      </p>
                                    </div>

                                    {/* Price and Cart Row */}
                                    <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-2">
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-stone-400 line-through text-[11px] font-mono">
                                          {Math.round(dough.price * 1.35).toLocaleString()}원
                                        </span>
                                        <span className="text-stone-900 font-bold text-sm sm:text-base font-mono">
                                          {dough.price.toLocaleString()}원
                                        </span>
                                        <span className="text-red-500 font-bold text-xs sm:text-sm">
                                          {item.discount}
                                        </span>
                                      </div>

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAddToCart(dough);
                                        }}
                                        className="text-[11px] font-bold text-stone-900 hover:text-[#f97316] tracking-widest uppercase border-b border-stone-900 hover:border-[#f97316] pb-0.5 transition-all cursor-pointer"
                                      >
                                        CART
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Core B2B Category Navigation Grid - Redesigned as a luxury brand index */}
                    <div className="w-full bg-stone-50/40 py-24 border-b border-stone-150 text-left">
                      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16">
                        
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-stone-200">
                          <div className="space-y-2">
                            <span className="text-[10px] font-semibold tracking-[0.25em] text-stone-400 block uppercase">
                              ✦ INTEGRATED PORTFOLIO
                            </span>
                            <h3 className="text-2.5xl sm:text-3.5xl font-black text-stone-900 tracking-tight leading-tight">
                              플랫폼 전용 서비스 선택
                            </h3>
                          </div>
                          <p className="text-stone-500 text-xs sm:text-sm font-light max-w-md leading-relaxed">
                            에브리베이크의 검증된 브랜드들과 제휴 솔루션을 한자리에서 만나보세요. 
                            스마트 기기 연동부터 원부자재 유통망까지 빈틈없는 인프라를 제공합니다.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-px bg-stone-200 overflow-hidden rounded-2xl border border-stone-200 shadow-2xs">
                          
                          {/* 01. 도우컨디셔너 / 오븐 */}
                          <div
                            onClick={() => handleNav("equip-list")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">01</span>
                                <Cpu className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                도우컨디셔너 & 스마트 오븐
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                AI 기반 미세 발효 제어 지능
                                <br />
                                초정밀 스마트 베이킹 오븐 라인업
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                VIEW CATALOGUE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                          {/* 02. AI 스마트 포스 */}
                          <div
                            onClick={() => handleNav("ai-pos")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">02</span>
                                <Laptop className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                AI 스마트 포스 솔루션
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                스마트 기기 오븐 자동 연동 제어
                                <br />
                                기상예보 연계 당일 생산 예측 POS
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                ENTER SYSTEM <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                          {/* 03. 프리미엄 생지 */}
                          <div
                            onClick={() => handleNav("dough-main")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">03</span>
                                <Layers className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                프리미엄 생지 라이브러리
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                한국 제과 명장의 전통 레시피 생지
                                <br />
                                글로벌 명품 정통 콜드 유통 제품군
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                BROWSE PRODUCTS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                          {/* 04. 커피 원두 / 머신 */}
                          <div
                            onClick={() => handleNav("coffee")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">04</span>
                                <Sparkles className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                커피 원두 & 에스프레소 머신
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                에베인 전용 등급 스페셜티 직배송 원두
                                <br />
                                세계적 프리미엄 상업 에스프레소 기기
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                VIEW BRANDS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                          {/* 05. 원부자재 */}
                          <div
                            onClick={() => handleNav("ingredients")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">05</span>
                                <Award className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                베이킹 원부자재 홀세일
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                프리미엄 가루류, 가공 유지, 명품 프랑스 버터
                                <br />
                                초신선 유기농 직납 도매 전산 카탈로그
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                EXPLORE MATERIALS <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                          {/* 06. 에브리베이크 커뮤니티 */}
                          <div
                            onClick={() => handleNav("community")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">06</span>
                                <MessageSquare className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                에베인 상생 커뮤니티
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                전국 가맹 사장님들의 생산 노하우 교류
                                <br />
                                신품목 입점 정기 제안 및 민주적 온라인 투표
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                ENTER PLAZA <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                          {/* 07. 입점 및 제휴 문의 */}
                          <div
                            onClick={() => handleNav("inquiry")}
                            className="bg-white p-8 hover:bg-stone-50 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[220px]"
                          >
                            <div>
                              <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] text-stone-400 tracking-widest font-medium">07</span>
                                <Building2 className="w-5 h-5 text-stone-400 group-hover:text-stone-900 transition-colors" />
                              </div>
                              <h4 className="text-sm font-bold text-stone-900 mt-6 tracking-wide group-hover:text-stone-950 transition-colors">
                                파트너십 & 제휴 제안망
                              </h4>
                              <p className="text-[11px] text-stone-500 font-light mt-3 leading-relaxed">
                                글로벌 우수 공급사 신규 품목 등록
                                <br />
                                원자재 투명 상생 납품 정기 제안 채널
                              </p>
                            </div>
                            <div className="pt-6">
                              <span className="text-[10px] text-stone-400 font-semibold tracking-wider flex items-center gap-1 group-hover:text-stone-900 transition-all">
                                SUBMIT PROPOSAL <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>

                    {/* Mini Brand Highlights */}
                    <div className="bg-stone-950 py-12 text-white relative">
                      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div className="space-y-1">
                          <Award className="w-6 h-6 text-amber-500 mb-2 mx-auto md:mx-0" />
                          <h4 className="text-sm font-bold text-white">
                            100% 프리미엄 자산 보장
                          </h4>
                          <p className="text-xs text-stone-400 leading-relaxed">
                            불합리한 중간 유통 수수료나 과도한 추가 마진을
                            부과하지 않습니다. 전 부품 고급 스테인리스
                            하드웨어의 무손실 자산 인수를 확실하게 보장합니다.
                          </p>
                        </div>
                        <div className="space-y-1">
                          <ShieldCheck className="w-6 h-6 text-[#f97316] mb-2 mx-auto md:mx-0" />
                          <h4 className="text-sm font-bold text-white">
                            독점 제과명장 직속 체인
                          </h4>
                          <p className="text-xs text-stone-400 leading-relaxed">
                            명장들 및 전 세계 파트너사들과의 다이렉트 수화
                            라이센싱으로, 오직 급속 동결된 고밀도 프리미엄
                            원재료만을 당일 배송망을 통해 전달합니다.
                          </p>
                        </div>
                        <div className="space-y-1">
                          <Smartphone className="w-6 h-6 text-blue-500 mb-2 mx-auto md:mx-0" />
                          <h4 className="text-sm font-bold text-white">
                            정밀 모듈 소성 동기화
                          </h4>
                          <p className="text-xs text-stone-400 leading-relaxed">
                            동기화된 레시피 데이터와 포장지에 내장된 바코드를
                            전용 스마트 태그 스캐너에 비추는 즉시 최적 숙성·조합
                            파라미터가 디바이스에 전송 세팅됩니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* ==================================================== */}
                {/* AI POS VIEW (NEWLY ADDED CATEGORY & SIMULATOR)       */}
                {/* ==================================================== */}
                {currentView === "ai-pos" && (
                  <AiPosDetail
                    onBack={() => handleNav("home")}
                    onInquiry={() => handleNav("inquiry")}
                    posVoiceTranscript={posVoiceTranscript}
                    setPosVoiceTranscript={setPosVoiceTranscript}
                    posParsedItems={posParsedItems}
                    setPosParsedItems={setPosParsedItems}
                    posOvenSignalSent={posOvenSignalSent}
                    setPosOvenSignalSent={setPosOvenSignalSent}
                    posActiveStatus={posActiveStatus}
                    setPosActiveStatus={setPosActiveStatus}
                    posWeatherState={posWeatherState}
                    setPosWeatherState={setPosWeatherState}
                    isParsingVoice={isParsingVoice}
                    setIsParsingVoice={setIsParsingVoice}
                  />
                )}

                {/* ==================================================== */}
                {/* 2. EQUIPMENT LIST VIEW                               */}
                {/* ==================================================== */}
                {currentView === "equip-list" && (
                  <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 뒤로가기
                    </button>

                    <div className="mb-8 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb]">
                        KCT AI SMART DEVICE
                      </span>
                      <h1 className="text-3xl font-black text-stone-900 tracking-tight">
                        스마트 기기 라인업
                      </h1>
                      <p className="text-stone-500 text-sm">
                        대한민국 제과 명장의 숙성 발효 노하우와 수분율 데이터가
                        실시간으로 공급되는 스마트 하드웨어.
                      </p>
                    </div>

                    {/* Smart hardware product grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                      <div
                        onClick={() => {
                          setSelectedEquipId("eq-pro-01");
                          handleNav("equip-detail");
                        }}
                        className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:border-[#2563eb] hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-full"
                      >
                        <div className="w-full bg-[#f8fafc] rounded-2xl h-72 mb-6 flex items-center justify-center relative overflow-hidden group-hover:bg-blue-50/20 transition-colors">
                          <span className="absolute top-3 left-3 bg-[#2563eb] text-white text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase z-10">
                            KCT 독점판매
                          </span>

                          {/* Glowing light effect behind machine */}
                          <div className="absolute w-40 h-40 bg-blue-400/5 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                          <img
                            src={ovenImage}
                            alt="KCT Smart Pro (All-in-one)"
                            className="h-60 w-auto object-contain rounded-xl filter drop-shadow-md group-hover:scale-[1.02] transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563eb] text-[10px] font-bold">
                                <Cpu className="w-3.5 h-3.5 animate-pulse" /> AI
                                모듈 내장형 기기
                              </span>
                              <span className="text-stone-400 text-xs font-medium font-mono">
                                CODE: KCT-SM-PRO
                              </span>
                            </div>

                            <h3 className="text-lg font-black text-stone-900 group-hover:text-[#2563eb] transition-colors mb-2 text-left">
                              KCT 수직형 AI 도우컨디셔너+오븐 일체형 [Smart Pro]
                              (170cm)
                            </h3>

                            <p className="text-stone-550 text-xs leading-relaxed text-left">
                              좁은 1인 매장의 한계 공간을 혁신적으로 극복하는
                              170cm 초대형 수직 올인원 스테이션. 하부
                              도우컨디셔너(해동·발효)와 상부 오븐 모듈이 전용
                              통신 칩으로 바코드 데이터와 즉시 조정되는 명장
                              인증 하드웨어입니다.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                            <div className="flex flex-col text-left">
                              <span className="text-[10px] text-stone-400 font-bold uppercase">
                                에베인 회원 특가
                              </span>
                              <span className="text-base font-black text-stone-900 font-mono">
                                ₩ 6,500,000
                              </span>
                            </div>
                            <span className="text-xs font-bold text-[#2563eb] flex items-center gap-1 py-1.5 px-3 bg-blue-50 rounded-lg group-hover:translate-x-1 transition-transform">
                              상세 정보 및 시뮬레이터{" "}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Real second product card instead of teaser */}
                      <div
                        onClick={() => {
                          setSelectedEquipId("eq-mini-01");
                          handleNav("equip-detail");
                        }}
                        className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs hover:border-emerald-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-full"
                      >
                        <div className="w-full bg-emerald-50/15 rounded-2xl h-72 mb-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-emerald-50/30 transition-colors">
                          <span className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase z-10">
                            테이블탑 60cm 미니 모델
                          </span>

                          {/* Glowing light effect behind machine */}
                          <div className="absolute w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                          <div className="relative flex flex-col items-center justify-center w-full h-[180px]">
                            <KCTMiniOvenIllust
                              scale={0.72}
                              className="relative z-10 filter drop-shadow-lg group-hover:scale-[0.76] transition-transform duration-300"
                            />
                          </div>

                          <div className="absolute bottom-3 right-3 bg-emerald-100 text-emerald-800 text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-xs uppercase">
                            오븐 1단 + 도우컨 1단 (싱글 트레이)
                          </div>
                        </div>

                        <div className="space-y-3 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-[#10b981] rounded-full text-[10px] font-bold">
                                <Cpu className="w-3.5 h-3.5 animate-pulse text-emerald-500" />{" "}
                                AI 도우컨+오븐 (60cm)
                              </span>
                              <span className="text-stone-400 text-xs font-medium font-mono">
                                CODE: KCT-SM-MINI
                              </span>
                            </div>

                            <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-600 transition-colors mb-2 text-left">
                              KCT 미니 AI 도우컨디셔너+오븐 일체형 [Smart Mini]
                              (60cm)
                            </h3>

                            <p className="text-stone-550 text-xs leading-relaxed text-left">
                              1인 카페 카운터나 가정집 아일랜드 테이블 위에 완벽
                              배치되는 60cm 초컴팩트 스마트 오븐 스테이션.
                              도우컨디셔너 딱 1판(해동·발효)과 오븐 딱
                              1판(소성·스팀)의 초소형 싱글 트레이 구조로 공간
                              제약 없이 명장의 완벽한 레시피 숙성을 지원합니다.
                            </p>
                          </div>

                          <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                            <div className="flex flex-col text-left">
                              <span className="text-[10px] text-stone-400 font-bold uppercase">
                                에베인 회원 보급 특가
                              </span>
                              <span className="text-base font-black text-stone-900 font-mono">
                                ₩ 800,000
                              </span>
                            </div>
                            <span className="text-xs font-bold text-[#10b981] flex items-center gap-1 py-1.5 px-3 bg-emerald-50 rounded-lg group-hover:translate-x-1 transition-transform">
                              상세 정보 및 시뮬레이터{" "}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 3. EQUIPMENT DETAIL VIEW                             */}
                {/* ==================================================== */}
                {currentView === "equip-detail" && (
                  <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in font-sans">
                    {/* Minimalist Apple Breadcrumb navigation */}
                    <div className="flex justify-between items-center mb-10 pb-4 border-b border-stone-100">
                      <button
                        onClick={() => handleNav("equip-list")}
                        className="flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" /> 스마트 기기 목록
                      </button>
                      <div className="flex items-center gap-4 text-[11px] font-semibold text-stone-500">
                        <span className="text-stone-950 font-bold">
                          {currentDevice.name}
                        </span>
                        <span className="text-stone-300">|</span>
                        <span>{currentDevice.code}</span>
                      </div>
                    </div>

                    {/* High-end side-by-side 2-Column Product Detail Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full mb-16">
                      {/* Left Column: Premium Showpiece Image Gallery */}
                      <div className="lg:col-span-6 w-full">
                        <div className="w-full bg-stone-50 rounded-[40px] px-8 py-12 flex flex-col items-center justify-center relative overflow-hidden border border-stone-150/80 shadow-sm min-h-[500px]">
                          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

                          {/* Subtle luxurious background accent */}
                          <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200/5 rounded-full blur-[100px] pointer-events-none" />
                          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-300/5 rounded-full blur-[100px] pointer-events-none" />

                          {/* Refined Media Switcher Tabs */}
                          <div className="absolute top-6 left-6 z-15 flex bg-stone-200/60 backdrop-blur-sm p-1 rounded-xl border border-stone-200/50">
                            <button
                              onClick={() => setDetailMediaTab("product")}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tight transition-all cursor-pointer ${
                                detailMediaTab === "product"
                                  ? "bg-white text-stone-900 shadow-sm font-extrabold"
                                  : "text-stone-500 hover:text-stone-950 font-bold"
                              }`}
                            >
                              📷 제품 단독 외관
                            </button>
                            <button
                              onClick={() => setDetailMediaTab("fit")}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-tight transition-all cursor-pointer ${
                                detailMediaTab === "fit"
                                  ? "bg-white text-stone-900 shadow-sm font-extrabold"
                                  : "text-stone-500 hover:text-stone-950 font-bold"
                              }`}
                            >
                              🌟 매장 빌트인뷰
                            </button>
                          </div>

                          <div className="relative flex flex-col items-center w-full pt-10">
                            {detailMediaTab === "fit" ? (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full flex flex-col items-center justify-center"
                              >
                                <img
                                  src={kctActualOvenStoryImage}
                                  alt="Luxury Store Fitting"
                                  className="w-full h-auto max-h-[380px] md:max-h-[420px] object-cover rounded-3.5xl border border-stone-150/75 shadow-lg hover:scale-[1.01] transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="text-[10px] text-stone-400 font-extrabold tracking-wider uppercase font-mono mt-4 block">
                                  EveryBake Smart Kitchen Installation
                                </span>
                              </motion.div>
                            ) : (
                              <div className="relative flex flex-col items-center justify-center w-full min-h-[350px]">
                                {selectedEquipId === "eq-mini-01" ? (
                                  <div className="relative py-4 flex flex-col items-center justify-center min-h-[310px]">
                                    <KCTMiniOvenIllust
                                      scale={1.22}
                                      className="relative z-10 filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:scale-[1.25] transition-transform duration-500"
                                    />
                                    <div className="absolute -top-8 -right-8 bg-emerald-600 text-white text-[8px] font-black tracking-widest px-2.5 py-1 rounded shadow-md uppercase">
                                      Compact Single Tray System
                                    </div>
                                  </div>
                                ) : (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex flex-col items-center justify-center"
                                  >
                                    <img
                                      src={currentDevice.image}
                                      alt={`${currentDevice.name} Showpiece`}
                                      className={`w-auto object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.22)] hover:scale-[1.03] transition-transform duration-700 ease-out h-[400px] md:h-[580px] lg:h-[620px]`}
                                      referrerPolicy="no-referrer"
                                    />
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Key Details, Specification, and Purchase */}
                      <div className="lg:col-span-6 w-full space-y-6 text-left">
                        <div>
                          <span
                            className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest ${currentDevice.textAccent} mb-3 px-3 py-1 rounded-full border ${currentDevice.badgeColor} font-mono`}
                          >
                            {currentDevice.tag}
                          </span>

                          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-3">
                            {currentDevice.name}
                          </h1>

                          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 text-stone-700 text-[10px] font-bold`}
                            >
                              <Cpu
                                className={`w-3.5 h-3.5 animate-pulse ${currentDevice.textAccent}`}
                              />{" "}
                              AI 모듈 & 바코드 연동 탑재형 기기
                            </span>
                            <span className="text-stone-400 text-xs font-semibold font-mono">
                              {currentDevice.code}
                            </span>
                          </div>

                          <p className="text-stone-550 text-sm leading-relaxed font-semibold">
                            {currentDevice.desc}
                          </p>
                        </div>

                        {/* Key specs list */}
                        <div className="space-y-4 pt-2">
                          <h3 className="text-xs font-black text-stone-400 tracking-widest uppercase font-mono">
                            TECHNICAL SPECIFICATIONS
                          </h3>

                          <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
                            {currentDevice.specs.map((spec, specIdx) => (
                              <div
                                key={specIdx}
                                className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2"
                              >
                                <span className="text-[11px] font-bold text-stone-400 uppercase w-32 font-mono tracking-wider pt-0.5">
                                  {spec.title}
                                </span>
                                <div className="flex-1">
                                  <p className="text-xs font-bold text-stone-900">
                                    {spec.subtitle}
                                  </p>
                                  <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                                    {spec.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Purchase Area */}
                        <div className="bg-stone-50 rounded-2xl p-5 border border-stone-150/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div className="text-left w-full sm:w-auto">
                            <span
                              className={`text-[9px] font-black tracking-widest ${currentDevice.textAccent} uppercase font-mono block`}
                            >
                              PARTNER PRICING
                            </span>
                            <span className="text-xs text-stone-450 font-bold block mt-0.5">
                              에베인 회원 특별 회원가
                            </span>
                            <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono tracking-tight block mt-1">
                              ₩ {currentDevice.price.toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              handleAddCustomToCart(
                                currentDevice.id,
                                `${currentDevice.name} (All-in-one)`,
                                currentDevice.price,
                                `bg-blue-50 ${currentDevice.textAccent}`,
                                "KCT Systems",
                              )
                            }
                            className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs font-black rounded-xl cursor-pointer transition-all active:scale-95 shadow-md shadow-stone-800/20 h-11 flex items-center justify-center"
                          >
                            장바구니 담고 즉시 주문서 작성
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: APPLE-STYLE LINEAR STORYTELLING FLOW WITH MULTIPLE PREMIUM IMAGES */}
                    <div className="w-full py-16 border-t border-stone-200/70 space-y-24">
                      {/* AI 스마트제어 실물 도입 시연 영상 Section - Placed directly above the storytelling headers */}
                      <div className="max-w-4xl mx-auto px-4 sm:px-6">
                        <div className="text-center mb-10 space-y-2">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase text-blue-600 tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                            AI SMART CONTROL REAL VIDEO
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                            AI 스마트제어 실물 도입 시연 영상
                          </h2>
                          <p className="text-stone-500 text-xs font-light max-w-md mx-auto">
                            실제 베이커리에 가동되는 고정밀 온습도 관리와 일체형 컨트롤 시스템의 실제 제어 모습을 최고 화질로 확인해 보세요.
                          </p>
                        </div>

                        <div className="relative bg-[#0c0d12] rounded-[32px] overflow-hidden shadow-2xl border border-stone-200 aspect-video group">
                          <iframe
                            src="https://www.youtube.com/embed/mLZZ5pt3Zbc?autoplay=0&mute=1&loop=1&playlist=mLZZ5pt3Zbc&controls=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0"
                            title="AI 스마트제어 실물 도입 시연 영상"
                            className="w-full h-full border-0 absolute inset-0 opacity-95 text-[#0c0d12]"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          
                          {/* Inner overlay details to look professional */}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-stone-950/10 pointer-events-none" />
                          
                          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 z-10 pointer-events-none">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[9px] font-black tracking-widest text-[#22d3ee] font-mono">IoT ENGINE v3.4 ACTIVE</span>
                          </div>
                        </div>
                      </div>

                      {/* Introduction Header for Stories */}
                      <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
                        <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest font-mono">
                          BEAUTIFUL BAKING LIFE
                        </span>
                        <p className="text-3xl sm:text-4.5xl font-black text-stone-900 tracking-tight leading-tight">
                          모두를 위해 설계된
                          <br />
                          미식 기술의 심플한 따뜻함
                        </p>
                      </div>

                      {/* Story Stack - All Vertical (No side-by-side text/cols layout!) */}
                      <div className="space-y-28 max-w-4xl mx-auto">
                        {/* Item 1: EVERYBAKE Baker with image */}
                        <div className="space-y-6">
                          {/* Immersive centered image */}
                          <div className="w-full rounded-[32px] overflow-hidden bg-stone-50 border border-stone-150 shadow-xs">
                            <img
                              src={artisanBakerDetailImage}
                              alt="EVERYBAKE Master Baker"
                              className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          {/* Centered clean description stack */}
                          <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
                            <span className="text-[10px] font-extrabold text-[#f97316] uppercase tracking-widest block font-mono">
                              01 / PROFESSIONAL EVERYBAKE FIDELITY
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                              30년 제빵 명인의 손가락 끝 감각, 그대로
                              내재화됩니다
                            </h3>
                            <p className="text-stone-550 text-xs sm:text-sm leading-relaxed">
                              좋은 빵은 반죽의 은온과 구울 때 스며드는 미세
                              수분의 양에서 완벽함이 갈립니다. 전국구 명장이
                              가동을 통해 측정하던 발효 온습 곡선과 미세 수분
                              조절 설계 데이터를 디지털화하여, 초미풍 대류 팬과
                              세라믹 하우징 오븐이 최상의 한 판을 완성해 냅니다.
                            </p>
                          </div>
                        </div>

                        {/* Item 2: Premium Smart Technology with image */}
                        <div className="space-y-6">
                          {/* Immersive centered image */}
                          <div className="w-full rounded-[32px] overflow-hidden bg-stone-50 border border-stone-150 shadow-xs">
                            <img
                              src={kctActualOvenStoryImage}
                              alt="Premium Smart Baking Technology"
                              className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          {/* Centered clean description stack */}
                          <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
                            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block font-mono">
                              02 / PREMIUM SMART INTEGRATION
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                              최상급 프리미엄 도우 제어 기능의 스마트 하드웨어 통합
                            </h3>
                            <p className="text-stone-550 text-xs sm:text-sm leading-relaxed">
                              가장 편안하고 진보된 클라우드 연계 오븐 소성 환경을 누려보십시오. 
                              통합형 온도 및 전력 전송 제어를 기반으로 하여, 안전하고 정밀하게 오븐 상태를 통제하며,
                              B2B 사업장에 최적화된 하드웨어 동작 상태를 지켜냅니다.
                            </p>
                          </div>
                        </div>

                        {/* Item 3: Smart Oven with image */}
                        <div className="space-y-6">
                          {/* Immersive centered image */}
                          <div className="w-full rounded-[32px] overflow-hidden bg-stone-50 border border-stone-150 shadow-xs">
                            {selectedEquipId === "eq-mini-01" ? (
                              <div className="w-full min-h-[400px] bg-stone-50 py-16 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                                <KCTMiniOvenIllust
                                  scale={1.3}
                                  className="relative z-10 filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.35)] hover:scale-[1.33] transition-transform duration-500"
                                />
                              </div>
                            ) : (
                              <div className="w-full min-h-[450px] bg-[#fafafa] py-12 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                                <img
                                  src={currentDevice.image}
                                  alt={`${currentDevice.name} Actual Product`}
                                  className="w-auto h-[400px] object-contain filter drop-shadow-[0_32px_64px_rgba(0,0,0,0.18)] hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            )}
                          </div>
                          {/* Centered clean description stack */}
                          <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
                            <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block font-mono">
                              03 / INTELLIGENT SENSING ENVIRONMENT
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                              {selectedEquipId === "eq-mini-01"
                                ? "데스크톱 공간에서 구현되는 완벽한 일체형 발효 조절"
                                : "대기 환경까지 스스로 측정 조절하는 극도로 정교한 발효"}
                            </h3>
                            <p className="text-stone-550 text-xs sm:text-sm leading-relaxed">
                              {selectedEquipId === "eq-mini-01"
                                ? "미세 습도와 주위의 사소한 계절성 온도 편차를 스스로 계측 제어하여 실내 어느 곳에서든 최고의 도우 숙성 상태를 제공합니다. 컴팩트 테이블탑 오븐 & 도우컨디셔너 디자인으로 매장 공간은 극대화되고 주방 동선은 훨씬 여유로워집니다."
                                : "주변 미세 습도와 주위의 사소한 계절성 온도 격차를 스스로 파악하여 효모가 안전하고 충만하게 부풀어 오르는 환경을 성립시킵니다. 수직 일체형 스테이션 디자인으로 공간 배치는 극도로 심플해지고 주방 동선은 탁월하게 개조됩니다."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: RE-CONFIGURED SIMULATOR ZONE (스마트 베이커리 AI 관제판 + Mobile Notification Widget) */}
                    <div
                      className="w-full py-16 border-t border-stone-200/70"
                      id="smart-bakery-ai-panel"
                    >
                      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-blue-600 tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                          <Wifi className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                          INTELLIGENT IoT REALTIME DUAL-PLAY
                        </span>

                        <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                          스마트 베이커리 AI 관제판
                        </h2>

                        <p className="text-stone-550 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
                          선택하신 명장 생지의 통신 바코드를 활용해, 기기와
                          모바일 간 실시간 소통 및 정밀 온습도 변화 그래프를
                          직접 원격 주입 시뮬레이션해 보십시오.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left: The original (greatly integrated) Oven Simulator - Occupying 8 cols */}
                        <div className="lg:col-span-8 bg-white border border-stone-200/80 rounded-3xl overflow-hidden shadow-xs">
                          <OvenSim
                            doughs={CURATED_DOUGHS}
                            onSetSimulationDough={(dough) => {
                              setOvenActiveDoughId(dough.id);
                              // Trigger simulation alerts on mobile phone for smart feel
                              const alertBox = document.getElementById(
                                "mock-phone-alert-hub",
                              );
                              if (alertBox) {
                                alertBox.classList.add("animate-bounce");
                                setTimeout(
                                  () =>
                                    alertBox.classList.remove("animate-bounce"),
                                  1000,
                                );
                              }
                            }}
                          />
                        </div>

                        {/* Right: Simulated Mobile Phone Hub with Dynamic Push Notification alerts - Occupying 4 cols */}
                        <div className="lg:col-span-4 space-y-6">
                          {/* Phone Frame Simulator Container */}
                          <div className="bg-stone-900 border-[10px] border-stone-950 rounded-[44px] p-4 shadow-2xl relative overflow-hidden text-left mx-auto max-w-[310px]">
                            {/* Speaker and Notch */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-stone-950 rounded-b-xl z-20 flex justify-center items-center pb-1">
                              <div className="w-8 h-1 bg-stone-750 rounded-full" />
                            </div>

                            {/* Inside Screen Content in iOS aesthetic */}
                            <div className="bg-[#f8fafc] rounded-[32px] px-3.5 py-4 min-h-[460px] flex flex-col justify-between font-sans relative z-10 text-stone-850">
                              {/* Status bar */}
                              <div className="flex justify-between items-center text-[9px] font-black text-stone-500 px-1 border-b border-stone-200/50 pb-2 pt-1.5">
                                <span>EveryBake LTE</span>
                                <div className="flex items-center gap-1">
                                  <Wifi className="w-3 h-3 text-emerald-505" />
                                  <span>100%</span>
                                </div>
                              </div>

                              {/* App header logo */}
                              <div className="my-2 text-center">
                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block">
                                  MOBILE CONTROLLER
                                </span>
                                <span className="text-xs font-black text-stone-900 font-sans block mt-0.5">
                                  에브리베이크 원격 앱
                                </span>
                              </div>

                              {/* Dynamic IoT Push Alerts Hub - Users feel the notification real-time */}
                              <div
                                className="space-y-3 my-4 flex-1 overflow-y-auto max-h-[280px] p-1 pr-1.5 scrollbar-thin"
                                id="mock-phone-alert-hub"
                              >
                                <div className="text-[9px] font-bold text-stone-400 tracking-wider mb-2 text-center uppercase border-b border-dashed border-stone-200 pb-1">
                                  🚨 IoT 실시간 푸시 피드
                                </div>

                                {/* Push Alert 1 */}
                                <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-[#f97316] uppercase bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100/50">
                                      AI 실시간 케어
                                    </span>
                                    <span className="text-[8px] text-stone-400">
                                      오전 06:12
                                    </span>
                                  </div>
                                  <p className="text-[10px] font-bold text-stone-800 leading-snug">
                                    🔔 발효 조율 완수! <br />
                                    <span className="text-stone-550 font-medium">
                                      안감 이스트 발효 85% 지점 통과. 도우를
                                      상단 가열실에 예치하십시오.
                                    </span>
                                  </p>
                                </div>

                                {/* Push Alert 2 */}
                                <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-blue-600 uppercase bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">
                                      오븐 자동 예열
                                    </span>
                                    <span className="text-[8px] text-stone-400">
                                      오전 06:14
                                    </span>
                                  </div>
                                  <p className="text-[10px] font-bold text-stone-800 leading-snug">
                                    🔥 섭씨 180℃ 사전 가열 개시! <br />
                                    <span className="text-stone-550 font-medium">
                                      상단 구움 화실의 자동 가열 대류 열기가
                                      준비되었습니다.
                                    </span>
                                  </p>
                                </div>

                                {/* Push Alert 3 */}
                                <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-black text-emerald-600 uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                                      스팀 소킹 검증
                                    </span>
                                    <span className="text-[8px] text-stone-400">
                                      오전 06:25
                                    </span>
                                  </div>
                                  <p className="text-[10px] font-bold text-stone-800 leading-snug">
                                    💨 크러스트 칩 세팅! <br />
                                    <span className="text-stone-550 font-medium font-sans">
                                      고밀도 스팀 분사로 겉면 팽창 계수를 극한의
                                      황금빛 바삭함으로 유지합니다.
                                    </span>
                                  </p>
                                </div>
                              </div>

                              {/* Interactive trigger feedback inside the app */}
                              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center mb-1">
                                <span className="text-[8px] text-stone-400 font-bold block">
                                  연결 모드: WiFi Smart Node v2
                                </span>
                                <button
                                  onClick={() =>
                                    alert(
                                      "스마트폰으로부터 오븐 정지 신호를 유선 송신했습니다. 기기가 즉각 가열을 차단하고 쿨링 대기에 진입합니다.",
                                    )
                                  }
                                  className="w-full mt-1.5 py-2 bg-stone-900 hover:bg-stone-950 text-[10px] font-extrabold text-white rounded-lg cursor-pointer transition-colors"
                                >
                                  앱으로 소성 가중 원격 긴급 중단
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Descriptive side column widgets */}
                          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/60 shadow-xs text-left space-y-3">
                            <div className="flex items-center gap-1.5">
                              <Smartphone className="w-4 h-4 text-[#f97316]" />
                              <span className="text-xs font-extrabold text-stone-850">
                                모바일 알림의 역할
                              </span>
                            </div>
                            <p className="text-stone-500 text-xs leading-relaxed">
                              매장 밖 시장을 가거나 휴식을 취할 때에도 오븐 앞에
                              머무실 필요가 전혀 없습니다. 해동 완료, 발효 포화
                              상태, 스팀 투하점, 굽기 완수 시간 등을 맞춤 스마트
                              알림으로 전송하여 바쁜 올인원 가사 조율과 매장
                              운영을 동시에 성립시킵니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: Real-time Device Reviews (Comment Feed) */}
                    <div className="w-full flex flex-col items-center py-16 border-t border-stone-200/70">
                      <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 tracking-tight text-center mb-2">
                        이 기기를 사용 중인 오너들의 생생한 목소리
                      </h2>
                      <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto text-center leading-relaxed font-semibold mb-12">
                        에브리베이크 170cm AI 스마트 오토 기기와 함께 일상을
                        바꾼 실제 사장님과 주부들의 후기입니다.
                      </p>

                      <div className="w-full max-w-3xl text-left space-y-8">
                        {/* Render review list */}
                        <div className="divide-y divide-stone-150 space-y-6 pt-4">
                          {equipReviews.map((item) => (
                            <div
                              key={item.id}
                              className="pt-6 first:pt-0 space-y-2"
                            >
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-extrabold text-stone-950">
                                  {item.author}
                                </span>
                                <span className="text-[10px] text-stone-400 font-mono">
                                  {item.date}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < item.stars ? "fill-yellow-400 text-yellow-400" : "text-stone-200"}`}
                                    referrerPolicy="no-referrer"
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-stone-700 leading-relaxed font-semibold">
                                {item.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 4. PREMIUM DOUGH MAIN VIEW (Interactive Map System)  */}
                {/* ==================================================== */}
                {currentView === "dough-main" && (
                  <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 홈으로 이동
                    </button>

                    <div className="mb-8 space-y-2 text-center max-w-3xl mx-auto">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb]">
                        Verified Masters Dough
                      </span>
                      <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                        프리미엄 원장 명인 생지 라인업
                      </h1>
                      <p className="text-stone-550 text-sm">
                        KCT와 협약 배합을 맺은 전국 제과 명인들의 고유 반죽과
                        글로벌 EVERYBAKE 라인업을 오븐 스마트 통신 바코드와
                        연동하여 편리하게 자영업 발주해 보십시오.
                      </p>
                    </div>

                    {/* Map or Banner Top Card (Placed on top, full width) */}
                    <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm mb-8 text-left">
                      <h3 className="text-xs font-black text-stone-400 mb-3.5 uppercase tracking-widest text-center">
                        {activeDoughTab === "tasty" ? "에브리베이크 프리미엄 셀렉션" : "원재료 실시간 위치 추적 스마트 관제"}
                      </h3>
                      {activeDoughTab === "master" ? (
                        <KoreaMap
                          selectedPinId={selectedKoreaPin}
                          onSelectPin={setSelectedKoreaPin}
                          activeRegion={hoveredRegion}
                        />
                      ) : activeDoughTab === "global" ? (
                        <GlobalMap
                          selectedPinId={selectedGlobalPin}
                          onSelectPin={setSelectedGlobalPin}
                          activeRegion={hoveredRegion}
                        />
                      ) : (
                        <div className="h-[280px] sm:h-[340px] bg-amber-50/40 rounded-3xl border border-amber-100 flex flex-col items-center justify-center p-6 text-center space-y-4 shadow-inner animate-fade-in">
                          <div className="w-16 h-16 rounded-2xl bg-white border border-amber-100 flex items-center justify-center text-3xl shadow-md animate-bounce">
                            ⭐
                          </div>
                          <h4 className="text-stone-900 text-lg font-black font-sans">
                            에브리베이크 테이스티 픽
                          </h4>
                          <p className="text-stone-600 text-xs leading-relaxed max-w-md font-semibold">
                            특정 지리적 연동에 구애받지 않고 전국 가맹점주 만족도 평점 <strong>4.98점</strong>을 획득한 초특급 베스트셀러만을 고속 엄선한 프리미엄 밀집 컬렉션입니다.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Reorganized 2-Column Responsive Layout - Sidebar placed on the left side of the product grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* LEFT COLUMN: Premium Dough Categories Sidebar */}
                      <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-5">
                        
                        {/* Dough Sidebar Widget */}
                        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                          <div className="bg-stone-50/80 px-4 py-3.5 border-b border-stone-200">
                            <span className="text-[10px] uppercase font-black tracking-wider text-[#f97316]">
                              EVERYBAKE 생지 카테고리
                            </span>
                          </div>

                          <div className="p-3 space-y-4">
                            
                            {/* Group 1: 대한민국 명장의 생지 */}
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setActiveDoughTab("master");
                                  setActiveDoughSubCategory("all");
                                  setSelectedKoreaPin(null);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-between ${
                                  activeDoughTab === "master" && activeDoughSubCategory === "all"
                                    ? "bg-orange-50 text-[#f97316] font-extrabold"
                                    : "text-stone-900 hover:bg-stone-50"
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="text-sm">🇰🇷</span>
                                  <span>대한민국 명장의 생지</span>
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                  activeDoughTab === "master" && activeDoughSubCategory === "all"
                                    ? "bg-[#f97316]/20 text-[#f97316]"
                                    : "bg-stone-100 text-stone-600"
                                }`}>
                                  {CURATED_DOUGHS.filter(d => d.category === "master").length}
                                </span>
                              </button>

                              <div className="pl-6 pr-1 space-y-0.5">
                                {[
                                  { id: "hard", label: "🥖 하드 계열 (식사빵류)", count: CURATED_DOUGHS.filter(d => d.category === "master" && d.subCategory === "hard").length },
                                  { id: "pastry", label: "🥐 페이스트리 계열", count: CURATED_DOUGHS.filter(d => d.category === "master" && d.subCategory === "pastry").length },
                                  { id: "soft", label: "🍞 소프트 계열", count: CURATED_DOUGHS.filter(d => d.category === "master" && d.subCategory === "soft").length }
                                ].map((sub) => (
                                  <button
                                    key={`master-sub-${sub.id}`}
                                    onClick={() => {
                                      setActiveDoughTab("master");
                                      setActiveDoughSubCategory(sub.id as any);
                                      setSelectedKoreaPin(null);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                                      activeDoughTab === "master" && activeDoughSubCategory === sub.id
                                        ? "bg-orange-50/70 text-[#f97316] font-bold"
                                        : "text-stone-600 hover:bg-stone-50/60 hover:text-stone-900"
                                    }`}
                                  >
                                    <span>{sub.label}</span>
                                    <span className="text-[10px] font-mono text-stone-400">
                                      {sub.count}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <hr className="border-stone-100" />

                            {/* Group 2: 글로벌 시그니처 생지 */}
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setActiveDoughTab("global");
                                  setActiveDoughSubCategory("all");
                                  setSelectedGlobalPin(null);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-between ${
                                  activeDoughTab === "global" && activeDoughSubCategory === "all"
                                    ? "bg-orange-50 text-[#f97316] font-extrabold"
                                    : "text-stone-900 hover:bg-stone-50"
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="text-sm">✈️</span>
                                  <span>글로벌 시그니처 생지</span>
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                  activeDoughTab === "global" && activeDoughSubCategory === "all"
                                    ? "bg-[#f97316]/20 text-[#f97316]"
                                    : "bg-stone-100 text-stone-600"
                                }`}>
                                  {CURATED_DOUGHS.filter(d => d.category === "global").length}
                                </span>
                              </button>

                              <div className="pl-6 pr-1 space-y-0.5">
                                {[
                                  { id: "hard", label: "🥖 하드 계열 (식사빵류)", count: CURATED_DOUGHS.filter(d => d.category === "global" && d.subCategory === "hard").length },
                                  { id: "pastry", label: "🥐 페이스트리 계열", count: CURATED_DOUGHS.filter(d => d.category === "global" && d.subCategory === "pastry").length },
                                  { id: "soft", label: "🍞 소프트 계열", count: CURATED_DOUGHS.filter(d => d.category === "global" && d.subCategory === "soft").length }
                                ].map((sub) => (
                                  <button
                                    key={`global-sub-${sub.id}`}
                                    onClick={() => {
                                      setActiveDoughTab("global");
                                      setActiveDoughSubCategory(sub.id as any);
                                      setSelectedGlobalPin(null);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                                      activeDoughTab === "global" && activeDoughSubCategory === sub.id
                                        ? "bg-orange-50/70 text-[#f97316] font-bold"
                                        : "text-stone-600 hover:bg-stone-50/60 hover:text-stone-900"
                                    }`}
                                  >
                                    <span>{sub.label}</span>
                                    <span className="text-[10px] font-mono text-stone-400">
                                      {sub.count}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <hr className="border-stone-100" />

                            {/* Group 3: 에브리베이크 테이스티 픽 */}
                            <div className="space-y-1">
                              <button
                                onClick={() => {
                                  setActiveDoughTab("tasty");
                                  setActiveDoughSubCategory("all");
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-between ${
                                  activeDoughTab === "tasty" && activeDoughSubCategory === "all"
                                    ? "bg-orange-50 text-[#f97316] font-extrabold"
                                    : "text-stone-900 hover:bg-stone-50"
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className="text-sm">⭐</span>
                                  <span>에브리베이크 테이스티 픽</span>
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                  activeDoughTab === "tasty" && activeDoughSubCategory === "all"
                                    ? "bg-[#f97316]/20 text-[#f97316]"
                                    : "bg-stone-100 text-stone-600"
                                }`}>
                                  {CURATED_DOUGHS.filter(d => d.category === "tasty").length}
                                </span>
                              </button>

                              <div className="pl-6 pr-1 space-y-0.5">
                                {[
                                  { id: "hard", label: "🥖 하드 계열 (식사빵류)", count: CURATED_DOUGHS.filter(d => d.category === "tasty" && d.subCategory === "hard").length },
                                  { id: "pastry", label: "🥐 페이스트리 계열", count: CURATED_DOUGHS.filter(d => d.category === "tasty" && d.subCategory === "pastry").length },
                                  { id: "soft", label: "🍞 소프트 계열", count: CURATED_DOUGHS.filter(d => d.category === "tasty" && d.subCategory === "soft").length }
                                ].map((sub) => (
                                  <button
                                    key={`tasty-sub-${sub.id}`}
                                    onClick={() => {
                                      setActiveDoughTab("tasty");
                                      setActiveDoughSubCategory(sub.id as any);
                                    }}
                                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                                      activeDoughTab === "tasty" && activeDoughSubCategory === sub.id
                                        ? "bg-orange-50/70 text-[#f97316] font-bold"
                                        : "text-stone-600 hover:bg-stone-50/60 hover:text-stone-900"
                                    }`}
                                  >
                                    <span>{sub.label}</span>
                                    <span className="text-[10px] font-mono text-stone-400">
                                      {sub.count}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>

                      {/* RIGHT COLUMN: The Product List Area */}
                      <div className="lg:col-span-9 space-y-8 text-left">

                        {/* List Area */}
                        <div>
                          <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-150">
                            <span className="text-xs sm:text-sm font-black text-stone-800">
                              조회된 파트너 생지 목록 ({getTabDoughs().length}개)
                            </span>

                            {activeDoughTab === "master" && selectedKoreaPin && (
                              <button
                                onClick={() => setSelectedKoreaPin(null)}
                                className="text-xs text-[#2563eb] font-bold hover:underline bg-transparent"
                              >
                                지역 연동 필터 초기화
                              </button>
                            )}
                            {activeDoughTab === "global" && selectedGlobalPin && (
                              <button
                                onClick={() => setSelectedGlobalPin(null)}
                                className="text-xs text-[#2563eb] font-bold hover:underline bg-transparent"
                              >
                                국가 연동 필터 초기화
                              </button>
                            )}
                          </div>

                          {getTabDoughs().length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3">
                              <span className="text-4xl text-stone-300">🔍</span>
                              <h4 className="text-stone-800 font-bold">
                                탐색된 제안 생지가 없습니다
                              </h4>
                              <p className="text-xs text-stone-400">
                                지정된 로케이션 상의 검증된 생지 원재료 노드가 비활성화 상태입니다.
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-10">
                              {(() => {
                                const allDoughs = getTabDoughs();
                                const sortedAll = [...allDoughs].sort(
                                  (a, b) => getDoughSales(b.id) - getDoughSales(a.id),
                                );
                                const totalTop3 = sortedAll.slice(0, 3);

                                return (
                                  <>
                                    {/* 🏆 실시간 프리미엄 통합 토탈 TOP 3 랭킹 Block (Only shown on "all" subcategory view) */}
                                    {activeDoughSubCategory === "all" && totalTop3.length > 0 && (
                                      <div className="space-y-4 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 sm:p-6 rounded-3xl border-2 border-amber-500/30 shadow-xs text-left animate-fade-in">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/40">
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                              <span className="text-xl">🏆</span>
                                              <h4 className="text-sm font-black text-amber-900 uppercase tracking-tight">
                                                에브리베이크 실시간 통합 토탈 인기 TOP 3 생지
                                              </h4>
                                              <span className="text-[10px] font-black text-white bg-amber-500 px-2.5 py-0.5 rounded-full font-mono animate-pulse shrink-0">
                                                INTEGRATED BEST
                                              </span>
                                            </div>
                                            <p className="text-[11px] text-[#78350f] font-semibold leading-relaxed">
                                              분류 구분 없이 금일 전국 프랜차이즈 가맹매장에서 가장 주문량이 높은 최상위 3가지 시그니처 원재료입니다.
                                            </p>
                                          </div>
                                          <div className="text-[10px] font-bold text-amber-800 bg-amber-100/60 border border-amber-200/80 px-3 py-1.5 rounded-xl whitespace-nowrap self-start sm:self-center font-mono">
                                            실시간 판매량 분석 기준 (Box 단위)
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                          {totalTop3.map((dough, idx) => {
                                            const subCatLabel =
                                              dough.subCategory === "hard"
                                                ? "🥖 하드 계열"
                                                : dough.subCategory === "pastry"
                                                  ? "🥐 페이스트리"
                                                  : "🍞 소프트 계열";

                                            return (
                                              <div
                                                key={`total-top3-${dough.id}`}
                                                className="relative group"
                                              >
                                                {/* Subcategory Label overlay tag */}
                                                <div className="absolute top-2.5 right-2.5 bg-stone-900/85 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-md z-20 shadow-sm">
                                                  {subCatLabel}
                                                </div>

                                                <DoughCard
                                                  item={dough}
                                                  onAddToCart={handleAddToCart}
                                                  onToggleNotification={handleToggleNotification}
                                                  isNotificationApplied={notifications.includes(dough.id)}
                                                  onScanShortcut={handleScanShortcut}
                                                  activeInOven={ovenActiveDoughId === dough.id}
                                                  onHoverCard={(reg: string | null) => setHoveredRegion(reg)}
                                                  onViewStory={(id) => {
                                                    setSelectedDoughId(id);
                                                    handleNav("dough-detail");
                                                  }}
                                                  rank={idx + 1}
                                                  salesCount={getDoughSales(dough.id)}
                                                />
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    )}

                                    {/* 1. 하드 계열 (식사빵류) Section */}
                                    {(activeDoughSubCategory === "all" || activeDoughSubCategory === "hard") && allDoughs.filter((d) => d.subCategory === "hard").length > 0 && (
                                      <div id="dough-section-hard" className="space-y-4 scroll-mt-24">
                                        <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-left">
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
                                              <span className="bg-blue-600 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                                                01
                                              </span>
                                              하드 계열 (식사빵류)
                                            </h3>
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/60 font-mono">
                                              오븐의 스팀 기능 & 발효 극대화 품격 💨
                                            </span>
                                          </div>
                                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                                            유럽식 주식 빵으로, 담백한 맛이 특징이며 샌드위치 베이스로 많이 쓰입니다. 오븐의 스팀 기능과 발효가 매우 중요합니다. 대표 품목: 바게트, 깜빠뉴, 베이글 등
                                          </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                          {allDoughs
                                            .filter((d) => d.subCategory === "hard")
                                            .map((dough) => {
                                              const rankIdx = totalTop3.findIndex((t) => t.id === dough.id);
                                              return (
                                                <div key={dough.id} className="relative group">
                                                  <DoughCard
                                                    item={dough}
                                                    onAddToCart={handleAddToCart}
                                                    onToggleNotification={handleToggleNotification}
                                                    isNotificationApplied={notifications.includes(dough.id)}
                                                    onScanShortcut={handleScanShortcut}
                                                    activeInOven={ovenActiveDoughId === dough.id}
                                                    onHoverCard={(reg: string | null) => setHoveredRegion(reg)}
                                                    onViewStory={(id) => {
                                                      setSelectedDoughId(id);
                                                      handleNav("dough-detail");
                                                    }}
                                                    rank={rankIdx !== -1 ? rankIdx + 1 : undefined}
                                                    salesCount={getDoughSales(dough.id)}
                                                  />
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    )}

                                    {/* 2. 페이스트리 계열 (비에누아즈리) Section */}
                                    {(activeDoughSubCategory === "all" || activeDoughSubCategory === "pastry") && allDoughs.filter((d) => d.subCategory === "pastry").length > 0 && (
                                      <div id="dough-section-pastry" className="space-y-4 scroll-mt-24">
                                        <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-left">
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
                                              <span className="bg-amber-500 text-stone-950 text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                                                02
                                              </span>
                                              페이스트리 계열 (비에누아즈리)
                                            </h3>
                                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/60 font-mono">
                                              도우컨디셔너 정밀 온도/습도 관리 필수 ❄️
                                            </span>
                                          </div>
                                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                                            버터 함량이 높아 겹겹이 결이 살아있는 빵입니다. 버터가 녹지 않도록 도우컨디셔너의 정밀한 온도/습도 관리가 필수적인 품종입니다. 대표 품목: 크루아상, 뺑오쇼콜라, 데니쉬 등
                                          </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                          {allDoughs
                                            .filter((d) => d.subCategory === "pastry")
                                            .map((dough) => {
                                              const rankIdx = totalTop3.findIndex((t) => t.id === dough.id);
                                              return (
                                                <div key={dough.id} className="relative group">
                                                  <DoughCard
                                                    item={dough}
                                                    onAddToCart={handleAddToCart}
                                                    onToggleNotification={handleToggleNotification}
                                                    isNotificationApplied={notifications.includes(dough.id)}
                                                    onScanShortcut={handleScanShortcut}
                                                    activeInOven={ovenActiveDoughId === dough.id}
                                                    onHoverCard={(reg: string | null) => setHoveredRegion(reg)}
                                                    onViewStory={(id) => {
                                                      setSelectedDoughId(id);
                                                      handleNav("dough-detail");
                                                    }}
                                                    rank={rankIdx !== -1 ? rankIdx + 1 : undefined}
                                                    salesCount={getDoughSales(dough.id)}
                                                  />
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    )}

                                    {/* 3. 소프트 계열 (간식 및 조리빵류) Section */}
                                    {(activeDoughSubCategory === "all" || activeDoughSubCategory === "soft") && allDoughs.filter((d) => d.subCategory === "soft").length > 0 && (
                                      <div id="dough-section-soft" className="space-y-4 scroll-mt-24">
                                        <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-left">
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-2">
                                              <span className="bg-emerald-600 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                                                03
                                              </span>
                                              소프트 계열 (간식 및 조리빵류)
                                            </h3>
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/60 font-mono">
                                              부드러운 식감 & 대중성 · 빠른 회전율 보증 🍞
                                            </span>
                                          </div>
                                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                                            부드러운 식감으로 대중성이 높고 회전율이 빠른 기본 품종들입니다. 대표 품목: 식빵, 단팥빵, 소보로, 명란바게트, 소금빵 등
                                          </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                          {allDoughs
                                            .filter((d) => d.subCategory === "soft")
                                            .map((dough) => {
                                              const rankIdx = totalTop3.findIndex((t) => t.id === dough.id);
                                              return (
                                                <div key={dough.id} className="relative group">
                                                  <DoughCard
                                                    item={dough}
                                                    onAddToCart={handleAddToCart}
                                                    onToggleNotification={handleToggleNotification}
                                                    isNotificationApplied={notifications.includes(dough.id)}
                                                    onScanShortcut={handleScanShortcut}
                                                    activeInOven={ovenActiveDoughId === dough.id}
                                                    onHoverCard={(reg: string | null) => setHoveredRegion(reg)}
                                                    onViewStory={(id) => {
                                                      setSelectedDoughId(id);
                                                      handleNav("dough-detail");
                                                    }}
                                                    rank={rankIdx !== -1 ? rankIdx + 1 : undefined}
                                                    salesCount={getDoughSales(dough.id)}
                                                  />
                                                </div>
                                              );
                                            })}
                                        </div>
                                      </div>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 5. DOUGH DETAIL VIEW                                 */}
                {/* ==================================================== */}
                {currentView === "dough-detail" && (
                  <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
                    <button
                      onClick={() => handleNav("dough-main")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 목록으로
                    </button>

                    {/* Apple style central stacked layout */}
                    <div className="flex flex-col items-center w-full">
                      {/* SECTION 1: Product Visual & Buying */}
                      <div className="w-full flex flex-col items-center text-center py-12 border-b border-stone-200">
                        <div className="w-full max-w-3xl h-[360px] bg-[#f8fafc] rounded-3xl flex items-center justify-center relative overflow-hidden mb-10 border border-stone-150">
                          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                          <span className="text-8xl filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transform hover:scale-110 transition-transform duration-300">
                            {selectedDough.id === "m-001"
                              ? "🥐"
                              : selectedDough.id === "m-002"
                                ? "🍎"
                                : selectedDough.id === "m-003"
                                  ? "🍫"
                                  : selectedDough.id === "g-001"
                                    ? "🍈"
                                    : "🥖"}
                          </span>

                          <span className="absolute bottom-4 text-[10px] font-extrabold uppercase font-mono tracking-widest text-[#a8a29e] bg-white shadow-xs px-3.5 py-1 rounded-full border border-stone-150">
                            {selectedDough.imageLabel}
                          </span>
                        </div>

                        <span className="inline-block px-3.5 py-1.5 bg-orange-50 text-[#f97316] text-xs font-bold tracking-wider rounded-full mb-4 border border-orange-100">
                          {selectedDough.category === "master"
                            ? "대한민국 명장 라인업"
                            : "글로벌 시그니처 큐레이션"}
                        </span>

                        <h1 className="text-3xl sm:text-4.5xl font-black text-stone-900 tracking-tight leading-tight mb-2">
                          {selectedDough.name}
                        </h1>

                        <p className="text-sm font-semibold text-stone-400 mb-6 font-mono uppercase tracking-wider">
                          MASTERPIECE BY. {selectedDough.masterName} (ORIGIN:{" "}
                          {selectedDough.region})
                        </p>

                        <p className="text-sm sm:text-base text-stone-500 max-w-2xl mx-auto leading-relaxed font-semibold mb-8">
                          천연 르방 원작 발효 비율을 엄선하여 에브리베이크 IoT
                          오븐과 완벽한 동기화를 만들어냅니다.
                          <br />
                          매장에서 가장 신선한 빵의 향기를 손님들에게 선물해
                          보세요.
                        </p>

                        <div className="text-2xl sm:text-3.5xl font-black text-stone-950 tracking-tight mb-6">
                          박스당 ₩ {selectedDough.price.toLocaleString()}
                        </div>

                        <button
                          onClick={() => handleAddToCart(selectedDough)}
                          className="px-10 py-4 bg-stone-900 hover:bg-black text-white text-sm font-bold rounded-full cursor-pointer transition-all active:scale-95 shadow-lg shadow-stone-900/10 flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>주문 카트에 담기</span>
                        </button>
                      </div>

                      {/* SECTION 2: Master Story & Specifications */}
                      <div className="w-full flex flex-col items-center py-16 border-b border-stone-200">
                        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-4">
                          명장 제베 스토리 & 권장 굽기 파라미터
                        </h2>
                        <p className="text-[#a8a29e] text-sm max-w-xl text-center leading-relaxed font-semibold mb-10">
                          전문화된 파라미터들이 에브리베이크 스마트 오븐과
                          즉각적으로 동기화됩니다. 바코드 스캔 시스템을 통해
                          일관된 완벽함을 유지할 수 있습니다.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl text-left">
                          {/* Story Card */}
                          <div className="bg-white p-6.5 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
                            <div>
                              <h4 className="text-sm font-extrabold text-stone-900 mb-3 flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-[#f97316]" />
                                KCT 명인 검증 검토 스토리
                              </h4>
                              <p className="text-xs text-stone-500 leading-relaxed font-medium">
                                본 반죽은 천연 르방 유산균 발효 비율을 극한으로
                                조절하여 구울 때의 볼륨감과 크러스트의 바삭함이
                                명장의 비법 그대로 살아납니다. 에브리베이크
                                스마트 오븐의 바코드 스캔 시스템과 완벽히
                                매칭되어 있으며, 소량 해동 후 즉시 구우셔도
                                균일한 기공 구조를 유지하는 특허 레시피입니다.
                              </p>
                            </div>
                          </div>

                          {/* Param Spec Card */}
                          <div className="bg-stone-50 p-6.5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-black uppercase tracking-wider text-[#a8a29e] mb-2.5">
                                OVEN PARAMETERS
                              </h4>
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between py-1 border-b border-stone-200/60">
                                  <span className="text-[#a8a29e]">
                                    해동 지점:
                                  </span>
                                  <span className="font-extrabold text-stone-800">
                                    {selectedDough.settings.defrostTemp}°C (
                                    {selectedDough.settings.defrostTime}분)
                                  </span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-stone-200/60">
                                  <span className="text-[#a8a29e]">
                                    숙성 발효:
                                  </span>
                                  <span className="font-extrabold text-stone-800">
                                    {selectedDough.settings.fermentTemp}°C (
                                    {selectedDough.settings.fermentHumidity}%)
                                  </span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-stone-200/60">
                                  <span className="text-[#a8a29e]">
                                    소성 온도:
                                  </span>
                                  <span className="font-extrabold text-stone-800">
                                    {selectedDough.settings.bakeTemp}°C (
                                    {selectedDough.settings.bakeTime}분)
                                  </span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-[#a8a29e]">
                                    기압식 스팀:
                                  </span>
                                  <span className="font-extrabold text-[#44403c]">
                                    {selectedDough.settings.steam
                                      ? "지원 (분사 2.5초)"
                                      : "미지원"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 7. COMMUNITY BOARD VIEW                             */}
                {/* ==================================================== */}
                {currentView === "community" && (
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in text-left">
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-5 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 홈으로 이동
                    </button>

                    {/* 에브리베이크 커뮤니티 광장 대형 메인 헤더 */}
                    <div className="mb-10 space-y-3 text-center max-w-4xl mx-auto mt-4 animate-fade-in relative">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full text-[10.5px] font-black uppercase text-amber-700 tracking-widest shadow-xs">
                        EveryBake Community Plaza
                      </div>
                      <h1 className="text-3xl sm:text-4.5xl font-black text-[#1c1917] tracking-tight leading-none pt-2 flex items-center justify-center gap-2">
                        <span>📢 에브리베이크 커뮤니티 광장</span>
                      </h1>
                      <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
                        전국 가맹 사장님들의 자유로운 소통과 상생, 원부자재 비용 혁신 및 점주 공동 협업을 위한 비즈니스 스퀘어입니다.
                      </p>
                    </div>

                    {/* 네 개의 대분류 커뮤니티 탭 (깔끔하고 시각적으로 뚜렷한 정렬) */}
                    <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 mb-10 w-full max-w-4xl mx-auto border-b border-stone-200 pb-6">
                      {[
                        {
                          id: "why-not-sell",
                          label: "💡 이거 왜 안 팔아? 에브리베이크",
                          desc: "도입 희망 상품 건의 및 투표",
                        },
                        {
                          id: "flea-market",
                          label: "🛒 에브리베이크 알뜰 광장",
                          desc: "공구·중고거래·소분나눔·당일인력",
                        },
                        {
                          id: "interior",
                          label: "🛠️ 빵집 인테리어 매칭",
                          desc: "보수/디자인 요청 및 견적 비교",
                        },
                        {
                          id: "trouble",
                          label: "💬 에베 고민창구",
                          desc: "동료 점주 상생 소통 및 고민 해결",
                        },
                      ].map((mainTab) => (
                        <button
                          key={mainTab.id}
                          onClick={() => {
                            setActiveMainTab(mainTab.id as any);
                            setSelectedPlazaPostId(null); // 다른 메인 탭 전환 시 상세 정보 초기화
                          }}
                          className={`flex-1 text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                            activeMainTab === mainTab.id
                              ? "bg-stone-900 border-transparent text-white shadow-md scale-[1.01]"
                              : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          <p className="text-xs sm:text-sm font-black tracking-tight">
                            {mainTab.label}
                          </p>
                          <p
                            className={`text-[10px] mt-1 ${activeMainTab === mainTab.id ? "text-stone-300" : "text-stone-400"} font-bold`}
                          >
                            {mainTab.desc}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Naver Cafe-style 2-Column Responsive Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* LEFT COLUMN: Cafe Navigation Sidebar */}
                      <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-5">
                        
                        {/* Cafe Profile & Unified Write Button Widget */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">🥐</span>
                            <div>
                              <h2 className="text-sm font-black text-stone-900">에브리베이크 카페</h2>
                              <p className="text-[10px] text-[#f97316] font-bold uppercase tracking-wider">EveryBake Owner Lounge</p>
                            </div>
                          </div>
                          
                          {/* Cafe stats */}
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-stone-500 font-semibold border-t border-b border-stone-100 py-2 mb-4">
                            <div>
                              <span className="text-stone-400 block font-normal">정회원 수</span>
                              <strong className="text-stone-800 text-xs">1,420 명</strong>
                            </div>
                            <div>
                              <span className="text-stone-400 block font-normal">오늘 새글</span>
                              <strong className="text-emerald-500 text-xs">+18 개</strong>
                            </div>
                          </div>

                          {/* UNIFIED 'WRITE POST' BUTTON */}
                          <button
                            onClick={() => {
                              if (!isLoggedIn) {
                                setNotifications((prev) => [
                                  ...prev,
                                  {
                                    id: Date.now(),
                                    type: "error",
                                    message: "🔒 로그인이 안되어있으면 글을 적을 수 없어요 ㅠㅠ"
                                  } as any
                                ]);
                                setCurrentView("login");
                                return;
                              }
                              setUnifiedSubCat(
                                activeMainTab === "why-not-sell" ? activeCommTab :
                                activeMainTab === "flea-market" ? activePlazaTab :
                                activeMainTab === "interior" ? "interior" : "trouble"
                              );
                              setIsWritingPost(true);
                              setSelectedPlazaPostId(null);
                            }}
                            className="w-full py-3 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(249,115,22,0.25)] cursor-pointer flex items-center justify-center gap-2"
                          >
                            <span className="text-xs">✏️</span>
                            <span>커뮤니티 통합 글쓰기</span>
                          </button>
                        </div>

                        {/* CAFE CATEGORIES list */}
                        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                          <div className="bg-stone-50/80 px-4 py-3 border-b border-stone-200">
                            <span className="text-[10px] uppercase font-black tracking-wider text-stone-500">
                              게시판 카테고리
                            </span>
                          </div>

                          <div className="p-2 space-y-1">
                            
                            {/* Category block 1 */}
                            <div className="space-y-0.5">
                              <div className="px-3 py-1.5 text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                                <span>💡</span>
                                <span>이거 왜 안 팔아?</span>
                              </div>
                              <div className="pl-6 pr-1 space-y-0.5">
                                {[
                                  { id: "dough", label: "🥐 프리미엄 생지 공동제안" },
                                  { id: "coffee", label: "☕ 원두 및 커피기기 제안" },
                                  { id: "raw", label: "🌾 원부자재 제안" }
                                ].map((sub) => (
                                  <button
                                    key={sub.id}
                                    onClick={() => {
                                      setActiveMainTab("why-not-sell");
                                      setActiveCommTab(sub.id as any);
                                      setSelectedPlazaPostId(null);
                                      if (isWritingPost) {
                                        setUnifiedSubCat(sub.id);
                                      }
                                    }}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                      activeMainTab === "why-not-sell" && activeCommTab === sub.id
                                        ? "bg-orange-50 text-[#f97316] font-bold"
                                        : "text-stone-600 hover:bg-stone-50"
                                    }`}
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <hr className="border-stone-100 my-1" />

                            {/* Category block 2 */}
                            <div className="space-y-0.5">
                              <div className="px-3 py-1.5 text-xs font-extrabold text-stone-950 flex items-center gap-1.5">
                                <span>🛒</span>
                                <span>에브리베이크 알뜰 광장</span>
                              </div>
                              <div className="pl-6 pr-1 space-y-0.5">
                                {[
                                  { id: "coop", label: "📦 포장자재 공동구매" },
                                  { id: "used", label: "🤝 단기 재고 중고장터" },
                                  { id: "share", label: "🎁 부재료 소분 무료나눔" },
                                  { id: "job", label: "🚨 당일 땜빵 제빵인력" }
                                ].map((sub) => (
                                  <button
                                    key={sub.id}
                                    onClick={() => {
                                      setActiveMainTab("flea-market");
                                      setActivePlazaTab(sub.id as any);
                                      setSelectedPlazaPostId(null);
                                      if (isWritingPost) {
                                        setUnifiedSubCat(sub.id);
                                      }
                                    }}
                                    className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                                      activeMainTab === "flea-market" && activePlazaTab === sub.id
                                        ? "bg-orange-50 text-[#f97316] font-bold"
                                        : "text-stone-600 hover:bg-stone-50"
                                    }`}
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <hr className="border-stone-100 my-1" />

                            {/* Category 3 */}
                            <button
                              onClick={() => {
                                setActiveMainTab("interior");
                                setSelectedPlazaPostId(null);
                                if (isWritingPost) {
                                  setUnifiedSubCat("interior");
                                }
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                                activeMainTab === "interior"
                                  ? "bg-orange-50 text-[#f97316] font-extrabold"
                                  : "text-stone-805 hover:bg-stone-50"
                              }`}
                            >
                              <span>🛠️</span>
                              <span>빵집 인테리어 매칭</span>
                            </button>

                            {/* Category 4 */}
                            <button
                              onClick={() => {
                                setActiveMainTab("trouble");
                                setSelectedPlazaPostId(null);
                                if (isWritingPost) {
                                  setUnifiedSubCat("trouble");
                                }
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                                activeMainTab === "trouble"
                                  ? "bg-orange-50 text-[#f97316] font-extrabold"
                                  : "text-stone-805 hover:bg-stone-50"
                              }`}
                            >
                              <span>💬</span>
                              <span>에베 점주 고민 창구</span>
                            </button>

                          </div>
                        </div>

                      </div>

                      {/* RIGHT COLUMN: Interactive Board Workspace */}
                      <div className="lg:col-span-9 space-y-6">

                        {/* UNIFIED WRITE WIZARD FORM */}
                        {isWritingPost && (
                          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm relative animate-fade-in space-y-4">
                            <div className="flex justify-between items-center border-b border-[#f97316]/10 pb-4">
                              <h3 className="text-sm font-black text-stone-900 flex items-center gap-1.5">
                                <span>✏️</span>
                                <span>새 게시글 작성 (커뮤니티 통합 허브)</span>
                              </h3>
                              <button
                                onClick={() => setIsWritingPost(false)}
                                className="text-stone-400 hover:text-stone-800 text-xs font-bold bg-stone-100 px-2.5 py-1.5 rounded-lg cursor-pointer"
                              >
                                작성 취소
                              </button>
                            </div>

                            <form onSubmit={(e) => {
                              handleCreateUnifiedPost(e);
                            }} className="space-y-4">
                              
                              {/* Selection of the Category */}
                              <div className="space-y-3 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                                <div>
                                  <label className="block text-[10px] uppercase font-black tracking-wider text-[#f97316] mb-2">
                                    📢 작성할 게시판 카테고리 (아래 카드를 직접 클릭하여 자유롭게 변경해 보세요)
                                  </label>
                                  
                                  {/* Grid chip selector for easy clicking */}
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {[
                                      { id: "dough", label: "🥐 프리미엄 생지 공동제안", tab: "why-not-sell" },
                                      { id: "coffee", label: "☕ 원두 및 커피기기 제안", tab: "why-not-sell" },
                                      { id: "raw", label: "🌾 원부자재 제안", tab: "why-not-sell" },
                                      { id: "coop", label: "📦 포장자재 공동구매", tab: "flea-market" },
                                      { id: "used", label: "🤝 단기 재고 중고장터", tab: "flea-market" },
                                      { id: "share", label: "🎁 부재료 소분 무료나눔", tab: "flea-market" },
                                      { id: "job", label: "🚨 당일 땜빵 제빵인력", tab: "flea-market" },
                                      { id: "interior", label: "🛠️ 빵집 인테리어 매칭", tab: "interior" },
                                      { id: "trouble", label: "💬 에베 점주 고민 창구", tab: "trouble" }
                                    ].map((cat) => {
                                      const isCatActive = unifiedSubCat === cat.id;
                                      return (
                                        <button
                                          key={cat.id}
                                          type="button"
                                          onClick={() => {
                                            setUnifiedSubCat(cat.id);
                                            setActiveMainTab(cat.tab as any);
                                            if (cat.tab === "why-not-sell") {
                                              setActiveCommTab(cat.id as any);
                                            } else if (cat.tab === "flea-market") {
                                              setActivePlazaTab(cat.id as any);
                                            }
                                          }}
                                          className={`px-3 py-2.5 rounded-xl border-2 text-[11px] font-extrabold text-left transition-all cursor-pointer flex flex-col justify-between ${
                                            isCatActive
                                              ? "border-[#f97316] bg-orange-50/80 text-[#f97316] scale-[1.01] shadow-xs"
                                              : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                                          }`}
                                        >
                                          <span>{cat.label}</span>
                                          <span className="text-[9px] text-stone-400 font-normal mt-1 block">
                                            {cat.tab === "why-not-sell" ? "이거 왜 안팔아" : cat.tab === "flea-market" ? "알뜰 광장" : "단독 게시판"}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-stone-200/60">
                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-500 mb-1">
                                      선택된 카테고리 상세
                                    </label>
                                    <select
                                      value={unifiedSubCat}
                                      onChange={(e) => {
                                        const val = e.target.value;
                                        setUnifiedSubCat(val);
                                        if (["dough", "coffee", "raw"].includes(val)) {
                                          setActiveMainTab("why-not-sell");
                                          setActiveCommTab(val as any);
                                        } else if (["coop", "used", "share", "job"].includes(val)) {
                                          setActiveMainTab("flea-market");
                                          setActivePlazaTab(val as any);
                                        } else {
                                          setActiveMainTab(val as any);
                                        }
                                      }}
                                      className="w-full text-xs rounded-lg border border-stone-250 bg-white px-3 py-2 outline-hidden font-bold text-stone-700"
                                    >
                                      <optgroup label="💡 이거 왜 안 팔아?">
                                        <option value="dough">🥐 프리미엄 생지 공동제안</option>
                                        <option value="coffee">☕ 원두 및 커피기기 제안</option>
                                        <option value="raw">🌾 원부자재 제안</option>
                                      </optgroup>
                                      <optgroup label="🛒 알뜰 광장">
                                        <option value="coop">📦 포장자재 공동구매</option>
                                        <option value="used">🤝 단기 재고 중고장터</option>
                                        <option value="share">🎁 부재료 소분 무료나눔</option>
                                        <option value="job">🚨 당일 땜빵 제빵인력</option>
                                      </optgroup>
                                      <optgroup label="기타 게시판">
                                        <option value="interior">🛠️ 빵집 인테리어 매칭 견적</option>
                                        <option value="trouble">💬 에베 점주 고민 창구</option>
                                      </optgroup>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-500 mb-1">
                                      상호명 / 점주명 (로그인 연동)
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={unifiedAuthor}
                                      onChange={(e) => setUnifiedAuthor(e.target.value)}
                                      placeholder={userStoreName ? `${userStoreName} 사장님` : "예: 망원 크루아상점주"}
                                      className="w-full text-xs rounded-lg border border-stone-250 bg-stone-100 px-3 py-2 outline-hidden font-semibold"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Title */}
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">
                                  게시글 제목
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={unifiedTitle}
                                  onChange={(e) => setUnifiedTitle(e.target.value)}
                                  placeholder="게시판 성격에 맞는 핵심적인 제목을 작성해 보세요."
                                  className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 outline-hidden font-medium"
                                />
                              </div>

                              {/* Rich dynamic fields depending on category choice */}
                              {["coop", "used", "share", "job", "interior"].includes(unifiedSubCat) && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-150">
                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-500 mb-1">
                                      상업 구역 / 위치한 지역명
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={unifiedLocation}
                                      onChange={(e) => setUnifiedLocation(e.target.value)}
                                      placeholder="예: 서울 마포구 상암동"
                                      className="w-full text-xs rounded-lg border border-stone-200 bg-white px-3 py-2 outline-hidden font-medium"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-500 mb-1">
                                      {unifiedSubCat === "job" ? "시급 제안" : unifiedSubCat === "interior" ? "예산 범위 제한" : "공급 제안 단가"}
                                    </label>
                                    <input
                                      type="text"
                                      value={unifiedPriceInfo}
                                      onChange={(e) => setUnifiedPriceInfo(e.target.value)}
                                      placeholder={unifiedSubCat === "job" ? "예: 시급 13,000원" : unifiedSubCat === "interior" ? "예: 150만원 상당" : "예: 박스당 18,000원"}
                                      className="w-full text-xs rounded-lg border border-stone-200 bg-white px-3 py-2 outline-hidden font-medium"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-500 mb-1">
                                      {unifiedSubCat === "job" ? "필요 시각 / 모집인원" : "목표 물량 / 할당 분량"}
                                    </label>
                                    <input
                                      type="text"
                                      value={unifiedTargetAmount}
                                      onChange={(e) => setUnifiedTargetAmount(e.target.value)}
                                      placeholder="예: 200박스 한정 / 선착순 3개 가맹"
                                      className="w-full text-xs rounded-lg border border-stone-200 bg-white px-3 py-2 outline-hidden font-medium"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-500 mb-1">
                                      {unifiedSubCat === "interior" ? "하자 보수 기한 요구" : "추가 요구 / 우대 조건"}
                                    </label>
                                    <input
                                      type="text"
                                      value={unifiedUrgentsInfo}
                                      onChange={(e) => setUnifiedUrgentsInfo(e.target.value)}
                                      placeholder="예: 근거리 지점 우선공동배송 희망"
                                      className="w-full text-xs rounded-lg border border-stone-200 bg-white px-3 py-2 outline-hidden font-medium"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Details content */}
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">
                                  상세 설명 및 전달문구
                                </label>
                                <textarea
                                  required
                                  rows={4}
                                  value={unifiedContent}
                                  onChange={(e) => setUnifiedContent(e.target.value)}
                                  placeholder="요구 사항, 소재 규격, 인테리어 설계 조건, 건의 이유 등을 상세하고 유려하게 적어주십시오."
                                  className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 outline-hidden resize-none font-medium leading-relaxed"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <span>📄 가맹본부 실시간 보드에 배포 승인</span>
                                <span>&rarr;</span>
                              </button>
                            </form>
                          </div>
                        )}

                        {/* RENDER ACTIVE FEED CONTENT IF NOT WRITING IN WIZARD */}
                        {!isWritingPost && (
                          <div className="space-y-6">
                            {/* 선택된 카테고리 기획 가이드라인 배너 */}
                            <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-xs space-y-2 text-left relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-3 opacity-10 text-6xl font-black select-none pointer-events-none">
                                {activeMainTab === "why-not-sell" && "💡"}
                                {activeMainTab === "flea-market" && "🛒"}
                                {activeMainTab === "interior" && "🛠️"}
                                {activeMainTab === "trouble" && "💬"}
                              </div>
                              <span className="text-[10px] font-black tracking-widest text-[#f97316] uppercase block">
                                EveryBake Official Guide
                              </span>
                              <h4 className="text-sm sm:text-base font-black text-stone-900 flex items-center gap-1.5">
                                <span>
                                  {activeMainTab === "why-not-sell" && "💡 이거 왜 안 팔아? 에브리베이크"}
                                  {activeMainTab === "flea-market" && "🛒 에브리베이크 알뜰 광장"}
                                  {activeMainTab === "interior" && "🛠️ 빵집 인테리어 견적 매칭"}
                                  {activeMainTab === "trouble" && "💬 에베 고민창구"}
                                </span>
                              </h4>
                              <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed font-semibold max-w-3xl">
                                {activeMainTab === "why-not-sell" && (
                                  <>
                                    전국 사장님들이 직접 원하시는 물품의 신규 입점 계약을 제안하는 실시간 상생 건의 보드입니다.{" "}
                                    <strong className="text-[#f97316]">30추천 도달 시</strong> 대형 도매 MD팀이 즉각 공급처 직거래 발굴에 착수합니다.
                                  </>
                                )}
                                {activeMainTab === "flea-market" && (
                                  <>
                                    자재 대량 공동구매부터 남은 재고 중고 할인 처분, 대용량 식자재 소분 상호 나눔, 당일 단기 긴급 제빵 알바 연동까지! 전국 매장의 비용 혁신 마켓 플레이스입니다.
                                  </>
                                )}
                                {activeMainTab === "interior" && (
                                  <>
                                    노후화된 기기 교체나 인테리어 파사드 파트 보수가 고민이신 사장님들이 시공 모집글을 남기시면, 전문 공인 인테리어 빌더들이 <strong className="text-[#f97316]">공개 비교 견적 제안</strong> 및 포트폴리오 상담을 실시간 연동해 드립니다.
                                  </>
                                )}
                                {activeMainTab === "trouble" && (
                                  <>
                                    매장 운영, 인력 관리, 유통 등 사장님들의 말 못 할 현실적인 모든 우려와 고민을 속 시원히 공유하고, 전국 가맹점주 동료들과 본사 전문가의 실시간 상생 피드백을 수렴하는 소통 허브입니다.
                                  </>
                                )}
                              </p>
                            </div>

                    {/* ============================================== */}
                    {/* 1) 이거 왜 안 팔아? 에브리베이크 뷰          */}
                    {/* ============================================== */}
                    {activeMainTab === "why-not-sell" && (
                      <div className="space-y-6">
                        {/* Comm Toggles */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-stone-105 p-1.5 rounded-2xl w-fit mx-auto border border-stone-200">
                          <button
                            onClick={() => setActiveCommTab("dough")}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              activeCommTab === "dough"
                                ? "bg-[#f97316] text-white shadow-sm"
                                : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                            }`}
                          >
                            🥐 프리미엄 생지 공동제안
                          </button>
                          <button
                            onClick={() => setActiveCommTab("coffee")}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              activeCommTab === "coffee"
                                ? "bg-[#f97316] text-white shadow-sm"
                                : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                            }`}
                          >
                            ☕ 원두 및 커피기기 제안
                          </button>
                          <button
                            onClick={() => setActiveCommTab("raw")}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              activeCommTab === "raw"
                                ? "bg-[#f97316] text-white shadow-sm"
                                : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                            }`}
                          >
                            🌾 원부자재 제안
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                          {/* Proposals List (Left) */}
                          <div className="lg:col-span-7 space-y-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-extrabold text-stone-500 uppercase tracking-widest">
                                {activeCommTab === "trouble"
                                  ? `에베 고민 피드 (${communityPosts.filter((p) => p.category === activeCommTab).length}개)`
                                  : `제안된 아이디어 (${communityPosts.filter((p) => p.category === activeCommTab).length}개)`}
                              </span>
                              <span className="text-[10px] text-[#f97316] font-bold">
                                {activeCommTab === "trouble"
                                  ? "동료 점주 상생 피드백"
                                  : "실시간 투표 반영 완료"}
                              </span>
                            </div>

                            {communityPosts.filter(
                              (p) => p.category === activeCommTab,
                            ).length === 0 ? (
                              <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3 col-span-full">
                                <span className="text-4xl text-stone-300">
                                  💡
                                </span>
                                <h4 className="text-stone-800 font-bold">
                                  등록된 제안이 아직 없습니다
                                </h4>
                                <p className="text-xs text-stone-400">
                                  우측 폼을 이용해 첫 번째로 사장님의 혁명적인
                                  입점 건의를 올려 보세요!
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {communityPosts
                                  .filter((p) => p.category === activeCommTab)
                                  .map((post) => (
                                    <div
                                      key={post.id}
                                      className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-4"
                                    >
                                      <div className="flex justify-between items-start">
                                        <span
                                          className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                                            post.status.includes("예정")
                                              ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                                              : post.status.includes("MD")
                                                ? "bg-amber-50 text-amber-700 border border-amber-100"
                                                : "bg-stone-100 text-stone-600 border border-stone-150"
                                          }`}
                                        >
                                          {post.status}
                                        </span>
                                        <span className="text-[10px] text-stone-400 font-mono">
                                          {post.date}
                                        </span>
                                      </div>

                                      <div className="space-y-1.5">
                                        <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                                          {post.title}
                                        </h3>
                                        <p className="text-xs text-stone-605 leading-relaxed font-semibold">
                                          {post.content}
                                        </p>
                                      </div>

                                      <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-1.5 text-stone-500 font-semibold text-[11px]">
                                          <User className="w-3.5 h-3.5 text-stone-400" />
                                          <span>{post.author}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <span className="font-mono text-xs font-bold text-stone-400">
                                            추천 수{" "}
                                            <strong className="text-stone-800 ml-0.5">
                                              {post.votes}개
                                            </strong>
                                          </span>

                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleVotePost(post.id)
                                            }
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                              post.votedByMe
                                                ? "bg-orange-50 text-[#f97316] border border-orange-200"
                                                : "bg-stone-50 hover:bg-orange-50 text-stone-700 border border-stone-200 hover:border-orange-200"
                                            }`}
                                          >
                                            <ThumbsUp
                                              className={`w-3.5 h-3.5 ${post.votedByMe ? "fill-current" : ""}`}
                                            />
                                            <span>
                                              {post.votedByMe
                                                ? "추천 완료"
                                                : "추천하기"}
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          {/* Suggestions Form (Right) */}
                          <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
                            <h3 className="text-xs font-extrabold text-stone-950 mb-2 flex items-center gap-1.5">
                              🛡️ 신제품 도매 입점 긴급 제안 등록
                            </h3>
                            <p className="text-stone-450 text-[10px] mb-4 leading-relaxed">
                              매장에 절실하게 필요한 냉동 벌크 식자재 브랜드,
                              규격화된 수입 제안 등을 올려주시면 전국 사장님들의
                              소중한 한 표가 모아 자사 수입 협상력으로
                              작동합니다.
                            </p>

                            <form
                              onSubmit={handleAddCommunityPost}
                              className="space-y-4"
                            >
                              <div>
                                <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">
                                  매장명 / 사장님 존함
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={newCommAuthor}
                                  onChange={(e) =>
                                    setNewCommAuthor(e.target.value)
                                  }
                                  placeholder="예: 망원 브레드룸 지점장"
                                  className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">
                                  건의 제안 제목
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={newCommTitle}
                                  onChange={(e) =>
                                    setNewCommTitle(e.target.value)
                                  }
                                  placeholder="예: 프랑스 포리쉐 수입 밀가루 T55 소분 계약 건의"
                                  className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">
                                  상세 협력 제안내용
                                </label>
                                <textarea
                                  required
                                  rows={4}
                                  value={newCommContent}
                                  onChange={(e) =>
                                    setNewCommContent(e.target.value)
                                  }
                                  placeholder="희망 규격 및 대량 공동 구매시 예상 소화 박스, 자사 유통망 경유 희망 이유를 설득력 있게 서술해 주시면 사장님들이 더 많이 추천합니다."
                                  className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none font-medium"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(249,115,22,0.25)] cursor-pointer"
                              >
                                사장님 실시간 보드 공개 전송
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ============================================== */}
                    {/* 2) 에브리베이크 알뜰 광장 뷰                    */}
                    {/* ============================================== */}
                    {activeMainTab === "flea-market" && (
                      <div className="space-y-6">
                        {selectedPlazaPostId ? (
                          /* ============================================== */
                          /* A. 알뜰 광장 상세 대리인 및 실시간 거래 채팅 피드 */
                          /* ============================================== */
                          (() => {
                            const post = plazaPosts.find(
                              (p) => p.id === selectedPlazaPostId,
                            );
                            if (!post)
                              return (
                                <p className="text-center">
                                  게시글을 찾을 수 없습니다.
                                </p>
                              );
                            return (
                              <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 animate-fade-in space-y-6">
                                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-stone-100 pb-5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPlazaPostId(null)}
                                    className="flex items-center gap-1.5 text-xs font-black text-[#f97316] hover:text-orange-600 bg-orange-50 hover:bg-orange-100 px-3.5 py-1.75 rounded-xl transition-all cursor-pointer"
                                  >
                                    <ChevronLeft className="w-4 h-4" /> 목록형
                                    광장으로 돌아가기
                                  </button>

                                  <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
                                    <span>등록일: {post.date}</span>
                                    <span>|</span>
                                    <span className="flex items-center gap-0.5 text-stone-500 font-bold">
                                      <MapPin className="w-3.5 h-3.5 text-stone-400" />{" "}
                                      {post.location}
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                  {/* Left Column: 상세 품목 공기안 및 계약 요약 */}
                                  <div className="lg:col-span-7 space-y-6">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-2">
                                        <span className="bg-orange-100 text-[#f97316] font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                                          {post.category === "coop" &&
                                            "📦 포장 자재 공동구매"}
                                          {post.category === "used" &&
                                            "🤝 단기 재고 중고장터"}
                                          {post.category === "share" &&
                                            "🎁 대용량 소분 무료나눔"}
                                          {post.category === "job" &&
                                            "🚨 당일 땜빵/알바 급구"}
                                        </span>
                                        <span className="text-xs text-emerald-600 font-extrabold">
                                          ● 모집/공구 진행중 (실시간)
                                        </span>
                                      </div>

                                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug">
                                        {post.title}
                                      </h2>

                                      <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3.5">
                                        <div className="flex items-center gap-2 text-xs font-bold text-stone-550">
                                          <User className="w-4 h-4 text-[#f97316]" />
                                          <span>
                                            작성 점주:{" "}
                                            <strong>{post.author}</strong>
                                          </span>
                                          <span className="text-stone-300">
                                            |
                                          </span>
                                          <span>
                                            구역 위치:{" "}
                                            <strong>{post.location}</strong>
                                          </span>
                                        </div>
                                        <p className="text-xs text-stone-600 leading-relaxed font-semibold whitespace-pre-wrap">
                                          {post.content}
                                        </p>
                                      </div>
                                    </div>

                                    {/* 세부 수치 데이터 박스 */}
                                    <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 space-y-4">
                                      <h4 className="text-xs font-black text-stone-850 flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4 text-[#f97316]" />{" "}
                                        광장 매칭 실시간 마일스톤
                                      </h4>

                                      <div className="grid grid-cols-2 gap-4">
                                        {post.priceInfo && (
                                          <div className="bg-white p-3.5 rounded-xl border border-stone-150">
                                            <span className="block text-[10px] text-stone-400 font-bold">
                                              공급 제안 단가
                                            </span>
                                            <span className="text-sm font-black text-stone-900 font-mono mt-0.5 block">
                                              {post.priceInfo}
                                            </span>
                                          </div>
                                        )}
                                        {post.targetAmount && (
                                          <div className="bg-white p-3.5 rounded-xl border border-stone-150">
                                            <span className="block text-[10px] text-stone-400 font-bold">
                                              목표 수주량 / 분량
                                            </span>
                                            <span className="text-sm font-black text-stone-900 font-mono mt-0.5 block">
                                              {post.targetAmount}
                                            </span>
                                          </div>
                                        )}
                                        {post.urgentsInfo && (
                                          <div className="bg-white p-3.5 rounded-xl border border-stone-150 col-span-2">
                                            <span className="block text-[10px] text-stone-400 font-bold">
                                              일정 조율 및 우대 조건
                                            </span>
                                            <span className="text-xs font-extrabold text-[#f97316] mt-0.5 block">
                                              {post.urgentsInfo}
                                            </span>
                                          </div>
                                        )}
                                      </div>

                                      <div className="space-y-2 pt-2 border-t border-orange-100/50">
                                        <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                                          <span>
                                            현재 매장 참여율 (
                                            {post.participantsCount}개 매장
                                            확보)
                                          </span>
                                          <span className="text-[#f97316]">
                                            {post.participantsCount > 4
                                              ? "공구 성사 확률 98%!"
                                              : "추가 참여 대기"}
                                          </span>
                                        </div>
                                        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-250">
                                          <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-[#f97316] transition-all duration-500"
                                            style={{
                                              width: `${Math.min(100, (post.participantsCount / 8) * 100)}%`,
                                            }}
                                          />
                                        </div>
                                        <p className="text-[10px] text-stone-400 font-bold">
                                          목표 인원/매장 도달 시 EveryBake
                                          스마트 전용 즉시 배송 바우처가 자동
                                          활성화됩니다.
                                        </p>
                                      </div>

                                      {/* Interactive Join / Participate Button */}
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleJoinPlazaPost(post.id)
                                        }
                                        className={`w-full py-3.5 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                                          post.joinedByMe
                                            ? "bg-stone-150 hover:bg-stone-200 text-stone-700 border border-stone-300"
                                            : "bg-[#f97316] hover:bg-orange-600 text-white shadow-md hover:shadow-lg"
                                        }`}
                                      >
                                        {post.joinedByMe
                                          ? "🤝 나의 매장 광장 참여 취소하기"
                                          : "🤝 여기에 내 가게도 무상 즉시 참전하기"}
                                      </button>
                                    </div>
                                  </div>

                                  {/* Right Column: 세부 실시간 대화식 스레드 (댓글) */}
                                  <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-6 space-y-5">
                                    <div className="border-b border-stone-150 pb-3 flex justify-between items-center">
                                      <h3 className="text-xs font-black text-stone-900">
                                        💬 점주 및 업체간 조율 스레드 (
                                        {post.comments.length}개)
                                      </h3>
                                      <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                        LIVE STREAMING
                                      </span>
                                    </div>

                                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 divide-y divide-stone-200/50">
                                      {post.comments.map((comment) => (
                                        <div
                                          key={comment.id}
                                          className="pt-3.5 first:pt-0 space-y-1"
                                        >
                                          <div className="flex justify-between items-baseline">
                                            <div className="flex items-center gap-1">
                                              <span className="text-xs font-extrabold text-stone-850">
                                                {comment.author}
                                              </span>
                                              <span className="text-[8px] bg-stone-150 text-stone-500 font-black px-1.5 py-0.2 rounded">
                                                {comment.role}
                                              </span>
                                            </div>
                                            <span className="text-[9px] text-stone-400 font-mono font-bold">
                                              {comment.date}
                                            </span>
                                          </div>
                                          <p className="text-xs text-stone-605 leading-relaxed font-semibold">
                                            {comment.content}
                                          </p>
                                        </div>
                                      ))}

                                      {post.comments.length === 0 && (
                                        <p className="text-xs text-stone-400 text-center py-8">
                                          아직 공동의 대화가 없습니다. 첫 대화를
                                          제언해 보십시오!
                                        </p>
                                      )}
                                    </div>

                                    {/* 댓글 작성란 양식 */}
                                    <form
                                      onSubmit={(e) =>
                                        handleAddPlazaComment(post.id, e)
                                      }
                                      className="bg-white border border-stone-200 rounded-xl p-3 space-y-3 shadow-xs"
                                    >
                                      <div className="flex items-center gap-2">
                                        <label className="text-[9px] font-extrabold text-stone-400 uppercase">
                                          점주명 / 매장명
                                        </label>
                                        <input
                                          type="text"
                                          value={newPlazaCommentAuthor}
                                          onChange={(e) =>
                                            setNewPlazaCommentAuthor(
                                              e.target.value,
                                            )
                                          }
                                          placeholder="예: 망원 크로플점주 (미기입시 익명)"
                                          className="w-full text-[10px] font-bold text-stone-800 border-none outline-none p-0 focus:ring-0 placeholder-stone-300"
                                        />
                                      </div>
                                      <div className="relative">
                                        <textarea
                                          required
                                          rows={2}
                                          value={newPlazaCommentText}
                                          onChange={(e) =>
                                            setNewPlazaCommentText(
                                              e.target.value,
                                            )
                                          }
                                          placeholder="참여 수량이나 질문 혹은 '몇 명 참가할의사 남깁니다!' 등의 대화를 나누어 보세요."
                                          className="w-full text-xs font-medium text-stone-750 border-none outline-none p-0 pr-10 focus:ring-0 placeholder-stone-350 resize-none"
                                        />
                                        <button
                                          type="submit"
                                          className="absolute right-0 bottom-0 p-1.5 bg-[#f97316] text-white hover:bg-orange-650 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                                        >
                                          <Send className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          /* ============================================== */
                          /* B. 알뜰 광장 메인 리스트 및 공동구매/구인 글쓰기 폼 */
                          /* ============================================== */
                          <div className="space-y-6">
                            {/* Al-tteul Plaza Sub-Category Tabs */}
                            <div className="flex flex-wrap gap-2.5 bg-stone-100 p-1.5 rounded-2xl w-full border border-stone-200">
                              {[
                                {
                                  id: "coop",
                                  label: "📦 포장자재 공동구매",
                                  desc: "박스/비닐백 도매 합산",
                                },
                                {
                                  id: "used",
                                  label: "🤝 단기 재고 중고장터",
                                  desc: "도구 교환 및 아울렛",
                                },
                                {
                                  id: "share",
                                  label: "🎁 부재료 소분 무료나눔",
                                  desc: "대량 유기농 원재료 소분",
                                },
                                {
                                  id: "job",
                                  label: "🚨 당일 땜빵 제빵인력",
                                  desc: "구인 긴급 조달 땜빵",
                                },
                              ].map((subCat) => (
                                <button
                                  key={subCat.id}
                                  type="button"
                                  onClick={() =>
                                    setActivePlazaTab(subCat.id as any)
                                  }
                                  className={`flex-1 min-w-[130px] text-center px-4 py-3 rounded-xl transition-all cursor-pointer ${
                                    activePlazaTab === subCat.id
                                      ? "bg-white text-[#f97316] font-extrabold shadow-sm text-xs border border-stone-200"
                                      : "text-stone-605 hover:bg-white/50 text-xs font-bold border border-transparent"
                                  }`}
                                >
                                  <p className="font-extrabold">
                                    {subCat.label}
                                  </p>
                                  <p className="text-[9px] text-stone-400 mt-0.5 font-semibold">
                                    {subCat.desc}
                                  </p>
                                </button>
                              ))}
                            </div>

                            {/* 광장 목록 정보 그리드 */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                              {/* Left Column: 게시글 목록 */}
                              <div className="lg:col-span-7 space-y-4">
                                <div className="flex justify-between items-center bg-stone-50 border border-stone-200 p-3 rounded-xl">
                                  <span className="text-xs font-extrabold text-stone-600 uppercase tracking-wider">
                                    목록 결과 현황 (
                                    {
                                      plazaPosts.filter(
                                        (p) => p.category === activePlazaTab,
                                      ).length
                                    }
                                    개 가맹점)
                                  </span>
                                  <span className="text-[10px] text-[#f97316] font-bold">
                                    전국 지점 제휴 우대 정책
                                  </span>
                                </div>

                                <div className="space-y-4.5">
                                  {plazaPosts
                                    .filter(
                                      (p) => p.category === activePlazaTab,
                                    )
                                    .map((post) => (
                                      <div
                                        key={post.id}
                                        onClick={() =>
                                          setSelectedPlazaPostId(post.id)
                                        }
                                        className="bg-white p-5.5 rounded-2xl border border-stone-200 hover:border-[#f97316] shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3 relative"
                                      >
                                        <div className="flex justify-between items-start">
                                          <div className="flex items-center gap-1.5">
                                            <span className="text-[9px] font-black uppercase bg-stone-100 text-stone-600 px-2 py-0.5 rounded border border-stone-200">
                                              {post.location}
                                            </span>
                                            {post.priceInfo && (
                                              <span className="text-[9px] font-black bg-orange-50 text-[#f97316] px-2 py-0.5 rounded border border-orange-100 font-mono">
                                                {post.priceInfo}
                                              </span>
                                            )}
                                          </div>
                                          <span className="text-[10px] text-stone-400 font-mono">
                                            {post.date}
                                          </span>
                                        </div>

                                        <div className="space-y-1">
                                          <h4 className="text-sm sm:text-base font-black text-stone-900 group-hover:text-[#f97316] transition-colors leading-snug">
                                            {post.title}
                                          </h4>
                                          <p className="text-xs text-stone-500 font-semibold line-clamp-2 leading-relaxed">
                                            {post.content}
                                          </p>
                                        </div>

                                        <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-[11px] text-stone-400 font-bold">
                                          <div className="flex items-center gap-1 text-stone-600">
                                            <User className="w-3.5 h-3.5 text-stone-400" />
                                            <span>{post.author}</span>
                                          </div>

                                          <div className="flex items-center gap-3">
                                            <span>
                                              참여 매장{" "}
                                              <strong className="text-stone-850">
                                                {post.participantsCount}개
                                              </strong>
                                            </span>
                                            <span className="text-stone-200">
                                              |
                                            </span>
                                            <span className="text-[#f97316] bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-orange-100 text-[10px]">
                                              <MessageSquare className="w-3 h-3" />{" "}
                                              댓글 {post.comments.length}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>

                              {/* Right Column: 알뜰 광장 직접 제안하기 등록 폼 */}
                              <div className="lg:col-span-12 xl:col-span-5 bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-950 shadow-xl space-y-5">
                                <div className="space-y-1.5">
                                  <h3 className="text-xs font-black tracking-widest text-[#f97316] uppercase">
                                    🛒 알뜰 광장 점주 모집 공지글 등록
                                  </h3>
                                  <p className="text-stone-400 text-[10px] leading-relaxed">
                                    공동구매 물량 조율이나 중고 자재의 판매 건,
                                    부재료 무상 나눔 제안, 긴급 당일 일손 보조
                                    충원 요구까지! 상세 양식을 배포하면 전 가맹
                                    채널에 실시간 푸쉬 가이드가 작동합니다.
                                  </p>
                                </div>

                                <form
                                  onSubmit={handleCreatePlazaPost}
                                  className="space-y-4"
                                >
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                        상호명 / 점주님 존함
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={newPlazaAuthor}
                                        onChange={(e) =>
                                          setNewPlazaAuthor(e.target.value)
                                        }
                                        placeholder="예: 상수 베이킹웍스 점주"
                                        className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                        상업 구역 (시/군)
                                      </label>
                                      <input
                                        type="text"
                                        required
                                        value={newPlazaLocation}
                                        onChange={(e) =>
                                          setNewPlazaLocation(e.target.value)
                                        }
                                        placeholder="예: 서울 마포구 상암동"
                                        className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                      모집 공지글 제목
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={newPlazaTitle}
                                      onChange={(e) =>
                                        setNewPlazaTitle(e.target.value)
                                      }
                                      placeholder={
                                        activePlazaTab === "coop"
                                          ? "예: 무지 크라프트 포장백 5만장 대량 도매 공구(45% 다운)"
                                          : activePlazaTab === "used"
                                            ? "예: 리치몬드 도우쉐이퍼 (15kg용) 중고 인하 판매"
                                            : activePlazaTab === "share"
                                              ? "예: 가든 허브 건조 분말 (5kg 분량) 무료 소분 나눔합니다"
                                              : "예: 이번주 토요일 새벽 단기 제빵 보조 일손 구합니다 (시급 1.3만)"
                                      }
                                      className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                      원부자재 및 긴급 땜빵 설명
                                    </label>
                                    <textarea
                                      required
                                      rows={3}
                                      value={newPlazaContent}
                                      onChange={(e) =>
                                        setNewPlazaContent(e.target.value)
                                      }
                                      placeholder="상세한 공구 협량 사항이나 상태 사양, 근무 시각 등 요구 조건을 전달해 주세요."
                                      className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white p-3 focus:ring-1 focus:ring-[#f97316] outline-hidden resize-none font-medium"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-800">
                                    <div>
                                      <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                        유지단가 / 시급 제안
                                      </label>
                                      <input
                                        type="text"
                                        value={newPlazaPriceInfo}
                                        onChange={(e) =>
                                          setNewPlazaPriceInfo(e.target.value)
                                        }
                                        placeholder="예: 시급 13,000원 / 박스당 1.2만"
                                        className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                        목표 물량 / 필요 시각
                                      </label>
                                      <input
                                        type="text"
                                        value={newPlazaTargetAmount}
                                        onChange={(e) =>
                                          setNewPlazaTargetAmount(
                                            e.target.value,
                                          )
                                        }
                                        placeholder="예: 200박스 한도 / 선착순 5점포"
                                        className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">
                                      작성자 상세 요구 조건 (우대/일정)
                                    </label>
                                    <input
                                      type="text"
                                      value={newPlazaUrgentsInfo}
                                      onChange={(e) =>
                                        setNewPlazaUrgentsInfo(e.target.value)
                                      }
                                      placeholder="예: 근거리 매점 사장님 직인 선호 / 동종 업계 경력 우대"
                                      className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    className="w-full py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(249,115,22,0.25)] cursor-pointer"
                                  >
                                    광장 실시간 보드에 배포하기
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================== */}
                    {/* 3) 빵집 인테리어 견적 매칭 뷰                     */}
                    {/* ============================================== */}
                    {activeMainTab === "interior" && (
                      <div className="space-y-6 animate-fade-in">
                        {selectedPlazaPostId ? (
                          /* ============================================== */
                          /* A. 인테리어 시공 요청 상세와 전문업체들의 역경매 비딩 현황 */
                          /* ============================================== */
                          (() => {
                            const post = plazaPosts.find(
                              (p) => p.id === selectedPlazaPostId,
                            );
                            if (!post)
                              return (
                                <p className="text-center">
                                  요청글을 찾을 수 없습니다.
                                </p>
                              );

                            return (
                              <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
                                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-stone-100 pb-5">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedPlazaPostId(null)}
                                    className="flex items-center gap-1.5 text-xs font-black text-[#f97316] hover:text-orange-655 bg-orange-50 hover:bg-orange-100 px-3.5 py-1.75 rounded-xl transition-all cursor-pointer"
                                  >
                                    <ChevronLeft className="w-4 h-4" /> 프로젝트
                                    목록으로 가기
                                  </button>

                                  <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
                                    <span>접수 코드: {post.id}</span>
                                    <span>|</span>
                                    <span className="flex items-center gap-0.5 text-stone-500 font-bold">
                                      <MapPin className="w-3.5 h-3.5" />{" "}
                                      {post.location}
                                    </span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                  {/* Left Column: 사장님의 인테리어 보수 설계 제안서 요약 */}
                                  <div className="lg:col-span-6 space-y-5">
                                    <div className="space-y-3">
                                      <span className="bg-stone-900 text-white font-black text-[9px] px-2.5 py-1 rounded inline-block">
                                        🛠️ 실시간 비교 역비딩 진행 중
                                      </span>
                                      <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                                        {post.title}
                                      </h2>
                                    </div>

                                    <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl space-y-4">
                                      <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
                                        <User className="w-4 h-4 text-[#f97316]" />
                                        <span>
                                          의뢰 점주:{" "}
                                          <strong>{post.author}</strong>
                                        </span>
                                      </div>

                                      <p className="text-xs text-stone-605 leading-relaxed font-semibold whitespace-pre-wrap">
                                        {post.content}
                                      </p>

                                      {post.detailInfo && (
                                        <div className="pt-3 border-t border-stone-200 space-y-1.5">
                                          <span className="text-[10px] uppercase font-bold text-stone-400 block">
                                            원하는 소재 규격 및 특이사항
                                          </span>
                                          <p className="text-xs text-stone-600/90 font-medium leading-relaxed bg-white p-3 rounded-xl border border-stone-150">
                                            {post.detailInfo}
                                          </p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3.5">
                                      <h4 className="text-xs font-black text-stone-850 flex items-center gap-1.5">
                                        📌 점주 예산 한도선 및 타겟정보
                                      </h4>
                                      <div className="space-y-2 text-xs font-bold text-stone-700">
                                        <div className="flex justify-between">
                                          <span>지정구역 한도 범위:</span>
                                          <span className="text-stone-950 font-mono text-sm font-black">
                                            {post.urgentsInfo || "협의 조율"}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>희망 시공 완료 일수:</span>
                                          <span className="text-stone-900">
                                            도면 확정 후 3일 이내 초단기 시공
                                            완결
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>시스템 가이드 적용여부:</span>
                                          <span className="text-emerald-700">
                                            EveryBake 프랜즈 표준 매뉴얼 컬러
                                            테마 준수
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Column: 공인 인테리어 업체사장님들의 역견적 비딩 스트림 */}
                                  <div className="lg:col-span-6 bg-[#f8fafc] border border-blue-105 rounded-2xl p-4 sm:p-6 space-y-5">
                                    <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
                                      <div>
                                        <h3 className="text-xs font-black text-[#1e3a8a] flex items-center gap-1">
                                          🔧 공인 인테리어 도장/도색 전문 비딩
                                          스레드
                                        </h3>
                                        <p className="text-[9px] text-[#2563eb] font-bold mt-0.5">
                                          매칭 성사 시 무상 하자 보증 2년 자동
                                          특약 발송
                                        </p>
                                      </div>
                                      <span className="text-[9px] text-white font-extrabold bg-[#2563eb] px-2 py-0.5 rounded shadow-sm">
                                        BIDS ACTIVE ({post.comments.length})
                                      </span>
                                    </div>

                                    {/* 역경매 입찰 카드 형태로 고퀄 가시성 연출 */}
                                    <div className="space-y-4 max-h-[430px] overflow-y-auto pr-2 divide-y divide-stone-200/40">
                                      {post.comments.map((comment) => {
                                        const isProfessional =
                                          comment.role.includes("업체") ||
                                          comment.author.includes("디자인") ||
                                          comment.author.includes("아트") ||
                                          comment.author.includes("연우") ||
                                          comment.author.includes("클래스");
                                        return (
                                          <div
                                            key={comment.id}
                                            className="pt-4 first:pt-0 space-y-2.5"
                                          >
                                            <div className="flex justify-between items-start">
                                              <div className="space-y-0.5">
                                                <div className="flex items-center gap-1.5">
                                                  <span className="text-xs font-black text-stone-900">
                                                    {isProfessional
                                                      ? `🏆 ${comment.author}`
                                                      : comment.author}
                                                  </span>
                                               
                                                  <span
                                                    className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${
                                                      isProfessional
                                                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                                                        : "bg-stone-100 text-stone-500"
                                                    }`}
                                                  >
                                                    {comment.role}
                                                  </span>
                                                </div>
                                                {isProfessional && (
                                                  <div className="flex items-center gap-1 text-[9px] text-amber-500 font-extrabold">
                                                    <span>⭐⭐⭐⭐⭐</span>
                                                    <span className="text-stone-400 font-normal">
                                                      | 공인 빌더인정
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                              <span className="text-[10px] text-stone-400 font-mono">
                                                {comment.date}
                                              </span>
                                            </div>

                                            {/* 업체 견적 제안 상세 및 컨택 가이드 */}
                                            <div
                                              className={`p-4 rounded-xl text-xs font-semibold leading-relaxed border ${
                                                isProfessional
                                                  ? "bg-white border-blue-100 text-stone-700 shadow-xs"
                                                  : "bg-stone-50 border-stone-200 text-stone-605"
                                              }`}
                                            >
                                              <p className="whitespace-pre-wrap">
                                                {comment.content}
                                              </p>

                                              {isProfessional && (
                                                <div className="mt-3 pt-2.5 border-t border-dashed border-stone-150 flex justify-between items-center text-[10px]">
                                                  <span className="text-emerald-700 font-bold block">
                                                    ↳ 24시간 내 무상 가맹 실측
                                                    대응
                                                  </span>
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      alert(
                                                        "선택업체와 보안 전용 스마트 실시간 상담 창이 활성화되었습니다.",
                                                      )
                                                    }
                                                    className="text-[#2563eb] hover:underline font-black bg-transparent border-none p-0 cursor-pointer flex items-center gap-0.5 text-[10px]"
                                                  >
                                                    상세 견적 조율 창 개설하기
                                                    &rarr;
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}

                                      {post.comments.length === 0 && (
                                        <p className="text-xs text-stone-400 text-center py-8">
                                          접수된 전문 업체의 견적이 없습니다.
                                          우측 폼으로 입찰을 진행해 보십시오.
                                        </p>
                                      )}
                                    </div>

                                    {/* 전문업체 견적 입찰 참여 양식 폼 */}
                                    <form
                                      onSubmit={(e) =>
                                        handleAddPlazaComment(post.id, e)
                                      }
                                      className="bg-white border border-[#2563eb]/20 rounded-xl p-3 space-y-3.5 shadow-sm"
                                    >
                                      <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="flex-1 flex items-center gap-1.5">
                                          <label className="text-[8px] font-black text-stone-400 uppercase tracking-tighter shrink-0">
                                            입찰 참여자/디자인사
                                          </label>
                                          <input
                                            type="text"
                                            value={newPlazaCommentAuthor}
                                            onChange={(e) =>
                                              setNewPlazaCommentAuthor(
                                                e.target.value,
                                              )
                                            }
                                            placeholder="예: 공간디자인 탑클래스"
                                            className="w-full text-xs font-bold text-stone-950 border-b border-stone-200 focus:border-[#2563eb] outline-none p-1 placeholder-stone-300 bg-transparent"
                                          />
                                        </div>
                                      </div>
                                      <div className="relative">
                                        <textarea
                                          required
                                          rows={3}
                                          value={newPlazaCommentText}
                                          onChange={(e) =>
                                            setNewPlazaCommentText(
                                              e.target.value,
                                            )
                                          }
                                          placeholder="인테리어 제원 제안 사양과 실시간 총 견적 제안 (예: 250만원 제안), 2년 AS 무상 혜택 적용 여부를 자유롭게 설명 기입하세요."
                                          className="w-full text-xs font-semibold text-stone-700 border-none outline-none p-0 pr-12 focus:ring-0 placeholder-stone-350 resize-none leading-relaxed"
                                        />
                                        <button
                                          type="submit"
                                          className="absolute right-0 bottom-0 py-2 px-3 bg-[#2563eb] text-white hover:bg-blue-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-black shadow"
                                        >
                                          <span>견적 입찰등록</span>
                                          <Send className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            );
                          })()
                        ) : (
                          /* ============================================== */
                          /* B. 인테리어 시공 의뢰 프로젝트 목록 및 긴급 역경매 접수 폼 */
                          /* ============================================== */
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                            {/* Left Column: 사장님들의 인테리어 수리/시공 요청목록 (정확히 5개 가맹점 탑칩) */}
                            <div className="lg:col-span-7 space-y-4">
                              <div className="flex justify-between items-center bg-stone-50 border border-stone-200 p-3.5 rounded-xl">
                                <span className="text-xs font-extrabold text-stone-600 uppercase tracking-wider">
                                  실시간 시공의뢰 매칭 현황 (
                                  {
                                    plazaPosts.filter(
                                      (p) => p.category === "interior",
                                    ).length
                                  }
                                  개 프로젝트)
                                </span>
                                <span className="text-[10px] text-[#f97316] font-bold">
                                  공인 시공 파트너 비딩
                                </span>
                              </div>

                              <div className="grid grid-cols-1 gap-4">
                                {plazaPosts
                                  .filter((p) => p.category === "interior")
                                  .map((post) => (
                                    <div
                                      key={post.id}
                                      onClick={() =>
                                        setSelectedPlazaPostId(post.id)
                                      }
                                      className="bg-white p-5.5 rounded-2xl border border-stone-200 hover:border-[#f97316] shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer group space-y-3.5"
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black uppercase text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-md">
                                          의뢰구역: {post.location}
                                        </span>
                                        <span className="text-[10px] bg-orange-50 text-[#f97316] px-2.5 py-0.5 rounded-full font-black font-mono border border-orange-100">
                                          {post.urgentsInfo || "협의 조율"}
                                        </span>
                                      </div>

                                      <div className="space-y-1">
                                        <h4 className="text-sm sm:text-base font-black text-stone-900 group-hover:text-[#f97316] transition-colors leading-snug">
                                          {post.title}
                                        </h4>
                                        <p className="text-xs text-stone-500 font-semibold line-clamp-2 leading-relaxed">
                                          {post.content}
                                        </p>
                                      </div>

                                      <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-[11px] text-stone-400 font-bold">
                                        <span>
                                          작성 점주:{" "}
                                          <strong className="text-stone-850">
                                            {post.author}
                                          </strong>
                                        </span>
                                        <span className="text-blue-700 bg-blue-50 border border-blue-105 px-2 py-0.5 rounded-md flex items-center gap-0.5 text-[10px]">
                                          🏆 업체 제안 {post.comments.length}개
                                          비딩중
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>

                            {/* Right Column: 신규 시공의뢰 설계 등록 폼 */}
                            <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/85 shadow-md space-y-4">
                              <div>
                                <h3 className="text-xs font-black text-stone-950 flex items-center gap-1">
                                  🛠️ 가맹 신규 시공/유지보수 실시간 의뢰 양식
                                </h3>
                                <p className="text-stone-400 text-[10px] leading-relaxed mt-1">
                                  쇼케이스 유리가 고장났거나 부분 도장 및 파사드
                                  오렌지 아크릴 컬러 도색, 매장 전선 배관 설비
                                  교체 등 견적 제안이 절실한 모든 보수 기획안을
                                  남기세요.
                                </p>
                              </div>

                              <form
                                onSubmit={handleCreatePlazaPost}
                                className="space-y-4"
                              >
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">
                                      상호 / 의뢰자
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={newPlazaAuthor}
                                      onChange={(e) =>
                                        setNewPlazaAuthor(e.target.value)
                                      }
                                      placeholder="예: 영등포 크로플팩토리 점주"
                                      className="w-full text-xs rounded-xl border border-stone-250 bg-[#ffffff] px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">
                                      시공 지역 (시/구)
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      value={newPlazaLocation}
                                      onChange={(e) =>
                                        setNewPlazaLocation(e.target.value)
                                      }
                                      placeholder="예: 서울 영등포구 당산동"
                                      className="w-full text-xs rounded-xl border border-stone-250 bg-[#ffffff] px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">
                                    시공의뢰 한글 설명 제목
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={newPlazaTitle}
                                    onChange={(e) =>
                                      setNewPlazaTitle(e.target.value)
                                    }
                                    placeholder="예: [부분 도장] 파사드 하이샷시 프레임을 에브리 오렌지 컬러로 도색 의뢰"
                                    className="w-full text-xs rounded-xl border border-stone-250 bg-[#ffffff] px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">
                                    필요한 하드웨어 시공/의뢰설명
                                  </label>
                                  <textarea
                                    required
                                    rows={3}
                                    value={newPlazaContent}
                                    onChange={(e) =>
                                      setNewPlazaContent(e.target.value)
                                    }
                                    placeholder="노후된 부분을 찍은 사진 규격이나 외부 도색 부위에 대한 구체적인 자재 사양, 혹은 전선 배선 설비 길이 등을 서술하십시오."
                                    className="w-full text-xs rounded-xl border border-stone-250 bg-[#ffffff] p-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none font-medium"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-100">
                                  <div>
                                    <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">
                                      희망 시공 완료 일수
                                    </label>
                                    <input
                                      type="text"
                                      value={newPlazaTargetAmount}
                                      onChange={(e) =>
                                        setNewPlazaTargetAmount(e.target.value)
                                      }
                                      placeholder="예: 다음주 수요일 야간 시공 희망"
                                      className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                    />
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="w-full py-3.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                                >
                                  공인 시공 망에 비교 견적 접수하기
                                </button>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ============================================== */}
                    {/* 4) 에베 고민창구 뷰                              */}
                    {/* ============================================== */}
                    {activeMainTab === "trouble" && (
                      <div className="space-y-6 animate-fade-in text-left">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                          {/* Left Column: 고민 피드 리스트 */}
                          <div className="lg:col-span-7 space-y-4 font-sans">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-extrabold text-stone-500 uppercase tracking-widest">
                                에베 고민 피드 (
                                {
                                  communityPosts.filter(
                                    (p) => p.category === "trouble",
                                  ).length
                                }
                                개)
                              </span>
                              <span className="text-[10px] text-[#f97316] font-bold">
                                동료 점주 상생 피드백 & 본사 안심답변
                              </span>
                            </div>

                            {communityPosts.filter(
                              (p) => p.category === "trouble",
                            ).length === 0 ? (
                              <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3">
                                <span className="text-4xl text-stone-300">
                                  💬
                                </span>
                                <h4 className="text-stone-800 font-bold">
                                  등록된 점주 고민이 아직 없습니다
                                </h4>
                                <p className="text-xs text-stone-400">
                                  우측 폼을 이용해 첫 번째로 사장님의 깊은
                                  고민을 동료들과 나누어 보세요!
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {communityPosts
                                  .filter((p) => p.category === "trouble")
                                  .map((post) => (
                                    <div
                                      key={post.id}
                                      className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-4 text-left"
                                    >
                                      <div className="flex justify-between items-start">
                                        <span
                                          className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                                            post.status.includes("답변 완료")
                                              ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                                              : "bg-amber-50 text-amber-700 border border-amber-100"
                                          }`}
                                        >
                                          {post.status}
                                        </span>
                                        <span className="text-[10px] text-stone-400 font-mono">
                                          {post.date}
                                        </span>
                                      </div>

                                      <div className="space-y-1.5">
                                        <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">
                                          {post.title}
                                        </h3>
                                        <p className="text-xs text-stone-600 leading-relaxed font-semibold whitespace-pre-wrap">
                                          {post.content}
                                        </p>
                                      </div>

                                      {/* Answers/replies list */}
                                      {post.replies && post.replies.length > 0 && (
                                        <div className="pt-3 border-t border-stone-100 space-y-3">
                                          {post.replies.map((reply) => (
                                            <div
                                              key={reply.id}
                                              className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/60"
                                            >
                                              <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-[10px] font-black text-stone-800 flex items-center gap-1">
                                                  <span>{reply.author.includes("본사") ? "🏢" : "💬"}</span>{" "}
                                                  {reply.author}
                                                </span>
                                                <span className="text-[9px] text-stone-400 font-mono">
                                                  {reply.date}
                                                </span>
                                              </div>
                                              <p className="text-xs text-stone-650 leading-relaxed font-semibold">
                                                {reply.content}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      )}

                                      {/* Gomin replies feed form */}
                                      <form
                                        onSubmit={(e) => {
                                          e.preventDefault();
                                          const form = e.target as HTMLFormElement;
                                          const input = form.elements.namedItem("replyContent") as HTMLInputElement;
                                          if (!input.value.trim()) return;
                                          setCommunityPosts(prev =>
                                            prev.map(p => {
                                              if (p.id === post.id) {
                                                const newRep = {
                                                  id: `rep-${Date.now()}`,
                                                  author: `${userStoreName || "에베인 정회원 매장"}`,
                                                  content: input.value.trim(),
                                                  date: "방금 전"
                                                };
                                                return {
                                                  ...p,
                                                  replies: [...(p.replies || []), newRep]
                                                };
                                              }
                                              return p;
                                            })
                                          );
                                          input.value = "";
                                        }}
                                        className="flex gap-2"
                                      >
                                        <input
                                          type="text"
                                          name="replyContent"
                                          required
                                          placeholder="동료 점주로서 지혜 한마디 또는 위로 답글을 남겨주세요."
                                          className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-hidden font-medium"
                                        />
                                        <button
                                          type="submit"
                                          className="px-3.5 py-2 bg-stone-900 hover:bg-black text-white text-[11px] font-black rounded-xl transition-all cursor-pointer"
                                        >
                                          등록
                                        </button>
                                      </form>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          {/* Right Column: 고민 작성 Form */}
                          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md text-left">
                            <h3 className="text-sm font-black text-stone-950 mb-1.5">
                              💬 점주 상생 고민 등록 창구
                            </h3>
                            <p className="text-[11px] text-stone-500 mb-5 leading-relaxed font-semibold">
                              혼자 앓는 고민은 병이 됩니다. 매장 운영 시 직면한 난제나 속상한 일을 익명성 보장 하에 전국의 에베인 패밀리들과 나누어 상생 피드백을 받아보세요.
                            </p>

                            <form onSubmit={handleCreateTroublePost} className="space-y-4">
                              <div>
                                <label className="block text-[9px] uppercase font-bold text-[#f97316] mb-1">
                                  직함 / 닉네임 (익명 가능)
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={newTroubleAuthor}
                                  onChange={(e) => setNewTroubleAuthor(e.target.value)}
                                  placeholder="예: 마포 신흥 제과점 장님 (or 익명 매장)"
                                  className="w-full text-xs rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2.5 focus:bg-white focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase font-bold text-[#f97316] mb-1">
                                  고민의 종류 / 제목
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={newTroubleTitle}
                                  onChange={(e) => setNewTroubleTitle(e.target.value)}
                                  placeholder="예: 구인난이 너무 심해 일요일 휴무를 고민하고 있습니다."
                                  className="w-full text-xs rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2.5 focus:bg-white focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                                />
                              </div>

                              <div>
                                <label className="block text-[9px] uppercase font-bold text-[#f97316] mb-1">
                                  가장 우려하는 고민 점주 설명
                                </label>
                                <textarea
                                  required
                                  rows={4}
                                  value={newTroubleContent}
                                  onChange={(e) => setNewTroubleContent(e.target.value)}
                                  placeholder="체인 계약, 구인난, 원재료비 급등 등 다른 사장님들이나 본사의 실마리가 필요한 상세 내역을 서술해 주세요."
                                  className="w-full text-xs rounded-xl border border-stone-200 bg-stone-50/50 p-3 focus:bg-white focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none font-medium"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full py-3.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                              >
                                우려 고민 사항 긴급 전송
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 7. RAW MATERIALS / INGREDIENTS VIEW                  */}
                {/* ==================================================== */}
                {currentView === "ingredients" && (
                  <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 뒤로가기
                    </button>

                    <div className="mb-8 space-y-2 text-left">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">
                        PREMIUM RAW MATERIALS
                      </span>
                      <h1 className="text-3xl font-black text-stone-900 tracking-tight">
                        엄선 원부자재 에베인 회원 직공급
                      </h1>
                      <p className="text-stone-550 text-sm">
                        베이커리 오븐 팽창과 풍미의 기틀이 되는 검증된 고품질
                        원부자재를 에베인 특별 우대 단가로 안전하게 수급하십시오.
                      </p>
                    </div>

                    {/* Ingredients Sub-category Filter Tabs */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {[
                        { id: "flour", label: "가루류 (밀가루/설호)" },
                        { id: "liquid", label: "부재료 (수분류)" },
                        { id: "fat", label: "유지류 (버터/쇼트닝)" },
                        { id: "sugar", label: "설탕/당류" },
                        { id: "ferment", label: "이스트/적하제" },
                        { id: "additive", label: "추가 부자재" },
                      ].map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedIngredientSubCat(sub.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                            selectedIngredientSubCat === sub.id
                              ? "bg-[#f97316] text-[#ffffff] shadow-xs"
                              : "bg-white hover:bg-stone-100 text-[#44403c] border border-stone-200"
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>

                    {/* Helpful notice box for Ingredients Category */}
                    <div className="bg-orange-50/75 border border-orange-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <p className="text-xs font-extrabold text-[#f97316] uppercase tracking-wider mb-0.5">
                          선택 분류 가이드
                        </p>
                        <p className="text-xs font-bold text-stone-750 font-sans">
                          {selectedIngredientSubCat === "flour" &&
                            "가루류 | 밀가루, 호밀가루, 아몬드분말 - 빵의 기본 골격과 구조 형성"}
                          {selectedIngredientSubCat === "liquid" &&
                            "액체류 (수분류) | 물, 우유, 생크림, 계란 - 반죽의 농도 조절 및 가루 밀가루 단백질 결합(수화) 보조"}
                          {selectedIngredientSubCat === "fat" &&
                            "유지류 | 버터, 마가린, 쇼트닝, 올리브유 - 생지 결 조직 연화, 글루텐 윤활, 볼륨감 및 촉촉한 보존 풍미 강화"}
                          {selectedIngredientSubCat === "sugar" &&
                            "당류 | 설탕, 꿀, 물엿, 올리고당 - 발효 균(이스트)의 직접 에너지원 제공, 메일라드 마감 및 완만하고 달달한 보수성 향상"}
                          {selectedIngredientSubCat === "ferment" &&
                            "발효/팽창제 | 이스트, 베이킹파우더, 천연발효종 - 가스 배출 및 기포를 형성해 반죽을 폭신하게 팽창시키는 베이커리의 핵심 작용"}
                          {selectedIngredientSubCat === "additive" &&
                            "부재료/첨가물 | 소금, 견과류, 건과일, 초콜릿 칩, 바닐라 향 - 소금의 글루텐 탄탄 보강 및 앙코르 풍미, 씹히는 식감/아로마 추가"}
                        </p>
                      </div>
                    </div>

                    {/* Ingredients Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      {INGREDIENTS_DATA.filter(
                        (item) => item.subCategory === selectedIngredientSubCat,
                      ).map((item) => {
                        // Determine colors based on brand types
                        let typeStyle =
                          "bg-emerald-50 text-emerald-700 border-emerald-100";
                        if (item.brandType === "프리미엄 수입") {
                          typeStyle =
                            "bg-amber-50 text-amber-700 border-amber-100";
                        } else if (item.brandType === "해외 전문") {
                          typeStyle =
                            "bg-violet-50 text-violet-700 border-violet-100";
                        } else if (item.brandType === "국산 명가") {
                          typeStyle =
                            "bg-rose-50 text-rose-750 border-rose-100";
                        }

                        return (
                          <div
                            key={item.id}
                            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                          >
                            <div>
                              {/* Top Visual slot */}
                              <div className="w-full h-36 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100 relative group overflow-hidden">
                                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                  {item.icon}
                                </span>
                                <span className="absolute bottom-2.5 right-2.5 text-[8.5px] font-black text-stone-400 font-mono bg-white border border-stone-200 px-2 py-0.5 rounded-full">
                                  {item.spec}
                                </span>
                              </div>

                              {/* Brand and category */}
                              <div className="flex items-center gap-1.5 mb-2.5">
                                <span
                                  className={`px-2 py-0.5 text-[9px] font-extrabold border rounded ${typeStyle}`}
                                >
                                  {item.brandType}
                                </span>
                                <span className="text-[10px] font-bold text-stone-400">
                                  {item.brand}
                                </span>
                              </div>

                              <h3 className="text-sm font-extrabold text-stone-900 leading-tight mb-2">
                                {item.name}
                              </h3>
                              <p className="text-[11px] text-[#78716c] font-semibold product-spec-font">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[9.5px] text-stone-400 font-semibold">
                                  에베인 회원 특별가
                                </span>
                                <span className="text-sm font-black text-stone-950">
                                  ₩ {item.price.toLocaleString()}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleAddCustomToCart(
                                    item.id,
                                    item.name,
                                    item.price,
                                    "bg-blue-50 text-blue-700",
                                    item.brand,
                                  )
                                }
                                className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-xs hover:shadow-sm"
                              >
                                에베인 담기
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Helpful Notice at the bottom of ingredients */}
                    <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="text-xs uppercase tracking-widest text-[#f97316] font-bold">
                          Safe & Smart Shipping Delivery
                        </p>
                        <h3 className="text-lg font-extrabold tracking-tight">
                          원부자재 및 스마트 도우 통합 온·습도 조절 일체 배송
                        </h3>
                        <p className="text-xs text-[#a8a29e] leading-relaxed font-semibold max-w-xl">
                          에브리베이크는 냉동 도우 생지의 냉각 상태뿐만 아니라
                          원부자재의 고유 품질(수분/산화 방지)까지 완벽 보존
                          장치된 냉장탑차로 스마트 원스톱 동시 일괄 출고 배송해
                          드립니다.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav("inquiry")}
                        className="bg-white hover:bg-stone-100 text-stone-950 px-5 py-2.5 rounded-xl text-xs font-black shrink-0 transition-transform active:scale-95 shadow-sm"
                      >
                        신규 원재료 입점 건의 ➔
                      </button>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 6. COFFEE STATION VIEW                               */}
                {/* ==================================================== */}
                {currentView === "coffee" && (
                  <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 뒤로가기
                    </button>

                    <div className="mb-8 space-y-2 text-left">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">
                        EVEIN COFFEE STATION
                      </span>
                      <h1 className="text-3xl font-black text-[#1c1917] tracking-tight">
                        상업용 기기 & 로스팅 스페셜티 원두
                      </h1>
                      <p className="text-stone-550 text-xs sm:text-sm">
                        대한민국 초일류 브루바 및 프랜차이즈에 공급되는 고스펙
                        머신과 WBC 입상 로스터 원두입니다. 에베인 특별 우대 혜택가로
                        단가로 제안합니다.
                      </p>
                    </div>

                    {/* Coffee Main Category Switcher Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 pb-4">
                      {[
                        { id: "machine", label: "상업용 머신/기기" },
                        { id: "bean", label: "단가 맞춤형 대용량 원두" },
                        { id: "barista", label: "바리스타 필수 소모품" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setSelectedCoffeeMainCat(cat.id);
                            setSelectedCoffeeSubCat("all");
                          }}
                          className={`px-4.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            selectedCoffeeMainCat === cat.id
                              ? "bg-[#1c1917] text-white shadow-md"
                              : "bg-white hover:bg-stone-100 text-[#44403c] border border-stone-200"
                          }`}
                        >
                          {cat.id === "machine"
                            ? "☕ "
                            : cat.id === "bean"
                              ? "🫘 "
                              : "🛠️ "}
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Coffee Sub-category Selection based on main category */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {selectedCoffeeMainCat === "machine" &&
                        [
                          { id: "all", label: "기기 전체" },
                          { id: "espresso", label: "에스프레소 머신" },
                          { id: "grinder", label: "그라인더" },
                          { id: "brewer", label: "자동 브루잉/기타" },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedCoffeeSubCat(sub.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              selectedCoffeeSubCat === sub.id
                                ? "bg-[#f97316] text-[#ffffff] shadow-xs"
                                : "bg-white hover:bg-stone-100 text-[#44403c] border border-stone-200"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}

                      {selectedCoffeeMainCat === "bean" &&
                        [
                          { id: "blend", label: "블렌드" },
                          { id: "single_origin", label: "싱글 오리진" },
                          { id: "decaf", label: "디카페인" },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedCoffeeSubCat(sub.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              selectedCoffeeSubCat === sub.id
                                ? "bg-[#f97316] text-white shadow-xs"
                                : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}

                      {selectedCoffeeMainCat === "barista" &&
                        [
                          { id: "supplies", label: "필터, 탬퍼, 세정제 등" },
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => setSelectedCoffeeSubCat(sub.id)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                              selectedCoffeeSubCat === sub.id
                                ? "bg-[#f97316] text-white shadow-xs"
                                : "bg-white hover:bg-stone-100 text-stone-700 border border-stone-200"
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                    </div>

                    {/* Helpful notice box for Coffee Category */}
                    <div className="bg-orange-50/75 border border-orange-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <p className="text-xs font-extrabold text-[#f97316] uppercase tracking-wider mb-0.5">
                          선택 분류 전문 정보
                        </p>
                        <div className="text-xs font-bold text-stone-750">
                          {selectedCoffeeMainCat === "machine" &&
                            "상업용 커피 머신/기기 | 고온 스팀 연속 추출에 최적형 성능 및 전국 긴급 A/S 상시 네트워크 제공"}
                          {selectedCoffeeMainCat === "bean" &&
                            "스마트 단가 로스팅 원두 | 유명 생산지 및 WBC 로스팅 스페셜티 단가 압축으로 매장 마진 25% 이상 향상 제공"}
                          {selectedCoffeeMainCat === "barista" &&
                            "바리스타 전문 용품 | 추출 채널링 완벽 예방 및 에스프레소 추출구 3역 청결 유지 가성비 묶음 패키지"}
                        </div>
                      </div>
                    </div>

                    {/* Coffee Products Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                      {COFFEE_DATA.filter((item) => {
                        const matchesMain =
                          item.mainCategory === selectedCoffeeMainCat;
                        const matchesSub =
                          selectedCoffeeSubCat === "all" ||
                          item.subCategory === selectedCoffeeSubCat;
                        return matchesMain && matchesSub;
                      }).map((item) => {
                        let typeStyle =
                          "bg-orange-50 text-orange-700 border-orange-105";
                        if (item.brandType === "프리미엄 수입") {
                          typeStyle =
                            "bg-amber-50 text-amber-700 border-amber-100";
                        } else if (item.brandType === "해외 전문") {
                          typeStyle =
                            "bg-violet-50 text-violet-700 border-violet-100";
                        } else if (item.brandType === "국산 명가") {
                          typeStyle =
                            "bg-rose-50 text-rose-750 border-rose-100";
                        } else if (item.brandType === "자체제작") {
                          typeStyle =
                            "bg-blue-50 text-blue-700 border-blue-100";
                        }

                        return (
                          <div
                            key={item.id}
                            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                          >
                            <div>
                              {/* Top Visual slot */}
                              <div className="w-full h-36 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100 relative group overflow-hidden">
                                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                                  {item.icon}
                                </span>
                                <span className="absolute bottom-2.5 right-2.5 text-[8.5px] font-black text-stone-400 font-mono bg-white border border-stone-200 px-2 py-0.5 rounded-full">
                                  {item.spec}
                                </span>
                              </div>

                              {/* Brand and category info */}
                              <div className="flex items-center gap-1.5 mb-2.5">
                                <span
                                  className={`px-2 py-0.5 text-[9px] font-extrabold border rounded ${typeStyle}`}
                                >
                                  {item.brandType}
                                </span>
                                <span className="text-[10px] font-bold text-stone-400">
                                  {item.brand}
                                </span>
                              </div>

                              <h3 className="text-sm font-extrabold text-stone-900 leading-tight mb-2">
                                {item.name}
                              </h3>
                              <p className="text-[11px] text-stone-500 font-semibold product-spec-font">
                                {item.description}
                              </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[9.5px] text-stone-400 font-semibold">
                                  에베인 우대가
                                </span>
                                <span className="text-sm font-black text-stone-900">
                                  ₩ {item.price.toLocaleString()}
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  handleAddCustomToCart(
                                    item.id,
                                    item.name,
                                    item.price,
                                    "bg-orange-50 text-[#f97316]",
                                    item.brand,
                                  )
                                }
                                className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-xs hover:shadow-sm"
                              >
                                에베인 담기
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Info banner at bottom */}
                    <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                      <div className="space-y-1 text-center sm:text-left">
                        <p className="text-xs uppercase tracking-widest text-[#f97316] font-bold">
                          Coffee Station Support
                        </p>
                        <h3 className="text-lg font-extrabold tracking-tight">
                          커피 머신 및 기기 도입 설치 전국 동시 기술지원
                        </h3>
                        <p className="text-xs text-stone-450 leading-relaxed font-semibold max-w-xl">
                          에브리베이크는 전담 엔지니어 매칭 서비스를 가동
                          중입니다. 커피 머신 구매 및 스마트 패키지 맞춤 도입
                          컨설팅부터 수돗물 연수 필터 설치, 세정 케어까지
                          One-Stop으로 가이드해 드립니다.
                        </p>
                      </div>
                      <button
                        onClick={() => handleNav("inquiry")}
                        className="bg-white hover:bg-stone-100 text-stone-950 px-5 py-2.5 rounded-xl text-xs font-black shrink-0 transition-transform active:scale-95 shadow-sm"
                      >
                        에베인 스페셜티 기기 도입 문의 ➔
                      </button>
                    </div>
                  </div>
                )}

                                {/* ==================================================== */}
                {/* 6.5 EVENTS & PROMOTIONS VIEW                         */}
                {/* ==================================================== */}
                {currentView === "events" && (
                  <EventsView
                    allDoughs={CURATED_DOUGHS}
                    getCurrentView={() => currentView}
                    onNav={handleNav}
                    onAddToCart={handleAddToCart}
                    onAddCustomToCart={handleAddCustomToCart}
                    selectedEventId={selectedEventId}
                    setSelectedEventId={setSelectedEventId}
                  />
                )}

                {/* ==================================================== */}
                {/* 8. INQUIRY / PROPALS PORTAL VIEW                      */}
                {/* ==================================================== */}
                {currentView === "inquiry" && (
                  <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" /> 홈으로 복귀
                    </button>

                    <div className="mb-8 space-y-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb]">
                        Inquiry & Partnerships
                      </span>
                      <h1 className="text-3xl font-black text-stone-900 tracking-tight">
                        KCT 파트너스 입점 및 문의 포털
                      </h1>
                      <p className="text-stone-550 text-sm">
                        냉동 생지 제조업체, 커피 수입사, 부자재 로스터리 및 일반
                        가맹 문의의 입점 요구서를 정식 수집합니다. 검토 결과를
                        즉각 스마트 채널로 가이드해 드립니다.
                      </p>
                    </div>

                    {/* Inquiries submission status messages and grid layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                      {/* Form card (Left) */}
                      <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md">
                        <h3 className="text-sm font-black text-stone-950 mb-4 flex items-center gap-1.5">
                          <Building2 className="w-5 h-5 text-blue-500" />
                          제안서 및 고품질 상품등록 제안 양식
                        </h3>

                        {/* Submition Toast Alert Inside Layout */}
                        {showInqSuccessAlert && (
                          <div className="mb-5 bg-blue-50 border border-blue-200/80 p-4 rounded-2xl flex items-start gap-3 animate-scale-up">
                            <CheckCircle2 className="w-5 h-5 text-[#2563eb] mt-0.5" />
                            <div>
                              <p className="text-xs font-bold text-[#2563eb]">
                                제안 등록 성공적으로 완료
                              </p>
                              <p className="text-[10px] text-blue-800 leading-relaxed mt-0.5">
                                사장님의 입점 기획서서가 당사 신사업총괄본부
                                MD팀에 접수되었습니다. AI 큐레이터가 타당성 1차
                                검토를 마치면 하단 목록에 즉각 답변이
                                게시됩니다.
                              </p>
                            </div>
                          </div>
                        )}

                        <form onSubmit={handleAddInquiry} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                                회사명 / 브랜드
                              </label>
                              <input
                                type="text"
                                required
                                value={inqCompany}
                                onChange={(e) => setInqCompany(e.target.value)}
                                placeholder="예: (주)한국푸드생지"
                                className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                                제안자 / 직책
                              </label>
                              <input
                                type="text"
                                required
                                value={inqManager}
                                onChange={(e) => setInqManager(e.target.value)}
                                placeholder="예: 홍길동 팀장"
                                className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                                제안 카테고리
                              </label>
                              <select
                                value={inqCategory}
                                onChange={(e) => setInqCategory(e.target.value)}
                                className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                              >
                                <option>냉동 생지 납품 제안</option>
                                <option>커피 원두 및 머신 제안</option>
                                <option>기타 카페 부자재</option>
                                <option>AI포스 도입문의</option>
                                <option>일반 고객 Q&A 문의</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                                긴급 연락처
                              </label>
                              <input
                                type="tel"
                                required
                                value={inqPhone}
                                onChange={(e) => setInqPhone(e.target.value)}
                                placeholder="예: 010-1234-5678"
                                className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">
                              제안 내용 및 상품 설명
                            </label>
                            <textarea
                              required
                              rows={5}
                              value={inqDetails}
                              onChange={(e) => setInqDetails(e.target.value)}
                              placeholder="제품의 경쟁력, 당사 스마트 기기 스캔 연동 시의 데이터 마트 규격, 공급 가능 부자재 단가 마진을 서술해 주십시오."
                              className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-[#2563eb] hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(37,99,235,0.25)] cursor-pointer"
                          >
                            KCT 비즈니스 총괄팀에 파트너쉽 등록하기
                          </button>
                        </form>
                      </div>

                      {/* Public forum display with live feedback reactions (Right) */}
                      <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md">
                        <h3 className="text-sm font-black text-stone-950 mb-3 flex items-center gap-1.5">
                          <Inbox className="w-5 h-5 text-stone-500" />
                          공개 문의 및 입점 가이드 대응 장치 (
                          {submittedInquiries.length})
                        </h3>
                        <p className="text-stone-450 text-[10px] mb-5 leading-relaxed leading-relaxed">
                          개인정보는 숨겨지며, 제출한 카테고리 기획 대안은
                          실시간으로 당사 총괄부 오피스 피드에 노출 검토됩니다.
                        </p>

                        <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 divide-y divide-stone-150">
                          {submittedInquiries.map((item) => (
                            <div
                              key={item.id}
                              className="pt-4 first:pt-0 space-y-2"
                            >
                              <div className="flex justify-between items-baseline text-xs">
                                <span className="font-bold text-stone-850">
                                  {item.company}{" "}
                                  <span className="font-normal text-stone-400">
                                    ({item.manager})
                                  </span>
                                </span>

                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] bg-stone-100 text-stone-500 px-2.0 py-0.5 rounded-md border border-stone-150">
                                    {item.category}
                                  </span>
                                  <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                      item.status === "completed"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                                        : "bg-blue-50 text-blue-700 border border-blue-150 animate-pulse"
                                    }`}
                                  >
                                    {item.status === "completed"
                                      ? "답변 완료"
                                      : "접수 중"}
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                                {item.details}
                              </p>

                              {item.answer && (
                                <div className="bg-[#f8fafc] border border-blue-105 p-3.5 rounded-2xl text-[11px] text-stone-700 leading-relaxed space-y-1 relative">
                                  <div className="flex items-center justify-between">
                                    <span className="font-extrabold text-[#2563eb] block">
                                      ↳ KCT 신사업총괄본부 답변
                                    </span>
                                    <span className="text-[9px] text-[#2563eb] bg-blue-50 px-1.5 py-0.5 rounded">
                                      SYSTEM VERIFIED
                                    </span>
                                  </div>
                                  <p>{item.answer}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(currentView === "login" ||
                  currentView === "partner-portal") && (
                  <div className="animate-fade-in">
                    <PartnerPortal
                      isLoggedIn={isLoggedIn}
                      onLoginSuccess={handleLoginSuccess}
                      onLogout={handleLogout}
                      onAddToCart={handleAddToCartFromPortal}
                      currentDoughs={CURATED_DOUGHS}
                      orderHistory={orderHistory}
                    />
                  </div>
                )}

                {/* ==================================================== */}
                {/* 9. CHECKOUT DETAIL VIEW (주문 정보 입력)                 */}
                {/* ==================================================== */}
                {currentView === "checkout-form" && (
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
                    {/* 뒤로가기 버튼 */}
                    <button
                      onClick={() => handleNav("home")}
                      className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer animate-fade-in"
                    >
                      <ChevronLeft className="w-4 h-4" /> 에베인 쇼핑으로
                      돌아가기
                    </button>

                    {/* 헤더 */}
                    <div className="mb-8 space-y-2 animate-fade-in">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f97316] bg-orange-50 border border-orange-100 px-2.5 py-0.5 rounded-full inline-block font-mono">
                        Step 1 · Member Order Details
                      </span>
                      <h1 className="text-3xl font-black text-stone-900 tracking-tight font-sans">
                        주문 및 정시수급 정보 입력
                      </h1>
                      <p className="text-stone-550 text-sm leading-relaxed">
                        에베인 회원 우대 자격 조건에 맞춰 회원명 확인 및 희망
                        납품일, 긴급 연락처를 최종 검토하여 안전 보증 결제
                        세션으로 연결합니다.
                      </p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12 animate-fade-in">
                      {/* Left Column: Form Details */}
                      <div className="lg:col-span-7 space-y-6">
                        {/* 1. 가맹 매장 인증 정보 (매장명 자동 출력) */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md">
                          <h3 className="text-sm font-black text-stone-950 mb-4 flex items-center gap-2 font-sans">
                            <Building2 className="w-5 h-5 text-[#f97316]" />
                            에베인 등록 회원명 및 자동 연계 상호
                          </h3>

                          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <p className="text-[10px] font-bold text-stone-400 font-mono">
                                  AUTOMATED MEMBER ID
                                </p>
                                <p className="text-lg font-black text-stone-900 mt-1 select-all">
                                  {userStoreName || "에브리베이크 마포본점"}
                                </p>
                              </div>
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-250 flex items-center justify-center gap-1 shrink-0 self-start sm:self-center">
                                <Check className="w-3.5 h-3.5" /> 에베인 회원 계정 연계
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-450 mt-3.5 leading-relaxed">
                              💡 본 성명/상호는 로그인 회원 자격을 기준으로
                              사장님의 고유 주문 시스템 원장에 무선
                              연동되어 유통에 즉각 보정 기록되며, 에베인 회원 가격
                              전용 우대 계약 단가를 안전하게 보장합니다.
                            </p>
                          </div>
                        </div>

                        {/* 2. 납품 정보 및 연락처 입력 (사용자 직접 입력) */}
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md space-y-5">
                          <h3 className="text-sm font-black text-stone-950 mb-1 flex items-center gap-2 font-sans">
                            <Calendar className="w-5 h-5 text-[#f97316]" />
                            긴급 연락처 및 수급 희망 도착일
                          </h3>
                          <p className="text-[11px] text-stone-400 leading-relaxed mb-4">
                            콜드체인 냉동 탑차 전문 정시 물류 기사 및 가맹점
                            관리 대표 MD 조직과 실시간 연락 수급이 가능한 연락처
                            및 납품 일정을 수정 기입하십시오.
                          </p>

                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (
                                !checkoutContact.trim() ||
                                !checkoutDeliveryDate.trim()
                              ) {
                                alert(
                                  "⚠️ 연락처와 희망 납품일을 알맞게 기입해 주십시오.",
                                );
                                return;
                              }
                              setCurrentView("pg-payment");
                            }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1.5 font-sans">
                                <Phone className="w-3.5 h-3.5 text-[#f97316]" />{" "}
                                사장님 긴급 연락처 (핸드폰 번호)
                              </label>
                              <input
                                type="tel"
                                required
                                value={checkoutContact}
                                onChange={(e) =>
                                  setCheckoutContact(e.target.value)
                                }
                                placeholder="예: 010-1234-5678"
                                className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3.5 py-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden tracking-wider font-semibold"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1.5 font-sans">
                                <Calendar className="w-3.5 h-3.5 text-[#f97316]" />{" "}
                                수급 지정 희망 납품일
                              </label>
                              <input
                                type="date"
                                required
                                value={checkoutDeliveryDate}
                                onChange={(e) =>
                                  setCheckoutDeliveryDate(e.target.value)
                                }
                                className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3.5 py-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-semibold"
                              />
                              <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
                                • EveryBake 냉동물류 특성상 오전 11시 전 최종
                                주문 시 2일 이후 도착이 가장 강력히 권장됩니다.
                              </p>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-6 uppercase hover:scale-101 border border-orange-505 shadow-[#f97316]/10"
                            >
                              <span>보안 결제수단 선택 단계로 전환</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Right Column: Order Items Summary List */}
                      <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md flex flex-col min-h-[400px]">
                        <h3 className="text-sm font-black text-stone-950 mb-2 flex items-center justify-between font-sans">
                          <span className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5 text-stone-700" />
                            에베인 주문 품목 내역
                          </span>
                          <span className="text-xs text-[#f97316] font-bold">
                            총{" "}
                            {cartItems.reduce((acc, c) => acc + c.quantity, 0)}
                            개
                          </span>
                        </h3>
                        <p className="text-[10px] text-stone-400 mb-5 leading-relaxed">
                          선택하신 명인들의 프리미엄 발효 생지 및 음료 가공재
                          도매 수량을 실시간 확인하십시오.
                        </p>

                        {/* Selected items list */}
                        <div className="divide-y divide-stone-100 max-h-[350px] overflow-y-auto pr-1 mb-6">
                          {cartItems.length === 0 ? (
                            <div className="py-12 text-center text-stone-450 text-xs italic">
                              장바구니에 담긴 계약 물품이 전무합니다. 수령하실
                              품목을 추가해 주십시오.
                            </div>
                          ) : (
                            cartItems.map(({ item, quantity }) => (
                              <div
                                key={item.id}
                                className="py-3.5 flex items-center justify-between gap-3"
                              >
                                <div className="flex gap-3 min-w-0">
                                  <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center p-1 font-bold text-[10px] leading-tight shrink-0 select-none ${item.iconBg}`}
                                  >
                                    {item.region}
                                  </div>
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-stone-900 truncate">
                                      {item.name}
                                    </h4>
                                    <p className="text-[10px] text-stone-400 mt-0.5">
                                      {item.masterName}
                                    </p>
                                    <p className="text-[10px] text-stone-500 mt-1.2 font-bold bg-stone-100 px-1.5 py-0.2 rounded-md inline-block">
                                      발주량: {quantity}개
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right shrink-0">
                                  <span className="text-xs font-black text-stone-850 block">
                                    ₩ {(item.price * quantity).toLocaleString()}
                                  </span>
                                  <span className="text-[10px] text-stone-400 block mt-0.5">
                                    단위 ₩ {item.price.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Cost calculation summary */}
                        <div className="border-t border-stone-150 pt-5 space-y-3.5 text-xs text-stone-600 bg-stone-50/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl mt-auto">
                          <div className="flex justify-between">
                            <span>원재료 단가 소계</span>
                            <span className="font-bold text-stone-900">
                              ₩ {checkoutSubtotal.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>콜드체인 유통 보증 유통비</span>
                            <span className="font-medium text-stone-850">
                              {checkoutDeliveryFee === 0 ? (
                                <span className="text-emerald-700 bg-emerald-50 border border-emerald-150 px-2.0 py-0.5 rounded-md font-extrabold text-[9px] uppercase font-mono">
                                  ₩15만 이상 무료배송 우대
                                </span>
                              ) : (
                                `₩ ${checkoutDeliveryFee.toLocaleString()}`
                              )}
                            </span>
                          </div>
                          <div className="border-t border-stone-200/60 my-2" />
                          <div className="flex justify-between text-sm font-black text-stone-950 pt-1">
                            <span>최종 주문 결제액</span>
                            <span className="text-lg text-[#f97316] font-black">
                              ₩ {checkoutTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================================================== */}
                {/* 10. PG PAYMENT SYSTEM VIEW (KG이니시스 / 간편결제 창)      */}
                {/* ==================================================== */}
                {currentView === "pg-payment" && (
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
                    {/* Payment Modal Container designed like official PG popup */}
                    <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-850 grid grid-cols-1 md:grid-cols-12 min-h-[550px] animate-fade-in">
                      {/* Left Panel: Invoice Details (Dark Theme) */}
                      <div className="md:col-span-5 bg-stone-950 p-8 flex flex-col justify-between text-white border-b md:border-b-0 md:border-r border-stone-800">
                        <div className="space-y-6">
                          {/* Lock Indicator */}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                              <ShieldCheck className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-emerald-400 font-extrabold font-mono">
                                SSL SECURE 256-BIT
                              </p>
                              <p className="text-xs font-bold text-stone-400">
                                B2B SECURE GATEWAY
                              </p>
                            </div>
                          </div>

                          <div className="border-t border-stone-800/80 pt-6" />

                          {/* Order Subject Summary */}
                          <div>
                            <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider font-mono">
                              ORDER HOST STORE
                            </p>
                            <p className="text-base font-black text-white mt-1 select-all">
                              🏪 {userStoreName || "에브리베이크 마포본점"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider font-mono">
                              B2B RESERVED PRODUCTS
                            </p>
                            <p className="text-sm font-bold text-stone-205 mt-1.5 leading-relaxed">
                              {cartItems[0]?.item?.name || "B2B 명인 계약 생지"}
                              {cartItems.length > 1
                                ? ` 외 ${cartItems.length - 1}종`
                                : ""}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider font-mono">
                              LOGISTICS DELIVERY DETAIL
                            </p>
                            <p className="text-xs font-bold text-stone-300 mt-2 flex flex-col gap-1.5 list-none leading-relaxed">
                              <span>
                                📅 수급지정일:{" "}
                                {checkoutDeliveryDate || "지정일"}
                              </span>
                              <span>
                                📞 점주연락처:{" "}
                                {checkoutContact || "010-1234-5678"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="pt-8 border-t border-stone-800/60 mt-6 md:mt-0">
                          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest font-mono">
                            B2B CONTRACT TOTAL AMOUNT
                          </p>
                          <p className="text-2xl font-black text-[#f97316] tracking-tight">
                            ₩ {checkoutTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Right Panel: Payment Methods Selection & Form */}
                      <div className="md:col-span-7 bg-stone-900 p-8 flex flex-col justify-between text-stone-200">
                        {/* Loader status for simulated checkouts */}
                        {isPaymentProcessing ? (
                          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12 shrink-0">
                            <div className="w-14 h-14 border-4 border-[#f97316]/20 border-t-[#f97316] rounded-full animate-spin" />
                            <div className="space-y-1">
                              <p className="text-sm font-black text-white">
                                B2B 원장 결제 전송 처리 중...
                              </p>
                              <p className="text-[10px] text-stone-450 animate-pulse">
                                {selectedPaymentMethod === "card" &&
                                  "한국 스마트 신용카드 전송망 보안 승인 대기 중..."}
                                {selectedPaymentMethod === "naverpay" &&
                                  "네이버 ID B2B 원클릭 동기화 안전성 검증 중..."}
                                {selectedPaymentMethod === "kakaopay" &&
                                  "카카오페이 다중인증 서버 응답 대기 확인 중..."}
                              </p>
                              <p className="text-[9px] text-[#f97316]/80 font-mono mt-2">
                                Any device syncing with B2B EveryBake recipe
                                clouds...
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div>
                              <h3 className="text-sm font-black text-white mb-1.5 flex items-center gap-1.5 font-sans">
                                <span>💳 최종 수급 결제 수단 선택</span>
                                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                                  SAFETY SECURED
                                </span>
                              </h3>
                              <p className="text-[11px] text-stone-400">
                                자영업 세금 혜택 및 법인카드, 실시간 간편 예약
                                수납을 정식 지원합니다.
                              </p>
                            </div>

                            {/* Method Selector Tabs */}
                            <div className="grid grid-cols-3 gap-2.5">
                              {/* Credit Card */}
                              <button
                                type="button"
                                onClick={() => setSelectedPaymentMethod("card")}
                                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                  selectedPaymentMethod === "card"
                                    ? "bg-white text-stone-950 border-white font-extrabold shadow-md"
                                    : "bg-stone-850 hover:bg-stone-800 text-stone-350 border-stone-800"
                                }`}
                              >
                                <CreditCard className="w-4 h-4" />
                                <span className="text-[10px] tracking-tight font-bold">
                                  신용/체크카드
                                </span>
                              </button>

                              {/* Naver Pay */}
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedPaymentMethod("naverpay")
                                }
                                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                  selectedPaymentMethod === "naverpay"
                                    ? "bg-[#2db400]/10 text-white border-[#2db400] font-extrabold shadow-[0_2px_12px_rgba(45,180,0,0.2)]"
                                    : "bg-stone-850 hover:bg-stone-800 text-stone-350 border-stone-800"
                                }`}
                              >
                                <span className="w-5 h-5 bg-[#2db400] text-white text-[11px] font-black rounded flex items-center justify-center select-none font-sans shadow-inner">
                                  N
                                </span>
                                <span className="text-[10px] tracking-tight font-bold">
                                  네이버페이
                                </span>
                              </button>

                              {/* Kakao Pay */}
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedPaymentMethod("kakaopay")
                                }
                                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                  selectedPaymentMethod === "kakaopay"
                                    ? "bg-[#fee500] text-stone-950 border-[#fee500] font-extrabold shadow-[0_2px_12px_rgba(254,229,0,0.2)]"
                                    : "bg-stone-850 hover:bg-stone-800 text-stone-350 border-stone-800"
                                }`}
                              >
                                <span className="w-5 h-5 bg-stone-950 text-[#fee500] text-[9px] font-black rounded flex items-center justify-center select-none font-sans font-extrabold">
                                  talk
                                </span>
                                <span className="text-[10px] tracking-tight">
                                  카카오페이
                                </span>
                              </button>
                            </div>

                            {/* Method Detail View */}
                            <div className="bg-stone-850 rounded-2xl p-5 border border-stone-800 min-h-[220px] flex flex-col justify-center animate-fade-in text-stone-300">
                              {selectedPaymentMethod === "card" && (
                                <div className="space-y-4 text-xs animate-fade-in">
                                  <p className="text-[10px] font-black tracking-widest text-[#f97316] uppercase font-mono">
                                    💳 CREDIT CARD DETAILS INPUT
                                  </p>

                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1 font-sans">
                                        카드 번호
                                      </p>
                                      <input
                                        type="text"
                                        placeholder="4579 - 1234 - 5678 - 9012"
                                        className="w-full bg-stone-900 border border-stone-750 px-3.5 py-2.5 rounded-xl text-xs outline-none text-white focus:border-[#f97316] transition-colors text-center tracking-widest font-mono"
                                      />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3.5">
                                      <div>
                                        <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1 font-sans">
                                          유효 기간 (MM/YY)
                                        </p>
                                        <input
                                          type="text"
                                          placeholder="12 / 29"
                                          className="w-full bg-stone-900 border border-stone-750 px-3.5 py-2.5 rounded-xl text-xs outline-none text-white focus:border-[#f97316] transition-colors text-center font-mono"
                                        />
                                      </div>
                                      <div>
                                        <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1 font-sans">
                                          비밀번호 앞 2자리
                                        </p>
                                        <input
                                          type="password"
                                          placeholder="●●"
                                          autoComplete="new-password"
                                          className="w-full bg-stone-900 border border-stone-750 px-3.5 py-2.5 rounded-xl text-xs outline-none text-white focus:border-[#f97316] transition-colors text-center font-bold tracking-widest font-mono"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {selectedPaymentMethod === "naverpay" && (
                                <div className="text-center space-y-4 py-4 leading-relaxed animate-fade-in">
                                  <div className="text-xs space-y-1 block text-stone-300 font-sans">
                                    <span className="text-green-400 font-bold">
                                      네이버페이 원클릭 간편 연동
                                    </span>{" "}
                                    이 세팅되었습니다.
                                    <br />
                                    인증 검사 완료 시 점주님의 기본 설정
                                    법인/상생 계좌로부터 <br />
                                    계약 발주 영수증이 정식 접수 및 자동 수납
                                    예약 처리됩니다.
                                  </div>
                                  <span className="text-[9.5px] bg-stone-900 text-stone-400 border border-stone-800 px-3 py-1.5 rounded-lg inline-block font-sans">
                                    네이버페이 포인트 2.5% B2B 특별 소득공제 및
                                    세금 혜택 반영
                                  </span>
                                </div>
                              )}

                              {selectedPaymentMethod === "kakaopay" && (
                                <div className="flex flex-col items-center text-center space-y-4 py-3 animate-fade-in">
                                  <div className="w-20 h-20 bg-white p-1 rounded-2xl shadow-inner border border-amber-300 flex items-center justify-center">
                                    {/* Mock QR Code representation */}
                                    <div className="grid grid-cols-4 gap-1 w-full h-full p-1 border-2 border-stone-900 bg-white">
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-transparent" />
                                      <div className="bg-stone-900 rounded rounded-xs" />

                                      <div className="bg-transparent" />
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-transparent" />

                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-transparent" />
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-stone-900 rounded rounded-xs" />

                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                      <div className="bg-transparent" />
                                      <div className="bg-stone-900 rounded rounded-xs" />
                                    </div>
                                  </div>
                                  <div className="text-[11px] space-y-1 block text-stone-300 leading-relaxed font-sans">
                                    <p className="font-bold text-yellow-400">
                                      카카오페이 B2B 실시간 안전 QR 승인
                                    </p>
                                    <p className="text-stone-400 leading-relaxed">
                                      카카오톡 또는 카카오페이 앱 카메라로
                                      모바일 바코드를 스캔하여 빠른 수납 승인을
                                      발급받으십시오.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Bottom Trigger buttons */}
                        {!isPaymentProcessing && (
                          <div className="grid grid-cols-12 gap-3.5 pt-6 border-t border-stone-800 mt-6 shrink-0 font-sans">
                            <button
                              type="button"
                              onClick={() => setCurrentView("checkout-form")}
                              className="col-span-4 py-3 bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer text-center"
                            >
                              이전 단계로
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setIsPaymentProcessing(true);
                                setTimeout(() => {
                                  setIsPaymentProcessing(false);

                                  // Set success receipt info
                                  const orderIdentId = `KCT-ORDER-${Math.floor(10000000 + Math.random() * 90000000)}`;
                                  const newOrder = {
                                    orderId: orderIdentId,
                                    shopName:
                                      userStoreName || "에브리베이크 마포본점",
                                    contact: checkoutContact || "010-1234-5678",
                                    deliveryDate:
                                      checkoutDeliveryDate || "지정일",
                                    paymentMethod:
                                      selectedPaymentMethod === "card"
                                        ? "신용/체크카드"
                                        : selectedPaymentMethod === "naverpay"
                                          ? "네이버페이"
                                          : "카카오페이",
                                    amount: checkoutTotal,
                                    date: new Date().toLocaleString(),
                                    items: cartItems.map((item) => ({
                                      id: item.item.id,
                                      name: item.item.name,
                                      price: item.item.price,
                                      quantity: item.quantity,
                                    })),
                                  };

                                  setPaymentSuccessOrder(newOrder);
                                  setOrderHistory((prev) => [
                                    newOrder,
                                    ...prev,
                                  ]);

                                  // Clear cartItems upon successful purchase to finalize purchase flow
                                  setCartItems([]);
                                }, 1800);
                              }}
                              className="col-span-8 py-3 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md hover:scale-101 active:scale-98"
                            >
                              <Check className="w-4 h-4" />
                              <span>
                                ₩ {checkoutTotal.toLocaleString()} B2B 최종 결제
                                승인
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Modern, elegant corporate footer aligned with requested style */}
      <footer className="max-w-5xl mx-auto px-6 border-t border-stone-200/80 pt-10 text-stone-400 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 rounded bg-stone-900 flex items-center justify-center text-white font-black text-xs">
            K
          </div>
          <span className="font-extrabold text-stone-800">
            KCT Partners Co., Ltd.
          </span>
          <span className="text-[10px] text-stone-300 font-normal">
            | 베이킹의 새로운 가치와 상호 성장을 이룹니다.
          </span>
        </div>
        <div className="text-center md:text-right space-y-0.5 text-[11px]">
          <p>&copy; 2026 KCT Partners Co., Ltd. All rights reserved.</p>
          <p className="text-stone-300">
            중소 자영업자 1인 카페 상생 우수공로부문 대통령상 표창 출원 완료
          </p>
        </div>
      </footer>

      {/* Minimalist Apple B2B Scroll-to-Top/Bottom Controller */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 items-center select-none shadow-xs">
        {/* Scroll Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 bg-white/95 hover:bg-stone-50 border border-stone-200/60 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-pointer text-stone-600 hover:text-stone-900 transition-all active:scale-95"
          title="위로 이동"
          id="btn-scroll-top"
        >
          <ChevronUp className="w-4 h-4 text-stone-600" />
        </button>

        {/* Scroll Bottom Button */}
        <button
          onClick={() =>
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            })
          }
          className="w-10 h-10 bg-white/95 hover:bg-stone-50 border border-stone-200/60 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-pointer text-stone-600 hover:text-stone-900 transition-all active:scale-95"
          title="아래로 이동"
          id="btn-scroll-bottom"
        >
          <ChevronDown className="w-4 h-4 text-stone-600" />
        </button>
      </div>

      {/* Satisfying Click Particle Animation - Disabled for professional UX */}
      <div className="fixed inset-0 pointer-events-none z-[100001] overflow-hidden" />

      {/* Elegant High-end B2B Transition Screen Overlay */}
      {isTransitioning && (
        <div
          className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-white transition-all duration-300 ease-out ${
            transitionFadeState === "in"
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          } overflow-hidden`}
        >
          <div 
            className="text-center text-stone-950 flex flex-col items-center justify-center space-y-8 md:space-y-10 select-none"
            style={{ fontFamily: '"Nanum Myeongjo", "Cormorant Garamond", serif' }}
          >
            {/* EVERY BAKE */}
            <div className="animate-cinematic-depth space-y-4 flex flex-col items-center">
              <span className="text-[11px] sm:text-[13px] md:text-[14px] uppercase tracking-[0.4em] text-stone-400 font-sans font-bold block">
                EVERY BAKE
              </span>
              <div className="h-[1px] w-10 bg-stone-200" />
            </div>

            {/* Poetic Copy as explicitly requested with cinematic depth effects */}
            <div className="space-y-4 sm:space-y-5 text-stone-900 animate-cinematic-depth-slow">
              <p className="text-xl sm:text-2.5xl md:text-3xl font-light tracking-[0.15em] leading-[1.6]">
                당신의 식탁
              </p>
              <p className="text-xl sm:text-2.5xl md:text-3xl font-light tracking-[0.15em] leading-[1.6]">
                당신의 매 순간
              </p>
              <p className="text-3.5xl sm:text-4.5xl md:text-5.5xl font-extrabold tracking-[0.15em] text-[#101010] pt-4 block leading-none">
                에브리 베이크
              </p>
            </div>

            {/* A silent elegant organic micro indicator */}
            <div className="pt-8 opacity-40">
              <div className="w-1.5 h-1.5 bg-stone-950 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline auxiliary icons for perfect layout rendering with zero external risk
function BriefcaseIcon() {
  return (
    <svg
      className="w-6 h-6 text-amber-500 mb-2 mx-auto md:mx-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg
      className="w-6 h-6 text-amber-500 mb-2 mx-auto md:mx-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg
      className="w-5 h-5 text-stone-400 mb-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}
