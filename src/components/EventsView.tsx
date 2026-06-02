import React, { useState } from "react";
import { 
  Trophy, 
  Sparkles, 
  Gift, 
  Calendar, 
  ThumbsUp, 
  Share2, 
  ChevronLeft, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Cookie, 
  Tag, 
  Camera, 
  Check, 
  ShoppingBag, 
  Award, 
  Sparkle, 
  Heart,
  Clock
} from "lucide-react";
import { DoughItem } from "../types";

interface EventsViewProps {
  allDoughs: DoughItem[];
  getCurrentView: () => string;
  onNav: (view: string) => void;
  onAddToCart: (item: DoughItem) => void;
  onAddCustomToCart: (
    id: string,
    name: string,
    price: number,
    colorClass?: string,
    brand?: string
  ) => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
}

interface BakingSubmission {
  id: string;
  storeName: string;
  bakerName: string;
  doughUsed: string;
  title: string;
  tip: string;
  votes: number;
  imageEmoji: string;
  bgGrad: string;
  hasVoted: boolean;
  date: string;
}

export default function EventsView({
  allDoughs,
  onNav,
  onAddToCart,
  onAddCustomToCart,
  selectedEventId,
  setSelectedEventId
}: EventsViewProps) {
  // Event 1 interactive state (Baking competition)
  const [submissions, setSubmissions] = useState<BakingSubmission[]>([
    {
      id: "sub-1",
      storeName: "성수동 밀크베이크 카페",
      bakerName: "이지아 블랑제",
      doughUsed: "명장 크랙 소금빵 (AOP 버터 함유)",
      title: "겉바속촉 끝판왕! 에어 바삭 스팀 2분 살리기",
      tip: "KCT 오븐에 스팀을 3초 분무한 뒤, 마지막 2분을 높은 온도로 굽는 게 최상의 카라멜라이징 비법입니다.",
      votes: 142,
      imageEmoji: "🥐🧂",
      bgGrad: "from-amber-100 to-orange-100",
      hasVoted: false,
      date: "2026-06-02"
    },
    {
      id: "sub-2",
      storeName: "한남동 프렌치 아틀리에",
      bakerName: "Marc Dupont",
      doughUsed: "아티장 프렌치 바게트",
      title: "정통 파리지앵 쿠프 넣기 & 저온 발효 극대화",
      tip: "실온 해동을 15분만 진행한 뒤 예열된 오븐에 칼집을 깊게 내어 구우면 훨씬 볼륨감있고 빠작한 바게트가 완성됩니다.",
      votes: 98,
      imageEmoji: "🥖🇫🇷",
      bgGrad: "from-stone-100 to-amber-50",
      hasVoted: false,
      date: "2026-06-01"
    },
    {
      id: "sub-3",
      storeName: "부산 마린시티 크로플하우스",
      bakerName: "김민혁 점주",
      doughUsed: "명장 64겹 버터 크로와상",
      title: "크로플로 변신시킨 카라멜 코팅 명작",
      tip: "와플 팬에 굽기 직전 유기농 비정제 설탕을 가볍게 굴려 코팅하면 시럽 없이도 완벽한 달콤함을 자랑해요.",
      votes: 85,
      imageEmoji: "🥞🍯",
      bgGrad: "from-orange-100 to-yellow-100",
      hasVoted: false,
      date: "2026-05-31"
    }
  ]);

  // Form submit state
  const [formStoreName, setFormStoreName] = useState("");
  const [formBakerName, setFormBakerName] = useState("");
  const [formDoughUsed, setFormDoughUsed] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formTip, setFormTip] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  // Event 2 dynamic discount states (Monday Baking Special)
  const [mondayCouponDownloaded, setMondayCouponDownloaded] = useState(false);
  const [organicCouponDownloaded, setOrganicCouponDownloaded] = useState(false);

  // Filter 4 core doughs for Monday 10% discount display
  const targetDoughs = allDoughs.slice(0, 4);

  // Handle Event submission
  const handleSubmitEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStoreName || !formBakerName || !formTitle || !formTip) {
      alert("⚠️ 모든 정보를 기입한 후 제빵왕에 제출해 주세요!");
      return;
    }

    const newSub: BakingSubmission = {
      id: `sub-${Date.now()}`,
      storeName: formStoreName,
      bakerName: formBakerName,
      doughUsed: formDoughUsed || "선택 안 함",
      title: formTitle,
      tip: formTip,
      votes: 1,
      imageEmoji: "🥖🍞✨",
      bgGrad: "from-orange-50 to-amber-100",
      hasVoted: true,
      date: "방금 전"
    };

    setSubmissions([newSub, ...submissions]);
    setSubmittedMessage("🎉 제빵왕 경연 참여가 성공적으로 완수되었습니다! 엄격한 심사 후 당첨자에게 개별 통지됩니다.");
    
    // Clear fields
    setFormStoreName("");
    setFormBakerName("");
    setFormDoughUsed("");
    setFormTitle("");
    setFormTip("");

    setTimeout(() => {
      setSubmittedMessage("");
    }, 5000);
  };

  // Toggle internal submission vote
  const handleVote = (id: string) => {
    setSubmissions(submissions.map((sub) => {
      if (sub.id === id) {
        if (sub.hasVoted) {
          return { ...sub, votes: sub.votes - 1, hasVoted: false };
        } else {
          return { ...sub, votes: sub.votes + 1, hasVoted: true };
        }
      }
      return sub;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 animate-fade-in text-stone-900 pb-16">
      
      {selectedEventId === null ? (
        // ============================================
        // 1. EVENT LIST VIEW (Main Stacked Banners)
        // ============================================
        <div className="space-y-6">
          {/* Main Top Decorative Greeting Header Panel (from user's image) */}
          <div className="bg-gradient-to-r from-[#faf5f0] via-[#f7f0eb] to-indigo-50/50 rounded-3xl p-6 md:p-8 border border-stone-200/60 shadow-xs relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2.5 max-w-lg">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-orange-100/50 px-2.5 py-1 rounded-lg">PROMOTIONS & BENEFITS</span>
              <h1 className="text-2.5xl md:text-3.5xl font-black text-stone-950 tracking-tight leading-tight">
                진행 중인 혜택 가득<br />
                이벤트 한눈에 보기
              </h1>
              <p className="text-xs text-stone-550 font-bold flex items-center gap-1.5">
                <span>🧁 최상의 레시피 도전부터 파트너 특별 할인 서비스까지 한번에 참여해 보세요.</span>
              </p>
            </div>
            
            {/* Visual cards resembling Coupon, Benefit, Today in the user's uploaded image */}
            <div className="flex items-center gap-3 shrink-0 self-center md:self-auto">
              <div className="bg-purple-500 text-white rounded-2xl p-4 w-22 h-28 flex flex-col justify-between items-center shadow-md rotate-[-4deg] hover:rotate-0 transition-transform">
                <span className="text-[8.5px] font-black uppercase tracking-wider text-purple-200">COUPON</span>
                <span className="text-2xl">₩</span>
                <span className="text-[10px] font-black">할인 혜택</span>
              </div>
              <div className="bg-gradient-to-b from-purple-900 to-indigo-950 text-white rounded-2xl p-4 w-22 h-28 flex flex-col justify-between items-center shadow-md rotate-[2deg] hover:rotate-0 transition-transform -translate-y-1">
                <span className="text-[8.5px] font-black uppercase tracking-wider text-purple-300">BENEFIT</span>
                <Gift className="w-6 h-6 text-orange-400" />
                <span className="text-[10px] font-black">사은 기프트</span>
              </div>
              <div className="bg-violet-600 text-white rounded-2xl p-4 w-22 h-28 flex flex-col justify-between items-center shadow-md rotate-[-3deg] hover:rotate-0 transition-transform">
                <span className="text-[8.5px] font-black uppercase tracking-wider text-violet-200">TODAY</span>
                <Calendar className="w-6 h-6 text-amber-300" />
                <span className="text-[10px] font-black">매일 밤 11시</span>
              </div>
            </div>
          </div>

          {/* Stacked Interactive Banners (exactly copying the aesthetic details from the user's upload) */}
          <div className="space-y-4">
            
            {/* Banner 1: 월요 제빵데이 10% 쿠폰 */}
            <div 
              onClick={() => setSelectedEventId("monday-day")}
              className="bg-[#fdf9f4]/90 hover:bg-[#faf5ee] border border-orange-100 hover:border-[#f97316] p-6 sm:p-8 rounded-3xl transition-all cursor-pointer flex flex-col md:flex-row justify-between items-stretch gap-6 relative group overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Event Text Left */}
              <div className="flex flex-col justify-between space-y-4 md:space-y-0 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#f97316] text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md">매주 월요 정기</span>
                    <span className="text-[10.5px] font-black text-amber-800">베스트 생지 일주 특가</span>
                  </div>
                  <h2 className="text-xl sm:text-2.5xl font-black text-stone-900 leading-tight">
                    베스트 상품, 더 알뜰하게<br className="hidden sm:inline" />
                    ~33% + 10% 쿠폰 혜택
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>기한: ~ 06.08(월) 오전 11시 마감</span>
                </div>
              </div>

              {/* Center Plate / Bread visual representation on the right */}
              <div className="flex items-center justify-end gap-4 mr-0 md:mr-10">
                <div className="flex -space-x-4 items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100/50 outline outline-4 outline-white flex items-center justify-center text-3xl shadow-sm">
                    🥐
                  </div>
                  <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-amber-100 outline outline-4 outline-white flex items-center justify-center text-4xl shadow-md relative z-10">
                    🥖
                  </div>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-yellow-50 outline outline-4 outline-white flex items-center justify-center text-2.5xl shadow-sm">
                    🍞
                  </div>
                </div>
              </div>

              {/* Far right badge - as shown on "COUPON" purple tab in the user's screenshot */}
              <div className="hidden md:flex bg-violet-600 group-hover:bg-violet-700 text-white w-10 items-center justify-center absolute right-0 top-0 bottom-0 transition-colors">
                <span className="font-extrabold text-[10px] uppercase tracking-widest [writing-mode:vertical-lr] py-4">
                  COUPON BAR
                </span>
              </div>
            </div>

            {/* Banner 2: 오늘의 제빵왕은 바로나 대형 배틀 경연대회 (THE NEW HIGHLIGHT) */}
            <div 
              onClick={() => setSelectedEventId("baking-king")}
              className="bg-amber-50/70 hover:bg-amber-50 border border-stone-200 hover:border-[#f97316] p-6 sm:p-8 rounded-3xl transition-all cursor-pointer flex flex-col md:flex-row justify-between items-stretch gap-6 relative group overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Event Text Left */}
              <div className="flex flex-col justify-between space-y-4 md:space-y-0 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-600 text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md">B2B 경연배틀</span>
                    <span className="text-[10.5px] font-black text-amber-900">총 상금 50만 원 신세계상품권 등</span>
                  </div>
                  <h2 className="text-xl sm:text-2.5xl font-black text-stone-900 leading-tight">
                    "오늘의 제빵왕은 바로 나!"<br />
                    전국 에브리베이커 동시 베이킹 대회 🏆
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>일정: 06.05(금) ~ 06.10(수) 자정 제출 마감</span>
                </div>
              </div>

              {/* Center visual: trophy, flour, stars */}
              <div className="flex items-center justify-end gap-4 mr-0 md:mr-10">
                <div className="relative flex items-center justify-center p-3 bg-white rounded-2xl border border-stone-150 shadow-xs">
                  <Trophy className="w-10 h-10 text-amber-500 animate-pulse" />
                  <Sparkles className="w-5 h-5 text-yellow-500 absolute -top-1 -right-1" />
                </div>
                <div className="text-3xl text-left hidden sm:block">
                  <div>👨‍🍳🌾</div>
                  <div className="text-[10px] font-bold text-stone-400">#내카페_최고의빵</div>
                </div>
              </div>

              {/* Far right badge */}
              <div className="hidden md:flex bg-orange-500 group-hover:bg-orange-600 text-white w-10 items-center justify-center absolute right-0 top-0 bottom-0 transition-colors">
                <span className="font-extrabold text-[10px] uppercase tracking-widest [writing-mode:vertical-lr] py-4">
                  CONTEST
                </span>
              </div>
            </div>

            {/* Banner 3: 친환경 깜빠뉴 20% 특별 장바구니 쿠폰 */}
            <div 
              onClick={() => setSelectedEventId("eco-sourdough")}
              className="bg-stone-100/90 hover:bg-stone-150/80 border border-stone-200 hover:border-[#f97316] p-6 sm:p-8 rounded-3xl transition-all cursor-pointer flex flex-col md:flex-row justify-between items-stretch gap-6 relative group overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Event Text Left */}
              <div className="flex flex-col justify-between space-y-4 md:space-y-0 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-700 text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md">친환경 인증 기획</span>
                    <span className="text-[10.5px] font-semibold text-emerald-800">자연효모 저온발효 빵가루</span>
                  </div>
                  <h2 className="text-xl sm:text-2.5xl font-black text-stone-900 leading-tight">
                    친환경 브랜드 유럽식 깜빠뉴<br />
                    20% 특별 장바구니 쿠폰
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>기한: ~ 06.08(월) 오전 11시 마감</span>
                </div>
              </div>

              {/* Center visual resembling tissue or organic package in user's image */}
              <div className="flex items-center justify-end gap-4 mr-0 md:mr-10">
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col items-center gap-1 text-center shadow-2xs max-w-[130px]">
                  <span className="text-2xl">🌾</span>
                  <p className="text-[10px] font-black text-stone-700">천연 호밀 깜빠뉴</p>
                  <p className="text-[9px] font-semibold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded">ECO-LINE</p>
                </div>
              </div>

              {/* Far right badge */}
              <div className="hidden md:flex bg-violet-600 group-hover:bg-violet-700 text-white w-10 items-center justify-center absolute right-0 top-0 bottom-0 transition-colors">
                <span className="font-extrabold text-[10px] uppercase tracking-widest [writing-mode:vertical-lr] py-4">
                  COUPON BAR
                </span>
              </div>
            </div>

            {/* Banner 4: 오늘만 이 가격 지금 반값 세일 */}
            <div 
              onClick={() => setSelectedEventId("half-price")}
              className="bg-gradient-to-r from-stone-50 to-stone-100/50 hover:bg-stone-100 border border-stone-250 hover:border-[#f97316] p-6 sm:p-8 rounded-3xl transition-all cursor-pointer flex flex-col md:flex-row justify-between items-stretch gap-6 relative group overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Event Text Left */}
              <div className="flex flex-col justify-between space-y-4 md:space-y-0 text-left">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="bg-stone-900 text-white text-[9px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md">24H 한정</span>
                    <span className="text-[10.5px] font-black text-red-650">오늘 하루 강력 특가</span>
                  </div>
                  <h2 className="text-xl sm:text-2.5xl font-black text-stone-900 leading-tight">
                    오늘만 이 가격,<br />
                    스페셜 원두 & 스마트 오븐 반값 세일 중 🔥
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-xs font-extrabold text-[#f97316] hover:underline">
                  <span>오늘의 특가 보러 가기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Right wooden visual representation */}
              <div className="flex items-center justify-end gap-4 mr-0 md:mr-10">
                <div className="bg-amber-100/40 p-4 rounded-2xl border border-amber-200/50 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl">📦🔥</span>
                  <span className="text-[9px] font-extrabold text-stone-500 uppercase tracking-tighter mt-1">B2B 타임 특가</span>
                </div>
              </div>

              {/* Far right badge */}
              <div className="hidden md:flex bg-stone-900 group-hover:bg-black text-white w-10 items-center justify-center absolute right-0 top-0 bottom-0 transition-colors">
                <span className="font-extrabold text-[10px] uppercase tracking-widest [writing-mode:vertical-lr] py-4">
                  SUPER SALE
                </span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        // ============================================
        // 2. EVENT DETAIL VIEW (Highly Detailed)
        // ============================================
        <div className="space-y-8 animate-fade-in text-left">
          {/* Back btn */}
          <button 
            onClick={() => setSelectedEventId(null)}
            className="flex items-center gap-1 text-xs font-black text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> 진행 중인 이벤트 전체 목록으로 돌아가기
          </button>

          {/* Render Detail based on Event ID */}
          {selectedEventId === "baking-king" && (
            <div className="space-y-8">
              {/* Main Banner Header */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-100 rounded-3xl p-6 sm:p-10 border border-orange-200/60 shadow-sm relative overflow-hidden">
                <div className="space-y-4 max-w-2xl relative z-10">
                  <span className="bg-[#f97316] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-lg inline-block">
                    CONTEST EVENT
                  </span>
                  <h1 className="text-2.5xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-none">
                    "오늘의 제빵왕은 바로 나!"<br />
                    전국 동시 B2B 온라인 발효 베이킹 콘테스트 🏆
                  </h1>
                  <p className="text-stone-650 text-xs sm:text-sm font-semibold leading-relaxed">
                    에브리베이크 프리미엄 생지 라이브러리(크루아상, 소금빵, 바게트 등)를 점주님 매장에서 직접 예쁘고 맛있게 구워 구수하고 영롱하게 부풀어오른 자태를 자랑해 주세요! 멋진 기술과 맛팁을 공유해 주신 전국의 블랑제 41분을 추첨하여 역대급 혜택을 쏩니다.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs font-black text-amber-900 bg-amber-100/50 p-3 rounded-2xl w-fit">
                    <span className="flex items-center gap-1">📅 참여 기간: 6월 5일 ~ 6월 10일 자정까지</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="flex items-center gap-1">📣 당첨 발표: 6월 15일 점주포털 개별 통지</span>
                  </div>
                </div>
                
                <div className="absolute right-6 bottom-6 text-6xl opacity-30 select-none hidden md:block animate-bounce">
                  🥐🍞🏆
                </div>
              </div>

              {/* Prize Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-3xs flex flex-col justify-between hover:border-amber-400 transition-all">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl text-amber-600 shadow-2xs font-extrabold">🏆</div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">FIRST PLACE (1명)</span>
                      <h3 className="text-lg font-black text-stone-900">제빵왕 대상</h3>
                    </div>
                    <p className="text-xs text-stone-550 font-semibold leading-relaxed">
                      전문 제빵사 및 점주 품평단의 만장일치 심사에서 가장 먹음직스러운 비주얼을 자랑한 명인 1인에게 수여합니다.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 mt-4">
                    <span className="text-xs text-stone-450 font-semibold">동반 증정 상품</span>
                    <div className="text-lg font-extrabold text-[#f97316]">신세계백화점 상품권 50만 원권</div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-3xs flex flex-col justify-between hover:border-stone-400 transition-all">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-2xl text-stone-600 shadow-2xs font-extrabold">🥈</div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-stone-500 tracking-wider">SECOND PLACE (10명)</span>
                      <h3 className="text-lg font-black text-stone-900">골든 크러스트 상</h3>
                    </div>
                    <p className="text-xs text-stone-550 font-semibold leading-relaxed">
                      완벽하게 구워진 호피무늬 볼륨감과 독보적인 베이킹 노하우 꿀팁을 친절하게 제시해 주신 유망 지부 점주님들께 증정합니다.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 mt-4">
                    <span className="text-xs text-stone-450 font-semibold">동반 증정 상품</span>
                    <div className="text-lg font-extrabold text-stone-900">도서문화상품권 10만 원권 (10명)</div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-3xs flex flex-col justify-between hover:border-orange-200 transition-all">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl text-orange-600 shadow-2xs font-extrabold">🥉</div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-orange-500 tracking-wider">THIRD PLACE (30명)</span>
                      <h3 className="text-lg font-black text-stone-900">데일리 베이커상</h3>
                    </div>
                    <p className="text-xs text-stone-550 font-semibold leading-relaxed">
                      따뜻한 카페 내부 전경과 귀여운 고객 호응 인증 사진을 찍어 에브리베이크에 사랑의 흔적을 남겨주신 정성스러운 파트너 분들께 증정합니다.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-stone-100 mt-4">
                    <span className="text-xs text-stone-450 font-semibold">동반 증정 상품</span>
                    <div className="text-lg font-extrabold text-orange-650">배달의민족 상품권 1만 원권 (30명)</div>
                  </div>
                </div>
              </div>

              {/* Instructions and submission form wrapper */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Submit Entry Form - Left 5 cols */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-4">
                    <div className="flex items-center gap-1.5">
                      <Camera className="w-5 h-5 text-[#f97316]" />
                      <h3 className="text-base font-black text-stone-900">나의 시그니처 챌린지 제출 양식</h3>
                    </div>
                    <p className="text-[11px] text-stone-500 font-semibold leading-relaxed">
                      점주님 매장 이름과 사용한 생지 종류, 그리고 나만의 베이킹 비결 및 노하우를 간단히 작성해 제출해 주세요! (모의 입력 및 가상 등록이 실시간 활성화됩니다.)
                    </p>

                    {submittedMessage && (
                      <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl animate-pulse">
                        {submittedMessage}
                      </div>
                    )}

                    <form onSubmit={handleSubmitEntry} className="space-y-3 text-left">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                          기명 상호명 (예: 성수 버터멜트) *
                        </label>
                        <input 
                          type="text"
                          required
                          value={formStoreName}
                          onChange={(e) => setFormStoreName(e.target.value)}
                          placeholder="점주 카페 / 베이커리 상호"
                          className="w-full text-xs font-bold bg-stone-50 hover:bg-stone-100 focus:bg-white border border-stone-200 focus:border-[#f97316] outline-none px-3.5 py-2 rounded-xl transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                          챌린저 베이커명 *
                        </label>
                        <input 
                          type="text"
                          required
                          value={formBakerName}
                          onChange={(e) => setFormBakerName(e.target.value)}
                          placeholder="성함 혹은 닉네임"
                          className="w-full text-xs font-bold bg-stone-50 hover:bg-stone-100 focus:bg-white border border-stone-200 focus:border-[#f97316] outline-none px-3.5 py-2 rounded-xl transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                          사용한 에브리베이크 빵 생지 선택
                        </label>
                        <select
                          value={formDoughUsed}
                          onChange={(e) => setFormDoughUsed(e.target.value)}
                          className="w-full text-xs font-extrabold bg-stone-50 border border-stone-200 outline-none px-3.5 py-2 rounded-xl"
                        >
                          <option value="">-- 생지를 선택해 주세요 --</option>
                          {allDoughs.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                          제출 제목 *
                        </label>
                        <input 
                          type="text"
                          required
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          placeholder="예) 우리 매장의 효자상품, 소금빵 골든 레시피"
                          className="w-full text-xs font-bold bg-stone-50 hover:bg-stone-100 focus:bg-white border border-stone-200 focus:border-[#f97316] outline-none px-3.5 py-2 rounded-xl transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                          노하우 & 구울 때의 최고의 나만의 팁 *
                        </label>
                        <textarea 
                          rows={3}
                          required
                          value={formTip}
                          onChange={(e) => setFormTip(e.target.value)}
                          placeholder="예) 해동 15분 후 위아래 스팀 3초분사와 마지막 2분 건조 베이킹이 꿀팁입니다..."
                          className="w-full text-xs font-semibold bg-stone-50 hover:bg-stone-100 focus:bg-white border border-stone-200 focus:border-[#f97316] outline-none px-3.5 py-2 rounded-xl transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#f97316] hover:bg-orange-650 text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-[0_2px_10px_rgba(249,115,22,0.2)]"
                      >
                        🔥 이대로 심사 도전장 접수하기
                      </button>
                    </form>
                  </div>
                </div>

                {/* Submissions List & Voting - Right 7 cols */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 text-left">
                      <h3 className="text-base font-black text-stone-900">전국 베이커 실시간 라이브 제출작 현황 👨‍🍳</h3>
                      <p className="text-[10px] font-semibold text-stone-400">다른 점주님들의 군침도는 노하우를 감상하고 마음에 들면 투표해 주세요!</p>
                    </div>
                    <span className="text-xs font-black text-[#f97316] bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl">
                      {submissions.length}명 참여중
                    </span>
                  </div>

                  <div className="space-y-4">
                    {submissions.map((sub) => (
                      <div 
                        key={sub.id}
                        className="bg-white rounded-2xl p-5 border border-stone-200 shadow-3xs hover:border-[#f97316]/50 transition-all flex items-start gap-4 text-left"
                      >
                        {/* Round bread picture mockup */}
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${sub.bgGrad} flex-shrink-0 flex items-center justify-center text-3xl shadow-2xs`}>
                          {sub.imageEmoji}
                        </div>

                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <div>
                              <h4 className="text-xs font-black text-stone-850">{sub.storeName}</h4>
                              <p className="text-[10px] font-extrabold text-[#f97316]/80">{sub.bakerName} 블랑제</p>
                            </div>
                            <span className="text-[9px] font-mono text-stone-400">{sub.date}</span>
                          </div>

                          <div className="space-y-1">
                            <h5 className="text-[13px] font-black text-stone-900">"{sub.title}"</h5>
                            <div className="text-[10.5px] font-extrabold text-stone-400">
                              사용한 생지: <span className="text-neutral-800">{sub.doughUsed}</span>
                            </div>
                            <div className="p-2.5 bg-stone-50 border border-stone-150 rounded-xl text-xs font-semibold text-stone-650 leading-relaxed">
                              💡 {sub.tip}
                            </div>
                          </div>

                          {/* Like/Vote integration */}
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() => handleVote(sub.id)}
                              className={`flex items-center gap-1 px-3 py-1.25 rounded-lg text-[10.5px] font-black tracking-tight transition-all cursor-pointer ${
                                sub.hasVoted 
                                  ? "bg-red-50 text-red-600 border border-red-200" 
                                  : "bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-150"
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${sub.hasVoted ? "fill-red-500 text-red-600" : "text-stone-400"}`} />
                              <span>{sub.hasVoted ? "투표 취소" : "추천하기"} ({sub.votes})</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Render Detail based on Monday Baking Day */}
          {selectedEventId === "monday-day" && (
            <div className="space-y-8">
              {/* Dynamic Header */}
              <div className="bg-gradient-to-r from-amber-100 to-[#fff7ed] rounded-3xl p-6 sm:p-10 border border-orange-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 text-left">
                  <span className="bg-[#f97316] text-white text-[9.5px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg inline-block">
                    WEEKLY SPECIAL EVENT
                  </span>
                  <h1 className="text-2.5xl sm:text-4.5xl font-black text-neutral-950 tracking-tight leading-none">
                    매주 월요일은 에브리 <span className="text-[#f97316]">제빵데이!</span>
                  </h1>
                  <p className="text-stone-550 text-xs sm:text-sm font-semibold max-w-xl">
                    바쁜 주말을 흘려보낸 가맹점 및 개인 소상공인 점주님들의 원재료비 부담을 조금이나마 덜어드립니다! 매주 월요일, 에브리베이크 인기 생지 라인업에 즉시 적용되는 추가 <span className="font-extrabold text-neutral-900">10% 모바일 쿠폰</span>을 다운받아 알뜰하게 쟁여두세요!
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  {mondayCouponDownloaded ? (
                    <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 rounded-2xl p-5 sm:p-6 text-center shadow-xs flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      <div>
                        <div className="font-black text-xs sm:text-sm">쿠폰 다운로드 완료 [월요10%]</div>
                        <p className="text-[10px] text-emerald-600 font-semibold max-w-[190px]">
                          B2B 장바구니에 담으신 베스트 제빵 생지 총금액에 10% 추가 혜택이 실시간 상시 누적됩니다!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMondayCouponDownloaded(true);
                        alert("🎉 [월요 제빵데이 10% 추가 스마트 할인 쿠폰]이 성공적으로 발급되었습니다! 장바구니 담기 시 추가 파트너 감면이 적용됩니다.");
                      }}
                      className="bg-violet-600 hover:bg-violet-700 text-white rounded-2xl p-5 sm:p-6 text-center shadow-md cursor-pointer transition-all hover:scale-103 shrink-0 block w-full"
                    >
                      <div className="text-[10px] font-black tracking-widest text-violet-200 uppercase mb-1">MANDATORY BENEFIT</div>
                      <div className="font-black text-lg sm:text-xl">월요생지 10% 추가쿠폰 받기</div>
                      <p className="text-[9.5px] text-violet-100 font-semibold mt-1">클릭 한 번으로 파트너 등록 즉시 할인</p>
                    </button>
                  )}
                </div>
              </div>

              {/* Target items displaying the specific extra 10% discount on B2B dough */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-black text-stone-900">🔥 [월요 제빵데이] 10% 추가 할인 적용 생지 리스트</h3>
                  <span className="text-xs text-stone-400 font-semibold">월요일 전 매장 상시 특가 갱신</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                  {targetDoughs.map((item) => {
                    const discountedPrice = Math.round(item.price * 0.9);
                    return (
                      <div 
                        key={item.id}
                        className="bg-white rounded-3xl p-5 border border-stone-200 shadow-3xs flex flex-col justify-between hover:border-[#f97316] transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[9px] font-black bg-orange-50 text-[#f97316] border border-orange-100 px-2 py-0.5 rounded-lg">
                              10% 월요추가혜택
                            </span>
                            <span className="text-[9px] font-bold text-stone-400">{item.masterName}</span>
                          </div>

                          <h4 className="font-black text-sm text-stone-900 group-hover:text-[#f97316] transition-colors leading-tight mb-1">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-stone-500 font-semibold line-clamp-2 mb-4 leading-normal">
                            {item.description}
                          </p>
                        </div>

                        <div className="space-y-2 mt-4 pt-3 border-t border-stone-100">
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-[10px] text-stone-400 font-bold line-through">₩ {item.price.toLocaleString()}</span>
                              <div className="text-sm font-black text-[#f97316] font-mono">
                                ₩ {discountedPrice.toLocaleString()}
                              </div>
                            </div>
                            <span className="text-[10px] font-black text-red-500 uppercase">파트너 10% OFF</span>
                          </div>

                          <button
                            onClick={() => {
                              // Add with discounted price custom to cart
                              onAddCustomToCart(
                                `event-mon-${item.id}`,
                                `[월요10%특가] ${item.name}`,
                                discountedPrice,
                                "bg-amber-50 text-[#f97316]",
                                item.masterName
                              );
                            }}
                            className="w-full bg-[#f97316] hover:bg-orange-650 text-white font-extrabold text-[11px] py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs group-hover:shadow-xs"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>B2B 월요특가 담기</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Render Detail based on Eco Lineup */}
          {selectedEventId === "eco-sourdough" && (
            <div className="space-y-8">
              {/* Main Header */}
              <div className="bg-stone-100 rounded-3xl p-6 sm:p-10 border border-stone-250 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 text-left">
                  <span className="bg-emerald-700 text-white text-[9.5px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg inline-block">
                    ECO-CONSCIOUS SELECTION
                  </span>
                  <h1 className="text-2.5xl sm:text-4.5xl font-black text-stone-900 tracking-tight leading-none">
                    친환경 라인업 <span className="text-emerald-700">20% 할인 쿠폰</span>
                  </h1>
                  <p className="text-stone-550 text-xs sm:text-sm font-semibold max-w-xl">
                    호밀 르방 발효빵과 정통 시골 사워도우를 기반으로 한 프리미엄 건강 식사빵 제품군입니다. 에브리베이크 론칭을 기념해 환경친화적인 생산 공정에서 날아온 우수한 등급의 깜빠뉴 제품 특별 20% 할인권을 선사합니다.
                  </p>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  {organicCouponDownloaded ? (
                    <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-800 rounded-2xl p-5 sm:p-6 text-center shadow-xs flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      <div>
                        <div className="font-black text-xs sm:text-sm">쿠폰 다운로드 완료 [친환경20%]</div>
                        <p className="text-[10px] text-emerald-600 font-semibold max-w-[190px]">
                          인증받은 유기농 밀가루와 르방 천연 숙성 생지에 자동 적용됩니다.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setOrganicCouponDownloaded(true);
                        alert("🎉 [친환경 론칭기념 20% 감면쿠폰] 다운로드가 정상 완료되었습니다. 깜빠뉴/호밀 라인 결제 시 추가 헤택이 상시 계산됩니다.");
                      }}
                      className="bg-[#24503e] hover:bg-[#1a3d2e] text-white rounded-2xl p-5 sm:p-6 text-center shadow-md cursor-pointer transition-all hover:scale-103 shrink-0 block w-full"
                    >
                      <div className="text-[10px] font-black tracking-widest text-[#a3f0cb] uppercase mb-1">ECO SPECIAL CROP</div>
                      <div className="font-black text-base sm:text-lg">친환경 20% 특별 쿠폰 받기</div>
                      <p className="text-[9px] text-[#b3fadb]/90 font-semibold mt-1">유럽 클래식 건강 식사빵 전용 혜택</p>
                    </button>
                  )}
                </div>
              </div>

              {/* Eco List display */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                  <h3 className="text-base font-black text-stone-900">🌾 [유기농/천연효모 인증] 깜빠뉴 & 사워도우 특가 품목</h3>
                  <span className="text-xs text-stone-400 font-bold">에브리베이크 친환경 인증 파트너사 전제품</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  {allDoughs.filter(i => i.subCategory === "hard").map((item) => {
                    const discountedPrice = Math.round(item.price * 0.8);
                    return (
                      <div 
                        key={item.id}
                        className="bg-white rounded-3xl p-5 border border-stone-200 shadow-3xs flex flex-col justify-between hover:border-emerald-600 transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-lg">
                              친환경 20% 즉시감면
                            </span>
                            <span className="text-[10px] font-black text-stone-400">🌾 저온장기숙성</span>
                          </div>

                          <h4 className="font-black text-[14.5px] text-stone-900 group-hover:text-emerald-700 transition-colors leading-tight mb-2">
                            {item.name}
                          </h4>
                          <p className="text-xs text-stone-550 font-semibold line-clamp-3 leading-relaxed mb-4">
                            {item.description}
                          </p>
                        </div>

                        <div className="space-y-2.5 mt-4 pt-3.5 border-t border-stone-100">
                          <div className="flex items-end justify-between">
                            <div>
                              <span className="text-[10.5px] text-stone-400 font-bold line-through">₩ {item.price.toLocaleString()}</span>
                              <div className="text-[15px] font-black text-emerald-700 font-mono">
                                ₩ {discountedPrice.toLocaleString()}
                              </div>
                            </div>
                            <span className="text-[9.5px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">ECO SAVE</span>
                          </div>

                          <button
                            onClick={() => {
                              onAddCustomToCart(
                                `event-eco-${item.id}`,
                                `[친환경20%] ${item.name}`,
                                discountedPrice,
                                "bg-emerald-50 text-emerald-700",
                                item.masterName
                              );
                            }}
                            className="w-full bg-[#24503e] hover:bg-[#1a3d2e] text-white font-extrabold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>친환경 B2B 특별담기</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Render Detail based on Half Price */}
          {selectedEventId === "half-price" && (
            <div className="space-y-8">
              {/* Main Header */}
              <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-stone-850 shadow-md">
                <div className="space-y-3 max-w-xl text-left">
                  <span className="bg-[#f97316] text-white text-[9.5px] font-black tracking-widest uppercase px-2.5 py-1 rounded-lg inline-block animate-pulse">
                    SUPER 24H LIVE SPECIAL
                  </span>
                  <h1 className="text-2.5xl sm:text-4.5xl font-black text-white tracking-tight leading-none">
                    오늘 하루만 이 가격,<br className="hidden sm:inline" />
                    인기 장비 & 부자재 <span className="text-[#f97316]">반값 폭풍 세일</span> 중!
                  </h1>
                  <p className="text-stone-300 text-xs sm:text-sm font-semibold">
                    매일 오전 11시에 리셋되는 샌드위치용 포장지, 부자재, 그리고 중고 보상 판매 리퍼비시 스마트 장비들을 깜짝 놀랄 만한 파트너 도맷가에 선점해 보세요! 한정 수량 소진 시 예고 없이 종료됩니다.
                  </p>
                </div>
              </div>

              {/* Raw lists for Coffee Roasting Beans & Equipment with 50% discount */}
              <div className="space-y-6 text-left">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-950">📦 오늘의 리미티드 50% 반값 특별 품목</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Item 1 */}
                  <div className="bg-white rounded-3xl p-6 border border-stone-250 flex flex-col justify-between hover:border-[#f97316] transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-red-100 text-red-650 border border-red-200 font-extrabold px-2 py-0.75 rounded-lg">
                          50% SUPER SALE
                        </span>
                        <span className="text-xs font-black text-stone-400">카페 블렌딩 원두</span>
                      </div>
                      <h4 className="text-base font-black text-stone-900 group-hover:text-[#f97316] transition-colors leading-tight">
                        에브리베이커 전용 [골든 크레마 시그니처 블렌드] (10kg 대용량 벌크)
                      </h4>
                      <p className="text-xs text-stone-500 font-semibold leading-relaxed">
                        아라비카 100% 프리미엄 블렌딩 원두로 고소한 견과류 풍미와 다크 초콜릿 피니시를 선사해, 구수하고 바삭한 버터 크로와상과 최고의 마리아주를 자랑하는 베스트셀러 점포 전용 대용량 원두입니다.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-xs font-bold text-stone-400 line-through">₩ 280,000</span>
                          <div className="text-xl font-black text-red-600 font-mono">₩ 140,000</div>
                        </div>
                        <span className="text-xs font-black text-[#f97316] bg-orange-50 border border-orange-100 px-2 py-1 rounded-xl">벌크특가 반값 50%</span>
                      </div>

                      <button
                        onClick={() => {
                          onAddCustomToCart("bulk-bean-50", "[반값득템] 골든 크레마 시그니처 블렌드 10kg", 140000, "bg-[#f97316]/5 text-[#f97316]", "EveryBake Beans");
                        }}
                        className="w-full bg-[#f97316] hover:bg-orange-650 text-white font-black text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>반값 특가로 장바구니 담기</span>
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-white rounded-3xl p-6 border border-stone-250 flex flex-col justify-between hover:border-[#f97316] transition-all group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-red-100 text-red-650 border border-red-200 font-extrabold px-2 py-0.75 rounded-lg">
                          50% SUPER SALE
                        </span>
                        <span className="text-xs font-black text-stone-400">스마트 데크오븐 (리퍼비시)</span>
                      </div>
                      <h4 className="text-base font-black text-stone-900 group-hover:text-[#f97316] transition-colors leading-tight">
                        [R&D 전시회용 리퍼] KCT 데스크톱 스마트 스팀 오븐 [Mini 20L]
                      </h4>
                      <p className="text-xs text-stone-500 font-semibold leading-relaxed">
                        실제 전시회 등에서 실물 바코드 쿠킹 시연만을 위해 3회 이하 구동한 특A급 보상 핫딜 상품입니다. 하부 해동 보강 모듈 탑재 및 스마트 칩셋 완벽 보정 연동되며 정밀 세라믹 돌판 플레이트를 증정합니다.
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="text-xs font-bold text-stone-400 line-through">₩ 3,200,000</span>
                          <div className="text-xl font-black text-red-600 font-mono">₩ 1,600,000</div>
                        </div>
                        <span className="text-xs font-black text-[#f97316] bg-orange-50 border border-orange-100 px-2 py-1 rounded-xl">리퍼 원가 반값 50%</span>
                      </div>

                      <button
                        onClick={() => {
                          onAddCustomToCart("oven-mini-50", "[반값득템-리퍼] KCT 데스크톱 20L 스마트 오븐", 1600000, "bg-slate-50 text-slate-700", "KCT Systems (정품리퍼)");
                        }}
                        className="w-full bg-stone-900 hover:bg-black text-white font-black text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>반값 스마트 오븐 담기 (1대 한정)</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
