import React, { useState, useEffect } from "react";
import { 
  Home, ShoppingCart, Cpu, Calendar, FileText, CheckCircle2, 
  AlertTriangle, Play, Pause, Thermometer, Droplets, RefreshCw, 
  BarChart3, BookOpen, Layers, ShieldCheck, CreditCard, MailCheck, 
  Settings, Bell, ChevronRight, Sparkles, Send, Trash2, Clock, 
  Phone, CloudLightning, Award, LogIn, LogOut, UserCheck, Check, ArrowRight, HelpCircle
} from "lucide-react";

interface DoughItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface PartnerPortalProps {
  isLoggedIn: boolean;
  onLoginSuccess: (userId: string, storeName: string) => void;
  onLogout: () => void;
  onAddToCart: (item: any) => void;
  currentDoughs: DoughItem[];
  orderHistory?: any[];
}

export default function PartnerPortal({
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  onAddToCart,
  currentDoughs,
  orderHistory = []
}: PartnerPortalProps) {
  // Login Form states
  const [partnerId, setPartnerId] = useState("");
  const [partnerPw, setPartnerPw] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [regStoreName, setRegStoreName] = useState("");
  const [regOwnerName, setRegOwnerName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Portal view subsections: "my-home" | "orders" | "iot" | "inventory" | "billing" | "cs"
  const [subView, setSubView] = useState<"my-home" | "orders" | "iot" | "inventory" | "billing" | "cs">("my-home");

  // Portal interactive mock states
  const [reordersCount, setReordersCount] = useState(0);
  
  // IoT state
  const [prooferPower, setProoferPower] = useState(true);
  const [prooferTemp, setProoferTemp] = useState(4.2);
  const [prooferTargetTemp, setProoferTargetTemp] = useState(4);
  const [prooferHumidity, setProoferHumidity] = useState(85);
  const [prooferTargetHumidity, setProoferTargetHumidity] = useState(85);
  const [prooferCycle, setProoferCycle] = useState<"freeze" | "thaw" | "ferment">("thaw");
  
  const [ovenPower, setOvenPower] = useState(false);
  const [ovenTemp, setOvenTemp] = useState(154);
  const [ovenTargetTemp, setOvenTargetTemp] = useState(180);
  const [ovenScheduleTime, setOvenScheduleTime] = useState("05:30");
  const [ovenScheduleActive, setOvenScheduleActive] = useState(true);
  const [iotLog, setIotLog] = useState<string[]>([
    "[05:00] 도우컨디셔너 자동 해동 사이클 전환 성공 (85% 습도)",
    "[04:15] 플랫폼 관제: 도우컨디셔너 급수 밸브 자동 살균 완료",
    "[01:00] 도우컨디셔너 냉동 가동 진입 - 온도 안정 상태 유지"
  ]);

  // Push Alert States
  const [alertTempExceed, setAlertTempExceed] = useState(true);
  const [alertExceedLog, setAlertExceedLog] = useState<string[]>([
    "2026-05-31: 도우컨디셔너 #1 내부 온도 일시적 이탈 (+1.2°C) 경고 - 자동 보정 완료"
  ]);

  // Inventory list
  const [inventoryList, setInventoryList] = useState([
    { id: "inv-1", name: "AOP 버터 크루아상 생지 (60g)", stock: 142, unit: "개", alertMin: 50 },
    { id: "inv-2", name: "명인 시그니처 소금빵 생지", stock: 85, unit: "개", alertMin: 40 },
    { id: "inv-3", name: "클래식 사워도우 멀티 생지", stock: 12, unit: "박스", alertMin: 15 },
    { id: "inv-4", name: "에브리베이크 하우스 블렌드 커피 원두", stock: 4.2, unit: "kg", alertMin: 5.0 },
  ]);
  const [invAdjustmentId, setInvAdjustmentId] = useState("");
  const [invAdjustmentAmount, setInvAdjustmentAmount] = useState<number>(0);

  // Subscriptions schedule
  const [subscriptions, setSubscriptions] = useState([
    { id: "sub-1", name: "식사용 올리브 치아바타 생지 (150개)", interval: "매주 화요일", active: true },
    { id: "sub-2", name: "하우스 블렌드 에스프레소 원두 (10kg)", interval: "매월 1일 및 15일", active: true },
  ]);

  // Tax billing requests
  const [billingHistory, setBillingHistory] = useState([
    { id: "tax-2605", month: "2026년 05월분", totalAmount: 1845000, status: "completed", taxId: "TX-992305" },
    { id: "tax-2604", month: "2026년 04월분", totalAmount: 1583000, status: "completed", taxId: "TX-991402" },
    { id: "tax-2606", month: "2026년 06월분 (현재 누적)", totalAmount: 428000, status: "pending", taxId: "-" },
  ]);

  // Custom A/S and 1:1 Inquiries
  const [asHistory, setAsHistory] = useState([
    { id: "as-1", equip: "크루아상 로터리 오븐", problem: "온도 가열 속도 일시 저하", date: "2026-05-24", status: "completed", tech: "김기환 수석 엔지니어" }
  ]);
  const [asEquip, setAsEquip] = useState("도우컨디셔너 #1");
  const [asProblem, setAsProblem] = useState("");

  const [oneToOneList, setOneToOneList] = useState([
    { id: "cs-1", question: "여름철 생지 배송 시 콜드체인 박스에 드라이아이스가 몇 개 동봉되나요?", date: "2026-05-28", answer: "모든 크루아상 생지는 영하 18도 이하를 유지하기 위해 특수 발포스티롤 팩 및 대형 드라이아이스 4개(외기 28도 기준)가 자동 봉입되어 냉동탑차로 정시 배송됩니다." }
  ]);
  const [csQuestion, setCsQuestion] = useState("");

  // Quick reorder item Evein map
  const favoriteItems = [
    { id: "m-001", name: "명인 시그니처 크루아상 생지 (60g)", price: 1800, category: "master" },
    { id: "m-002", name: "박준현 명인 소금빵 생지 (에베인 벌크)", price: 1650, category: "master" },
    { id: "coffee-1", name: "프리미엄 하우스 에스프레소 원두 (10kg)", price: 195000, category: "coffee" }
  ];

  // Simulated IoT live feedback
  useEffect(() => {
    let interval: any;
    if (prooferPower) {
      interval = setInterval(() => {
        setProoferTemp(current => {
          const diff = prooferTargetTemp - current;
          if (Math.abs(diff) < 0.1) return prooferTargetTemp;
          return Number((current + diff * 0.2).toFixed(1));
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [prooferPower, prooferTargetTemp]);

  useEffect(() => {
    let interval: any;
    if (ovenPower) {
      interval = setInterval(() => {
        setOvenTemp(current => {
          const diff = ovenTargetTemp - current;
          if (Math.abs(diff) < 2) return ovenTargetTemp;
          return Math.round(current + diff * 0.3);
        });
      }, 3000);
    } else {
      interval = setInterval(() => {
        setOvenTemp(current => {
          if (current <= 30) return 28;
          return Math.round(current - (current - 28) * 0.1);
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [ovenPower, ovenTargetTemp]);

  // Handle Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId.trim()) {
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }
    // No database - accept any details as requested
    const store = regStoreName.trim() || `${partnerId}의 브레드 팩토리`;
    onLoginSuccess(partnerId, store);
    setErrorMessage("");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regStoreName.trim() || !regOwnerName.trim() || !regPhone.trim()) {
      setErrorMessage("모든 가입 양식을 입력해주세요.");
      return;
    }
    onLoginSuccess(regOwnerName, regStoreName);
    setErrorMessage("");
  };

  const handleOneClickOrder = (favItem: any) => {
    setReordersCount(c => c + 1);
    onAddToCart({
      id: favItem.id,
      name: favItem.name,
      price: favItem.price,
      stockStatus: "in",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=200",
      category: favItem.category
    });
    // Add to IoT log for cool tracking
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setIotLog(prev => [
      `[${timeStr}] 관제 허브: 즐겨찾는 에베인 상품 (${favItem.name}) 신속 주문 승인`,
      ...prev
    ]);
  };

  const handleApplyAs = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asProblem.trim()) return;
    const todayStr = new Date().toISOString().split("T")[0];
    const newAs = {
      id: `as-${Date.now()}`,
      equip: asEquip,
      problem: asProblem,
      date: todayStr,
      status: "reception" as const,
      tech: "전담 엔지니어 신속 배정 중"
    };
    setAsHistory(prev => [newAs, ...prev]);
    setAsProblem("");
    alert("스마트 기기 정밀 원격 검증 후, 기술 기사가 2시간 내에 배정됩니다.");
  };

  const handleApplyOneToOne = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csQuestion.trim()) return;
    const todayStr = new Date().toISOString().split("T")[0];
    const newCs = {
      id: `cs-${Date.now()}`,
      question: csQuestion,
      date: todayStr,
      answer: "↳ 수렴 중: 전담 카테고리 MD가 회원님의 1:1 문의를 검증하고 있습니다. 10분 내에 답변 상세가 갱신됩니다."
    };
    setOneToOneList(prev => [newCs, ...prev]);
    setCsQuestion("");
  };

  const toggleSubscription = (id: string) => {
    setSubscriptions(prev => 
      prev.map(sub => sub.id === id ? { ...sub, active: !sub.active } : sub)
    );
  };

  const handleInventoryAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invAdjustmentId) return;
    setInventoryList(prev => 
      prev.map(item => {
        if (item.id === invAdjustmentId) {
          return { ...item, stock: Number(invAdjustmentAmount) };
        }
        return item;
      })
    );
    setInvAdjustmentId("");
    setInvAdjustmentAmount(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="b2b-partner-portal-root">
      
      {/* ---------------------------------------------------------------------- */}
      {/* NOT LOGGED IN VIEW: LOGIN & REGISTER FORMS                              */}
      {/* ---------------------------------------------------------------------- */}
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden animate-fade-in" id="portal-login-screen">
          <div className="bg-gradient-to-br from-stone-900 to-stone-950 p-8 text-white relative">
            <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-[#f97316] border border-orange-500/30 px-2 py-0.5 rounded uppercase">
              EveryBake Partner
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f97316] flex items-center justify-center font-black text-lg shadow-md mb-3">
              🥐
            </div>
            <h2 className="text-xl font-black font-sans tracking-tight">EveryBake 나의공간</h2>
            <p className="text-stone-400 text-xs mt-1 leading-relaxed">
              회원님들의 스마트 장비 제어와 원재료 대량 주문부터, 홈베이킹 마니아 고객들도 함께 누리는 특별한 에베인 멤버십 혜택 공간입니다.
            </p>
          </div>
          
          <div className="p-8">
            <div className="flex bg-stone-100 p-1 rounded-xl mb-6">
              <button
                onClick={() => { setIsRegisterMode(false); setErrorMessage(""); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isRegisterMode ? "bg-white text-stone-950 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              >
                에베인 로그인
              </button>
              <button
                onClick={() => { setIsRegisterMode(true); setErrorMessage(""); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isRegisterMode ? "bg-white text-stone-950 shadow-sm" : "text-stone-500 hover:text-stone-900"}`}
              >
                멤버십 신규 등록
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {!isRegisterMode ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-500 mb-1.5">점포 회원 ID (이메일 혹은 매장코드)</label>
                  <input
                    type="text"
                    placeholder="everybake_partner"
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#f97316] rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-stone-400"
                  />
                  <p className="text-[10px] text-stone-400 mt-1">※ 임의의 아무 ID나 비밀번호를 입력하셔도 즉시 로그인이 가능합니다.</p>
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-500 mb-1.5">인증 패스워드</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={partnerPw}
                    onChange={(e) => setPartnerPw(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#f97316] rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-stone-900 hover:bg-black text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-lg"
                  >
                    <span>에베인 로그인 ↗</span>
                    <LogIn className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-500 mb-1">매장명 (예: 명인 베이커리 잠실본점)</label>
                  <input
                    type="text"
                    required
                    placeholder="매장을 소유하지 않으셨어도 임의명 입력 가능"
                    value={regStoreName}
                    onChange={(e) => setRegStoreName(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#f97316] rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-500 mb-1">점주/대표자 성명</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={regOwnerName}
                    onChange={(e) => setRegOwnerName(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#f97316] rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-stone-500 mb-1">연락처 전화번호</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#f97316] rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-stone-400"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#f97316] hover:bg-orange-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(249,115,22,0.25)] hover:shadow-lg"
                  >
                    <span>파트너 라이선스 발급 및 가입 완료</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 border-t border-stone-150 pt-5 text-center">
              <span className="text-[10px] text-stone-400 font-medium">© 2026 EveryBake Partners Inc. All smart rights reserved.</span>
            </div>
          </div>
        </div>
      ) : (
        
        // ---------------------------------------------------------------------- 
        // LOGGED IN VIEW: EVEIN MEMBER HOME PORTAL (6 DEFINED SECTIONS)
        // ---------------------------------------------------------------------- 
        <div className="space-y-6 animate-fade-in" id="portal-dashboard-main">
          
          {/* Header Dashboard Banner */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 opacity-[0.02] text-stone-900 text-9xl font-black font-sans leading-none pointer-events-none select-none select-none">FAMILY</div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
                <UserCheck className="w-7 h-7 text-[#f97316]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-stone-400 text-xs font-black uppercase tracking-widest">EVERYBAKE SPECIAL MEMBER</span>
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-extrabold border border-green-200 rounded">● 패밀리 프리미엄 회원</span>
                </div>
                <h2 className="text-xl font-black text-stone-900 tracking-tight mt-1">
                  소금빵 명가 푸드 팩토리 에베인 나의공간
                </h2>
                <p className="text-stone-500 text-xs font-semibold mt-0.5">
                  도우컨디셔너와 스마트 오븐을 원격 관측하고 명인의 신선 생지를 자동화 공급받고 있습니다.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <span className="text-stone-400 text-[10px] font-semibold block leading-none">실시간 플랫폼 동기화</span>
                <span className="text-stone-800 text-xs font-extrabold">정상 클라우드 링크 가동 중</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2.5 rounded-xl border border-stone-200 hover:border-red-600 hover:bg-red-50 text-stone-600 hover:text-red-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>관제 세션 로그아웃</span>
              </button>
            </div>
          </div>

          {/* Core Master-Detail Navigation Sidebar / Sub-tabs for Evein portal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Sidebar menu mapping the 6 exact requested sections */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-stone-200/80 shadow-sm space-y-1">
              <div className="text-[10px] font-black tracking-widest text-[#f97316] uppercase p-2 border-b border-stone-100 mb-2">
                포털 카테고리 메뉴
              </div>
              
              <button
                onClick={() => setSubView("my-home")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  subView === "my-home"
                    ? "bg-stone-900 text-white shadow-sm font-black"
                    : "text-stone-650 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="flex-1">1. 통합 대시보드 (My 홈)</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSubView("orders")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  subView === "orders"
                    ? "bg-stone-900 text-white shadow-sm font-black"
                    : "text-stone-650 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="flex-1">2. 주문 및 배송 관리</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSubView("iot")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  subView === "iot"
                    ? "bg-stone-900 text-white shadow-sm font-black"
                    : "text-stone-650 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span className="flex-1">3. 스마트 장비 연동 제어</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSubView("inventory")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  subView === "inventory"
                    ? "bg-stone-900 text-white shadow-sm font-black"
                    : "text-stone-650 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="flex-1">4. 재고 및 매장 운영 보조</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSubView("billing")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  subView === "billing"
                    ? "bg-stone-900 text-white shadow-sm font-black"
                    : "text-stone-650 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="flex-1">5. 정산 및 세무 지원</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setSubView("cs")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2.5 transition-all ${
                  subView === "cs"
                    ? "bg-stone-900 text-white shadow-sm font-black"
                    : "text-stone-650 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="flex-1">6. 고객 지원 및 A/S</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <div className="pt-4 border-t border-stone-100 px-2 mt-4 space-y-3">
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[10px] text-stone-600 font-semibold leading-relaxed">
                    <strong>MD 원격 관제 가동 중</strong><br />
                    매장 주변 유동 권역 분석 데이터에 맞춰, 생지 숙성 온도를 AI 추천 섭씨 4.0°C에 자동 보정 고정했습니다.
                  </div>
                </div>
              </div>
            </div>

            {/* Main viewports of the selected dynamic 6 sections */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* ---------------------------------------------------------------------- */}
              {/* SECTION 1: INTEGRATED DASHBOARD                                       */}
              {/* ---------------------------------------------------------------------- */}
              {subView === "my-home" && (
                <div className="space-y-6 animate-fade-in" id="portal-subview-my-home">
                  
                  {/* Grid 1: Status cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                      <div className="text-stone-400 text-[10px] font-black uppercase tracking-wider block">월간 원자재 구매 정산</div>
                      <div className="text-stone-900 text-lg font-black mt-1">₩3,428,000</div>
                      <div className="text-[10px] text-green-600 font-bold mt-1.5 flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" /> 미납 가공 대금 없음 (정상)
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                      <div className="text-stone-400 text-[10px] font-black uppercase tracking-wider block">결제 완료</div>
                      <div className="text-stone-900 text-lg font-black mt-1">2 건</div>
                      <div className="text-stone-500 text-[10px] font-semibold mt-1.5 block">당사 익일 자동 새벽 출하 예정</div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                      <div className="text-stone-400 text-[10px] font-black uppercase tracking-wider block">배송 중인 항목</div>
                      <div className="text-amber-600 text-lg font-black mt-1 flex items-center gap-1">
                        <span>1 건</span>
                        <span className="text-[10px] text-white bg-amber-500 px-1.5 py-0.5 rounded animate-pulse font-bold">실시간 추적</span>
                      </div>
                      <div className="text-stone-500 text-[10px] font-semibold mt-1.5 block">전라 전주 한옥 명장 허브 통과</div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                      <div className="text-stone-400 text-[10px] font-black uppercase tracking-wider block">도착 완료 / 예정 목록</div>
                      <div className="text-stone-900 text-lg font-black mt-1">오늘 오후 15시</div>
                      <div className="text-stone-500 text-[10px] font-semibold mt-1.5 block">포카치아 외 냉동 생지 35박스</div>
                    </div>
                  </div>

                  {/* Grid 2: IoT Hardware Quick Panel & One Click Reorder */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Device Status Summaries */}
                    <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-stone-900 font-black text-sm tracking-tight flex items-center gap-1.5">
                            <Cpu className="w-4.5 h-4.5 text-[#f97316]" />
                            에베인 매장 스마트 장비 연동 정보
                          </h3>
                          <button 
                            onClick={() => setSubView("iot")} 
                            className="text-[10px] font-bold text-[#f97316] hover:underline flex items-center"
                          >
                            상세설정/제어 가기 <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-stone-500 text-xs mb-4">클라우드 데이터와 IoT 펌웨어로 수렴된 매장 기기 현황입니다.</p>
                        
                        <div className="space-y-4">
                          {/* Proofer state summary */}
                          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                <span className="text-xs font-black text-stone-800">도우컨디셔너 #1</span>
                              </div>
                              <span className="text-[10px] text-stone-500 mt-1 block">현재 숙성 단계: <strong>{prooferCycle === "freeze" ? "급속 냉동" : prooferCycle === "thaw" ? "저온 해동" : "정밀 발효"} 사이클</strong></span>
                            </div>
                            <div className="text-right">
                              <span className="text-stone-900 font-extrabold text-xs block">{prooferTemp}°C / {prooferHumidity}%</span>
                              <span className="text-[9px] text-[#f97316] font-bold">기준 설정 {prooferTargetTemp}°C</span>
                            </div>
                          </div>

                          {/* Oven state summary */}
                          <div className={`p-3.5 rounded-xl border transition-all ${ovenPower ? "bg-amber-50/50 border-amber-200" : "bg-stone-50 border-stone-200"} flex justify-between items-center`}>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${ovenPower ? "bg-orange-500 animate-pulse" : "bg-stone-400"}`} />
                                <span className="text-xs font-black text-stone-800">크루아상 로터리 오븐</span>
                              </div>
                              <span className="text-[10px] text-stone-500 mt-1 block">스케줄 예약: <strong>{ovenScheduleActive ? "오전 05:30 자동가동" : "사용량 제한 비활성"}</strong></span>
                            </div>
                            <div className="text-right">
                              <span className="text-stone-900 font-extrabold text-xs block">{ovenPower ? `${ovenTemp}°C` : "가동 대기"}</span>
                              <span className="text-[9px] text-stone-400 block font-normal">설정치 {ovenTargetTemp}°C</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-stone-150 pt-4 mt-4 flex justify-between items-center text-stone-500 text-[10px]">
                        <span className="flex items-center gap-1 font-medium text-stone-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 안전 관제 정상 작동 중
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#f97316]/80 animate-ping" />
                          <span className="font-bold text-[#f97316]">IoT 원격 연동 활성화</span>
                        </div>
                      </div>
                    </div>

                    {/* One-Click Fast Reorders */}
                    <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-stone-900 font-black text-sm tracking-tight flex items-center gap-1.5">
                            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
                            단골 품목 원클릭 재주문
                          </h3>
                          <span className="text-[9px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded font-black uppercase">
                            Fast Dispatch
                          </span>
                        </div>
                        <p className="text-stone-500 text-xs mb-3">매일 일괄적으로 시키는 주요 품목을 카트에 즉시 한 개 단위로 축적합니다.</p>
                        
                        <div className="space-y-2">
                          {favoriteItems.map(fav => (
                            <div key={fav.id} className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-150 flex justify-between items-center transition-all group">
                              <div>
                                <span className="text-[10px] text-[#f97316] font-bold block">{fav.category === "master" ? "명인생지 라인업" : "커피원두 라인업"}</span>
                                <span className="text-stone-800 text-xs font-black">{fav.name}</span>
                              </div>
                              <button
                                onClick={() => handleOneClickOrder(fav)}
                                className="px-3 py-1.5 bg-[#f97316] hover:bg-orange-650 text-white text-[10px] font-extrabold rounded-lg flex items-center gap-1 transition-all shadow-sm cursor-pointer group-hover:scale-105 active:scale-95"
                              >
                                <span>원클릭 정시 재주문 ⚡</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {reordersCount > 0 && (
                        <div className="bg-orange-50 border border-orange-200 p-2.5 rounded-xl mt-3 flex items-center justify-between">
                          <span className="text-[10px] text-[#f97316] font-extrabold flex items-center gap-1">
                            <Check className="w-4.5 h-4.5" /> 총 {reordersCount}종의 에베인 특가 상품이 장바구니에 동적 추가되었습니다!
                          </span>
                          <button 
                            onClick={() => { setReordersCount(0); }}
                            className="text-[9px] text-stone-400 hover:text-stone-900 font-medium"
                          >
                            초기화
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------------- */}
              {/* SECTION 2: DISPATCH & SHIPMENT MANAGEMENT                             */}
              {/* ---------------------------------------------------------------------- */}
              {subView === "orders" && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 animate-fade-in" id="portal-subview-orders">
                  <div>
                    <h3 className="text-stone-900 font-black text-base tracking-tight flex items-center gap-2 font-sans">
                      <ShoppingCart className="w-5 h-5 text-[#f97316]" />
                      에베인 실시간 주문 및 새벽 배송 추적
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">대량 식자재 및 명인 크루아상 생지의 결제/정기배송 정밀 경로입니다.</p>
                  </div>

                  {/* Dynamic user completed orders from checkout */}
                  {orderHistory.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-stone-900 font-extrabold text-xs uppercase tracking-wider text-amber-600 flex items-center gap-1.5 font-mono">
                        <span>⚡</span> 실시간 라이브 주문 내역 ({orderHistory.length}건)
                      </h4>
                      {orderHistory.map((order, idx) => (
                        <div key={order.orderId || idx} className="p-5 bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 shadow-lg space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-stone-800">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-white select-all">주문번호: <span className="font-mono text-[#f97316]">{order.orderId}</span></span>
                                <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold font-sans">실시간 승인됨</span>
                              </div>
                              <p className="text-[10px] text-stone-400 mt-1">결제일시: {order.date} | 수납수단: {order.paymentMethod}</p>
                            </div>
                            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-extrabold rounded-md border border-emerald-500/20 flex items-center gap-1 tracking-wider uppercase">
                              <Check className="w-3.5 h-3.5" /> 콜드체인 수급 대기 중
                            </span>
                          </div>

                          {/* Ordered products details inside */}
                          <div className="space-y-2">
                            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-mono">주문 원재료 목록</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {order.items && order.items.map((it: any) => (
                                <div key={it.id} className="p-3 bg-stone-950 rounded-xl border border-stone-850 flex items-center justify-between gap-2">
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-white truncate">{it.name}</p>
                                    <p className="text-[9px] text-stone-500 mt-0.5">₩{it.price.toLocaleString()} · 수량 {it.quantity}개</p>
                                  </div>
                                  <span className="text-[10px] font-black text-[#f97316] bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full shrink-0 font-mono">
                                    {it.quantity}개
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            {/* Estimated Schedule */}
                            <div className="space-y-1">
                              <span className="text-[9px] text-stone-450 uppercase font-bold tracking-widest font-mono">지정 희망 수급일</span>
                              <p className="text-sm font-black text-amber-400">{order.deliveryDate}</p>
                              <p className="text-[10px] text-stone-500">배기가스 저감 1등급 냉동 특수 물류기사 지정 완료</p>
                            </div>
                            {/* Contact Info */}
                            <div className="space-y-1">
                              <span className="text-[9px] text-stone-450 uppercase font-bold tracking-widest font-mono">긴급 배송 연락처</span>
                              <p className="text-xs font-bold text-stone-300">{order.contact}</p>
                              <p className="text-[10px] text-stone-500">도착 직전 및 도어락 진입 전 자동 통보 예정</p>
                            </div>
                          </div>

                          {/* Interactive order timeline */}
                          <div className="mt-4 p-4 bg-stone-950 rounded-xl border border-stone-850">
                            <p className="text-[10px] text-[#f97316] font-bold uppercase tracking-wider mb-3 font-mono">EveryBake 콜드체인 실시간 프로세스</p>
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <div className="flex flex-col items-center gap-1.5 text-emerald-400 flex-1">
                                <span className="w-5 h-5 rounded-full bg-emerald-500 text-stone-950 text-[10px] flex items-center justify-center font-black">✓</span>
                                <span className="text-[10px]">원장접수</span>
                              </div>
                              <div className="h-[2px] bg-emerald-500 flex-1 self-center mx-1.5 mb-4" />
                              <div className="flex flex-col items-center gap-1.5 text-stone-200 flex-1">
                                <span className="w-5 h-5 rounded-full bg-[#f97316] text-black text-[10px] flex items-center justify-center font-black">2</span>
                                <span className="text-[10px]">밀봉포장</span>
                              </div>
                              <div className="h-[2px] bg-stone-800 flex-1 self-center mx-1.5 mb-4" />
                              <div className="flex flex-col items-center gap-1.5 text-stone-500 flex-1">
                                <span className="w-5 h-5 rounded-full bg-stone-800 text-stone-500 text-[10px] flex items-center justify-center">3</span>
                                <span className="text-[10px]">탑차배송</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standard Shipment Tracking Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-stone-900 font-extrabold text-xs uppercase tracking-wider text-stone-500 font-mono">
                      🗓️ 가맹 정기 계약 공급 배송 건
                    </h4>
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-150">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-stone-800">배송 송장 번호: <span className="font-mono text-[#f97316]">KCT-TRK-77192-KR</span></span>
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-extrabold rounded-md border border-blue-150 flex items-center gap-1 tracking-wider uppercase">
                          <TruckIcon className="w-3.5 h-3.5 animate-bounce" /> 특수 탑차 배송 중
                        </span>
                      </div>

                      {/* Timeline elements */}
                      <div className="relative pl-6 space-y-6 border-l border-stone-200">
                        <div className="relative">
                          <div className="absolute -left-8.5 top-0 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-sm flex items-center justify-center text-white" />
                          <div>
                            <div className="text-xs font-extrabold text-stone-900">현위치: [배송 중] 경기 이천 남부 허브 순환 통과</div>
                            <p className="text-[10px] text-stone-500 mt-0.5">명장 원재료 품질 유지 냉동 밀봉 컨테이너 영하 -19.2°C 정상 실시간 관측됨</p>
                            <span className="text-[9px] text-stone-400 font-mono block mt-1">2026-06-01 02:30 (현재 상태)</span>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-8.5 top-0 w-5 h-5 rounded-full bg-stone-400 border-4 border-white shadow-sm flex items-center justify-center text-white" />
                          <div>
                            <div className="text-xs font-extrabold text-stone-700">익일 새벽 도착 예정역: [매점 도어락 진입 배송]</div>
                            <p className="text-[10px] text-stone-400 mt-0.5">내일 오전 05:00 전 지점 도어락 자동 동기화 키로 보안 출입하여 냉실에 직접 포가 봉입</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regular auto replenishment subscriptions */}
                  <div>
                    <h4 className="text-stone-900 font-black text-sm mb-3 flex items-center gap-1.5 font-sans">
                      <Calendar className="w-4 h-4 text-orange-500" /> regular_dispatch_schedule 정기 주문/구독 관리
                    </h4>
                    <p className="text-stone-500 text-xs mb-4">매번 수작업 주문 없이, 가구별 정시 소비량에 맞춘 요일별 자동 생지 배송 목록입니다.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {subscriptions.map(sub => (
                        <div key={sub.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex justify-between items-center transition-all">
                          <div>
                            <span className="text-[10px] text-stone-400 font-bold block">{sub.interval} 자동 실행</span>
                            <span className="text-stone-900 text-xs font-black block mt-0.5">{sub.name}</span>
                            <span className="text-[9px] text-stone-500 block">설정 배송: 새벽 3시~5시 보안 직접 도어락 배송</span>
                          </div>
                          <button
                            onClick={() => toggleSubscription(sub.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                              sub.active 
                                ? "bg-stone-900 text-white hover:bg-black" 
                                : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                            }`}
                          >
                            {sub.active ? "● 구독 가동 중" : "○ 일시정지됨"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Wholesale Unit price fluctuation log */}
                  <div>
                    <h4 className="text-stone-900 font-black text-sm mb-3 flex items-center gap-1.5 font-sans">
                      <BarChart3 className="w-4 h-4 text-amber-500" /> 생지 시장 회원가 변동 상황판
                    </h4>
                    <p className="text-stone-500 text-xs mb-3">러시아 대선 및 밀가루 국제 거래 메트릭스 변동에 대응하는 에베인 회원 전용 원자재 시세입니다.</p>
                    <div className="overflow-x-auto rounded-xl border border-stone-200">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-stone-100 text-stone-600 font-bold text-[10px] uppercase border-b border-stone-200">
                            <th className="p-3">원재료 상품 품목</th>
                            <th className="p-3">KCT 회원 우대 납품가</th>
                            <th className="p-3">전월 대비 등락</th>
                            <th className="p-3">변동 폭 추세</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs font-semibold divide-y divide-stone-150">
                          <tr className="hover:bg-stone-50">
                            <td className="p-3 font-bold text-stone-800">AOP 프리미엄 크루아상 60g</td>
                            <td className="p-3 text-stone-900">₩1,800 / 개</td>
                            <td className="p-3 text-green-600">▼ -50원 (보라 안정)</td>
                            <td className="p-3 text-[10px] text-stone-500">생지 공급망 최적화로 낮아짐</td>
                          </tr>
                          <tr className="hover:bg-stone-50">
                            <td className="p-3 font-bold text-stone-800">소금빵 프랑스 T55 생지 에베인특가</td>
                            <td className="p-3 text-stone-900">₩1,650 / 개</td>
                            <td className="p-3 text-red-600">▲ +120원 (인상)</td>
                            <td className="p-3 text-[10px] text-stone-500">EU 수입 관세 버터 요동의 영향</td>
                          </tr>
                          <tr className="hover:bg-stone-50">
                            <td className="p-3 font-bold text-stone-800">에소 하우스 원두 (10kg 박스)</td>
                            <td className="p-3 text-stone-900">₩195,000 / 박스</td>
                            <td className="p-3 text-stone-400">0.0% (동결)</td>
                            <td className="p-3 text-[10px] text-stone-500">당사 직영 브라질 가공 농가 전담</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------------- */}
              {/* SECTION 3: IoT DEVICE REMOTE CONTROLS & LOGS                          */}
              {/* ---------------------------------------------------------------------- */}
              {subView === "iot" && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 animate-fade-in" id="portal-subview-iot">
                  <div>
                    <h3 className="text-stone-900 font-black text-base tracking-tight flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-orange-500" />
                      스마트 IoT 장비 실시간 통제 및 자동화
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">매장 밖에서도 스마트폰으로 도우 숙성 제어와 오븐 예열 사이클을 안전 제어합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Device A: Dough Conditioner */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-stone-150">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#f97316] font-bold">IoT DEVICE A</span>
                          <h4 className="text-stone-900 font-black text-sm">도우컨디셔너 #1 (D-CON-PRO)</h4>
                        </div>
                        <button
                          onClick={() => setProoferPower(!prooferPower)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase transition-all ${
                            prooferPower 
                              ? "bg-green-500 text-white shadow-sm" 
                              : "bg-stone-350 text-stone-600"
                          }`}
                        >
                          {prooferPower ? "● 운전 가동 중" : "○ 물리 정동"}
                        </button>
                      </div>

                      {prooferPower && (
                        <div className="space-y-4">
                          {/* Live parameters */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded-xl border border-stone-150 text-center">
                              <span className="text-[10px] text-stone-400 font-bold block">실시간 내동 온도</span>
                              <span className="text-stone-900 text-xl font-black mt-1 block">{prooferTemp}°C</span>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-stone-150 text-center">
                              <span className="text-[10px] text-stone-400 font-bold block">실시간 내동 습도</span>
                              <span className="text-stone-900 text-xl font-black mt-1 block">{prooferHumidity}%</span>
                            </div>
                          </div>

                          {/* Action Cycle select */}
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-black uppercase text-stone-500">숙성 사이클 원격 실행</label>
                            <div className="grid grid-cols-3 gap-1">
                              {["freeze", "thaw", "ferment"].map((cyc) => (
                                <button
                                  key={cyc}
                                  onClick={() => {
                                    setProoferCycle(cyc as any);
                                    if (cyc === "freeze") { setProoferTargetTemp(-18); setProoferTargetHumidity(60); }
                                    if (cyc === "thaw") { setProoferTargetTemp(4); setProoferTargetHumidity(85); }
                                    if (cyc === "ferment") { setProoferTargetTemp(28); setProoferTargetHumidity(90); }
                                  }}
                                  className={`py-2 text-[10px] font-bold rounded-lg border uppercase transition-all ${
                                    prooferCycle === cyc
                                      ? "bg-[#f97316] text-white border-orange-600 shadow-sm"
                                      : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                                  }`}
                                >
                                  {cyc === "freeze" ? "❄️ 급속 냉동" : cyc === "thaw" ? "🌡️ 저온 해동" : "🥖 정밀 숙성발료"}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Dynamic slider control */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-stone-500 font-bold">🎯 목표 온도 세팅:</span>
                              <span className="text-[#f97316] font-extrabold">{prooferTargetTemp}°C</span>
                            </div>
                            <input
                              type="range"
                              min="-20"
                              max="35"
                              value={prooferTargetTemp}
                              onChange={(e) => setProoferTargetTemp(Number(e.target.value))}
                              className="w-full accent-[#f97316]"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-stone-500 font-bold">💧 목표 습도 세팅:</span>
                              <span className="text-blue-600 font-extrabold">{prooferTargetHumidity}%</span>
                            </div>
                            <input
                              type="range"
                              min="50"
                              max="95"
                              value={prooferTargetHumidity}
                              onChange={(e) => setProoferTargetHumidity(Number(e.target.value))}
                              className="w-full accent-blue-600"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Device B: Rotary Oven */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-stone-150">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-amber-600 font-bold">IoT DEVICE B</span>
                          <h4 className="text-stone-900 font-black text-sm">에베인 로터리 터치 오븐 (OVN-SMART)</h4>
                        </div>
                        <button
                          onClick={() => setOvenPower(!ovenPower)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase transition-all ${
                            ovenPower 
                              ? "bg-amber-500 text-white shadow-sm" 
                              : "bg-stone-350 text-stone-600"
                          }`}
                        >
                          {ovenPower ? "● 예열 가동 중" : "○ 대기 전력"}
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-white p-3 rounded-xl border border-stone-150 flex justify-between items-center">
                          <span className="text-xs font-bold text-stone-500">현재 오븐 내부 온도</span>
                          <span className="text-stone-900 font-black text-lg">{ovenTemp}°C</span>
                        </div>

                        {/* Schedule timer setting */}
                        <div className="p-3.5 bg-white rounded-xl border border-stone-150 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-stone-800 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-[#f97316]" />
                              자동 도우예열 예약 스케줄러
                            </span>
                            <input
                              type="checkbox"
                              checked={ovenScheduleActive}
                              onChange={(e) => setOvenScheduleActive(e.target.checked)}
                              className="accent-[#f97316] h-4 w-4"
                            />
                          </div>
                          <p className="text-[10px] text-stone-500 leading-released">매장 오픈 타임에 최치화된 빵 성형이 가능하도록 오븐 온도를 예약해둡니다.</p>
                          
                          <div className="flex gap-2">
                            <input
                              type="time"
                              value={ovenScheduleTime}
                              onChange={(e) => setOvenScheduleTime(e.target.value)}
                              disabled={!ovenScheduleActive}
                              className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-xs font-bold focus:outline-none focus:border-[#f97316] disabled:bg-stone-100 disabled:text-stone-400"
                            />
                            <div className="bg-amber-50 border border-amber-200 px-3 py-2 rounded-lg text-[10px] text-stone-600 font-bold flex items-center">
                              {ovenScheduleActive ? `${ovenScheduleTime}에 예열 시작` : "사용 중단됨"}
                            </div>
                          </div>
                        </div>

                        {/* Slider for target temperature */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-stone-500 font-bold">🔥 굽기 타겟 목표 온도:</span>
                            <span className="text-amber-600 font-extrabold">{ovenTargetTemp}°C</span>
                          </div>
                          <input
                            type="range"
                            min="100"
                            max="250"
                            value={ovenTargetTemp}
                            onChange={(e) => setOvenTargetTemp(Number(e.target.value))}
                            className="w-full accent-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Warning push notifications and IoT Telemetry logic */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Log monitoring */}
                    <div className="p-4 bg-stone-900 rounded-2xl text-white font-mono text-[10.5px] space-y-2 shadow-inner">
                      <div className="flex justify-between items-center text-[10px] text-stone-400 font-black border-b border-stone-800 pb-1.5 uppercase tracking-widest">
                        <span>실시간 IoT 장비 연동 기동 로그 (Live)</span>
                        <span className="text-[#f97316] animate-pulse">● Rec synced</span>
                      </div>
                      <div className="space-y-1.5 h-28 overflow-y-auto">
                        {iotLog.map((log, idx) => (
                          <div key={idx} className="text-stone-300 truncate">
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alert Setting Container */}
                    <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-2.5">
                          <h4 className="text-stone-900 font-black text-xs flex items-center gap-1.5">
                            <Bell className="w-3.5 h-3.5 text-amber-500" /> 온도 센서 감지 이탈 시 푸시 메시지 경고
                          </h4>
                          <input
                            type="checkbox"
                            checked={alertTempExceed}
                            onChange={(e) => setAlertTempExceed(e.target.checked)}
                            className="accent-[#f97316] h-4 w-4"
                          />
                        </div>
                        <p className="text-stone-500 text-[10px] mb-3">설정 온도가 평차 오차범위 1.5°C를 초과하여 대피 수준으로 등재 시 점주 앱으로 Push를 쏩니다.</p>
                        
                        <div className="space-y-1">
                          {alertExceedLog.map((lg, i) => (
                            <div key={i} className="bg-white border border-stone-200 p-2 text-[10px] leading-relaxed rounded-lg text-amber-700 font-medium">
                              ⚠️ {lg}
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setAlertExceedLog([
                            `[오전 ${new Date().getHours()}:${new Date().getMinutes()}] 센서 관제: 온도 편차 피드백 모니터링 정상 동기화 셋업완료`,
                            ...alertExceedLog
                          ]);
                        }}
                        className="w-full mt-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 text-[10px] font-black rounded-lg transition-all"
                      >
                        플랫폼 푸시 경고 강제 테스트 전송 ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------------- */}
              {/* SECTION 4: SMART INVENTORY TRACKER & RECIPE GUIDES                    */}
              {/* ---------------------------------------------------------------------- */}
              {subView === "inventory" && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 animate-fade-in" id="portal-subview-inventory">
                  <div>
                    <h3 className="text-stone-900 font-black text-base tracking-tight flex items-center gap-2">
                      <Layers className="w-5 h-5 text-orange-500" />
                      스마트 점포 재고 추적 및 명장 가이드북
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">주문한 원재료 물량을 기반으로 매장 잔존 생지의 예상 수량을 자동 추산합니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Live stock forecast list */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-stone-900 font-black text-xs uppercase tracking-wider mb-2.5">
                          가상 기반 매장 예상 재고 자동 추산치
                        </h4>
                        <p className="text-stone-400 text-[10px] mb-4 leading-relaxed">익일 주문 확정 수량 및 평균 굽기 스케줄 매칭으로 잔여량이 대조 계산됩니다.</p>
                        
                        <div className="space-y-2">
                          {inventoryList.map(inv => {
                            const isAlert = inv.stock <= inv.alertMin;
                            return (
                              <div key={inv.id} className="p-3 bg-white rounded-xl border border-stone-150 flex justify-between items-center">
                                <div>
                                  <span className="text-stone-800 text-xs font-black block">{inv.name}</span>
                                  <span className="text-[9px] text-stone-400 font-medium">안전 보유 기준: 최소 {inv.alertMin}{inv.unit}</span>
                                </div>
                                <div className="text-right">
                                  <span className={`text-sm font-black block ${isAlert ? "text-red-600 font-black animate-pulse" : "text-stone-900"}`}>
                                    {inv.stock} {inv.unit}
                                  </span>
                                  {isAlert && (
                                    <span className="text-[9px] text-[#f97316] bg-orange-50 border border-orange-100 px-1 py-0.5 rounded font-black">
                                      재고 부족 - 추가 주문 필요!
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Adjust Stock level form inline */}
                      <form onSubmit={handleInventoryAdjust} className="mt-4 pt-4 border-t border-stone-150 flex gap-2">
                        <select
                          value={invAdjustmentId}
                          onChange={(e) => setInvAdjustmentId(e.target.value)}
                          className="flex-1 px-3 py-1.5 border border-stone-200 text-xs rounded-xl font-bold bg-white focus:outline-none focus:border-[#f97316]"
                        >
                          <option value="">수량 보정할 품목 선택</option>
                          {inventoryList.map(i => (
                            <option key={i.id} value={i.id}>{i.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder="수치"
                          value={invAdjustmentAmount || ""}
                          onChange={(e) => setInvAdjustmentAmount(Number(e.target.value))}
                          className="w-16 px-2 py-1.5 border border-stone-200 text-xs rounded-xl font-bold font-mono focus:outline-none focus:border-[#f97316]"
                        />
                        <button
                          type="submit"
                          className="px-3 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all"
                        >
                          보정 반영
                        </button>
                      </form>
                    </div>

                    {/* Baker manuals & recipe guides */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-stone-900 font-black text-xs uppercase tracking-wider mb-2.5">
                          📚 구매 생지 전담 제과명장 굽기 공식 레시피
                        </h4>
                        <p className="text-stone-400 text-[10px] mb-4 leading-relaxed">명인들이 수십 년간 닦아온 오븐 베이킹 도를 IoT 세팅치로 동기화합니다.</p>
                        
                        <div className="space-y-3">
                          <div className="p-3 bg-white border border-stone-150 rounded-xl space-y-1">
                            <span className="text-[10px] text-[#2563eb] font-bold block">🥐 이영철 명인 크루아상 공식</span>
                            <div className="grid grid-cols-3 gap-1 text-[10px] text-stone-600 font-semibold text-center divide-x divide-stone-100">
                              <div>행동 30분<br />(상온)</div>
                              <div>발효 50분<br />(28°C, 80%)</div>
                              <div>오븐 15분<br />(데크 175°C)</div>
                            </div>
                          </div>

                          <div className="p-3 bg-white border border-stone-150 rounded-xl space-y-1">
                            <span className="text-[10px] text-[#2563eb] font-bold block">🥖 박준현 명인 시그니처 소금빵</span>
                            <div className="grid grid-cols-3 gap-1 text-[10px] text-stone-600 font-semibold text-center divide-x divide-stone-100">
                              <div>해동 제외<br />(즉시가능)</div>
                              <div>숙성 30분<br />(32°C, 85%)</div>
                              <div>오븐 12분<br />(컨벡션 190°C)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => alert("스마트 테블릿 가이드북 PDF 원격 전송이 완료되었습니다.")}
                          className="w-full py-2 bg-stone-900 hover:bg-black text-white text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1.5"
                        >
                          <BookOpen className="w-4 h-4" /> 전체 빵 74종 고화질 가이드북 다운로드 ↗
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------------- */}
              {/* SECTION 5: ACCOUNTING & TAX SUPPORT                                  */}
              {/* ---------------------------------------------------------------------- */}
              {subView === "billing" && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 animate-fade-in" id="portal-subview-billing">
                  <div>
                    <h3 className="text-stone-900 font-black text-base tracking-tight flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#f97316]" />
                      에베인 정산 및 전자 결제 확인서 관리
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">월별 법인 원재료 공급 세무 내역을 확인하고 일괄 명세 출력을 조율할 수 있습니다.</p>
                  </div>

                  {/* Monthly tax invoice ledger */}
                  <div className="p-5 bg-stone-50 rounded-2xl border border-stone-150">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-black text-stone-800">국세청 전송 전자세금계산서 대장</span>
                      <button
                        onClick={() => alert("이번 월분 세금계산서 국세청 즉각 연동 처리가 완료되었습니다.")}
                        className="px-3 py-1 bg-[#f97316] text-white text-[10px] font-black rounded-lg shadow-sm"
                      >
                        세금계산서 발급 일괄 신청 ↗
                      </button>
                    </div>

                    <div className="space-y-2">
                      {billingHistory.map(b => (
                        <div key={b.id} className="p-3.5 bg-white rounded-xl border border-stone-200 flex justify-between items-center">
                          <div>
                            <span className="text-xs font-black text-stone-800 block">{b.month} 거래 명세</span>
                            <span className="text-[10px] text-stone-400 font-mono">가상 승인 번호: {b.taxId}</span>
                          </div>
                          <div className="text-right flex items-center gap-4">
                            <div>
                              <span className="text-stone-900 font-black text-xs block">₩{b.totalAmount.toLocaleString()}</span>
                              <span className="text-[9px] text-[#2563eb] font-bold block">공급가액(과세포함)</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              b.status === "completed" 
                                ? "bg-green-50 text-green-700 border border-green-200" 
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}>
                              {b.status === "completed" ? "영수완료 (국세청신고)" : "집계 처리중"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Corporate Card management */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-stone-900 font-black text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-[#f97316]" /> 법인 결제수단 관리
                        </h4>
                        <p className="text-stone-400 text-[10px] mb-4 leading-relaxed">매월 정기 새벽배송 자동 결제에 사용할 주 결제 수단입니다.</p>
                        
                        <div className="p-3.5 bg-gradient-to-br from-stone-800 to-stone-900 text-white rounded-xl shadow relative">
                          <span className="text-[9px] tracking-wider uppercase text-stone-400 block font-mono">Evein Premium (자동이체)</span>
                          <span className="text-sm font-black tracking-widest block mt-1">KB국민 법인카드 **** **** **** 4920</span>
                          <span className="text-[10px] text-orange-400 font-bold block mt-3">기본 사용 결제수단 등록됨</span>
                        </div>
                      </div>
                      <button
                        onClick={() => alert("새로운 금융안전법에 맞춰 결제용 가상 계좌가 성공적으로 할당되었습니다.")}
                        className="w-full mt-4 py-2 bg-stone-900 hover:bg-black text-white text-[10px] font-black rounded-lg transition-all"
                      >
                        신규 간편결제 / 가상계좌 추가 등록 +
                      </button>
                    </div>

                    {/* Report statement downloads print mock */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-stone-900 font-black text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <MailCheck className="w-4 h-4 text-amber-600" /> 월별 전자 거래 명세서 출력
                        </h4>
                        <p className="text-stone-400 text-[10px] mb-4 leading-relaxed">프랜차이즈 및 가맹점 내부 결재에 필요한 모든 세부 내역서 및 영수증을 XLS로 일괄 생성합니다.</p>
                        
                        <div className="space-y-2 text-stone-600 text-[11px] font-semibold">
                          <div className="flex justify-between p-2 bg-white rounded-lg border border-stone-150">
                            <span>2026_05_Transaction_Details.xls</span>
                            <span className="text-[#2563eb] cursor-pointer hover:underline" onClick={() => alert("거래명세서 다큐먼트 원격 생성이 완료되어 다운로드 큐에 등재되었습니다.")}>출력 다운로드</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white rounded-lg border border-stone-150">
                            <span>2026_04_Card_Bill_Receipts.pdf</span>
                            <span className="text-[#2563eb] cursor-pointer hover:underline" onClick={() => alert("신용카드 영수증 PDF 묶음 생성이 완료되었습니다.")}>출력 다운로드</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <span className="text-[10px] text-stone-400 font-medium block text-center leading-normal">※ 세법 법인세 감면 혜택에 해당하는 명세서가 자동으로 검증 포맷화되어 수렴됩니다.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------------------------- */}
              {/* SECTION 6: CUSTOMER SATISFACTION & DEVICE A/S                          */}
              {/* ---------------------------------------------------------------------- */}
              {subView === "cs" && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 animate-fade-in" id="portal-subview-cs">
                  <div>
                    <h3 className="text-stone-900 font-black text-base tracking-tight flex items-center gap-2">
                      <Settings className="w-5 h-5 text-orange-500" />
                      EveryBake 파트너 전용 고객 케어 & 스마트 A/S 접수
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">도우 기기 결함 고장 신속 접수, 불량 생지 1:1 교환 문의 소통 창구입니다.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Device AS Form and History */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-stone-900 font-black text-xs uppercase tracking-wider mb-2.5">
                          🛠️ 스마트 하드웨어 기기 고장 즉시 A/S 신청
                        </h4>
                        <form onSubmit={handleApplyAs} className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 mb-1">장비 대상 선택</label>
                            <select
                              value={asEquip}
                              onChange={(e) => setAsEquip(e.target.value)}
                              className="w-full px-3 py-2 bg-white border border-stone-200 text-xs rounded-lg font-semibold focus:outline-none focus:border-[#f97316]"
                            >
                              <option value="도우컨디셔너 #1">도우컨디셔너 #1 (D-CON-PRO)</option>
                              <option value="B2B 로터리 터치 오븐">크루아상 로터리 오븐 (OVN-SMART)</option>
                              <option value="커피 에스프레소 머신">에베인 멀티보일러 커피 머신</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500 mb-1">고장 코드 혹은 증상 기재</label>
                            <textarea
                              required
                              rows={2}
                              value={asProblem}
                              onChange={(e) => setAsProblem(e.target.value)}
                              placeholder="예: 에러코드 E-213 수온 가열부 히터 불능 또는 팬 소음 발생"
                              className="w-full px-3 py-2 bg-white border border-stone-200 text-xs rounded-lg font-semibold focus:outline-none focus:border-[#f97316] placeholder:text-stone-400"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 bg-[#f97316] hover:bg-orange-600 text-white text-xs font-black rounded-lg transition-all"
                          >
                            정밀 엔지니어 즉각 방문 배정 신청 ↗
                          </button>
                        </form>
                      </div>

                      <div className="mt-4 pt-4 border-t border-stone-150">
                        <span className="text-[10px] text-stone-400 font-bold block mb-2 uppercase tracking-wide">이전 A/S 접수 처리 기록 ({asHistory.length}건)</span>
                        <div className="space-y-1.5 h-20 overflow-y-auto">
                          {asHistory.map(as => (
                            <div key={as.id} className="p-2 bg-white border border-stone-150 rounded-lg text-[10px] leading-normal font-semibold text-stone-600">
                              <span className="text-[#f97316] font-bold block">{as.equip} [{as.status === "completed" ? "수리완료" : "접수완료"}]</span>
                              <span>{as.problem} ({as.date})<br />담당: {as.tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* One-on-one CS message */}
                    <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col justify-between">
                      <div>
                        <h4 className="text-stone-900 font-black text-xs uppercase tracking-wider mb-2.5">
                          💬 원자재 불량/단가 맞춤설계 1:1 빵 CS 채널
                        </h4>
                        <form onSubmit={handleApplyOneToOne} className="space-y-3">
                          <textarea
                            required
                            rows={3}
                            value={csQuestion}
                            onChange={(e) => setCsQuestion(e.target.value)}
                            placeholder="원재료 가공, 부적합 상품 반품 및 특별 납품 단가 에베인 회원 맞춤 문의를 남겨주시면 전담 베이커리 MD가 직접 검증 후 즉시 피드백 드립니다."
                            className="w-full px-3 py-2 bg-white border border-stone-200 text-xs rounded-lg font-semibold focus:outline-none focus:border-[#f97316] placeholder:text-stone-400"
                          />
                          <button
                            type="submit"
                            className="w-full py-2 bg-stone-900 hover:bg-black text-white text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1"
                          >
                            <Send className="w-3.5 h-3.5" /> MD 일대일 답변 요청 수렴
                          </button>
                        </form>
                      </div>

                      <div className="mt-4 pt-4 border-t border-stone-150">
                        <span className="text-[10px] text-stone-400 font-bold block mb-2 uppercase tracking-wide">1:1 CS 점주 상담 이력 ({oneToOneList.length}건)</span>
                        <div className="space-y-2 h-24 overflow-y-auto">
                          {oneToOneList.map(item => (
                            <div key={item.id} className="p-2.5 bg-white border border-stone-150 rounded-lg text-[10px] leading-relaxed font-semibold text-stone-600">
                              <p className="text-stone-900">Q. {item.question} <span className="text-[9px] text-stone-400 font-normal">({item.date})</span></p>
                              <p className="text-blue-600 mt-1 pl-2.5 border-l-2 border-blue-400">{item.answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notices and firmware updates */}
                  <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
                    <h4 className="text-stone-900 font-bold text-xs flex items-center gap-1.5 mb-2">
                      📢 에브리베이크 가맹점주 및 기기 펌웨어 공지사항
                    </h4>
                    <ul className="text-[10px] text-stone-600 font-semibold space-y-1.5 leading-relaxed">
                      <li>• [IoT 펌웨어] 도우컨디셔너 전 제품 대상 제온 항온 가습 안정성 강화 패치 v2.4 릴리스 배포 완료</li>
                      <li>• [전략 공지] 가을 수확철 프랑스 밀가루 유기농 수입 대량 확보로 다음 달부터 크루아상 생지 에베인 대량 주문 단가 변동 인하 예정</li>
                      <li>• [CS 협조] 장비 A/S 현장 기사는 긴급 배정의 경우 서울 전역 1시간 30분 내 응대 대기 체제 전환되었습니다.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

// Inline truck icon
function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        disabled
        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      />
    </svg>
  );
}
