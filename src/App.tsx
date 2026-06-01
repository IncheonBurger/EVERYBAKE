import React, { useState, useEffect } from "react";
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
  Bell
} from "lucide-react";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import OvenSim from "./components/OvenSim";
import KoreaMap from "./components/KoreaMap";
import GlobalMap from "./components/GlobalMap";
import DoughCard from "./components/DoughCard";
import PartnerPortal from "./components/PartnerPortal";
import { CURATED_DOUGHS } from "./data";
import { DoughItem } from "./types";
import ovenImage from "./assets/images/stainless_steel_combo_oven_1780301837442.png";
import warmBakingFamilyImage from "./assets/images/warm_baking_family_1780289855930.png";
import artisanBakerDetailImage from "./assets/images/artisan_baker_detail_1780289872811.png";
import modernSmartOvenImage from "./assets/images/modern_smart_oven_close_1780289886400.png";
import kctActualOvenStoryImage from "./assets/images/stainless_steel_combo_oven_1780301837442.png";

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
  category: "dough" | "coffee" | "raw";
  title: string;
  content: string;
  author: string;
  date: string;
  votes: number;
  status: string;
  votedByMe?: boolean;
}

export default function App() {
  // Navigation View Tracking
  // Current view can be: "home" | "equip-list" | "equip-detail" | "dough-main" | "dough-detail" | "coffee" | "community" | "inquiry" | "login" | "partner-portal"
  const [currentView, setCurrentView] = useState<string>("home");
  
  // B2B Partner Portal login states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userStoreName, setUserStoreName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  
  // Pending item trying to add to cart before login
  const [pendingCartItem, setPendingCartItem] = useState<DoughItem | null>(null);
  
  // Selected dough for the detail view
  const [selectedDoughId, setSelectedDoughId] = useState<string>("m-001");
  
  // Dough lineup sub-tabs: "master" | "global" | "tasty"
  const [activeDoughTab, setActiveDoughTab] = useState<"master" | "global" | "tasty">("master");

  // Shopping / Cart drawer state
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  // Shared interactive map states
  const [selectedKoreaPin, setSelectedKoreaPin] = useState<string | null>(null);
  const [selectedGlobalPin, setSelectedGlobalPin] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [ovenActiveDoughId, setOvenActiveDoughId] = useState<string | null>(null);

  // States for reviews on KCT Smart Pro Machine (equip-detail)
  const [equipReviews, setEquipReviews] = useState<Review[]>([
    {
      id: "eqr-01",
      author: "서울 성수동 A카페 사장님",
      stars: 5,
      content: "혼자서 매장 보느라 빵 구울 시간이 없었는데, EveryBake 기기 앱 알림 덕분에 발효 실패율이 0%가 되었습니다. 수직형이라 좁은 바에도 쏙 들어갑니다.",
      date: "2026-05-18"
    },
    {
      id: "eqr-02",
      author: "부산 해운대 B카페",
      stars: 5,
      content: "스마트폰으로 알림 오는게 너무 편합니다. 저온 발효 정밀 제어가 최고네요. 일시불로 구매한 게 신의 한 수입니다.",
      date: "2026-05-25"
    }
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
        content: "우리 매장 시그니처 메뉴가 되었습니다. 결이 진짜 살아있고 기기가 자동으로 최적 발효를 해주니까 초보 직원이 구워도 완벽한 퀄리티가 나옵니다.",
        date: "2026-05-20"
      }
    ],
    "m-002": [
      {
        id: "dr-02",
        author: "브레드 정원 점주님",
        stars: 5,
        content: "영주 절임 사과 아삭함이 대박입니다. 구울 때 매장에 시나몬 버터향이 가득 퍼져서 손님들이 냄새 맡고 주문을 계속 하시네요.",
        date: "2026-05-14"
      }
    ]
  });
  const [newDoughAuthor, setNewDoughAuthor] = useState("");
  const [newDoughStars, setNewDoughStars] = useState(5);
  const [newDoughContent, setNewDoughContent] = useState("");

  // States query feed for coffee page
  const [coffeeFeed, setCoffeeFeed] = useState<GeneralComment[]>([
    {
      id: "cf-1",
      author: "로스터리 K 사장님",
      content: "CJ 프레시웨이 마스터 로스팅 원두 가성비가 최고 수준입니다. 매번 따로 발주해 마스터하기 번거로웠는데 에브리베이크 한 채널에서 스마트 도우랑 같이 묶음 발재할 수 있어서 매장 운영 코스트가 확실히 줄어들었습니다.",
      date: "2026-05-27",
      replies: [
        {
          author: "EveryBake MD팀 답변",
          content: "만족해주셔서 기쁩니다! 사장님들의 통합 구매력을 활용해 최고의 원자재 단가를 상시 유지하겠습니다.",
          date: "2026-05-28"
        }
      ]
    }
  ]);
  const [newCoffeeAuthor, setNewCoffeeAuthor] = useState("");
  const [newCoffeeContent, setNewCoffeeContent] = useState("");

  // States for Community board (replacing raw view)
  const [activeCommTab, setActiveCommTab] = useState<"dough" | "coffee" | "raw">("dough");
  const [newCommTitle, setNewCommTitle] = useState("");
  const [newCommContent, setNewCommContent] = useState("");
  const [newCommAuthor, setNewCommAuthor] = useState("");
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([
    {
      id: "cp-1",
      category: "dough",
      title: "🥐 요즘 대세인 시그니처 크루키(Crookey) 생지 출시 가능할까요?",
      content: "크로와상 생지 위에 초코칩 쿠키 도우 가득 올린 디저트가 대유행입니다. 가맹점 매출 수직상승 비결인데 본사 차원에서 명작 크루키 생지 단가 낮춰 공급해 주셨으면 합니다.",
      author: "수지 아뜰리에 점주",
      date: "2026-05-28",
      votes: 42,
      status: "MD 검토 중",
    },
    {
      id: "cp-2",
      category: "dough",
      title: "🍞 천연 쌀 치아바타 대용량 벌크 입고 요청",
      content: "비건/기타 장질환 유발 없는 프리미엄 쌀 반죽 치아바타를 찾는 손님이 폭증했습니다. 샌드위치용으로 대용량 포장 묶음으로 입고 희망합니다.",
      author: "정릉 오가닉베이커리",
      date: "2026-05-31",
      votes: 18,
      status: "추천 대기",
    },
    {
      id: "cp-3",
      category: "coffee",
      title: "☕ 수제 밀크크림 디카페인 에티오피아 원두 공동발주 건의",
      content: "카페인에 민감한 저녁 고객 손님 유치용으로 싱글 디카페인을 소단위로도 담을 수 있게 공급망 입점 제안합니다.",
      author: "은평 밤부로스팅",
      date: "2026-06-01",
      votes: 31,
      status: "MD 검토 중",
    },
    {
      id: "cp-4",
      category: "raw",
      title: "🌾 프랑스 명물 포리쉐 T55 프랑스 밀가루 공동 단가 입점",
      content: "자가 제빵하는 소규모 매장에 핵심인 프랑스 국보 밀가루 공급을 오븐 바코드 연동 포장백 구성과 합쳐서 대량 구매 입점 희망합니다. 기압 수율 극대화 가능합니다.",
      author: "빵돌이 브레드 사장",
      date: "2026-05-15",
      votes: 56,
      status: "MD 검토 완료 (입점 예정)",
    }
  ]);

  // States for Inquiries and Corporate Partnerships
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>([
    {
      id: "inq-01",
      company: "(주)프랑스 브레드 파트너스",
      manager: "장 미쉘 이사",
      category: "냉동 생지 납품 제안",
      details: "저희가 공급 중인 고메 올가닉 샤랑트 푸아투 AOP 버터 데니쉬 생지 라인업을 KCT의 스마트 유통망 및 오븐 코드 연동에 등록하고 싶습니다. 샘플 발송을 위한 절차 코드를 부탁드립니다.",
      date: "2026-05-26",
      status: "completed",
      answer: "제안 감사드립니다. 상세 제안 확인 후 KCT 글로벌 수입 MD가 기재해주신 유선 번호로 직접 유선 가이드를 발송해 드렸습니다. 당사 오븐 호환 스캔 테스트 절차에 감사드립니다."
    },
    {
      id: "inq-02",
      company: "로스터즈 팩토리 코리아",
      manager: "김민혁 대리",
      category: "커피 원두 및 머신 제안",
      details: "콜롬비아 엘 파라이소 리치 무산소 발효 원두의 독점 대량 유통을 제안하고 싶습니다.",
      date: "2026-05-29",
      status: "reviewing",
      answer: "제안에 깊이 감사드립니다. 요청주신 특수 가공 원 원두 생두에 대해 KCT 신사업개발팀에서 단가 마진 수용성 시뮬레이션을 진행하고 있으며, 금주 수요일 최종 피드백을 전달하겠습니다."
    }
  ]);
  const [inqCompany, setInqCompany] = useState("");
  const [inqManager, setInqManager] = useState("");
  const [inqCategory, setInqCategory] = useState("냉동 생지 납품 제안");
  const [inqDetails, setInqDetails] = useState("");
  const [inqPhone, setInqPhone] = useState("");
  const [showInqSuccessAlert, setShowInqSuccessAlert] = useState(false);

  // Auto scroll reset on view transitions
  const handleNav = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Setup synchronous maps triggers or active filters
  const selectedDough = CURATED_DOUGHS.find(d => d.id === selectedDoughId) || CURATED_DOUGHS[0];

  // Map dough lists depending on categories
  const masterDoughs = CURATED_DOUGHS.filter(d => d.category === "master");
  const globalDoughs = CURATED_DOUGHS.filter(d => d.category === "global");
  
  // Tasty pick can filter customized or highly requested catalog items! 
  const tastyPickDoughs = CURATED_DOUGHS.filter(d => d.id === "m-001" || d.id === "m-002" || d.id === "g-001" || d.id === "h-001" || d.id === "s-001" || d.id === "p-001" || d.id === "h-002");

  // Dynamic products rendering depending on what tab is selected
  const getTabDoughs = () => {
    switch (activeDoughTab) {
      case "master":
        // Filter by map if interactive pins are clicked
        if (selectedKoreaPin) {
          return masterDoughs.filter(d => d.id === selectedKoreaPin);
        }
        return masterDoughs;
      case "global":
        if (selectedGlobalPin) {
          return globalDoughs.filter(d => d.id === selectedGlobalPin);
        }
        return globalDoughs;
      case "tasty":
        return tastyPickDoughs;
      default:
        return masterDoughs;
    }
  };

  // B2B login state handlers
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
            c.item.id === pendingCartItem.id ? { ...c, quantity: c.quantity + 1 } : c
          );
        }
        return [...prev, { item: pendingCartItem, quantity: 1 }];
      });
      const addedName = pendingCartItem.name;
      setPendingCartItem(null);
      setCartOpen(true);
      setTimeout(() => {
        alert(`🔓 B2B 파트너 인증이 완료되었습니다!\n가선택하셨던 [${addedName}] 상품이 장바구니에 자동 추가되었으며 바로 발주 신청이 가능합니다.`);
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
    const existingDough = CURATED_DOUGHS.find(d => d.id === item.id);
    if (existingDough) {
      handleAddToCart(existingDough);
    } else {
      const virtualItem: DoughItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        masterName: item.category === "coffee" ? "에브리베이크 원두 가공소" : "B2B 명인 생지",
        region: "B2B 제휴",
        description: "B2B 점주 전용 원클릭 빠른 수급 보장 상품",
        stockStatus: "in",
        statusText: "동기화 즉시 배송",
        barcode: `880${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        category: "global",
        subCategory: "soft",
        imageLabel: "📦 비주얼 B2B 수급 원재료",
        iconBg: "bg-amber-100/60",
        settings: {
          defrostTemp: 22,
          defrostTime: 30,
          fermentTemp: 28,
          fermentHumidity: 85,
          fermentTime: 45,
          bakeTemp: 180,
          bakeTime: 15,
          steam: true
        }
      };
      handleAddToCart(virtualItem);
    }
  };

  // Cart operations
  const handleAddToCart = (item: DoughItem) => {
    if (!isLoggedIn) {
      alert(`⚠️ [${item.name}] 상품을 장바구니에 담고 발주(주문)하기 위해선 B2B 점포 파트너 로그인이 필요합니다.\n로그인 화면으로 안내해 드립니다. 로그인 시 이 상품이 자동으로 장바구니에 추가됩니다.`);
      setPendingCartItem(item);
      setCurrentView("login");
      setCartOpen(false);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  // Generic custom cart item creator for special sections like Coffee or auxiliary items
  const handleAddCustomToCart = (id: string, name: string, price: number, iconBg: string, brand: string) => {
    const virtualDoughItem: DoughItem = {
      id,
      name,
      masterName: brand,
      region: "수입원",
      price,
      description: `${brand}에서 B2B 최우선 도매 공급하는 특선 품목입니다.`,
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
        steam: false
      }
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
      date: new Date().toISOString().split("T")[0]
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
      date: new Date().toISOString().split("T")[0]
    };

    const currentList = doughReviews[doughId] || [];
    setDoughReviews({
      ...doughReviews,
      [doughId]: [review, ...currentList]
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
      date: new Date().toISOString().split("T")[0]
    };

    setCoffeeFeed([comment, ...coffeeFeed]);
    setNewCoffeeAuthor("");
    setNewCoffeeContent("");
  };

  const handleVotePost = (id: string) => {
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
            status: nextStatus
          };
        }
        return post;
      })
    );
  };

  const handleAddCommunityPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommTitle.trim() || !newCommContent.trim() || !newCommAuthor.trim()) return;

    const newPost: CommunityPost = {
      id: `cp-${Date.now()}`,
      category: activeCommTab,
      title: newCommTitle.trim(),
      content: newCommContent.trim(),
      author: newCommAuthor.trim(),
      date: new Date().toISOString().split("T")[0],
      votes: 1,
      status: "추천 대기",
      votedByMe: true
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewCommTitle("");
    setNewCommContent("");
    setNewCommAuthor("");
  };

  // B2B proposal submit (with automatic delayed feedback from KCT team)
  const handleAddInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inqCompany.trim() || !inqManager.trim() || !inqDetails.trim()) return;

    const id = `inq-${Date.now()}`;
    const newInq: Inquiry = {
      id,
      company: inqCompany.trim(),
      manager: inqManager.trim(),
      category: inqCategory,
      details: inqDetails.trim(),
      date: new Date().toISOString().split("T")[0],
      status: "reception"
    };

    setSubmittedInquiries([newInq, ...submittedInquiries]);
    setShowInqSuccessAlert(true);
    setInqCompany("");
    setInqManager("");
    setInqDetails("");
    setInqPhone("");

    // Simulate real-time response ingestion from AI B2B MD
    setTimeout(() => {
      setSubmittedInquiries(current => 
        current.map(item => {
          if (item.id === id) {
            return {
              ...item,
              status: "completed",
              answer: `↳ KCT 신사업팀 답변: 제안주신 ${newInq.category} 안건을 소중히 확인하였습니다. ${newInq.company} 사의 핵심 메트릭스 및 가치를 당사 가공 랩에서 검증하기 위한 1차 온도를 수렴했습니다. 기재해주신 유선 채널을 활용해 직접 배송 샘플 절차를 유선 연락 드리겠습니다.`
            };
          }
          return item;
        })
      );
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-16 antialiased selection:bg-[#f97316] selection:text-white">
      
      {/* Dynamic Header component with custom routing */}
      <Header
        cartCount={cartItems.reduce((s, c) => s + c.quantity, 0)}
        onCartToggle={() => setCartOpen(!cartOpen)}
        currentView={currentView}
        onNav={handleNav}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Cart Sidebar panel */}
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
      />

      {/* Main Container padding matching header offset */}
      <main className="pt-20">
        
        {/* ==================================================== */}
        {/* 1. HOME VIEW                                        */}
        {/* ==================================================== */}
        {currentView === "home" && (
          <div className="animate-fade-in">
            {/* Elegant Hero Welcome Banner Section */}
            <div className="relative min-h-[50vh] xl:min-h-[55vh] flex flex-col justify-center items-center bg-gradient-to-b from-[#fff7ed] via-[#ffedd5] to-stone-50 py-16 px-6 text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-white/50 rounded-full blur-[120px] pointer-events-none select-none" />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none select-none" />

              <div className="max-w-4xl mx-auto space-y-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#f97316] text-[11px] font-extrabold tracking-wider border border-orange-100 shadow-xs uppercase font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-orange-550" />
                  EveryBake B2B Partners Platform
                </span>

                <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
                  당신의 식탁, 당신의 매 순간<br />
                  <span className="text-[#f97316] bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent">에브리베이크</span>에서 만나보세요.
                </h1>

                <p className="text-sm sm:text-base text-stone-505 max-w-2xl mx-auto leading-relaxed font-semibold">
                  스마트한 하드웨어부터 투표로 선정된 프리미엄 생지까지,<br />
                  누구나 완벽한 베이킹을 경험할 수 있습니다.
                </p>

                <div className="flex gap-4 justify-center items-center pt-2">
                  <button
                    onClick={() => handleNav("equip-list")}
                    className="px-6 py-3 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold tracking-tight transition-all shadow-[0_4px_12px_rgba(249,115,22,0.2)]"
                  >
                    스마트 기기 도입하기
                  </button>
                  <button
                    onClick={() => handleNav("dough-main")}
                    className="px-6 py-3 bg-white hover:bg-stone-50 text-stone-850 rounded-xl text-xs font-bold tracking-tight border border-stone-200 shadow-xs transition-all"
                  >
                    프리미엄 생지 카탈로그
                  </button>
                </div>
              </div>
            </div>

            {/* Core B2B Category Navigation Grid */}
            <div className="max-w-5xl mx-auto px-6 py-12">
              <h2 className="text-center text-xs font-extrabold tracking-widest text-[#f97316] uppercase mb-1">
                EXECUTIVE B2B SERVICES
              </h2>
              <h3 className="text-center text-2xl font-black text-stone-905 tracking-tight mb-8">
                플랫폼 전용 비즈니스 영역 선택
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                
                {/* 1. 도우컨디셔너 / 오븐 */}
                <div 
                  onClick={() => handleNav("equip-list")}
                  className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-8 aspect-square relative"
                  id="cat-card-1"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-50 text-[#f97316] flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                    💻
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 group-hover:text-[#f97316] transition-colors">
                    도우컨디셔너 / 오븐
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                    AI 기반 발효 지능<br />스마트 베이킹 오븐
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#f97316] font-bold flex items-center gap-0.5">
                      자세히 보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 2. 프리미엄 생지 */}
                <div 
                  onClick={() => handleNav("dough-main")}
                  className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-8 aspect-square relative"
                  id="cat-card-2"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                    🥐
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 group-hover:text-[#f97316] transition-colors">
                    프리미엄 생지
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                    한국 제과명장의 레시피<br />글로벌 명품 라인업
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#f97316] font-bold flex items-center gap-0.5">
                      자세히 보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 3. 커피 원두 / 머신 */}
                <div 
                  onClick={() => handleNav("coffee")}
                  className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-8 aspect-square relative"
                  id="cat-card-3"
                >
                  <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                    ☕
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 group-hover:text-[#f97316] transition-colors">
                    커피 원두 / 머신
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                    B2B 매장 전용 원두<br />상업용 에스프레소 머신
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#f97316] font-bold flex items-center gap-0.5">
                      자세히 보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 4. 에브리베이크 커뮤니티 */}
                <div 
                  onClick={() => handleNav("community")}
                  className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-8 aspect-square relative"
                  id="cat-card-4"
                >
                  <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 group-hover:text-[#f97316] transition-colors">
                    상생 커뮤니티
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                    전국 사장님들과의 소통<br />신규 품목 입점 제안 및 투표
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#f97316] font-bold flex items-center gap-0.5">
                      소통방 입장 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 5. 입점 및 제휴 문의 */}
                <div 
                  onClick={() => handleNav("inquiry")}
                  className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-8 aspect-square relative"
                  id="cat-card-5"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                    🤝
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 group-hover:text-[#f97316] transition-colors">
                    입점 & 제휴 문의
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                    공급사 신규 상품 등록<br />실시간 제안 전송망
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#f97316] font-bold flex items-center gap-0.5">
                      자세히 보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Mini Brand Highlights */}
            <div className="bg-stone-950 py-12 text-white relative">
              <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="space-y-1">
                  <Award className="w-6 h-6 text-amber-500 mb-2 mx-auto md:mx-0" />
                  <h4 className="text-sm font-bold text-white">100% 프리미엄 자산 보장</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    불합리한 월 이용료나 렌탈 임대 이자를 청구하지 않습니다. 전 부품 고급 스테인리스 하드웨어의 무손실 자산 인수를 지원합니다.
                  </p>
                </div>
                <div className="space-y-1">
                  <ShieldCheck className="w-6 h-6 text-[#f97316] mb-2 mx-auto md:mx-0" />
                  <h4 className="text-sm font-bold text-white">독점 제과명장 직속 체인</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    명장들 및 전 세계 파트너사들과의 다이렉트 수화 라이센싱으로, 오직 급속 동결된 고밀도 프리미엄 원재료만을 당일 배송망을 통해 전달합니다.
                  </p>
                </div>
                <div className="space-y-1">
                  <Smartphone className="w-6 h-6 text-blue-500 mb-2 mx-auto md:mx-0" />
                  <h4 className="text-sm font-bold text-white">정밀 모듈 소성 동기화</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    동기화된 레시피 데이터와 포장지에 내장된 바코드를 전용 스마트 태그 스캐너에 비추는 즉시 최적 숙성·조합 파라미터가 디바이스에 전송 세팅됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb]">KCT AI SMART DEVICE</span>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">스마트 기기 라인업</h1>
              <p className="text-stone-500 text-sm">대한민국 제과 명장의 숙성 발효 노하우와 수분율 데이터가 실시간으로 공급되는 스마트 하드웨어.</p>
            </div>

            {/* Smart hardware product grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div 
                onClick={() => handleNav("equip-detail")}
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
                        <Cpu className="w-3.5 h-3.5 animate-pulse" /> AI 모듈 내장형 기기
                      </span>
                      <span className="text-stone-400 text-xs font-medium font-mono">CODE: KCT-SM-PRO</span>
                    </div>

                    <h3 className="text-lg font-black text-stone-900 group-hover:text-[#2563eb] transition-colors mb-2 text-left">
                      KCT 수직형 AI 도우컨디셔너+오븐 일체형 [Smart Pro] (170cm)
                    </h3>
                    
                    <p className="text-stone-550 text-xs leading-relaxed text-left">
                      좁은 1인 매장의 한계 공간을 혁신적으로 극복하는 170cm 초대형 수직 올인원 스테이션. 하부 도우컨디셔너(해동·발효)와 상부 오븐 모듈이 전용 통신 칩으로 바코드 데이터와 즉시 조정되는 명장 인증 하드웨어입니다.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">B2B 대리점 특판가</span>
                      <span className="text-base font-black text-stone-900 font-mono">₩ 6,500,000</span>
                    </div>
                    <span className="text-xs font-bold text-[#2563eb] flex items-center gap-1 py-1.5 px-3 bg-blue-50 rounded-lg group-hover:translate-x-1 transition-transform">
                      상세 정보 및 시뮬레이터 <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Auxiliary teaser device */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs opacity-75 flex flex-col justify-between h-full">
                <div className="w-full bg-[#f8fafc] rounded-2xl h-72 mb-6 flex flex-col items-center justify-center text-center p-6 border border-dashed border-stone-200 relative overflow-hidden">
                  <Laptop className="w-12 h-12 text-stone-400 mb-3" />
                  <span className="text-xs font-bold text-stone-500 mb-1">KCT Mini Oven Concept</span>
                  <span className="text-[10px] text-stone-400 max-w-xs uppercase font-mono tracking-wider bg-stone-200 px-2.5 py-0.5 rounded">
                    상용화 R&D 평가 단계
                  </span>
                </div>
                
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-[10px] font-bold">
                        개념 설계용 디바이스
                      </span>
                      <span className="text-stone-400 text-xs font-medium font-mono">CODE: KCT-MINI-01</span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-800 mb-2 text-left">
                      KCT 스마트 무선 스팀 프레스기 (미니 쇼케이스)
                    </h3>
                    
                    <p className="text-stone-500 text-xs leading-relaxed text-left">
                      카페 카운터 미니 쇼케이스 장형 배치에 맞춘 콤팩트 데스크톱 디바이스로, 소량 냉동 크로플 및 타르트 자동 소킹을 담당합니다.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-stone-400 font-bold uppercase">예상 보급형 가격대</span>
                      <span className="text-base font-bold text-stone-600 font-mono">출시 예정</span>
                    </div>
                    <span className="text-xs font-bold text-stone-400 flex items-center gap-1 py-1.5 px-3 bg-stone-100 rounded-lg">
                      상용화 준비중
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
                <span className="text-stone-950 font-bold">KCT Smart Pro 170cm</span>
                <span className="text-stone-300">|</span>
                <span>스위치형 AI 하드웨어</span>
              </div>
            </div>

            {/* High-end side-by-side 2-Column Product Detail Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start w-full mb-16">
              
              {/* Left Column: Premium Showpiece Image Gallery */}
              <div className="lg:col-span-6 w-full">
                <div className="w-full bg-stone-50 rounded-[40px] px-8 py-16 flex items-center justify-center relative overflow-hidden border border-stone-150/80 shadow-xs">
                  <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                  
                  {/* Subtle luxurious background accent */}
                  <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-200/10 rounded-full blur-[100px] pointer-events-none" />
                  <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-300/10 rounded-full blur-[100px] pointer-events-none" />

                  <img
                    src={ovenImage}
                    alt="KCT Smart Pro Premium Showpiece"
                    className="h-[360px] md:h-[500px] w-auto object-contain filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.1)] hover:scale-[1.01] transition-transform duration-700 ease-out rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Column: Key Details, Specification, and Purchase */}
              <div className="lg:col-span-6 w-full space-y-6 text-left">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#2563eb] mb-3 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 font-mono">
                    KCT EXCLUSIVE · AI SMART HARDWARE
                  </span>

                  <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight mb-3">
                    KCT Smart Pro
                  </h1>
                  
                  <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50/50 text-[#2563eb] text-[10px] font-bold">
                      <Cpu className="w-3.5 h-3.5 animate-pulse" /> AI 모듈 & 바코드 연동 탑재형 기기
                    </span>
                    <span className="text-stone-400 text-xs font-semibold font-mono">KCT-SM-PRO (170cm)</span>
                  </div>

                  <p className="text-stone-550 text-sm leading-relaxed font-semibold">
                    성인 키 높이의 170cm 수직 올인원 스테이션. 전용 통신 칩이 대량 제과 명인의 냉동 생지 바코드 데이터를 수신하여 실시간 숙성 발효 및 고화력 열 소성을 정밀 조정해냅니다. 단 1평 공간에 최적화된 명장 인증 하드웨어입니다.
                  </p>
                </div>

                {/* Key specs list */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-black text-stone-400 tracking-widest uppercase font-mono">TECHNICAL SPECIFICATIONS</h3>
                  
                  <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
                    <div className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-stone-400 uppercase w-32 font-mono tracking-wider pt-0.5">Chamber Height</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-stone-900">170cm 인체공학적 수직 배치</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">서서 작업하는 작업자의 최적 관절 감각과 매장 내 쾌적한 보행 선형을 극대화한 스마트 챔버.</p>
                      </div>
                    </div>

                    <div className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-stone-400 uppercase w-32 font-mono tracking-wider pt-0.5">Connectivity</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-stone-900">자동 동기화 무선 WiFi 칩 내장</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">자체 바코드 센서와 전용 태블릿 앱 데이터 연집 방식으로 오븐/발효 세팅 자동 조율.</p>
                      </div>
                    </div>

                    <div className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-stone-400 uppercase w-32 font-mono tracking-wider pt-0.5">Fermentation</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-stone-900">AI 능동 온습도 제어 시스템</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">바깥 기온과 미세 수분 차이를 파악하여 이스트 발효 팽창력을 최상으로 유지하는 인공 지능 기법.</p>
                      </div>
                    </div>

                    <div className="py-3 flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-stone-400 uppercase w-32 font-mono tracking-wider pt-0.5">Baking Power</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-stone-900">고안개 고압 스팀 분출 & 세라믹 하우징</p>
                        <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">정밀 아티장 스타일 브리오슈와 바게트 등 크러스트 형성을 위하 스팀 다류 통제 기능 기본 제공.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purchase Area */}
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-150/80 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-[9px] font-black tracking-widest text-[#2563eb] uppercase font-mono block">PARTNER PRICING</span>
                    <span className="text-xs text-stone-450 font-bold block mt-0.5">B2B 결제 전용 대리점 특판가</span>
                    <span className="text-2xl sm:text-3xl font-black text-stone-900 font-mono tracking-tight block mt-1">₩ 6,500,000</span>
                  </div>

                  <button
                    onClick={() => handleAddCustomToCart("eq-pro-01", "KCT Smart Pro (All-in-one)", 6500000, "bg-blue-50 text-[#2563eb]", "KCT Systems")}
                    className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs font-black rounded-xl cursor-pointer transition-all active:scale-95 shadow-md shadow-stone-800/20 h-11 flex items-center justify-center"
                  >
                    장바구니 담고 즉시 주문서 작성
                  </button>
                </div>
              </div>
            </div>

              {/* SECTION 2: APPLE-STYLE LINEAR STORYTELLING FLOW WITH MULTIPLE PREMIUM IMAGES */}
              <div className="w-full py-16 border-t border-stone-200/70 space-y-24">
                
                {/* Introduction Header for Stories */}
                <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
                  <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest font-mono">BEAUTIFUL BAKING LIFE</span>
                  <p className="text-3xl sm:text-4.5xl font-black text-stone-900 tracking-tight leading-tight">
                    모두를 위해 설계된<br />
                    미식 기술의 심플한 따뜻함
                  </p>
                </div>

                {/* Story Stack - All Vertical (No side-by-side text/cols layout!) */}
                <div className="space-y-28 max-w-4xl mx-auto">
                  
                  {/* Item 1: Artisan Baker with image */}
                  <div className="space-y-6">
                    {/* Immersive centered image */}
                    <div className="w-full rounded-[32px] overflow-hidden bg-stone-50 border border-stone-150 shadow-xs">
                      <img 
                        src={artisanBakerDetailImage} 
                        alt="Artisan Master Baker"
                        className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Centered clean description stack */}
                    <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
                      <span className="text-[10px] font-extrabold text-[#f97316] uppercase tracking-widest block font-mono">01 / PROFESSIONAL ARTISAN FIDELITY</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                        30년 제빵 명인의 손가락 끝 감각, 그대로 내재화됩니다
                      </h3>
                      <p className="text-stone-550 text-xs sm:text-sm leading-relaxed">
                        좋은 빵은 반죽의 은온과 구울 때 스며드는 미세 수분의 양에서 완벽함이 갈립니다. 전국구 명장이 가동을 통해 측정하던 발효 온습 곡선과 미세 수분 조절 설계 데이터를 디지털화하여, 초미풍 대류 팬과 세라믹 하우징 오븐이 최상의 한 판을 완성해 냅니다.
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Family Warmth with image */}
                  <div className="space-y-6">
                    {/* Immersive centered image */}
                    <div className="w-full rounded-[32px] overflow-hidden bg-stone-50 border border-stone-150 shadow-xs">
                      <img 
                        src={warmBakingFamilyImage} 
                        alt="Cozy familial baking environment"
                        className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Centered clean description stack */}
                    <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
                      <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block font-mono">02 / HOME CONGENIAL WELLBEING</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                        아침을 여는 소박한 행복, 엄마의 주방에서 피어난 따스한 웃음
                      </h3>
                      <p className="text-stone-550 text-xs sm:text-sm leading-relaxed">
                        버터의 풍요로운 향기가 집안을 사르르 채우는 행복을 느껴보십시오. 조리 안전 차단 시스템이 어린 자녀들과의 소중한 베이킹 체험을 안전하게 수화하며, 전문가의 수고로운 매뉴얼 작업을 원터치 컨트롤 하나로 모두 줄여 주었습니다.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Smart Oven with image */}
                  <div className="space-y-6">
                    {/* Immersive centered image */}
                    <div className="w-full rounded-[32px] overflow-hidden bg-stone-50 border border-stone-150 shadow-xs">
                      <img 
                        src={kctActualOvenStoryImage} 
                        alt="KCT Smart Pro Actual Product Showpiece"
                        className="w-full h-auto max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-700 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Centered clean description stack */}
                    <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
                      <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest block font-mono">03 / INTELLIGENT SENSING ENVIRONMENT</span>
                      <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-snug">
                        대기 환경까지 스스로 측정 조절하는 극도로 정교한 발효
                      </h3>
                      <p className="text-stone-550 text-xs sm:text-sm leading-relaxed">
                        주변 미세 습도와 주위의 사소한 계절성 온도 격차를 스스로 파악하여 효모가 안전하고 충만하게 부풀어 오르는 환경을 성립시킵니다. 수직 일체형 스테이션 디자인으로 공간 배치는 극도로 심플해지고 주방 동선은 탁월하게 개조됩니다.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION 3: RE-CONFIGURED SIMULATOR ZONE (스마트 베이커리 AI 관제판 + Mobile Notification Widget) */}
              <div className="w-full py-16 border-t border-stone-200/70" id="smart-bakery-ai-panel">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-blue-600 tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                    <Wifi className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                    INTELLIGENT IoT REALTIME DUAL-PLAY
                  </span>
                  
                  <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
                    스마트 베이커리 AI 관제판
                  </h2>
                  
                  <p className="text-stone-550 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
                    선택하신 명장 생지의 통신 바코드를 활용해, 기기와 모바일 간 실시간 소통 및 정밀 온습도 변화 그래프를 직접 원격 주입 시뮬레이션해 보십시오.
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
                        const alertBox = document.getElementById("mock-phone-alert-hub");
                        if (alertBox) {
                          alertBox.classList.add("animate-bounce");
                          setTimeout(() => alertBox.classList.remove("animate-bounce"), 1000);
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
                          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block">MOBILE CONTROLLER</span>
                          <span className="text-xs font-black text-stone-900 font-sans block mt-0.5">에브리베이크 원격 앱</span>
                        </div>

                        {/* Dynamic IoT Push Alerts Hub - Users feel the notification real-time */}
                        <div className="space-y-3 my-4 flex-1 overflow-y-auto max-h-[280px] p-1 pr-1.5 scrollbar-thin" id="mock-phone-alert-hub">
                          
                          <div className="text-[9px] font-bold text-stone-400 tracking-wider mb-2 text-center uppercase border-b border-dashed border-stone-200 pb-1">
                            🚨 IoT 실시간 푸시 피드
                          </div>

                          {/* Push Alert 1 */}
                          <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-black text-[#f97316] uppercase bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100/50">
                                AI 실시간 케어
                              </span>
                              <span className="text-[8px] text-stone-400">오전 06:12</span>
                            </div>
                            <p className="text-[10px] font-bold text-stone-800 leading-snug">
                              🔔 발효 조율 완수! <br />
                              <span className="text-stone-550 font-medium">안감 이스트 발효 85% 지점 통과. 도우를 상단 가열실에 예치하십시오.</span>
                            </p>
                          </div>

                          {/* Push Alert 2 */}
                          <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-black text-blue-600 uppercase bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100/50">
                                오븐 자동 예열
                              </span>
                              <span className="text-[8px] text-stone-400">오전 06:14</span>
                            </div>
                            <p className="text-[10px] font-bold text-stone-800 leading-snug">
                              🔥 섭씨 180℃ 사전 가열 개시! <br />
                              <span className="text-stone-550 font-medium">상단 구움 화실의 자동 가열 대류 열기가 준비되었습니다.</span>
                            </p>
                          </div>

                          {/* Push Alert 3 */}
                          <div className="bg-white p-3 rounded-2xl border border-stone-200/80 shadow-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-black text-emerald-600 uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                                스팀 소킹 검증
                              </span>
                              <span className="text-[8px] text-stone-400">오전 06:25</span>
                            </div>
                            <p className="text-[10px] font-bold text-stone-800 leading-snug">
                              💨 크러스트 칩 세팅! <br />
                              <span className="text-stone-550 font-medium font-sans">고밀도 스팀 분사로 겉면 팽창 계수를 극한의 황금빛 바삭함으로 유지합니다.</span>
                            </p>
                          </div>
                        </div>

                        {/* Interactive trigger feedback inside the app */}
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center mb-1">
                          <span className="text-[8px] text-stone-400 font-bold block">연결 모드: WiFi Smart Node v2</span>
                          <button 
                            onClick={() => alert("스마트폰으로부터 오븐 정지 신호를 유선 송신했습니다. 기기가 즉각 가열을 차단하고 쿨링 대기에 진입합니다.")}
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
                        <span className="text-xs font-extrabold text-stone-850">모바일 알림의 역할</span>
                      </div>
                      <p className="text-stone-500 text-xs leading-relaxed">
                        매장 밖 시장을 가거나 휴식을 취할 때에도 오븐 앞에 머무실 필요가 전혀 없습니다. 해동 완료, 발효 포화 상태, 스팀 투하점, 굽기 완수 시간 등을 맞춤 스마트 알림으로 전송하여 바쁜 올인원 가사 조율과 매장 운영을 동시에 성립시킵니다.
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
                  에브리베이크 170cm AI 스마트 오토 기기와 함께 일상을 바꾼 실제 사장님과 주부들의 후기입니다.
                </p>

                <div className="w-full max-w-3xl text-left space-y-8">
                  {/* Reviews Form */}
                  <form onSubmit={handleAddEquipReview} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">실제 기기 사용 후기를 남겨주세요</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">성함 또는 매장명</label>
                        <input
                          type="text"
                          required
                          value={newEquipAuthor}
                          onChange={(e) => setNewEquipAuthor(e.target.value)}
                          placeholder="예: 서울 마포구 C베이커리"
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">만족도 별점</label>
                        <select 
                          value={newEquipStars}
                          onChange={(e) => setNewEquipStars(parseInt(e.target.value))}
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-hidden"
                        >
                          <option value="5">★★★★★ (5점 만점)</option>
                          <option value="4">★★★★☆ (4점 우수)</option>
                          <option value="3">★★★☆☆ (3점 보통)</option>
                          <option value="2">★★☆☆☆ (2점 미흡)</option>
                          <option value="1">★☆☆☆☆ (1점 매우불만)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">어떤 점이 좋으셨나요?</label>
                      <textarea
                        required
                        rows={3}
                        value={newEquipContent}
                        onChange={(e) => setNewEquipContent(e.target.value)}
                        placeholder="실제 사용하며 느끼신 앱 원격 제어나 정밀 발효 제어 시스템의 만족감을 알려주세요."
                        className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-hidden resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-stone-905 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>후기 등록</span>
                      </button>
                    </div>
                  </form>

                  {/* Render review list */}
                  <div className="divide-y divide-stone-150 space-y-6 pt-4">
                    {equipReviews.map((item) => (
                      <div key={item.id} className="pt-6 first:pt-0 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-stone-950">{item.author}</span>
                          <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
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
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb]">Verified Masters Dough</span>
              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">프리미엄 원장 명인 생지 라인업</h1>
              <p className="text-stone-550 text-sm">
                KCT와 협약 배합을 맺은 전국 제과 명인들의 고유 반죽과 글로벌 아티장 라인업을 오븐 스마트 통신 바코드와 연동하여 편리하게 자영업 발주해 보십시오.
              </p>
            </div>

            {/* Dough View Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" id="dough-subtabs-group">
              <button
                onClick={() => {
                  setActiveDoughTab("master");
                  setSelectedKoreaPin(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeDoughTab === "master"
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                대한민국 명장의 생지 🇰🇷
              </button>
              <button
                onClick={() => {
                  setActiveDoughTab("global");
                  setSelectedGlobalPin(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeDoughTab === "global"
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                글로벌 시그니처 생지 ✈️
              </button>
              <button
                onClick={() => setActiveDoughTab("tasty")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  activeDoughTab === "tasty"
                    ? "bg-[#2563eb] text-white border-[#2563eb]"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                }`}
              >
                에브리베이크 테이스트 픽 (맛 보장 베스트) ⭐
              </button>
            </div>

            {/* Interactive geographic sync layout - Integrated Stacked Layout */}
            <div className="flex flex-col gap-10 mb-12 max-w-4xl mx-auto w-full">
              
              {/* Map Column (Generous display) */}
              <div className="w-full space-y-4">
                <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xl">
                  <h3 className="text-xs font-black text-stone-400 mb-3.5 uppercase tracking-widest text-center">원재료 실시간 위치 추적 스마트 관제</h3>
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
                    <div className="h-[450px] md:h-[500px] bg-amber-50/40 rounded-3xl border border-amber-100 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-inner animate-fade-in">
                      <div className="w-20 h-20 rounded-2xl bg-white border border-amber-100 flex items-center justify-center text-4xl shadow-md animate-bounce">
                        ⭐
                      </div>
                      <h4 className="text-stone-900 text-xl font-black font-sans">에브리베이크 테이스트 픽</h4>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-md font-medium">
                        <strong>맛 보장 에브리베이크 테이스트 픽</strong> 라인업은 특정 지리적 연동에 구애받지 않고 전국 유명 베이커리 매장의 사장님들로부터 만족도 평점 4.98점을 획득한 프리미엄 베스트 셀러들만을 완벽 엄선한 컬렉션입니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Catalog Cards Column (Natural vertical follow) */}
              <div className="w-full">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-150">
                  <span className="text-sm font-black text-stone-800">
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
                    <h4 className="text-stone-800 font-bold">탐색된 제안 생지가 없습니다</h4>
                    <p className="text-xs text-stone-400">지정된 로케이션 상의 검증된 생지 원재료 노드가 비활성화 상태입니다.</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {/* 1. 하드 계열 (식사빵류) Section */}
                    {getTabDoughs().filter(d => d.subCategory === "hard").length > 0 && (
                      <div className="space-y-4">
                        <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                              <span className="bg-blue-600 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded">01</span>
                              하드 계열 (식사빵류)
                            </h3>
                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100/60 font-mono">
                              오븐의 스팀 기능 & 발효 극대화 품격 💨
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                            유럽식 주식 빵으로, 담백한 맛이 특징이며 샌드위치 베이스로 많이 쓰입니다. 오븐의 스팀 기능과 발효가 매우 중요합니다. 대표 품목: 바게트, 치아바타, 깜빠뉴, 베이글, 프레첼 등
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {getTabDoughs().filter(d => d.subCategory === "hard").map((dough) => (
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
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 2. 페이스트리 계열 (비에누아즈리) Section */}
                    {getTabDoughs().filter(d => d.subCategory === "pastry").length > 0 && (
                      <div className="space-y-4">
                        <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                              <span className="bg-amber-500 text-stone-950 text-[10px] uppercase font-mono px-2 py-0.5 rounded">02</span>
                              페이스트리 계열 (비에누아즈리)
                            </h3>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100/60 font-mono">
                              도우컨디셔너 정밀 온도/습도 관리 필수 ❄️
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                            버터 함량이 높아 겹겹이 결이 살아있는 빵입니다. 버터가 녹지 않도록 도우컨디셔너의 정밀한 온도/습도 관리가 필수적인 품종입니다. 대표 품목: 크루아상, 뺑오쇼콜라, 데니쉬, 크로플 등
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {getTabDoughs().filter(d => d.subCategory === "pastry").map((dough) => (
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
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. 소프트 계열 (간식 및 조리빵류) Section */}
                    {getTabDoughs().filter(d => d.subCategory === "soft").length > 0 && (
                      <div className="space-y-4">
                        <div className="bg-stone-50/70 p-4 rounded-2xl border border-stone-200/60 text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                              <span className="bg-emerald-600 text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded">03</span>
                              소프트 계열 (간식 및 조리빵류)
                            </h3>
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/60 font-mono">
                              부드러운 식감 & 대중성 · 빠른 회전율 보증 🍞
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                            부드러운 식감으로 대중성이 높고 회전율이 빠른 기본 품종들입니다. 대표 품목: 우유/탕종식빵, 단팥빵, 소보로, 명란바게트, 소금빵(수요 증가에 따라 최적화) 등
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {getTabDoughs().filter(d => d.subCategory === "soft").map((dough) => (
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
                              />
                            </div>
                          ))}
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
                    {selectedDough.id === "m-001" ? "🥐" : selectedDough.id === "m-002" ? "🍎" : selectedDough.id === "m-003" ? "🍫" : selectedDough.id === "g-001" ? "🍈" : "🥖"}
                  </span>
                  
                  <span className="absolute bottom-4 text-[10px] font-extrabold uppercase font-mono tracking-widest text-stone-400 bg-white shadow-xs px-3.5 py-1 rounded-full border border-stone-150">
                    {selectedDough.imageLabel}
                  </span>
                </div>

                <span className="inline-block px-3.5 py-1.5 bg-orange-50 text-[#f97316] text-xs font-bold tracking-wider rounded-full mb-4 border border-orange-100">
                  {selectedDough.category === "master" ? "대한민국 명장 라인업" : "글로벌 시그니처 큐레이션"}
                </span>

                <h1 className="text-3xl sm:text-4.5xl font-black text-stone-900 tracking-tight leading-tight mb-2">
                  {selectedDough.name}
                </h1>
                
                <p className="text-sm font-semibold text-stone-400 mb-6 font-mono uppercase tracking-wider">
                  MASTERPIECE BY. {selectedDough.masterName} (ORIGIN: {selectedDough.region})
                </p>

                <p className="text-sm sm:text-base text-stone-500 max-w-2xl mx-auto leading-relaxed font-semibold mb-8">
                  천연 르방 원작 발효 비율을 엄선하여 에브리베이크 IoT 오븐과 완벽한 동기화를 만들어냅니다.<br />
                  매장에서 가장 신선한 빵의 향기를 손님들에게 선물해 보세요.
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
                <p className="text-stone-550 text-sm max-w-xl text-center leading-relaxed font-semibold mb-10">
                  전문화된 파라미터들이 에브리베이크 스마트 오븐과 즉각적으로 동기화됩니다. 바코드 스캔 시스템을 통해 일관된 완벽함을 유지할 수 있습니다.
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
                        본 반죽은 천연 르방 유산균 발효 비율을 극한으로 조절하여 구울 때의 볼륨감과 크러스트의 바삭함이 명장의 비법 그대로 살아납니다. 에브리베이크 스마트 오븐의 바코드 스캔 시스템과 완벽히 매칭되어 있으며, 소량 해동 후 즉시 구우셔도 균일한 기공 구조를 유지하는 특허 레시피입니다.
                      </p>
                    </div>
                  </div>

                  {/* Param Spec Card */}
                  <div className="bg-stone-50 p-6.5 rounded-2xl border border-stone-200 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-2.5">OVEN PARAMETERS</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-stone-200/60">
                          <span className="text-stone-400">해동 지점:</span>
                          <span className="font-extrabold text-stone-800">{selectedDough.settings.defrostTemp}°C ({selectedDough.settings.defrostTime}분)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-stone-200/60">
                          <span className="text-stone-400">숙성 발효:</span>
                          <span className="font-extrabold text-stone-800">{selectedDough.settings.fermentTemp}°C ({selectedDough.settings.fermentHumidity}%)</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-stone-200/60">
                          <span className="text-stone-400">소성 온도:</span>
                          <span className="font-extrabold text-stone-800">{selectedDough.settings.bakeTemp}°C ({selectedDough.settings.bakeTime}분)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-stone-400">기압식 스팀:</span>
                          <span className="font-extrabold text-stone-800">{selectedDough.settings.steam ? "작동(Steam)" : "해당 없음"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: Customer Feedback & Live Reviews */}
              <div className="w-full flex flex-col items-center py-16">
                <h2 className="text-2xl sm:text-3.5xl font-black text-stone-900 tracking-tight text-center mb-2">
                  고객 후기
                </h2>
                <p className="text-sm sm:text-base text-stone-500 max-w-xl mx-auto text-center leading-relaxed font-semibold mb-12">
                  에브리베이크와 함께 일상을 바꾼 고객님들의 이야기입니다.
                </p>

                <div className="w-full max-w-3xl text-left space-y-8">
                  {/* Reviews Form */}
                  <form onSubmit={(e) => handleAddDoughReview(e, selectedDough.id)} className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">실제 생지 도입 후기를 남겨주세요</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">성함 또는 매장명</label>
                        <input
                          type="text"
                          required
                          value={newDoughAuthor}
                          onChange={(e) => setNewDoughAuthor(e.target.value)}
                          placeholder="예: 서울 마포구 C베이커리"
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-hidden"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">만족도 별점</label>
                        <select 
                          value={newDoughStars}
                          onChange={(e) => setNewDoughStars(parseInt(e.target.value))}
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-hidden"
                        >
                          <option value="5">★★★★★ (5점 만점)</option>
                          <option value="4">★★★★☆ (4점 우수)</option>
                          <option value="3">★★★☆☆ (3점 보통)</option>
                          <option value="2">★★☆☆☆ (2점 미흡)</option>
                          <option value="1">★☆☆☆☆ (1점 매우불만)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">맛과 품질은 어떠셨나요?</label>
                      <textarea
                        required
                        rows={3}
                        value={newDoughContent}
                        onChange={(e) => setNewDoughContent(e.target.value)}
                        placeholder="매장에서 구우신 후 손님들의 반응이나 고유한 결, 버터 풍미 등의 우수한 사양을 담아 기재해 주세요."
                        className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-900 focus:border-stone-900 outline-hidden resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-stone-905 hover:bg-black text-white rounded-xl text-xs font-bold transition-all shadow cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>후기 등록</span>
                      </button>
                    </div>
                  </form>

                  {/* Render review list */}
                  <div className="divide-y divide-stone-150 space-y-6 pt-4 text-left">
                    {(doughReviews[selectedDough.id] || []).length > 0 ? (
                      (doughReviews[selectedDough.id] || []).map((item) => (
                        <div key={item.id} className="pt-6 first:pt-0 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-extrabold text-stone-950">{item.author}</span>
                            <span className="text-[10px] text-stone-400 font-mono">{item.date}</span>
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
                      ))
                    ) : (
                      <p className="text-xs text-stone-400 py-4 text-center">처음으로 백업 후기를 등록해 보세요!</p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {currentView === "coffee" && (
          <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
            <button 
              onClick={() => handleNav("home")}
              className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 뒤로가기
            </button>

            <div className="mb-8 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">Coffee & Devices</span>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">커피 머신 & 원두 스마트 라우팅</h1>
              <p className="text-stone-550 text-sm">
                에브리베이크와 전략적 단가 공동 구매 계약을 체결한 B2B 특판 원두와 유명 기기 패키지 라인업입니다. 단 한번의 주문으로 에브리베이크가 직접 검증하고 일체형 배송 공급합니다.
              </p>
            </div>

            {/* Coffee products grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              
              {/* Coffee Blend 1 */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-full h-40 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100">
                    <span className="text-4xl">☕</span>
                    <span className="text-[9px] font-bold text-stone-400 mt-2 font-mono bg-white px-2 py-0.5 rounded-full uppercase">
                      CJ 프레시웨이 공급원
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-orange-50 text-[#f97316] text-[10px] font-bold mb-2">
                    B2B 매장용 원두
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">[CJ 프레시웨이] 마스터 로스팅 원두 1kg</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed mt-1">고소한 헤이즐넛 풍미, 대중적인 초콜릿 터치와 산미를 최소화해 자영업 단체 커피 수율에 최적입니다.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-sm font-black text-stone-950">₩ 24,000</span>
                  <button
                    onClick={() => handleAddCustomToCart("cf-blend-01", "[CJ] 마스터 로스팅 원두 1kg", 24000, "bg-stone-100 text-stone-700", "CJ 프레시웨이")}
                    className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all"
                  >
                    담기
                  </button>
                </div>
              </div>

              {/* Coffee Blend 2 */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-full h-40 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100">
                    <span className="text-4xl">☕</span>
                    <span className="text-[9px] font-bold text-stone-400 mt-2 font-mono bg-white px-2 py-0.5 rounded-full uppercase">
                      WBC 스페셜티 제휴
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-orange-50 text-[#f97316] text-[10px] font-bold mb-2">
                    시그니처 다크 블렌드
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">[WBC] 이탈리안 에스프레소 원두 1kg</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed mt-1">WBC 마스터 등급이 검증한 묵직한 카카오와 다크 초콜릿 바디감, 깊은 단맛이 매력적이며 라떼 베이스에 최상입니다.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-sm font-black text-stone-950">₩ 32,000</span>
                  <button
                    onClick={() => handleAddCustomToCart("cf-blend-02", "[WBC] 이탈리안 에스프레소 원두 1kg", 32000, "bg-stone-100 text-stone-700", "WBC 시그니처")}
                    className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all"
                  >
                    담기
                  </button>
                </div>
              </div>

              {/* Coffee Machine */}
              <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-full h-40 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100">
                    <span className="text-4xl">🔌</span>
                    <span className="text-[9px] font-bold text-stone-400 mt-2 font-mono bg-white px-2 py-0.5 rounded-full uppercase">
                      공동 조달 설비
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-orange-50 text-[#f97316] text-[10px] font-bold mb-2">
                    업소용 커피머신 패키지
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">[EveryBake 독점] 에스프레소 머신</h3>
                  <p className="text-[11px] text-stone-500 leading-relaxed mt-1">1인 매장에 압도적 편의성을 제공하는 이중 보일러 구조로 연속 추출에도 압력이 일정하게 유지되는 명품 기기입니다.</p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-sm font-black text-stone-950">₩ 3,800,000</span>
                  <button
                    onClick={() => handleAddCustomToCart("cf-machine-01", "[EveryBake] 에스프레소 머신 패키지", 3800000, "bg-stone-900 text-white", "EveryBake 독점")}
                    className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all"
                  >
                    담기
                  </button>
                </div>
              </div>

            </div>

            {/* Coffee Feed / suggestions section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md">
              <h2 className="text-lg font-black text-stone-900 mb-2">☕ 커피 원두 및 기기 입점 건의 피드</h2>
              <p className="text-stone-400 text-xs mb-6">카페인에 민감한 손님들을 위한 싱글오리진 디카페인 원두 및 대형 도매 납품 브랜드 건의 내역 및 상위 MD 답변입니다.</p>

              <form onSubmit={handleAddCoffeeComment} className="space-y-3 bg-stone-50 p-4 rounded-xl border border-stone-200 mb-6">
                <p className="text-[11px] font-bold text-stone-500 uppercase">신규 브랜드 물품 건의</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newCoffeeAuthor}
                    onChange={(e) => setNewCoffeeAuthor(e.target.value)}
                    placeholder="매장 점주명 (예: 카페 비앙코)"
                    className="text-xs p-2.5 border border-stone-250 bg-white rounded-lg outline-hidden"
                  />
                  <div className="text-[11px] text-stone-400 flex items-center">실시간 피드 게시</div>
                </div>
                <textarea
                  required
                  rows={2}
                  value={newCoffeeContent}
                  onChange={(e) => setNewCoffeeContent(e.target.value)}
                  placeholder="예: 서울 수제 우유팩 묶음 공급이나 저가 바닐라 시럽 등 입점 희망 항목을 제안해 주십시오."
                  className="w-full text-xs p-2.5 border border-stone-250 bg-white rounded-lg outline-hidden resize-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-950 text-white rounded-lg text-xs font-bold"
                >
                  제안 등록하기
                </button>
              </form>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 divide-y divide-stone-100">
                {coffeeFeed.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 space-y-2 text-xs">
                    <div className="flex justify-between font-bold text-stone-800">
                      <span>{item.author}</span>
                      <span className="text-stone-400 font-normal">{item.date}</span>
                    </div>
                    <p className="text-stone-605 leading-relaxed font-medium">{item.content}</p>
                    {item.replies && item.replies.map((reply, rid) => (
                      <div key={rid} className="ml-4 p-3 bg-stone-50 rounded-xl border border-stone-200/60 font-sans">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-extrabold text-[#f97316]">{reply.author}</span>
                          <span className="text-[9px] text-stone-400">{reply.date}</span>
                        </div>
                        <p className="text-stone-550">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ==================================================== */}
        {/* 7. COMMUNITY BOARD VIEW                             */}
        {/* ==================================================== */}
        {currentView === "community" && (
          <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
            <button 
              onClick={() => handleNav("home")}
              className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 홈으로 이동
            </button>

            <div className="mb-8 space-y-2 text-center max-w-3xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">EveryBake Share & Grow</span>
              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">에브리베이크 상생 공동체</h1>
              <p className="text-stone-550 text-sm mt-1.5">
                전국 자영업 사장님들과 함께 만드는 스마트 상생 보드입니다. 원하는 생지 배합, 단체 원두 입점 및 자재 수요를 제안하십시오. <strong className="text-[#f97316]">30표 이상 추천 시 대형 도매 MD팀이 직접 입점 계약</strong>에 착수합니다.
              </p>
            </div>

            {/* Comm Toggles */}
            <div className="flex justify-center gap-2 mb-8 bg-stone-105 p-1.5 rounded-2xl w-fit mx-auto border border-stone-200">
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
                🌾 유기농 원무자재 공동구매
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
              
              {/* Proposals List (Left) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-extrabold text-stone-500 uppercase tracking-widest">
                    제안된 아이디어 ({communityPosts.filter(p => p.category === activeCommTab).length}개)
                  </span>
                  <span className="text-[10px] text-[#f97316] font-bold">
                    실시간 투표 반영 완료
                  </span>
                </div>

                {communityPosts.filter(p => p.category === activeCommTab).length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3">
                    <span className="text-4xl text-stone-300">💡</span>
                    <h4 className="text-stone-800 font-bold">등록된 제안이 아직 없습니다</h4>
                    <p className="text-xs text-stone-400">우측 폼을 이용해 첫 번째로 사장님의 혁명적인 입점 건의를 올려 보세요!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {communityPosts.filter(p => p.category === activeCommTab).map((post) => (
                      <div key={post.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow transition-all space-y-4">
                        
                        <div className="flex justify-between items-start">
                          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                            post.status.includes("예정")
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                              : post.status.includes("MD")
                              ? "bg-amber-50 text-amber-700 border border-amber-100"
                              : "bg-stone-100 text-stone-600 border border-stone-150"
                          }`}>
                            {post.status}
                          </span>
                          
                          <span className="text-[10px] text-stone-400 font-mono">{post.date}</span>
                        </div>

                        <div className="space-y-1.5 animate-fade-in">
                          <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">{post.title}</h3>
                          <p className="text-xs text-stone-605 leading-relaxed font-semibold">{post.content}</p>
                        </div>

                        <div className="pt-2 border-t border-stone-100 flex justify-between items-center text-xs">
                          <div className="flex items-center gap-1.5 text-stone-500 font-semibold text-[11px]">
                            <User className="w-3.5 h-3.5 text-stone-400" />
                            <span>{post.author}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-stone-400">
                              추천 수 <strong className="text-stone-800 ml-0.5">{post.votes}개</strong>
                            </span>
                            
                            <button
                              onClick={() => handleVotePost(post.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                post.votedByMe
                                  ? "bg-orange-50 text-[#f97316] border border-orange-200"
                                  : "bg-stone-50 hover:bg-orange-50 text-stone-700 border border-stone-200 hover:border-orange-200"
                              }`}
                            >
                              <ThumbsUp className={`w-3.5 h-3.5 ${post.votedByMe ? "fill-current" : ""}`} />
                              <span>{post.votedByMe ? "추천 완료" : "추천하기"}</span>
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Suggestions Form (Right) */}
              <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-md">
                <h3 className="text-sm font-black text-stone-950 mb-2 flex items-center gap-1.5">
                  🛡️ 신규 물자 및 공동구매 제안 양식
                </h3>
                <p className="text-stone-400 text-[10px] mb-4.5 leading-relaxed">
                  매장 운영에 필수적인 생지 벌크나 카페 포장 백, 가성비 원두 등 원하는 아이디어를 자유롭게 건의해 보세요.
                </p>

                <form onSubmit={handleAddCommunityPost} className="space-y-4.5">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">매장명 / 작성자</label>
                    <input
                      type="text"
                      required
                      value={newCommAuthor}
                      onChange={(e) => setNewCommAuthor(e.target.value)}
                      placeholder="예: 망원 브레드룸 점주"
                      className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">건의 제목</label>
                    <input
                      type="text"
                      required
                      value={newCommTitle}
                      onChange={(e) => setNewCommTitle(e.target.value)}
                      placeholder="예: 영양 만점 유기농 통밀 베이글 도입"
                      className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1.5">상세 건의사항</label>
                    <textarea
                      required
                      rows={4}
                      value={newCommContent}
                      onChange={(e) => setNewCommContent(e.target.value)}
                      placeholder="최소 구성 단위수나 희망하는 도매 박스 단가, 제품의 예상 메트릭스를 적어주시면 사장님들이 투표하기 수월해집니다."
                      className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_2px_8px_rgba(249,115,22,0.25)] cursor-pointer"
                  >
                    사장님 실시간 상생 보드에 전송
                  </button>
                </form>
              </div>

            </div>
          </div>
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
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb]">Inquiry & Partnerships</span>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">KCT 파트너스 입점 및 문의 포털</h1>
              <p className="text-stone-550 text-sm">
                냉동 생지 제조업체, 커피 수입사, 부자재 로스터리 및 일반 가맹 문의의 입점 요구서를 정식 수집합니다. 검토 결과를 즉각 스마트 채널로 가이드해 드립니다.
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
                      <p className="text-xs font-bold text-[#2563eb]">제안 등록 성공적으로 완료</p>
                      <p className="text-[10px] text-blue-800 leading-relaxed mt-0.5">
                        사장님의 입점 기획서서가 당사 신사업총괄본부 MD팀에 접수되었습니다. AI 큐레이터가 타당성 1차 검토를 마치면 하단 목록에 즉각 답변이 게시됩니다.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleAddInquiry} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">회사명 / 브랜드</label>
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
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">제안자 / 직책</label>
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
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">제안 카테고리</label>
                      <select
                        value={inqCategory}
                        onChange={(e) => setInqCategory(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden"
                      >
                        <option>냉동 생지 납품 제안</option>
                        <option>커피 원두 및 머신 제안</option>
                        <option>기타 카페 부자재</option>
                        <option>일반 고객 Q&A 문의</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">긴급 연락처</label>
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
                    <label className="block text-[10px] uppercase font-bold text-stone-400 mb-1">제안 내용 및 상품 설명</label>
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
                  공개 문의 및 입점 가이드 대응 장치 ({submittedInquiries.length})
                </h3>
                <p className="text-stone-450 text-[10px] mb-5 leading-relaxed leading-relaxed">
                  개인정보는 숨겨지며, 제출한 카테고리 기획 대안은 실시간으로 당사 총괄부 오피스 피드에 노출 검토됩니다.
                </p>

                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 divide-y divide-stone-150">
                  {submittedInquiries.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-bold text-stone-850">
                          {item.company} <span className="font-normal text-stone-400">({item.manager})</span>
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-stone-100 text-stone-500 px-2.0 py-0.5 rounded-md border border-stone-150">
                            {item.category}
                          </span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === "completed" 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-150" 
                              : "bg-blue-50 text-blue-700 border border-blue-150 animate-pulse"
                          }`}>
                            {item.status === "completed" ? "답변 완료" : "접수 중"}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        {item.details}
                      </p>

                      {item.answer && (
                        <div className="bg-[#f8fafc] border border-blue-105 p-3.5 rounded-2xl text-[11px] text-stone-700 leading-relaxed space-y-1 relative">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-[#2563eb] block">↳ KCT 신사업총괄본부 답변</span>
                            <span className="text-[9px] text-[#2563eb] bg-blue-50 px-1.5 py-0.5 rounded">SYSTEM VERIFIED</span>
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

        {(currentView === "login" || currentView === "partner-portal") && (
          <div className="animate-fade-in">
            <PartnerPortal
              isLoggedIn={isLoggedIn}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout}
              onAddToCart={handleAddToCartFromPortal}
              currentDoughs={CURATED_DOUGHS}
            />
          </div>
        )}

      </main>

      {/* Modern, elegant corporate footer aligned with requested style */}
      <footer className="max-w-5xl mx-auto px-6 border-t border-stone-200/80 pt-10 text-stone-400 text-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6.5 h-6.5 rounded bg-stone-900 flex items-center justify-center text-white font-black text-xs">
            K
          </div>
          <span className="font-extrabold text-stone-800">KCT Partners Co., Ltd.</span>
          <span className="text-[10px] text-stone-300 font-normal">| 베이킹의 새로운 가치와 상호 성장을 이룹니다.</span>
        </div>
        <div className="text-center md:text-right space-y-0.5 text-[11px]">
          <p>&copy; 2026 KCT Partners Co., Ltd. All rights reserved.</p>
          <p className="text-stone-300">중소 자영업자 1인 카페 상생 우수공로부문 대통령상 표창 출원 완료</p>
        </div>
      </footer>
    </div>
  );
}

// Inline auxiliary icons for perfect layout rendering with zero external risk
function BriefcaseIcon() {
  return (
    <svg className="w-6 h-6 text-amber-500 mb-2 mx-auto md:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg className="w-6 h-6 text-amber-500 mb-2 mx-auto md:mx-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg className="w-5 h-5 text-stone-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
