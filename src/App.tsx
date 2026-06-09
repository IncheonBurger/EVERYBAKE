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
  Bell,
  ChevronUp,
  ChevronDown,
  Search,
  CreditCard
} from "lucide-react";
import { motion } from "motion/react";
import Header from "./components/Header";
import CartSidebar from "./components/CartSidebar";
import OvenSim from "./components/OvenSim";
import KoreaMap from "./components/KoreaMap";
import GlobalMap from "./components/GlobalMap";
import DoughCard from "./components/DoughCard";
import PartnerPortal from "./components/PartnerPortal";
import EventsView from "./components/EventsView";
import { CURATED_DOUGHS, INGREDIENTS_DATA, IngredientItem, COFFEE_DATA, CoffeeItem } from "./data";
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
    "p-005": 980,  // 크로플
  };
  if (salesMap[id]) return salesMap[id];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 450) + 210; 
};
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
  category: "dough" | "coffee" | "raw" | "trouble";
  title: string;
  content: string;
  author: string;
  date: string;
  votes: number;
  status: string;
  votedByMe?: boolean;
  comments?: { id: string; author: string; content: string; date: string }[];
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
  category: "coop" | "used" | "share" | "job" | "interior";
  title: string;
  content: string;
  author: string;
  date: string;
  location?: string;
  detailInfo?: string;
  targetAmount?: string;
  priceInfo?: string;
  urgentsInfo?: string;
  participantsCount: number;
  comments: PlazaComment[];
  joinedByMe?: boolean;
}

export default function App() {
  // Navigation View Tracking
  // Current view can be: "home" | "equip-list" | "equip-detail" | "dough-main" | "dough-detail" | "coffee" | "community" | "inquiry" | "login" | "partner-portal"
  const [currentView, setCurrentView] = useState<string>("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredPanel, setHoveredPanel] = useState<'left' | 'right' | null>(null);
  
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

  // Checkout & PG Payment states
  const [checkoutContact, setCheckoutContact] = useState<string>("");
  const [checkoutDeliveryDate, setCheckoutDeliveryDate] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "naverpay" | "kakaopay">("card");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState<boolean>(false);
  const [paymentSuccessOrder, setPaymentSuccessOrder] = useState<any | null>(null);

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
  const [selectedGlobalPin, setSelectedGlobalPin] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [ovenActiveDoughId, setOvenActiveDoughId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

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
  const [activeCommTab, setActiveCommTab] = useState<"dough" | "coffee" | "raw" | "trouble">("dough");
  const [newCommTitle, setNewCommTitle] = useState("");
  const [newCommContent, setNewCommContent] = useState("");
  const [newCommAuthor, setNewCommAuthor] = useState("");
  const [expandedCommunityPostId, setExpandedCommunityPostId] = useState<string | null>(null);
  const [newCommCommentAuthor, setNewCommCommentAuthor] = useState("");
  const [newCommCommentText, setNewCommCommentText] = useState("");
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
      comments: [
        { id: "cm-cc-1", author: "정릉 오가닉베이커리", content: "크루키 진짜 요즘 인스타 숏폼 휩쓸고 있네요! 생지로 나오면 가벼운 오븐 베이킹만으로 엄청 잘 팔릴 거 같아요.", date: "2026-05-28 14:22" },
        { id: "cm-cc-2", author: "망원 브레드존 점주", content: "동감합니다. 직접 성형하려면 쿠키 반죽 치는 게 일인데, 결합 생지 나오면 바로 발주합니다.", date: "2026-05-29 09:10" }
      ]
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
      comments: [
        { id: "cm-cc-3", author: "수지 아뜰리에 점주", content: "밀가루 소화 안 된다는 어르신들이 쌀 베이킹을 무척 선호하시더라구요. 꼭 공동 입점되었으면!", date: "2026-05-31 18:05" }
      ]
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
      comments: [
        { id: "cm-cc-4", author: "로스터리 K 사장님", content: "디카페인 수요 예전같지 않게 진짜 매달 폭증하고 있는 상태입니다. 1kg 백 단위 공구도 좋습니다.", date: "2026-06-01 11:15" }
      ]
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
      comments: [
        { id: "cm-cc-5", author: "서교동 바게트왕", content: "포리쉐 T55는 바게트 풍미 핵심 자재죠! 대량 계약으로 포털 단가 낮추는 거 대환영입니다.", date: "2026-05-16 10:00" }
      ]
    },
    {
      id: "cp-trouble-1",
      category: "trouble",
      title: "❓ 요즘 어떤 자재가 좋을까요? 창업할 때 어떤 제품을 사는게 좋을까요?",
      content: "개 개인 제과점 1인 매장 창업을 준비하고 있는데, 마가린을 쓰자니 풍미가 아쉽고 벨기에산 고가 버터를 쓰자니 원가율 맞추기가 너무 빡빡합니다. 보통 가성비와 퀄리티를 다 잡으려면 수입 버터 중 어떤 유제품 브랜드를 매칭하는 게 좋을까요? 생지와 기기 설계도 조언 부탁드립니다!",
      author: "예비창업자 김씨",
      date: "2026-06-03",
      votes: 24,
      status: "답변 완료",
      comments: [
        { id: "cm-tr-1-1", author: "서교동 바게트왕", content: "마가린은 절대로 안 됩니다. 맛에 민감한 요즘 손님들은 버터 향과 풍미 차이를 즉각 눈치채요. 초반 마진 확보가 목적이시라면 뉴질랜드산 앵커 에이프런 버터나 프랑스 엘르앤비르 기획 롤버터를 적절히 블렌딩해 쓰는 방식을 강력하게 추천해 드립니다!", date: "2026-06-03 14:32" },
        { id: "cm-tr-1-2", author: "EveryBake MD팀", content: "안녕하세요 예비 점주님! 에브리베이크 론칭 신규 전용 도매 품목 중 프랑스 국산 엘르앤비르 보정용 고메 버터 상생 입점 세트를 이용하시면, 개별 수입 물류 사입 대비 원가 비용을 최대 35% 이상 직접 환원 세이브 해드립니다.", date: "2026-06-03 16:10" },
        { id: "cm-tr-1-3", author: "정릉 오가닉베이커리", content: "자재 품질도 진짜 중요하지만, 장비 설계 단계가 핵심입니다. 데크오븐이랑 도우컨디셔너를 무조건 올인원 세트로 쓰세요. 새벽 출근 노동 강도에서 1.5인분 인건비가 날아갑니다.", date: "2026-06-03 17:45" }
      ]
    },
    {
      id: "cp-trouble-2",
      category: "trouble",
      title: "🍯 요즘 이 자재로 이런 빵을 만들어 봤는데 맛이 좀 별로인 것 같은데 여기에 뭘 추가하면 좋아질까요?",
      content: "이번에 들여온 천연 유기농 통밀가루 100% 자재로 심혈을 기울여 깜빠뉴를 구워봤는데요. 단골 고객님들 시식 평이 너무 푸석하고 모래알 씹는 듯 퍽퍽하다네요. 고소하고 촉촉함은 극대화하면서도 대중적인 입맛을 완벽하게 저격할 수 있는 레시피 보충제나 계량비율 꿀팁이 있을까요?",
      author: "초보 제빵사 빵긋",
      date: "2026-06-04",
      votes: 15,
      status: "토론 활발",
      comments: [
        { id: "cm-tr-2-1", author: "명장 문하생", content: "통밀 100% 빵은 물성을 컨트롤하기 무척 난해합니다. 반죽 시작 전에 통밀가루와 설계상 가수량 전체 물만 먼저 가볍게 섞어둔 채 1시간 이상 휴지시키는 '오토리즈(Autolyse)' 기법을 추가하십시오. 글루텐 결합 효율이 올라가 촉촉함이 오랫동안 증폭됩니다.", date: "2026-06-04 10:12" },
        { id: "cm-tr-2-2", author: "수지 아뜰리에 점주", content: "반죽 칠 때 천연 올리브 오일이나 아카시아 생꿀을 딱 2% 수준으로만 극소량 첨가하면 노화 방지 기능도 겸해져서 마법처럼 쫀득쫀득 촉촉해집니다! 저희 매장 시그니처 비법이에요.", date: "2026-06-04 11:35" },
        { id: "cm-tr-2-3", author: "망원 브레드존 점주", content: "호두나 마카다미아, 졸인 무화과나 건크랜베리 토핑을 반죽 후반에 도톰히 크래싱해 넣으면 풍취도 무척 화려해지고 건조함이 근사하게 상쇄되어 대중들이 편하게 집어갑니다.", date: "2026-06-04 12:05" }
      ]
    },
    {
      id: "cp-trouble-3",
      category: "trouble",
      title: "⚡ 여기 오븐을 삿는데 케이씨티에서 만든 AI 기능이 탑재된 하이브리드 도우컨 오븐을 사는게 더 좋을까요?",
      content: "얼마 전에 일반 중고 3단 데크오븐이랑 구형 타사 도우컨디셔너를 세트로 저렴하게 도입했는데요. 매일 새벽 4시 반에 차가운 겨울바람 맞으며 졸린 운전으로 출근 시각 맞추려니 체력적으로 도저히 버틸 재간이 없습니다. KCT에서 출시한 스마트 AI 탑재 원격 하이브리드 도우컨 오븐으로 장기 리스 변경하면, 수면 패턴과 출근 여유를 기적처럼 되찾을 수 있을까요?",
      author: "지친 새벽베이커",
      date: "2026-06-05",
      votes: 48,
      status: "강력 추천",
      comments: [
        { id: "cm-tr-3-1", author: "신길 카페로 점주", content: "고민은 지각과 체력 방출만 늦출 뿐입니다! KCT 스마트 오븐으로 무조건 갈아타세요. 저는 매일 아침 침대에 누워서 새벽 2시에 스마트폰 위젯 스와이프 한 번으로 '냉동 원터치 보관 상태'에서 '자동 저온 발효 보정'으로 실시간 전환 지시 내립니다. 아침 7시 반에 세련되게 출근해서 세면하고 바로 구워냅니다. 행복 지수가 다릅니다 진짜.", date: "2026-06-05 06:14" },
        { id: "cm-tr-3-2", author: "EveryBake MD팀", content: "안녕하세요 점주님! KCT 하이브리드 지능형 도우컨 시스템은 외부 온습도 정점 예측 제어 및 미세 특수 스팀 밀도 제어로 과발효를 완벽히 억제하는 AI 알고리즘 가동 시스템이 호환됩니다. 본 가입 시 점주 전용 무이자 리스 지원 및 특별 매칭을 함께 승인받으실 수 있습니다.", date: "2026-06-05 08:33" },
        { id: "cm-tr-3-3", author: "상동 베이글마니아", content: "투자비 아깝다고 옛날 구형 아날로그 장비 고수하면 허리 디스크랑 새벽 수면 부족으로 병원비가 배로 폭발합니다. 일종의 매출 상승용 자동 영양제라고 보시는 게 정신 건강에 탁월합니다.", date: "2026-06-05 09:50" }
      ]
    },
    {
      id: "cp-trouble-4",
      category: "trouble",
      title: "🥐 크루아상 버터 격자 층이 자꾸 뭉개지고 떡이 지는데 원인이 뭘까요?",
      content: "크루아상 버터 롤 성형 시 16글 결이 깔끔하게 살지 않고 가열 시 밀가루 전분과 함께 혼합되어 동굴 없는 일반 버터 모닝빵 형태가 돼 버립니다. 벨기에 판형 버터와 도우 시터의 온도가 문제인가요?",
      author: "크루아상 사랑방",
      date: "2026-06-06",
      votes: 19,
      status: "토론 필요",
      comments: [
        { id: "cm-tr-4-1", author: "명장 문하생", content: "시터 작업실 온도가 22도를 초과하면 롤인 버터가 바로 반죽에 고체 상태를 잃고 액상 흡수되기 시작합니다! 밀어펴기 할 때 반죽과 버터를 각각 영하 2도에서 영상 2도 사이로 무조건 쨍하고 차갑게 유지하면서 신속하게 접어야 합니다.", date: "2026-06-06 14:15" },
        { id: "cm-tr-4-2", author: "수지 아뜰리에 점주", content: "맞아요. 접고 나서 냉동고에 20분 이상 무조건 단단하게 냉장 휴지 주시는 것만 잊지 않아도 층 분리가 훌륭하게 연출됩니다.", date: "2026-06-06 15:40" }
      ]
    },
    {
      id: "cp-trouble-5",
      category: "trouble",
      title: "🥖 바게트 칼집(쿠프)이 구울 때 시원하고 입체적으로 벌어지지 않습니다",
      content: "칼을 45도 각도로 정확히 눕혀 바게트에 쿠프를 넣고 스팀 주입 데크에 투입하는데도 구워지면 칼자국이 얌전하게 아물어버리기만 해요. 빵의 양 날개가 시원스러운 입술 모양으로 벌어지는 '토끼 귀 쿠프' 비법이 있나요?",
      author: "하드 계열 수련가",
      date: "2026-06-07",
      votes: 22,
      status: "답변 완료",
      comments: [
        { id: "cm-tr-5-1", author: "서교동 바게트왕", content: "바게트 표면이 과도한 습도로 눅눅해진 상태에서 칼집을 내면 탄력이 눌려서 벌어지지 않고 도로 붙어버려요. 칼을 치기 전에 3~5분간 반죽 표면의 수분을 건조시키는 팬닝 건조 과정을 주고, 면도칼에 올리브유나 물을 살짝 적셔 아주 날렵하게 비껴 그어 주시는 게 신의 한 수입니다.", date: "2026-06-07 11:20" },
        { id: "cm-tr-5-2", author: "망원 브레드존 점주", content: "돌판 온도가 240도 이상으로 강력하게 뜨거울 때 스팀이 즉시 분사되어야 에너지가 반죽 하단을 치고 밀어올려 멋지게 터집니다. 가화 효율이 정말 최고 중요합니다.", date: "2026-06-07 13:02" }
      ]
    },
    {
      id: "cp-trouble-6",
      category: "trouble",
      title: "🧉 여름철 커피 아이스크림 크림 콜라보 신메뉴 구상",
      content: "소프트 에스프레소 아포가토 위에 프랑스 바닐라빈 생크림을 올리는 이색 조합 음료를 리뉴얼 시그니처 구성으로 매치하고 싶은데, EveryBake 원두와 시너지 배합은 어떨까요?",
      author: "음료 장인 큐그레이더",
      date: "2026-06-08",
      votes: 11,
      status: "정보 안내",
      comments: [
        { id: "cm-tr-6-1", author: "로스터리 K 사장님", content: "EveryBake 밀크 아로마 프리미엄 다크 로스트 원두가 바닐라 리치 크림의 묵직한 당도가 섞였을 때 가히 환상적인 다크 너티 풍미를 자랑합니다! 꼭 두 번 배합해 보세요.", date: "2026-06-08T09:20:00Z" }
      ]
    }
  ]);

  // States for 에브리베이크 알뜰 광장 (Flea Market Mutual Aid)
  const [activeMainTab, setActiveMainTab] = useState<"why-not-sell" | "flea-market" | "interior" | "trouble">("why-not-sell");
  const [activePlazaTab, setActivePlazaTab] = useState<"coop" | "used" | "share" | "job" | "interior">("coop");
  const [selectedPlazaPostId, setSelectedPlazaPostId] = useState<string | null>(null);
  const [shuffledLivePosts, setShuffledLivePosts] = useState<any[]>([]);
  
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
      title: "📦 [공구 진행중] 손잡이형 크라프트 쇼핑백 대량 공동구매 (단가 40% 절감)",
      content: "테이크아웃용 고품질 에코 무지 크라프트 쇼핑백 1만 개 타겟 대형 공동 발주를 개시합니다. 현재 참여도가 높아 단량 최대 혜택 확정되었습니다.",
      author: "망원 브레드존 점주",
      date: "2026-06-02",
      location: "서울 마포구",
      detailInfo: "무지 손잡이형 대형 가방 규격입니다. 에브리베이크 가맹점 스티커나 자체 맞춤 스탬프를 가볍게 찍어서 활용하기 정말 수월합니다. 벌크 할인 단가는 1박스(500장)당 원래 4.5만원 상당인 제품을 공구 성사 시 2.75만원에 득템하실 수 있습니다. 필요하신 수량을 박스 단위로 남겨 주세요!",
      targetAmount: "목표 20박스 / 현재 17박스 모집 완료 (85%)",
      priceInfo: "공구 할인가: 1박스(500장) 27,500원 (장당 55원)",
      participantsCount: 8,
      comments: [
        { id: "pc-c1-1", author: "서교 빵빵이 점주", role: "Special Member", content: "저희 2박스(1,000장) 신청하겠습니다! 저번에 써보니 재질이 짱짱하고 좋더라구요.", date: "2026-06-02 10:15" },
        { id: "pc-c1-2", author: "망원 2동 카페비엔나 사장", role: "Special Member", content: "저도 1박스 참여 희망합니다! 입금처나 신청 구글폼 공유 부탁드려도 될까요?", date: "2026-06-02 11:32" },
        { id: "pc-c1-3", author: "합정 베이크팩토리", role: "Special Member", content: "저희 매장도 3박스 신청할게요! 쉐어 모집 올려주셔서 늘 감사합니다.", date: "2026-06-02 11:45" },
        { id: "pc-c1-4", author: "상동 베이글마니아", role: "Premium Member", content: "혹시 택배 배송 가능한가요? 가능하다면 2박스 예약하고 싶어요.", date: "2026-06-02 12:01" }
      ]
    },
    {
      id: "plaza-coop-2",
      category: "coop",
      title: "📦 배달용 무지 종이봉투 12호 각대봉투 긴급 공구",
      content: "배달 및 대량 포장에 넉넉히 알맞은 12호 각대봉투 통합 발주 추진합니다. 5,000장 이상 단위 묶음으로 도매 할인 적용 가능합니다.",
      author: "성수 오븐스토리 점주",
      date: "2026-06-01",
      location: "서울 성동구",
      detailInfo: "식빵이나 깜빠뉴 등 큼직한 빵 포장에 유용하게 매치되는 크라프트 무지 봉투입니다. 매장별 개별 단가 발주 시 무시할 수 없는 비용인데, 통합 벤더 직접 조율로 대폭 인하하였습니다.",
      targetAmount: "목표 10,000장 / 현재 6,500장",
      priceInfo: "장당 35원 (일반 도매가 58원)",
      participantsCount: 5,
      comments: [
        { id: "pc-c2-1", author: "뚝섬 크루아상 점주", role: "Premium Member", content: "저희 2,000장 즉각 합류합니다! 정가보다 확실히 메리트 있네요.", date: "2026-06-01 15:40" },
        { id: "pc-c2-2", author: "한양대 베이킹 점주", role: "Special Member", content: "저희 매장도 1,500장 예약 부탁드립니다! 공동구매 최고입니다 정말.", date: "2026-06-01 17:12" }
      ]
    },
    {
      id: "plaza-coop-3",
      category: "coop",
      title: "📦 [친환경 자재] 고품질 생분해 종이 빨대 벌크 공동 구매",
      content: "여름 아이스 음료 시즌을 맞아 플라스틱 친환경 규제 완벽 이행 가능한 종이 빨대 대용량 100박스 공구를 진행합니다.",
      author: "여의도 베이커리 대표",
      date: "2026-05-31",
      location: "서울 영등포구",
      detailInfo: "시간이 지나도 눅눅해지지 않는 특수 코팅 친환경 종이 빨대입니다. 1,000개입 벌크 박스 사양으로 카페 음료 포지션이 있으신 사장님들께 강력 제안합니다.",
      targetAmount: "목표 100박스 / 현재 45박스",
      priceInfo: "1박스(1,000개) 8,900원 (최상급 원형 보정)",
      participantsCount: 4,
      comments: [
        { id: "pc-c3-1", author: "신길 카페로 점주", role: "Special Member", content: "박스당 단가가 너무 은혜롭네요. 저희 매장 5박스 단번에 주문하겠습니다!", date: "2026-05-31 16:15" },
        { id: "pc-c3-2", author: "여의도 IFC뒤편 사장", role: "Premium Member", content: "사용해봤던 제품인데 품질 보장됩니다. 저희도 3박스 줄 섭니다.", date: "2026-06-01 09:22" }
      ]
    },
    {
      id: "plaza-coop-4",
      category: "coop",
      title: "📦 리유저블 아이스컵 14oz & 컵홀더 통합 단체 발주",
      content: "여름 디저트 판매 대비 단체 맞춤 무지 리유저블 컵과 크라프트 엠보싱 슬리브 홀더 박스 통합 할인 발주를 진행합니다.",
      author: "인천 구월베이크 사장",
      date: "2026-05-29",
      location: "인천 남동구",
      detailInfo: "내수성과 그립감이 뛰어난 플라스틱 리유저블 세트입니다. 에브리베이크 빵과 테이크아웃 세트 메뉴 구성에 최적의 단가 합작을 보장합니다.",
      targetAmount: "목표 30박스 / 현재 28박스 (마감 임박)",
      priceInfo: "1박스(500세트) 34,000원",
      participantsCount: 12,
      comments: [
        { id: "pc-c4-1", author: "송도 베이커스 사장", role: "Special Member", content: "와 드디어 열렸네요! 소문 듣고 찾아왔습니다. 1박스 바로 선점할게요.", date: "2026-05-30 11:22" }
      ]
    },
    {
      id: "plaza-coop-5",
      category: "coop",
      title: "📦 [안전 위생자재] 투명 마스크 및 M사이즈 니트릴 장갑 통합 신청",
      content: "구청 위생 점검 대비 투명 위생 밴드 마스크 및 빵 반죽 성형용 파우더프리 니트릴 장갑 단체 도매 도크 발주 신청 받습니다.",
      author: "분당 서현베이커리 점주",
      date: "2026-05-28",
      location: "경기 성남시",
      detailInfo: "식품용 안전 공식 등급 인증을 획득한 니트릴 장갑과 조절식 다회용 투명 쉴드입니다. 손가락 밀착감과 통기성이 발군입니다.",
      targetAmount: "목표 50세트 / 현재 32세트",
      priceInfo: "1세트 (투명마스크 5개 + 장갑 200매) 11,000원",
      participantsCount: 3,
      comments: [
        { id: "pc-c5-1", author: "정자 멜론 점주", role: "Special Member", content: "밀가루 반죽 만질 때 꼭 필요했는데 마침 잘 되었네요. 2세트 가겠습니다.", date: "2026-05-28 14:02" },
        { id: "pc-c5-2", author: "판교 구름빵 사장", role: "Premium Member", content: "니트릴 장갑 이 등급 제품이 땀이 덜 나더군요! 저도 3세트 할게요.", date: "2026-05-29 09:10" }
      ]
    },

    // Category 2: used (중고장터)
    {
      id: "plaza-used-1",
      category: "used",
      title: "🤝 [상태최상] 우녹스 베이커럭스 오븐용 4단 트레이 랙 거치대 급처분",
      content: "매장 인테리어 확장 및 레이아웃 이전으로 사용하지 않는 올 스테인리스 4단 트레이 오븐 스탠드를 초특가에 처분합니다.",
      author: "합정 버터플라이 사장",
      date: "2026-06-02",
      location: "서울 마포구",
      detailInfo: "우녹스 오븐이 안정감 있게 딱 안착 고정되는 완벽한 전용 호환 제품입니다. 내식성과 강도가 뛰어난 올 스테인리스 재질이며, 이동 및 고정이 매우 기동력 높은 오렌지 브레이크 바퀴가 장착되어 있어 매장 동선 정리에 베스트입니다.",
      priceInfo: "중고 급처가: 90,000원 (신품 가격 24만원 상당)",
      participantsCount: 3,
      comments: [
        { id: "pc-u1-1", author: "공덕 베이커블 점주", role: "Special Member", content: "제가 정말 찾던 랙 거치대네요! SUV 뒷좌석 폴딩하면 실릴지 여쭤보고 싶습니다.", date: "2026-06-02 13:02" },
        { id: "pc-u1-2", author: "합정 버터플라이 사장", role: "Special Member", content: "네 사장님! 거치대 본체가 조립식은 아니라 부피는 조금 있지만 투싼이나 스포티지 급 SUV 뒷좌석을 폴딩하시면 가로로 충분히 적재됩니다! 저희 매장 앞에 가볍게 정차하시고 가져가시면 됩니다.", date: "2026-06-02 13:10" },
        { id: "pc-u1-3", author: "신촌 빵집짱 사장", role: "Premium Member", content: "혹시 앞선 거래가 불발되면 저에게 무조건 순번 넘겨주세요! 즉시 현장 계좌 이체 보장합니다.", date: "2026-06-02 13:25" }
      ]
    },
    {
      id: "plaza-used-2",
      category: "used",
      title: "🤝 [급매] 업소용 국산 20쿼터 반죽기 (스파 믹서 SPA-800)",
      content: "모터 기어 마모 일절 없는 영양 만점 스파 믹서 20쿼터 반죽기 판매합니다. 여분 믹싱 볼과 훅, 비터 포함 올 세트 구성.",
      author: "경기 일산 식사베이크 점주",
      date: "2026-06-01",
      location: "경기 고양시",
      detailInfo: "베이커리 가동에 최고의 내구성을 검증받은 국산 SPA-800 모델입니다. 빵 반죽부터 케이크 휘핑까지 아주 파워풀하게 돌아갑니다. 매장에 반죽기 늘리면서 여분으로 보관하다 정리합니다.",
      priceInfo: "중고 판매가: 1,150,000원 (신품 정가 220만원)",
      participantsCount: 2,
      comments: [
        { id: "pc-u2-1", author: "일산동 빵돌이 사장", role: "Special Member", content: "스파 반죽기 기어 소음이나 벨트 상태는 어떤가요? 이상 없다면 내일 용달차 불러서 가져가고 싶어요.", date: "2026-06-01 19:40" },
        { id: "pc-u2-2", author: "중산베이커 사장", role: "Premium Member", content: "모터 파워 진국인 명품 반죽기죠! 좋은 매물 엄청 저렴하게 올리셨네요.", date: "2026-06-01 20:10" }
      ]
    },
    {
      id: "plaza-used-3",
      category: "used",
      title: "🤝 [무료나눔/커피교환] 에브리베이크 일자형 식빵 전용 팬 10개 나눔",
      content: "매장 제빵 메뉴 개편 및 단종으로 인하여 정성껏 세척/시즈닝해 둔 식빵 전용 테플론 코팅 팬 10개 일괄 무상 나눔합니다.",
      author: "서울 서대문구 빵맛집",
      date: "2026-06-01",
      location: "서울 서대문구",
      detailInfo: "테플론 골드 코팅 상태 80% 이상 준수합니다. 에브리베이크 명작 식빵 생지 전용 패닝 프레임에 제격입니다. 매장 방문 수령 선호하며, 정 마음에 드시면 매장에서 직접 내리는 아이스 아메리카노 한 잔만 쏴주세요!",
      priceInfo: "무료 나눔 (따뜻한 응원/커피 교환 희망)",
      participantsCount: 6,
      comments: [
        { id: "pc-u3-1", author: "연희동 식빵러 점주", role: "Special Member", content: "헐 대박! 저희 식빵팬 엄청 모자랐는데 연희동 매장이라 10분 내로 픽업 갈 수 있습니다! 아메리카노가 아니라 명품 에스프레소 세트로 사갈게요!! 제발 저 픽스 주세요!!", date: "2026-06-01 16:50" }
      ]
    },
    {
      id: "plaza-used-4",
      category: "used",
      title: "🤝 리치몬드 정품 6구 머핀팬 5세트 일상 잡화 일괄 처분",
      content: "녹 방지 도금 및 열전도율 최상의 리치몬드 머핀팬 5세트 일괄 가져가실 점주님 구합니다. 코팅 상태 우수.",
      author: "부산 해운대 브레드클럽",
      date: "2026-05-30",
      location: "부산 해운대구",
      detailInfo: "구움과자나 제과 사이드 메뉴 가동용으로 탁월합니다. 개별 판매 없이 5개 일괄 일체형으로 깔끔하게 정리합니다.",
      priceInfo: "5세트 일괄 30,000원",
      participantsCount: 2,
      comments: [
        { id: "pc-u4-1", author: "광안리 디저트짱 점주", role: "Special Member", content: "해운대 사장님! 혹시 반값택배나 우체국 착불 택배 거래도 대응해 주시나요? 가능하다면 당장 계좌 이체 드리겠습니다.", date: "2026-05-30 18:11" },
        { id: "pc-u4-2", author: "좌동 브레드 매니저", role: "Premium Member", content: "픽업 대기 순번 걸어봅니다. 직거래 15분 대기 가능해요.", date: "2026-05-31 09:40" }
      ]
    },
    {
      id: "plaza-used-5",
      category: "used",
      title: "🤝 [장비급매] 하프 업소용 제빙기 50kg (네오트 브랜드) 필터 서비스",
      content: "아이스 생산 기계 풀셋 교체 완료로 정상 조작 및 완전 분해 청소 세정 소독 완료한 안심 네오트 50kg 제빙기를 긴급 분양합니다.",
      author: "동성로 가나안 카페 점주",
      date: "2026-05-28",
      location: "대구 중구",
      detailInfo: "일일 제빵 구동에 든든한 최고 전력입니다. 노후 필터 무상으로 새것으로 갈아 끼워 둔 상태로 배관 케이블 풀 패키징 연결 상태로 출고 대기 중입니다.",
      priceInfo: "중고 할인가: 350,000원 (실작동 여부 즉각 현장 검증)",
      participantsCount: 4,
      comments: [
        { id: "pc-u5-1", author: "반월당 사장", role: "Premium Member", content: "내일 아침 9시에 SUV 스타렉스 동원해서 직공 수령하러 내려가도 될까요? 구매 확정입니다.", date: "2026-05-28 22:50" }
      ]
    },

    // Category 3: share (무료나눔/소분)
    {
      id: "plaza-share-1",
      category: "share",
      title: "🎁 [밀가루 소분나눔] 프랑스 에밀리아 T55 밀가루 분할 쉐어 (10kg 분할 선착순)",
      content: "가을 도매 통합 벌크 계약으로 입고된 국보급 프랑스 전용 밀가루 25kg 포대를 개봉했는데, 매장에서 다 소진하기 벅차서 깨끗한 지퍼백에 2kg씩 5명께 무상 소분 나눔합니다!",
      author: "성수 밀가루장인 점주",
      date: "2026-06-02",
      location: "서울 성동구",
      detailInfo: "크루아상이나 깜빠뉴 빵 표면 오밀조밀한 겹 레이어와 구운 풍미를 극한으로 높여 주는 최상급 T55 프랑스 원산지 유기농 밀가루입니다. 습한 기온에 뭉치지 않게 철저히 실리카겔 동봉하여 2kg씩 이중 밀봉 완료해 두었습니다. 매장에 오셔서 따뜻하게 받아가세요!",
      targetAmount: "총 5팩 분량 / 현재 4팩 매칭 완료 (잔여 1팩)",
      participantsCount: 4,
      comments: [
        { id: "pc-s1-1", author: "성수동 크로플 점주", role: "Special Member", content: "안녕하세요! 성수역 바로 옆 골목 매장인데 혹시 지금 수령하러 달려가도 될까요? 명장의 향기 가득한 T55 꼭 테스트해보고 싶었습니다!", date: "2026-06-02 11:20" },
        { id: "pc-s1-2", author: "성수 밀가루장인 점주", role: "Special Member", content: "네 그럼요 사장님! 카운터 파트 직원에게 '나의공간 소분나눔 밀가루' 수령하러 방문했다고 안내해주시면 바로 2kg 신선 팩 건네드릴게요. 조심히 오세요!", date: "2026-06-02 11:25" },
        { id: "pc-s1-3", author: "뚝섬 베이크하우스", role: "Special Member", content: "우와 정이 넘치시네요! 저도 한 팩 무조건 줄서봅니다. 브레이크 타임인 3시 전후로 픽업 가능할까요?", date: "2026-06-02 11:42" },
        { id: "pc-s1-4", author: "한양대 밀 사장", role: "Premium Member", content: "퀵 요금 제가 선불 부담하고 오토바이 편으로 보내주실 수 있나요? 남았다면 무조건 배차하고 싶습니다!", date: "2026-06-02 12:05" }
      ]
    },
    {
      id: "plaza-share-2",
      category: "share",
      title: "🎁 기한 넉넉한 최고급 프랑스 이즈니 버터 Block 3kg 분량 나눔",
      content: "구움과자 한정 기획 신메뉴 제조 후 남아 있는 미개봉 버터 덩어리들을 가맹 회원분들을 위해 위생 냉동 소분 분양합니다.",
      author: "서울 마포구 연남동 디저트랩",
      date: "2026-06-01",
      location: "서울 마포구",
      detailInfo: "유통기한 약 3주 정도 여유 있게 확보된 엘르앤비르/이즈니 1등급 고메 버터 블록입니다. 500g 블록 단위로 슬라이스 이중 포장 완료하여 총 6인분으로 혜택 돌립니다.",
      targetAmount: "나눔 6블록 / 현재 5블록 배정 완료 (잔여 1블록)",
      participantsCount: 5,
      comments: [
        { id: "pc-s2-1", author: "연남 빵순이 점주", role: "Premium Member", content: "이즈니 버터라니 눈물이 앞을 가립니다... 내일 오픈 준비 때 매장 잽싸게 들르겠습니다! 한 팩 찜해도 될까요?", date: "2026-06-01 17:35" },
        { id: "pc-s2-2", author: "망원 버터수급 사장", role: "Special Member", content: "완전 줄 서봅니다! 신메뉴 프리팩 생지 테스트 오븐에 구워 보는 용도로 알뜰하게 잘 쓰겠습니다.", date: "2026-06-01 18:10" }
      ]
    },
    {
      id: "plaza-share-3",
      category: "share",
      title: "🎁 [천연 바닐라 수입액] 엑스트랙트 500ml -> 50ml 소분 나눔 혜택",
      content: "베이킹 매니아 가맹점주 및 일반 홈베이커 동행 회원을 위한 최고급 천연 바닐라빈 엑스트랙 소분 병 나눔을 개시합니다.",
      author: "수원 영통구 슬로우 베이커",
      date: "2026-05-30",
      location: "경기 수원시",
      detailInfo: "정말 고급 향신료 향이 특징인 하이엔드 바닐라 엑기스입니다. 갈빛 유리 미니 소분 스포이드 박스병에 50ml씩 한 땀 한 땀 담아 두었습니다.",
      targetAmount: "나눔 가능 수량 10병 / 현재 8병 수령 매칭 완료",
      participantsCount: 8,
      comments: [
        { id: "pc-s3-1", author: "망포 베이클 베이커", role: "Special Member", content: "구움과자 풍미 유행의 구원자네요! 소중한 50ml 한 병 예약 확보할 수 있을까요?", date: "2026-05-30 20:30" }
      ]
    },
    {
      id: "plaza-share-4",
      category: "share",
      title: "🎁 유기농 건강 호밀 가루 5kg 깔끔 나눔 (호밀빵 베이킹 특화)",
      content: "독일산 프리미엄 호밀가루 벌크 포대를 유상 구매해 쓰고 소량이 남아, 밀 수입이 전면 소통되는 마당에 이웃 사장님들과 무상 나눔합니다.",
      author: "인천 송도 브레드웜 점주",
      date: "2026-05-29",
      location: "인천 연수구",
      detailInfo: "풍미가 아주 고소하고 천연 제효가 수월해 깜빠뉴나 사워도우 만무할 때 아주 탁월한 무지 사양의 밀가루입니다.",
      targetAmount: "나눔 완료",
      participantsCount: 2,
      comments: [
        { id: "pc-s4-1", author: "송도 1동 프렌즈 점주", role: "Special Member", content: "인근 송도 매장이라 저녁 퇴근 길에 귀하게 받아와서 손님 디저트 서비스 구울 때 유용하게 연출했습니다. 천사 같은 배려 진심 모십니다!", date: "2026-05-30 09:12" }
      ]
    },
    {
      id: "plaza-share-5",
      category: "share",
      title: "🎁 [마감완료] 키즈 베이킹용 무독성 스프링클 5종 종합세트 나눔",
      content: "가정의 달 키즈 파티 원데이 클래스 정기 세션을 마치고 완전히 밀폐 보존하고 있는 미국산 수입 컬러 초코 스프링클 종합 선물 웰컴 세트를 양도합니다.",
      author: "부산 동래구 쿠키아웃",
      date: "2026-05-26",
      location: "부산 동래구",
      detailInfo: "총 1.5kg 상당이며 유라시아 프리미엄 코팅으로 오븐에 직접 구워도 원형 및 선명한 발색이 잘 보존되는 무독성 프리미엄 시럽 스프링클입니다.",
      targetAmount: "배송 수령 완전 완료",
      participantsCount: 1,
      comments: [
        { id: "pc-s5-1", author: "온천장 브레드 사장", role: "Special Member", content: "사장님 배려 덕에 우리 가맹점 찾아준 주말 꼬마 단골 손님들에게 너무 예쁜 메론빵 데코레이션을 기증할 수 있었습니다. 최고의 나눔 감사드립니다!", date: "2026-05-27 10:45" }
      ]
    },

    // Category 4: job (긴급구인)
    {
      id: "plaza-job-1",
      category: "job",
      title: "🚨 [단기/긴급-SOS] 내일 오전 제빵보조 및 크루아상 샌드위치 포장 헬퍼 긴급 구인 (당일지급)",
      content: "매장 전담 메인 베이킹 부기사님이 갑작스러운 중증 독감 판정으로 병원에 응급 입원하게 되어, 야간 해동 작업 완료된 명인 생지들의 새벽 성형 및 샌드위치 포장 도울 급전을 무장합니다.",
      author: "압구정 몽소 점주",
      date: "2026-06-02",
      location: "서울 강남구",
      detailInfo: "근무 시간: 내일 (6/3) 오전 06:00 ~ 12:00 (단 6시간 수용). 업무 내용: 야간 도우컨디셔너 해동 완벽 완료된 고메 벌크 생지 패닝 정밀 레이아웃 배열 배치, 오븐 타이머 관리 보조, 다 구워진 치아바타와 식빵 한 김 식혀 샌드위치 커팅 치즈 주입 및 전면 개별 랩핑 포장. 제빵 기본 기초가 있으신 학우분이나 동료 사장님들의 유경력자 구원의 조력을 긴급히 모십니다!",
      targetAmount: "모집 인원: 1명 / 예약 정원 투입 협의 조율 중",
      priceInfo: "시급 13,000원 상당 (총 6시간 가동 기준, 즉시 당일 퇴근 일시 이체 78,000원)",
      participantsCount: 3,
      comments: [
        { id: "pc-j1-1", author: "강남구 제빵학도", role: "Junior Baker", content: "안녕하세요! 압구정 한림 파티세리 소속 교육과정 1년차 수료생입니다! 내일 다행히 개인 연차 휴무라 새벽 시간 비어있는데 바로 오븐 다루고 포장 기계 세팅 완벽 도와드릴 수 있습니다!", date: "2026-06-02 14:15" },
        { id: "pc-j1-2", author: "압구정 몽소 점주", role: "Special Member", content: "앗! 정말 하늘에서 내려 온 구세주 같은 학생분이시군요! 압구정역 3번 출구 바로 앞 매장입니다. 오픈카카오톡 채널로 가벼운 이력 문자 하나만 남겨 주시면 당장 내일 새벽 조율 확정하여 출근 카드 기입해 놓겠습니다!", date: "2026-06-02 14:22" },
        { id: "pc-j1-3", author: "대치 브레드보조", role: "Senior Baker", content: "오성급 가맹 호텔 주방보조 출신 경력자입니다. 혹시 위에 계신 학도분 일정에 펑크 발생하거나 돌발 대비용 서브 비상 수단으로 번호 쪽지 전송해 둡니다. 필요시 연락 바랍니다!", date: "2026-06-02 14:40" }
      ]
    },
    {
      id: "plaza-job-2",
      category: "job",
      title: "🚨 [오늘 야간] 위생 안심 가동을 위한 오븐 2대 내부 정밀 고온 스팀 세척 헬퍼 (초보가능)",
      content: "식약처 위생 평가 시즌 대비하여, 고온 카본 찌든 때 지우는 고열 오븐 세척 및 냉장 쇼케이스 내부 필터 탈탈 털이 3시간 집중 헬퍼 단기 구인합니다.",
      author: "마포구 서교동 프랑스베이커리",
      date: "2026-06-01",
      location: "서울 마포구",
      detailInfo: "시간: 오늘 밤 21:00 ~ 24:00 (야간 3시간 가동). 보호 안경과 고무장갑, 고성능 친환경 탈산 세제는 전면 지급해 드립니다. 땀 한 바가지 시원하게 빼고 퇴근 빵 세트와 함께 일당 계좌로 두둑히 당장 보장해 드립니다.",
      priceInfo: "3시간 가동 일급 50,000원 즉시 보증",
      participantsCount: 2,
      comments: [
        { id: "pc-j2-1", author: "신촌 매니아", role: "Baker Friend", content: "군필자 체력 넘쳐납니다! 청소랑 뒤풀이 찌든 이물질 밀어내는 작업은 전문가 수준으로 확실히 비워낼 수 있습니다. 연락처 문자 드렸습니다!", date: "2026-06-01 18:40" },
        { id: "pc-j2-2", author: "이대 고인물", role: "Baker Friend", content: "손 진도 엄청 빠릅니다. 오븐 전해 가동 경험 풍부해요. 혹시 정원 다 찼나요?", date: "2026-06-01 19:10" }
      ]
    },
    {
      id: "plaza-job-3",
      category: "job",
      title: "🚨 [주말 대타] 토/일 오전 피크타임 쇼케이스 정돈 및 간편 포스 대타 소방수 모집",
      content: "사전 지정된 기존 주말 아르바이트생의 개인 관혼상제 연도 사정으로 이틀 동안 오전 피크 타임 매장 서빙 및 계산대 보조 급하게 수배합니다.",
      author: "서울 관악구 샤로수 베이크",
      date: "2026-05-31",
      location: "서울 관악구",
      detailInfo: "토요일, 일요일 양일간 08:00 ~ 14:00 (각 6시간씩 근무). 포스 계산 및 에브리베이크 장비에서 갓 구워져 나오는 크로와상들 쇼케이스 정밀 핀셋 배열 작업만 해주시면 됩니다.",
      priceInfo: "시급 11,000원 정산 지급",
      participantsCount: 4,
      comments: [
        { id: "pc-j3-1", author: "서울대입구 자취러", role: "Junior Clerk", content: "에브리베이크 메론빵 전문 계산 가맹점 근무 경력 8개월 정도 있습니다! 포스기 연동 버튼이랑 오븐 타이머 알람 즉시 캐치 가능해요. 주말 양일 전 타임 시원하게 지원합니다!", date: "2026-05-31 16:30" }
      ]
    },
    {
      id: "plaza-job-4",
      category: "job",
      title: "🚨 [천안] 6월 5일 단체 단팥빵 500알 패닝 및 포앙 보틀 보조 긴급 서포터 모집",
      content: "인근 고등학교 정기 중간고사 깜짝 간식 단체 발주 500세트를 수주받아, 전력 투구 일손이 딱 빵 반죽 계량 보탬 한 분 원합니다.",
      author: "충남 천안 뚜쥬루골목 점주",
      date: "2026-05-30",
      location: "충남 천안시",
      detailInfo: "근무 시간: 오전 07:00 ~ 13:00 (6시간). 숙련자분이 오셔서 정밀 성형을 한 손으로 짱짱하게 도와주시면 천안 최고 호두파이랑 명인 소금빵 보답 팩도 무상 포장해 드립니다.",
      priceInfo: "일당 85,000원 퇴근 즉시 정산 보장",
      participantsCount: 2,
      comments: [
        { id: "pc-j4-1", author: "천안 단대생 제빵인", role: "Junior Baker", content: "시간 딱 수용 가능합니다. 성형이랑 호두 계량 성실하고 정확하게 해낼게요. 믿어주십시오!", date: "2026-05-30 19:42" }
      ]
    },
    {
      id: "plaza-job-5",
      category: "job",
      title: "🚨 내일 디저트 카페 갓 오픈 전초 기지 청소 및 바이브 레이아웃 기물 세팅 조력",
      content: "새로운 오렌지 감각 인테리어를 마친 매장 창틀 유리 닦기와 정수 필터 구배 라인 배수 호스 결착 체크를 가볍게 돕는 단기 보조 일손 구해요.",
      author: "대전 서구 둔산카페 사장",
      date: "2026-05-28",
      location: "대전 서구",
      detailInfo: "노동 강도 아주 낮으며, 08:00 ~ 11:00 (단 3시간). 음료 전력 원두 세팅 에스프레소 시음도 넉넉하게 가능합니다.",
      priceInfo: "3시간 깔끔 일급 40,000원",
      participantsCount: 3,
      comments: [
        { id: "pc-j5-1", author: "탄방동 빵러버", role: "Baker Friend", content: "개점 축하드립니다! 기물 옴기기 및 포장 봉투 접기 제 역할 야무지게 해드릴게요. 당장 가능!", date: "2026-05-28 20:15" }
      ]
    },

    // Category 5: interior (인테리어 견적)
    {
      id: "plaza-interior-1",
      category: "interior",
      title: "🛠️ [견적요청] 12평 소형 베이커리 매장 도우컨 제빵실 유리 칸막이벽 및 급배수 연장 시공",
      content: "이번에 에브리베이크 나의공간을 통해 스마트 도우컨디셔너 대형 1대와 스마트 로터리 터치 오븐을 동시 추가 도입하게 되었습니다. 매장 안전 공간 확보를 위해 뒤편에 투명 강화유리 가벽 칸막이를 슬라이딩 도어 형태로 세우고 파워 업 배수라인 연장 공사 전문가 사장님들의 견적을 시원하게 소환합니다.",
      author: "용산 크루아상팩토리 사장",
      date: "2026-06-02",
      location: "서울 용산구",
      detailInfo: "총 전용면적 약 12평이며, 이 중 제빵 연구용 가용 공간 3.5평을 가벽으로 레이아웃 구획하고자 합니다. 바닥 타일은 방수 전용 세라믹 논슬립 타일 덧방 처리가 필요하며 오븐 가동 시 누전 차단 및 배수 찌꺼기 거름 호스 고정 배관 작업이 필수적입니다. 희망 예산은 가용 한계치 350만원 이하로 책정하고 있고, 손님 영업에 영향이 가지 않도록 다음 주 평일 야간 공사 세션(20시 ~ 익일 새벽 4시)으로 컴팩트 완료되길 원합니다. 오셔서 견적 가득 남겨 주십시요!",
      urgentsInfo: "예산 한계: 350만원 이내 부가세 포함 / 시공 희망일: 6월 중순 평일 야간 기동 가늠",
      participantsCount: 3,
      comments: [
        { id: "pc-i1-1", author: "🔧 공간디자인 연우 (시공전문)", role: "인테리어 전문업체", content: "안녕하세요 사장님! 서울 전역 상업 공간 요식업 설비 및 방수 가벽 시공을 15년째 집도하고 있는 '공간디자인 연우'입니다. 에브리베이크 콤보 오븐 및 밀 가습용 스마트 배수관 오차 없는 슬라이딩 3연동 섀시 시공을 기 당사 매장 제휴 가맹 8회 시공 경험으로 눈감고도 완벽 규격 밀착해 드릴 수 있습니다! 매장 도면 기본 CAD 레이아웃 시안 무료 서비스 제공 드립니다. 010-3323-XXXX 로 편안하게 콜이나 문자 주시면 즉시 내일 오전 사장님 둔산/용산 매장에 방문하여 공사 실측 해드리고, 마진 일체 비워내어 총합 320만원선(부가세 포함, 친환경 자재 마감)으로 깔끔하게 한밤중 야간 무소음 철거 완공 보장 드리겠습니다. 연락 부탁드립니다!", date: "2026-06-02 12:45" },
        { id: "pc-i1-2", author: "🛠️ 탑클래스 인테리어 기획", role: "상업시공업체", content: "용산구 한남 삼각지 현장 상주 중인 상업 인테리어 직영 시공팀 탑클래스입니다! 방수 조적 시공 및 세라믹 타일 덧방, 12mm 통강화유리 가벽 스틸 마감까지 하여 290만원 초특급 가성비 완공으로 마감 단차 1mm 하자 없이 책임 시공해 놓겠습니다! 포트폴리오 문자 전송 드렸으니 당장 협의 주십시요. (010-4491-xxxx)", date: "2026-06-02 13:01" },
        { id: "pc-i1-3", author: "📐 라온 하이브 디자인 대표", role: "설계전문업체", content: "도우컨디셔너 작동 시 순간 전력 배선 차단 트립과 고열 환풍 닥트 시로코팬 교차 기계 결합부 마감 불량이 화재 원인이 되곤 합니다. 저희는 전기안전 배선 자격증 및 소방 면허 전문 엔지니어가 포함되어 안심 구조로 원활하게 세팅해 드립니다. 카카오톡 제안서 발송해 드렸습니다!", date: "2026-06-02 13:20" }
      ]
    },
    {
      id: "plaza-interior-2",
      category: "interior",
      title: "🛠️ 5평 테이크아웃 전문점 합판 목공 카운터 대차 및 아크릴 간판 시공 견적",
      content: "자작나무 친환경 목재로 베이킹 쇼케이스 3단 하중 버티는 수공 카운터를 커스텀 제작하고, 외벽 전면에 분위기 좋은 에브리베이크 오렌지 아크릴 큐브 간판 부착 견적 요청합니다.",
      author: "서울 서초구 신상 디저트 사장",
      date: "2026-06-01",
      location: "서울 서초구",
      detailInfo: "아주 작은 소형 공간이나 손님 시선 초입 파사드가 가장 중요합니다. 카운터에는 내부 대용량 생지 보틀 냉장고가 들어갈 수 있게 슬롯 타공이 필요합니다.",
      urgentsInfo: "예산선: 500만원 내외 / 6월 이내 정식 완공 대기",
      participantsCount: 2,
      comments: [
        { id: "pc-i2-1", author: "🔧 테라디자인 목공소", role: "가구인테리어업체", content: "안녕하세요! 자작나무 합판 무독성 독일제 바니시 마감 가구 전문 제작팀 테라디자인입니다. 하부 빌트인 슬롯 매립 구조 설계에 능통하오니 연락주세요! 견적 450만원 선 조율 가능합니다.", date: "2026-06-01 10:45" },
        { id: "pc-i2-2", author: "🛠️ 우드스페이스", role: "가구인테리어업체", content: "최저 단가 정밀 시공 약속합니다! 쇼케이스 습기 누출 차단 단열 가공 포함 시방서 무료 제공 드리겠습니다.", date: "2026-06-01 11:15" }
      ]
    },
    {
      id: "plaza-interior-3",
      category: "interior",
      title: "🛠️ 오래된 전통 동네 빵집 중앙 바닥 논슬립 테라조 데코타일 8평 전면 시공",
      content: "기존 가루와 물기로 군데군데 때가 끼고 낡아 미끄러운 저가 장판 데코타일 8평분을 깔끔하게 다 걷어내고 내수성과 청결 전반에 기여하는 최고급 테라조 바닥 타일 시공 견적 구합니다.",
      author: "강원 춘천 브레드메이킹 점주",
      date: "2026-05-30",
      location: "강원 춘천시",
      detailInfo: "기존 점포 내부 쇼케이스들은 바닥 단차 받침대로 그대로 두고, 빵집 동선 라인만 야간에 깔끔하게 데코타일 전문 덧방 칼 마감 해주실 유능한 동네 전문가 사장님 우대합니다.",
      urgentsInfo: "희망 견적가: 120만원 내외 부가세 포함",
      participantsCount: 2,
      comments: [
        { id: "pc-i3-1", author: "🛠️ 강원타일 일체", role: "지역 타일업체", content: "춘천 시내 퇴게동 자재창고 보유 업체입니다! 번거로운 가구 이동 최소화하고 바닥 덧방 기준 친환경 이태리 프렐 아크릴 수성 접착제 가동하여 110만원에 올 마감 야간 원데이 처리해 드릴게요!", date: "2026-05-30 16:45" }
      ]
    },
    {
      id: "plaza-interior-4",
      category: "interior",
      title: "🛠️ 주방 열기 및 빵 굽는 습기 배출용 시로코팬 환풍기 1.5마력 업그레이드 연장 설치",
      content: "터치 오븐 연속 동작 시 배출되는 오븐 위 연기가 기존 팬으론 순환이 부족합니다. 시로코팬 1.5마력 최상 압력 모터로 증설하고 연장 배관 벽을 밖으로 3미터 올리는 마력 구동 견적 원해요.",
      author: "경기 수원 인계베이커리 점주",
      date: "2026-05-29",
      location: "경기 수원시",
      detailInfo: "현 배관 라인이 노후화되어 진동 및 소음 차단 댐퍼 고무 패킹 추가 결착이 함께 필요합니다. 이웃 점포 불만 없도록 무소음 특수 팬 보강도 검토바랍니다.",
      urgentsInfo: "시공 예산: 90만원 내외",
      participantsCount: 2,
      comments: [
        { id: "pc-i4-1", author: "🔧 수원닥트공사 대장", role: "지역 닥트시공사", content: "수원 인계동 상주 인력입니다! 저소음 이중 날개 설계 1.5마력 시로코팬과 진동 흡수 완충 패드, 외벽 칼브럭 지지대 마감 등 올인원 패키징으로 정확하게 80만원에 배기량 최고로 맞춰 드릴게요!", date: "2026-05-29 18:20" }
      ]
    },
    {
      id: "plaza-interior-5",
      category: "interior",
      title: "🛠️ [부분도색] 영 디자이너 비주얼 프레임 파사드 웨인스코팅 웨스턴 오렌지 컬러 도색",
      content: "아주 노후된 기존 연갈색 하이샷시 프레임들을 에브리베이크 명품 시그니처 오렌지 칼라 및 매트한 샌드 브라운 수입 세라믹 코팅 페인트로 도장 및 매장에 세련된 유럽풍 감각을 채워 넣고 싶습니다.",
      author: "대구 수성구 버터멜로우",
      date: "2026-05-27",
      location: "대구 수성구",
      detailInfo: "외부 노출 페인팅이라 직사광선 및 눈비에 가볍게 일어나지 않는 친환경 웨더쉴드 유성 페인트 혹은 실외 전용 방수 세라믹 실리콘 혼합 도료 필수 사용 요청합니다.",
      urgentsInfo: "예산: 150만원 이하 / 당일 야간 시공 지양",
      participantsCount: 2,
      comments: [
        { id: "pc-i5-1", author: "🎨 컬러하우스 대구 직영점", role: "전문 도색 도장업체", content: "수성구 상가 외부 수입 팬톤 페이트 조색 전문 시공사 컬러하우스입니다! 파사드 샌딩 연마 전처리 확실히 한 후에 하도 프라이머 2회 및 야외 우레탄 탑코트 2회 완격 도장하여 세월이 흘러도 변색 없는 쨍한 에브리 오레지로 연출해 드릴게요. 견적 130만원 제안합니다.", date: "2026-05-27 15:40" }
      ]
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
  const [selectedIngredientSubCat, setSelectedIngredientSubCat] = useState<"powder" | "liquid" | "fat" | "sugar" | "ferment" | "additive">("powder");
  const [selectedCoffeeMainCat, setSelectedCoffeeMainCat] = useState<"machine" | "bean" | "barista">("machine");
  const [selectedCoffeeSubCat, setSelectedCoffeeSubCat] = useState<string>("all");

  // Core micro-interaction states
  interface BreadClickParticle {
    id: number;
    x: number;
    y: number;
    emoji: string;
  }
  const [clickParticles, setClickParticles] = useState<BreadClickParticle[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionFadeState, setTransitionFadeState] = useState<"idle" | "in" | "out">("idle");
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
        emoji: rEmoji
      };
      
      // Keep only up to 15 particles in DOM to maintain perfect lighter weight footprint
      setClickParticles(prev => [...prev.slice(-14), newP]);
    };
    
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  // 2초마다 커뮤니티 상황판 실시간 로테이션 및 클릭 핸들러
  useEffect(() => {
    const buildPool = () => {
      const pool: any[] = [];
      communityPosts.forEach(p => {
        pool.push({
          id: p.id,
          source: "community",
          category: p.category,
          title: p.title,
          content: p.content,
          author: p.author,
          date: p.date,
          votes: p.votes,
          status: p.status
        });
      });
      plazaPosts.forEach(p => {
        pool.push({
          id: p.id,
          source: "plaza",
          category: p.category,
          title: p.title,
          content: p.content,
          author: p.author,
          date: p.date,
          votes: p.hasOwnProperty('participantsCount') ? (p as any).participantsCount : 10,
          status: p.hasOwnProperty('targetAmount') ? (p as any).targetAmount : "공구 진행중"
        });
      });
      return pool;
    };

    const updateAndShuffle = () => {
      const p = buildPool();
      if (p.length === 0) return;
      
      // Shuffle array
      const shuffled = [...p].sort(() => 0.5 - Math.random());
      setShuffledLivePosts(shuffled.slice(0, 6));
    };

    updateAndShuffle();

    const interval = setInterval(() => {
      updateAndShuffle();
    }, 2000);

    return () => clearInterval(interval);
  }, [communityPosts, plazaPosts]);

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

    const majorCategories = ["equip-list", "dough-main", "coffee", "ingredients", "community", "events"];
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
        }, 400);
      }, 350);
    } else {
      // Instant transition without delay or overlay screen for subcategories, details, or other helper views
      setCurrentView(viewId);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };


  // Setup synchronous maps triggers or active filters
  const selectedDough = CURATED_DOUGHS.find(d => d.id === selectedDoughId) || CURATED_DOUGHS[0];

  // Map dough lists depending on categories
  const masterDoughs = CURATED_DOUGHS.filter(d => d.category === "master");
  const globalDoughs = CURATED_DOUGHS.filter(d => d.category === "global");
  
  // Tasty pick can filter customized or highly requested catalog items! 
  const tastyPickDoughs = CURATED_DOUGHS.filter(d => d.category === "tasty");

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
      votedByMe: true,
      comments: []
    };

    setCommunityPosts([newPost, ...communityPosts]);
    setNewCommTitle("");
    setNewCommContent("");
    setNewCommAuthor("");
  };

  const handleAddCommunityComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommCommentText.trim() || !newCommCommentAuthor.trim()) return;

    setCommunityPosts(prev =>
      prev.map(post => {
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
                date: new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].slice(0, 5)
              }
            ]
          };
        }
        return post;
      })
    );
    setNewCommCommentText("");
    setNewCommCommentAuthor("");
  };

  const handleJoinPlazaPost = (postId: string) => {
    setPlazaPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          const alreadyJoined = post.joinedByMe;
          const delta = alreadyJoined ? -1 : 1;
          const updatedComments = [...post.comments];
          if (!alreadyJoined) {
            updatedComments.push({
              id: `pc-join-${Date.now()}`,
              author: "나의공간 점주 (나)",
              role: "가맹회원",
              content: post.category === "coop" 
                ? "🙋‍♂️ 저 공동구매 참전하겠습니다! 물량 확보 부탁드립니다."
                : post.category === "job"
                ? "🙋‍♂️ 일정 확인 후 지원 문의 남겼습니다! 쪽지나 유선 연락 부탁드립니다."
                : post.category === "used"
                ? "🙋‍♂️ 제가 먼저 직거래 구매 예약 요청드립니다! 답변 기다리겠습니다."
                : post.category === "interior"
                ? "🙋‍♂️ 저희 매장 구조에 대해 상세 견적 및 실측 문의 드렸습니다."
                : "🙋‍♂️ 저도 참여(신청) 신청합니다!",
              date: new Date().toISOString().replace("T", " ").substring(0, 16)
            });
          } else {
            // Remove the auto-joined comment
            const idx = updatedComments.findIndex(c => c.author === "나의공간 점주 (나)" && c.id.startsWith("pc-join-"));
            if (idx !== -1) updatedComments.splice(idx, 1);
          }
          return {
            ...post,
            joinedByMe: !alreadyJoined,
            participantsCount: post.participantsCount + delta,
            comments: updatedComments
          };
        }
        return post;
      })
    );
  };

  const handleAddPlazaComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlazaCommentText.trim()) return;
    const author = newPlazaCommentAuthor.trim() || "나의공간 점주 (나)";
    const newComment: PlazaComment = {
      id: `pc-comment-${Date.now()}`,
      author,
      role: author.includes("업체") || author.includes("시공") || author.includes("디자인") ? "인테리어 전문업체" : "가맹회원",
      content: newPlazaCommentText.trim(),
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      isCustom: true
    };

    setPlazaPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
    setNewPlazaCommentText("");
  };

  const handleCreatePlazaPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlazaTitle.trim() || !newPlazaContent.trim()) return;

    const author = newPlazaAuthor.trim() || "익명 가맹점주";
    const newPost: PlazaPost = {
      id: `plaza-custom-${Date.now()}`,
      category: activePlazaTab,
      title: newPlazaTitle.trim(),
      content: newPlazaContent.trim(),
      author,
      date: new Date().toISOString().split("T")[0],
      location: newPlazaLocation.trim() || "서울 마포구",
      detailInfo: newPlazaDetailInfo.trim() || "상세 내용을 확인해 주세요.",
      priceInfo: newPlazaPriceInfo.trim() || undefined,
      targetAmount: newPlazaTargetAmount.trim() || undefined,
      urgentsInfo: newPlazaUrgentsInfo.trim() || undefined,
      participantsCount: 0,
      comments: []
    };

    setPlazaPosts([newPost, ...plazaPosts]);
    
    // Clear forms
    setNewPlazaTitle("");
    setNewPlazaContent("");
    setNewPlazaAuthor("");
    setNewPlazaLocation("");
    setNewPlazaDetailInfo("");
    setNewPlazaPriceInfo("");
    setNewPlazaTargetAmount("");
    setNewPlazaUrgentsInfo("");

    // Simulate auto bid/reply from contractor/bakers after 1.5 seconds!
    setTimeout(() => {
      setPlazaPosts(prev => 
        prev.map(post => {
          if (post.id === newPost.id) {
            const replies: PlazaComment[] = [];
            if (activePlazaTab === "coop") {
              replies.push({
                id: `pc-auto-c1`,
                author: "마포 합정 베이커리",
                role: "Special Member",
                content: "오!! 아주 합리적인 공동구매 기획이네요. 저희 매장도 물량 확보 함께 참여하고 싶습니다!!",
                date: new Date().toISOString().replace("T", " ").substring(0, 16)
              });
            } else if (activePlazaTab === "interior") {
              replies.push({
                id: `pc-auto-i1`,
                author: "🔧 공간디자인 연우 (시공전문)",
                role: "인테리어 전문업체",
                content: "새 실시간 견적 요청 알림 보고 즉각 제안 드립니다! EveryBake 시공 경력 풍부한 노하우로 24시간 내 무상 출장 방문 실측 및 매칭도면 기획 드리겠습니다. 콜 주십시오 (010-3323-XXXX).",
                date: new Date().toISOString().replace("T", " ").substring(0, 16)
              });
            } else if (activePlazaTab === "job") {
              replies.push({
                id: `pc-auto-j1`,
                author: "스마트 제빵 보조원",
                role: "Junior Baker",
                content: "안녕하세요! 근무 일정 수용 가능하고 인근 거주중이라 긴급 배치 지원 희망합니다. 번호 남겨주시면 감사드리겠습니다!",
                date: new Date().toISOString().replace("T", " ").substring(0, 16)
              });
            } else {
              replies.push({
                id: `pc-auto-g1`,
                author: "성수동 베이킹 사장",
                role: "Premium Member",
                content: "와 저한테 아주 제격인 조건이네요! 거래 연동 희망하여 쪽지 전달해 드렸습니다.",
                date: new Date().toISOString().replace("T", " ").substring(0, 16)
              });
            }
            return {
              ...post,
              participantsCount: 1,
              comments: replies
            };
          }
          return post;
        })
      );
    }, 1500);
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

  // Unified B2B search system
  const getSearchableProducts = () => {
    const list: any[] = [];
    
    // 1. Dough products
    CURATED_DOUGHS.forEach((item) => {
      list.push({
        ...item,
        originType: "dough",
        categoryLabel: "프리미엄 생지 라이브러리",
        badge: item.category === "master" ? "명장 명품" : item.category === "global" ? "글로벌" : "테이스트 픽",
        subCategoryLabel: item.subCategory === "hard" ? "식사빵 (하드계열)" : item.subCategory === "soft" ? "디저트빵 (소프트계열)" : "크로와상/페이스트리"
      });
    });

    // 2. Coffee items
    COFFEE_DATA.forEach((item) => {
      list.push({
        ...item,
        originType: "coffee",
        categoryLabel: "커피 원두 / 머신",
        badge: item.brandType || "B2B 기기",
        subCategoryLabel: item.subCategoryLabel || item.subCategory
      });
    });

    // 3. Ingredient items
    INGREDIENTS_DATA.forEach((item) => {
      list.push({
        ...item,
        originType: "ingredient",
        categoryLabel: "원부자재",
        badge: item.brandType || "B2B 자재",
        subCategoryLabel: item.subCategoryLabel || item.subCategory
      });
    });

    // 4. Smart Equipment (Static)
    list.push({
      id: "eq-pro-01",
      name: "KCT 수직형 AI 도우컨디셔너+오븐 일체형 [Smart Pro] (170cm)",
      brand: "KCT Systems",
      masterName: "KCT Systems (대한민국)",
      categoryLabel: "도우컨디셔너 / 오븐",
      price: 6500000,
      description: "하부 도우컨디셔너(해동·발효)와 상부 오븐 모듈이 전용 통신 칩으로 바코드 데이터와 즉시 조정되는 명장 인증 하드웨어입니다.",
      originType: "equipment",
      badge: "KCT 독점판매",
      subCategoryLabel: "AI 올인원 오븐"
    });
    
    list.push({
      id: "eq-mini-01",
      name: "KCT 스마트 무선 스팀 프레스기 (미니 쇼케이스)",
      brand: "KCT Systems",
      masterName: "KCT Systems (개념 모델)",
      categoryLabel: "도우컨디셔너 / 오븐",
      price: null, // "출시 예정"
      description: "카페 카운터 미니 쇼케이스 장형 배치에 맞춘 콤팩트 데스크톱 디바이스로, 소량 냉동 크로플 및 타르트 자동 소킹을 담당합니다.",
      originType: "equipment",
      badge: "R&D 준비중",
      subCategoryLabel: "무선 스팀 기기"
    });

    return list;
  };

  const filteredSearchProducts = searchQuery.trim() === "" 
    ? [] 
    : getSearchableProducts().filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.brand && item.brand.toLowerCase().includes(query)) ||
          (item.masterName && item.masterName.toLowerCase().includes(query)) ||
          (item.region && item.region.toLowerCase().includes(query)) ||
          (item.categoryLabel && item.categoryLabel.toLowerCase().includes(query)) ||
          (item.subCategoryLabel && item.subCategoryLabel.toLowerCase().includes(query))
        );
      });

  // B2B Pricing Calculations for checkout
  const checkoutSubtotal = cartItems.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
  const checkoutDeliveryFee = checkoutSubtotal > 150000 || checkoutSubtotal === 0 ? 0 : 5000;
  const checkoutTotal = checkoutSubtotal + checkoutDeliveryFee;

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
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
        onGoToCheckout={() => {
          setCurrentView("checkout-form");
          setCartOpen(false);
        }}
      />

      {/* Main Container padding matching header offset */}
      <main className="pt-20">
        
        {searchQuery.trim() !== "" ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
            {/* 뒤로가기 버튼 */}
            <button 
              onClick={() => setSearchQuery("")}
              className="mb-6 flex items-center gap-1 text-xs font-black text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 전체 카테고리 보기
            </button>

            {/* 헤더 */}
            <div className="mb-8 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">EVERYBAKERS SEARCHING SYSTEM</span>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight leading-tight">
                '<span className="text-[#f97316]">{searchQuery}</span>' <span className="font-medium text-stone-650 text-2.5xl">B2B 통합 검색 결과</span>
              </h1>
              <p className="text-stone-500 text-sm">
                스마트 기기 오븐라인업부터 명장 수제 생지, 스페셜 로스팅 원두 및 커피기기, 에브리베이크 필수 B2B 원부재료를 한눈에 발견해 드립니다.
              </p>
              <div className="text-xs font-bold text-[#f97316] bg-orange-50 border border-orange-100 px-3.5 py-1.5 rounded-xl inline-block mt-1">
                🧁 실시간 검색 매칭된 상품 수: {filteredSearchProducts.length}건
              </div>
            </div>

            {/* 제품 리스트 그리드 */}
            {filteredSearchProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 border border-stone-200 border-dashed text-center space-y-3 shadow-2xs">
                <div className="text-4xl animate-bounce">🥐🌾☕</div>
                <h3 className="text-base font-black text-stone-850 font-sans tracking-tight">일치하는 검색 제품이 존재하지 않습니다</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
                  검색어 오타가 없는지 확인해 보세요. 생지, 소금빵, 깜빠뉴, 크루아상, 에스프레소, 오븐, 밀가루, 버터 등의 보편적 카테고리와 품목 키워드로 입력하면 더 확실한 결과를 찾을 수 있습니다.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-5 py-2.5 bg-stone-950 hover:bg-black text-white text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
                >
                  검색어 초기화 및 돌아가기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSearchProducts.map((item) => {
                  const hasValidPrice = item.price !== null && item.price !== undefined;
                  return (
                    <div 
                      key={item.id}
                      className="bg-white rounded-3xl p-6 border border-stone-200/90 hover:border-[#f97316] hover:shadow-xl transition-all flex flex-col justify-between group h-full relative"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg ${
                            item.originType === 'dough' ? 'bg-orange-50 text-[#f97316] border border-orange-100/50' :
                            item.originType === 'coffee' ? 'bg-amber-50 text-amber-800 border border-amber-100/50' :
                            item.originType === 'ingredient' ? 'bg-stone-100 text-stone-750 border border-stone-200/50' :
                            'bg-blue-50 text-[#2563eb] border border-blue-100/50'
                          }`}>
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
                          <div className="text-[10px] font-extrabold text-stone-400 mb-3 text-left">
                            분류태그: <span className="text-[#f97316]/80">{item.subCategoryLabel}</span>
                          </div>
                        )}
                        <p className="text-xs text-stone-550 leading-relaxed font-semibold line-clamp-3 mb-6 text-left">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                        <div className="flex flex-col text-left">
                          <span className="text-[9px] text-stone-400 font-bold uppercase tracking-tight">파트너 특가</span>
                          <span className="text-[15px] font-black text-stone-900 font-mono">
                            {!hasValidPrice ? (
                              "출시 예정"
                        ) : (
                          `₩ ${item.price.toLocaleString()}`
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.originType === 'dough' && (
                        <button
                          onClick={() => {
                            setSelectedDoughId(item.id);
                            setSearchQuery("");
                            handleNav("dough-detail");
                          }}
                          className="px-2.5 py-1.75 border border-stone-200 hover:border-stone-900 text-stone-700 hover:text-stone-900 text-xs font-bold rounded-xl transition-all cursor-pointer bg-white"
                        >
                          상세보기
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          if (item.originType === 'dough') {
                            handleAddToCart(item);
                          } else if (item.originType === 'coffee') {
                            handleAddCustomToCart(item.id, item.name, item.price ?? 0, "bg-orange-50 text-[#f97316]", item.brand || 'Coffee');
                          } else if (item.originType === 'ingredient') {
                            handleAddCustomToCart(item.id, item.name, item.price ?? 0, "bg-stone-50 text-[#f97316]", item.brand || 'Ingredient');
                          } else if (item.originType === 'equipment') {
                            if (!hasValidPrice) {
                              alert("⚠️ 본 스마트 장치는 상용화 준비 중인 모델입니다. 파트너 제안서 작성이나 대표 포털 문의를 통해서 샘플 배치 요구를 상담할 수 있습니다.");
                            } else {
                              handleAddCustomToCart("eq-pro-01", "KCT Smart Pro (All-in-one)", 6500000, "bg-blue-50 text-[#2563eb]", "KCT Systems");
                            }
                          }
                        }}
                        className={`px-3 py-1.75 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs hover:shadow-xs shrink-0 ${
                          (!hasValidPrice && item.originType === 'equipment') 
                            ? 'bg-stone-300 hover:bg-stone-400 text-stone-600 cursor-pointer border border-stone-200' 
                            : 'bg-[#f97316] hover:bg-orange-600'
                        }`}
                      >
                        {(!hasValidPrice && item.originType === 'equipment') ? "기획서접수" : "B2B 담기"}
                      </button>
                    </div>
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
              /* Receipt B2B Thermal Bill */
              <div className="max-w-xl mx-auto px-6 py-12 animate-fade-in text-center">
                {/* thermal style receipt design */}
                <div className="bg-white rounded-3xl border border-stone-250/80 shadow-xl p-8 text-left space-y-6 relative overflow-hidden">
                  {/* aesthetic decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />
                  
                  <div className="text-center space-y-2 pb-2">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                      <Check className="w-6 h-6 stroke-[3px]" />
                    </div>
                    <h2 className="text-xl font-black text-stone-900 tracking-tight font-sans">B2B 발주 및 결제 승인 완료</h2>
                    <p className="text-[11px] text-stone-400">발송 등록 및 점포 전용 스마트 레시피 동기화 대기상태</p>
                  </div>

                  <div className="border-t border-dashed border-stone-200 pt-4 space-y-3.5 text-xs text-stone-700">
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">발주 승인 번호</span>
                      <span className="font-mono font-bold text-stone-900 select-all">{paymentSuccessOrder.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">가맹 주 점포명</span>
                      <span className="font-black text-stone-900">{paymentSuccessOrder.shopName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">가맹점 연락처</span>
                      <span className="font-bold text-stone-900">{paymentSuccessOrder.contact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">희망 배송 도착일</span>
                      <span className="font-black text-[#f97316]">{paymentSuccessOrder.deliveryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">결제 완료 일시</span>
                      <span className="font-bold text-stone-800">{paymentSuccessOrder.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">결제 승인 수량</span>
                      <span className="font-bold text-stone-900">B2B 공급 계약 규격</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400 font-medium">결제 거래 방식</span>
                      <span className="font-bold text-stone-800 bg-stone-100 px-2.5 py-0.5 rounded border border-stone-200 text-[10px]">{paymentSuccessOrder.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-200/60 pt-4">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-2">물량 유통 공급 현황</p>
                    <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-3 text-[10px] text-stone-600 space-y-1.5 leading-relaxed">
                      <p className="font-bold text-stone-850 flex items-center gap-1">🚚 콜드체인 영하 18도 냉동탑차 배송</p>
                      <p>전국 주요 물류 기지 및 스마트 허브로부터 기온 맞춤 특송 탑차가 기획 배차됩니다. 스마트 기기 앱 동기화가 활성화되었으므로 원클릭 다운로드 레시피 가이드가 전송됩니다.</p>
                    </div>
                  </div>

                  <div className="border border-stone-200 bg-stone-50/50 p-4 rounded-2xl flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <div className="text-left">
                      <p className="text-[10px] font-extrabold text-[#f97316]">KCT 스마트 전산 연계 플러그인</p>
                      <p className="text-[9px] text-stone-500 leading-relaxed mt-0.5">
                        본 가상 거래 정보는 EveryBake 및 KCT Smart Cloud 원장에 즉각 무선 동기화되어, 매장의 도우컨디셔너와 스마트 오븐에 발효 맞춤 온습도 레시피 프리셋이 자동 업그레이드 세팅됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-stone-200 pt-5 text-center">
                    <p className="text-stone-400 text-[10px]">계약 실 청구액 (부가세 면세 혜택 자동 계상)</p>
                    <p className="text-2xl font-black text-stone-950 mt-1">
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
                  <span>B2B 사장님 파트너 포털 포털로 돌아가기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* ==================================================== */}
                {/* 1. HOME VIEW                                        */}
                {/* ==================================================== */}
            {currentView === "home" && (
          <div className="animate-fade-in">
            {/* Split Screen Hero Section */}
            <div className="w-full h-[calc(100vh-80px)] overflow-hidden flex relative select-none bg-stone-950 font-sans">
              
              {/* Left Panel: AI 도우컨디셔너 */}
              <div
                onMouseEnter={() => setHoveredPanel('left')}
                onMouseLeave={() => setHoveredPanel(null)}
                onClick={() => handleNav("equip-list")}
                style={{ width: hoveredPanel === 'left' ? '70%' : hoveredPanel === 'right' ? '30%' : '50%' }}
                className="h-full relative overflow-hidden transition-all duration-700 ease-out cursor-pointer group border-r border-stone-850 bg-gradient-to-tr from-[#121110] via-[#1c1a19] to-[#0c0c0b]"
              >
                {/* Subtle low-opacity background image representing heated coils context */}
                <img 
                  src={modernSmartOvenImage} 
                  alt="상우 오븐 가열" 
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.22] transition-transform duration-1000 ease-out scale-100"
                  referrerPolicy="no-referrer"
                />

                {/* Back light glow to illuminate the actual product */}
                <div className={`absolute w-[36rem] h-[36rem] bg-orange-500/15 rounded-full blur-[110px] left-1/2 top-1/2 -tune-translate-x-1/2 -tune-translate-y-1/2 transition-all duration-1000 ${
                  hoveredPanel === 'left' ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
                }`} style={{ transform: 'translate(-50%, -50%)' }} />

                {/* Actual Product Image: KCT Smart Pro Oven we sell */}
                <div className="absolute inset-x-0 bottom-4 top-28 flex items-center justify-center p-6 z-5">
                  <img 
                    src={ovenImage} 
                    alt="KCT Smart Pro" 
                    className={`h-[75%] max-h-[55vh] sm:max-h-[62vh] w-auto object-contain filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-all duration-1000 ease-out ${
                      hoveredPanel === 'left' ? 'scale-[1.06] -rotate-1 translate-y-[-8px]' : 'scale-100 rotate-0'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Overlay Gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45 group-hover:from-black/95 transition-all duration-700 w-full h-full" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
                  {/* Top: Button Link */}
                  <div className="text-left mt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNav("equip-list");
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black/50 hover:bg-[#f97316] text-white text-xs sm:text-sm font-extrabold tracking-tight border border-white/20 hover:border-transparent transition-all shadow-md group/btn cursor-pointer"
                    >
                      <span>AI도우컨디셔너 자세히 보기 &gt;</span>
                    </button>
                  </div>

                  {/* Bottom: Branded Copy (As shown in image 1) */}
                  <div className={`text-left space-y-2.5 transition-all duration-700 transform ${
                    hoveredPanel === 'right' ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                  }`}>
                    <p className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                      당신의 식탁,<br />
                      당신의 매 순간
                    </p>
                    <p className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#f97316] tracking-tighter drop-shadow-md">
                      에브리베이크
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Panel: 프리미엄 생지 */}
              <div
                onMouseEnter={() => setHoveredPanel('right')}
                onMouseLeave={() => setHoveredPanel(null)}
                onClick={() => handleNav("dough-main")}
                style={{ width: hoveredPanel === 'right' ? '70%' : hoveredPanel === 'left' ? '30%' : '50%' }}
                className="h-full relative overflow-hidden transition-all duration-700 ease-out cursor-pointer group bg-stone-900"
              >
                {/* Background Image: Flour Dust Cloud (artisan_baker_detail) with high vibrance and no heavy dark mask */}
                <img 
                  src={artisanBakerDetailImage} 
                  alt="프리미엄 생지" 
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                    hoveredPanel === 'right' ? 'scale-[1.06] brightness-110 saturate-105' : 'scale-100 brightness-100 saturate-100'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Subtly tuned overlay gradient that protects text readability but leaves flour dust extremely bright and prominent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 group-hover:from-black/85 transition-all duration-700 w-full h-full" />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between z-10">
                  {/* Top: Button Link */}
                  <div className="text-left md:text-right mt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNav("dough-main");
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-black/50 hover:bg-[#f97316] text-white text-xs sm:text-sm font-extrabold tracking-tight border border-white/20 hover:border-transparent transition-all shadow-md group/btn cursor-pointer"
                    >
                      <span>프리미엄 생지 자세히보기 &gt;</span>
                    </button>
                  </div>

                  {/* Bottom: Subtle secondary copy to balance the split layout */}
                  <div className={`text-left md:text-right transition-all duration-700 transform ${
                    hoveredPanel === 'left' ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                  }`}>
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-white/90 tracking-tight">
                      최고의 재료와 명장의 숨결이 깃든
                    </p>
                    <p className="text-lg sm:text-2xl lg:text-3xl font-black text-amber-400 mt-1">
                      프리미엄 마스터 생지 라이브러리
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* ==================================================== */}
            {/* DYNAMIC DASHBOARD SECTIONS REQUIRED BY USER          */}
            {/* ==================================================== */}
            <div className="max-w-5xl mx-auto px-6 pt-12 pb-4 space-y-12">
              
              {/* 1) 에베인 실시간 커뮤니티 상황 (2 seconds interval rolling) */}
              <div className="space-y-4 font-sans">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2.5 border-b border-stone-200">
                  <div className="text-left">
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md">LIVE NETWORK</span>
                    <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight flex items-center gap-1.5 mt-1">
                      💬 에베인 실시간 커뮤니티 상황
                    </h2>
                  </div>
                  <span className="text-[10px] text-stone-400 font-bold flex items-center gap-1 select-none">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    2초마다 실시간 제안 순서 로테이션 중
                  </span>
                </div>

                {shuffledLivePosts.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-400">실시간 피드를 동기화하고 있습니다...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {shuffledLivePosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => handleLivePostClick(post)}
                        className="group bg-white p-4.5 rounded-xl border border-stone-200/80 hover:border-[#f97316] hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-3.5 text-left relative overflow-hidden"
                      >
                        {/* Smooth top line accent matching source */}
                        <div className={`absolute top-0 left-0 right-0 h-1 ${
                          post.source === "plaza" ? "bg-amber-500" : "bg-[#f97316]"
                        }`} />

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[10px] font-black">
                            <span className={`${
                              post.source === "plaza" ? "text-amber-600" : "text-[#f97316]"
                            }`}>
                              {post.source === "plaza" ? "🛒 알뜰 광장" : `💡 ${
                                post.category === "trouble" ? "고민 창구" : "입점 제안"
                              }`}
                            </span>
                            <span className="text-stone-400 font-semibold">{post.date}</span>
                          </div>
                          
                          <h3 className="text-xs sm:text-[13px] font-extrabold text-stone-900 group-hover:text-[#f97316] line-clamp-1 transition-colors leading-snug">
                            {post.title}
                          </h3>
                          
                          <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed font-semibold">
                            {post.content}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-stone-400 pt-2 border-t border-stone-100/50">
                          <span className="font-bold text-stone-500 block max-w-[120px] truncate">{post.author}</span>
                          <div className="flex items-center gap-1.5 font-bold shrink-0">
                            <span>👍 {post.votes}</span>
                            <span className="text-[8.5px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-black max-w-[110px] truncate">
                              {post.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2) 현재 가장 밀고있는 이벤트 / 혜택 (2 Column interactive cards) */}
              <div className="space-y-4 font-sans">
                <div className="text-left pb-2 border-b border-stone-200">
                  <span className="text-[9px] bg-purple-100 text-purple-700 font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md">SPECIAL BENEFIT</span>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight mt-1">
                    ✨ 에베 추천 이벤트 & 혜택
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Event 1 Card */}
                  <div 
                    onClick={() => handleEventClick("monday-day")}
                    className="group relative bg-[#fffdfa] hover:bg-[#fffbf6] border border-orange-100 hover:border-[#f97316] rounded-2xl p-5 cursor-pointer transition-all flex flex-col sm:flex-row justify-between items-stretch gap-4 text-left shadow-xs hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between space-y-3 flex-1">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[9px] font-black uppercase tracking-widest text-[#f97316] bg-orange-100/60 px-2 py-0.5 rounded">정기 특가전</span>
                        <h3 className="text-sm sm:text-base font-black text-stone-900 group-hover:text-[#f97316] transition-colors leading-tight">
                          베스트 상품, 더 알뜰하게 ~33% 특가 🥐
                        </h3>
                        <p className="text-[11px] text-stone-550 font-semibold leading-relaxed">
                          매주 월요일 찾아오는 고정 수혜 라인업! 최대 33% 할인 혜택과 10% 추가 다운로더블 쿠폰 기회를 절대 놓치지 마세요.
                        </p>
                      </div>
                      <span className="text-[10px] text-stone-400 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" /> ~ 06.08(월) 오전 11시 마감 임박
                      </span>
                    </div>

                    <div className="flex flex-row sm:flex-col justify-end items-center gap-3 shrink-0 sm:self-center">
                      <div className="w-14 h-14 rounded-full bg-orange-100/50 text-stone-800 outline outline-3 outline-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                        🥖
                      </div>
                      <span className="px-2.5 py-1 bg-white hover:bg-stone-50 text-stone-800 text-[10px] font-black rounded-lg border border-stone-200 group-hover:bg-[#f97316] group-hover:text-white group-hover:border-transparent transition-all flex items-center gap-0.5 shadow-xs">
                        혜택받기 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Event 2 Card */}
                  <div 
                    onClick={() => handleEventClick("baking-king")}
                    className="group relative bg-[#f9f5ff] hover:bg-[#f5eeff] border border-indigo-150 hover:border-indigo-400 rounded-2xl p-5 cursor-pointer transition-all flex flex-col sm:flex-row justify-between items-stretch gap-4 text-left shadow-xs hover:shadow-md"
                  >
                    <div className="flex flex-col justify-between space-y-3 flex-1">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-100/60 px-2 py-0.5 rounded">명예의 전당</span>
                        <h3 className="text-sm sm:text-base font-black text-stone-900 group-hover:text-indigo-600 transition-colors leading-tight">
                          제 3회 에브리베이크 빵천하제일대회 🏆
                        </h3>
                        <p className="text-[11px] text-stone-550 font-semibold leading-relaxed">
                          전국 가맹 사장님만의 생지 200% 활용 쿠프 및 온도 설정 꿀팁을 나누고 상생지원금 바우처를 지금 득템하세요!
                        </p>
                      </div>
                      <span className="text-[10px] text-stone-400 font-bold flex items-center gap-1">
                        <Award className="w-3 h-3 text-indigo-400" /> 실시간 참여 명필 사장님 피드백 누적 집계중
                      </span>
                    </div>

                    <div className="flex flex-row sm:flex-col justify-end items-center gap-3 shrink-0 sm:self-center">
                      <div className="w-14 h-14 rounded-full bg-indigo-100/50 text-stone-800 outline outline-3 outline-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                        👑
                      </div>
                      <span className="px-2.5 py-1 bg-white hover:bg-stone-50 text-stone-800 text-[10px] font-black rounded-lg border border-stone-200 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all flex items-center gap-0.5 shadow-xs">
                        도전하기 <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3) 생지 라이브러리 베스트셀러 TOP 5 바로가기 (Minimal high-end lists) */}
              <div className="space-y-4 font-sans">
                <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                  <div className="text-left">
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md">BEST SELLERS</span>
                    <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight mt-1">
                      🥐 실시간 생지 라이브러리 누적 판매 TOP 5
                    </h2>
                  </div>
                  <button 
                    onClick={() => handleNav("dough-main")}
                    className="text-stone-500 hover:text-stone-900 font-extrabold text-[11px] flex items-center gap-0.5 hover:underline"
                  >
                    전체 보기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {["m-001", "g-002", "h-001", "h-006", "h-009"]
                    .map(id => CURATED_DOUGHS.find(d => d.id === id))
                    .filter((d): d is any => !!d)
                    .map((dough, index) => (
                      <div
                        key={dough.id}
                        onClick={() => handleDoughClick(dough.id)}
                        className="group bg-white p-4.5 rounded-xl border border-stone-200 hover:border-amber-500 hover:shadow-xs transition-all cursor-pointer text-left flex flex-col justify-between space-y-3.5 relative overflow-hidden"
                      >
                        {/* Rank Badge overlay */}
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          index === 0 ? "bg-amber-100 text-amber-800 outline outline-1 outline-amber-300" :
                          index === 1 ? "bg-[#f5f5f5] text-stone-700 outline outline-1 outline-stone-300" :
                          index === 2 ? "bg-amber-55 text-amber-900" :
                          "bg-stone-50 text-stone-500"
                        }`}>
                          {index + 1}
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold text-stone-400 block tracking-tight">
                            {dough.masterName || "EveryBake"}
                          </span>
                          <h3 className="text-xs sm:text-[13px] font-extrabold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                            {dough.name}
                          </h3>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-xs">
                          <span className="text-[#f97316] font-black font-mono">{dough.price.toLocaleString()}원</span>
                          <span className="text-[9px] font-extrabold text-stone-400 group-hover:text-stone-850 flex items-center gap-0.25">
                            자세히 <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    ))}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                
                {/* 1. 도우컨디셔너 / 오븐 */}
                <div 
                  onClick={() => handleNav("equip-list")}
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 aspect-auto sm:aspect-square h-auto relative"
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
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 aspect-auto sm:aspect-square h-auto relative"
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
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 aspect-auto sm:aspect-square h-auto relative"
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

                {/* 4. 원부자재 */}
                <div 
                  onClick={() => handleNav("ingredients")}
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 aspect-auto sm:aspect-square h-auto relative"
                  id="cat-card-ingredients"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-605 flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform">
                    🌾
                  </div>
                  <h4 className="text-sm font-extrabold text-stone-900 group-hover:text-[#f97316] transition-colors">
                    원부자재
                  </h4>
                  <p className="text-[10px] text-stone-400 mt-1.5 leading-relaxed">
                    가루류, 액체류, 유지류,<br />당류, 이스트 등 다양화
                  </p>
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] text-[#f97316] font-bold flex items-center gap-0.5">
                      자세히 보기 <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* 5. 에브리베이크 커뮤니티 */}
                <div 
                  onClick={() => handleNav("community")}
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 aspect-auto sm:aspect-square h-auto relative"
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
                  className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md cursor-pointer group hover:border-[#f97316] transition-all text-center flex flex-col items-center justify-center p-5 sm:p-6 lg:p-8 aspect-auto sm:aspect-square h-auto relative"
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
                    불합리한 중간 유통 수수료나 과도한 추가 마진을 부과하지 않습니다. 전 부품 고급 스테인리스 하드웨어의 무손실 자산 인수를 확실하게 보장합니다.
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

                {/* 🌟 Category Quick Jump Navigation Cards/Pill links */}
                {getTabDoughs().length > 0 && (
                  <div className="bg-stone-50/60 rounded-2xl border border-stone-200/60 p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
                    <div className="space-y-1">
                      <div className="text-xs font-black text-stone-800 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        카테고리 원터치 빠른 탐색
                      </div>
                      <p className="text-[11px] text-stone-500 font-medium leading-relaxed">
                        원하시는 분류명을 선택하시면 스크롤 동작 없이 해당 리스트 영역으로 즉시 부드럽게 고속 이동합니다.
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                      {getTabDoughs().filter(d => d.subCategory === "hard").length > 0 && (
                        <button
                          onClick={() => {
                            document.getElementById("dough-section-hard")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
                        >
                          <span className="text-xs">🥖</span>
                          <span>하드 계열</span>
                          <span className="bg-blue-600 text-white font-mono text-[9px] px-1.5 py-0.2 rounded-full font-black">
                            {getTabDoughs().filter(d => d.subCategory === "hard").length}
                          </span>
                        </button>
                      )}

                      {getTabDoughs().filter(d => d.subCategory === "pastry").length > 0 && (
                        <button
                          onClick={() => {
                            document.getElementById("dough-section-pastry")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-200 bg-amber-50/80 hover:bg-amber-100/90 text-amber-800 text-xs font-bold transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
                        >
                          <span className="text-xs">🥐</span>
                          <span>페이스트리 계열</span>
                          <span className="bg-amber-500 text-stone-950 font-mono text-[9px] px-1.5 py-0.2 rounded-full font-black">
                            {getTabDoughs().filter(d => d.subCategory === "pastry").length}
                          </span>
                        </button>
                      )}

                      {getTabDoughs().filter(d => d.subCategory === "soft").length > 0 && (
                        <button
                          onClick={() => {
                            document.getElementById("dough-section-soft")?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all hover:scale-[1.02] shadow-sm cursor-pointer"
                        >
                          <span className="text-xs">🍞</span>
                          <span>소프트 계열</span>
                          <span className="bg-emerald-600 text-white font-mono text-[9px] px-1.5 py-0.2 rounded-full font-black">
                            {getTabDoughs().filter(d => d.subCategory === "soft").length}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {getTabDoughs().length === 0 ? (
                  <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3">
                    <span className="text-4xl text-stone-300">🔍</span>
                    <h4 className="text-stone-800 font-bold">탐색된 제안 생지가 없습니다</h4>
                    <p className="text-xs text-stone-400">지정된 로케이션 상의 검증된 생지 원재료 노드가 비활성화 상태입니다.</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    {(() => {
                      const allDoughs = getTabDoughs();
                      const sortedAll = [...allDoughs].sort((a, b) => getDoughSales(b.id) - getDoughSales(a.id));
                      const totalTop3 = sortedAll.slice(0, 3);

                      return (
                        <>
                          {/* 🏆 실시간 프리미엄 통합 토탈 TOP 3 랭킹 Block */}
                          {totalTop3.length > 0 && (
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
                                    dough.subCategory === "hard" ? "🥖 하드 계열" :
                                    dough.subCategory === "pastry" ? "🥐 페이스트리" : 
                                    "🍞 소프트 계열";

                                  return (
                                    <div key={`total-top3-${dough.id}`} className="relative group">
                                      {/* Subcategory Label overlay tag for Integrated Top 3 */}
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
                          {allDoughs.filter(d => d.subCategory === "hard").length > 0 && (
                            <div id="dough-section-hard" className="space-y-6 scroll-mt-24">
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
                                {allDoughs
                                  .filter(d => d.subCategory === "hard")
                                  .map((dough) => {
                                    const rankIdx = totalTop3.findIndex(t => t.id === dough.id);
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
                          {allDoughs.filter(d => d.subCategory === "pastry").length > 0 && (
                            <div id="dough-section-pastry" className="space-y-6 scroll-mt-24">
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
                                {allDoughs
                                  .filter(d => d.subCategory === "pastry")
                                  .map((dough) => {
                                    const rankIdx = totalTop3.findIndex(t => t.id === dough.id);
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
                          {allDoughs.filter(d => d.subCategory === "soft").length > 0 && (
                            <div id="dough-section-soft" className="space-y-6 scroll-mt-24">
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
                                {allDoughs
                                  .filter(d => d.subCategory === "soft")
                                  .map((dough) => {
                                    const rankIdx = totalTop3.findIndex(t => t.id === dough.id);
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
                    
                    <span className="absolute bottom-4 text-[10px] font-extrabold uppercase font-mono tracking-widest text-[#a8a29e] bg-white shadow-xs px-3.5 py-1 rounded-full border border-stone-150">
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
                  <p className="text-[#a8a29e] text-sm max-w-xl text-center leading-relaxed font-semibold mb-10">
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
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#a8a29e] mb-2.5">OVEN PARAMETERS</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between py-1 border-b border-stone-200/60">
                            <span className="text-[#a8a29e]">해동 지점:</span>
                            <span className="font-extrabold text-stone-800">{selectedDough.settings.defrostTemp}°C ({selectedDough.settings.defrostTime}분)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-stone-200/60">
                            <span className="text-[#a8a29e]">숙성 발효:</span>
                            <span className="font-extrabold text-stone-800">{selectedDough.settings.fermentTemp}°C ({selectedDough.settings.fermentHumidity}%)</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-stone-200/60">
                            <span className="text-[#a8a29e]">소성 온도:</span>
                            <span className="font-extrabold text-stone-800">{selectedDough.settings.bakeTemp}°C ({selectedDough.settings.bakeTime}분)</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-[#a8a29e]">기압식 스팀:</span>
                            <span className="font-extrabold text-[#44403c]">{selectedDough.settings.steam ? "지원 (분사 2.5초)" : "미지원"}</span>
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
          <div className="max-w-6xl mx-auto px-6 py-8 animate-fade-in">
            <button 
              onClick={() => handleNav("home")}
              className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 홈으로 이동
            </button>

            {/* 메인 커뮤니티 대형 헤더 및 소개부 (주제별 동적 반영) */}
            <div className="mb-8 space-y-2 text-center max-w-3xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">EveryBake Business League</span>
              <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                {activeMainTab === "why-not-sell" && "💡 이거 왜 안 팔아? 에브리베이크"}
                {activeMainTab === "flea-market" && "🛒 에브리베이크 알뜰 광장"}
                {activeMainTab === "interior" && "🛠️ 빵집 인테리어 견적 매칭"}
                {activeMainTab === "trouble" && "💬 에베 고민창구"}
              </h1>
              <p className="text-stone-550 text-sm mt-1.5 leading-relaxed font-semibold">
                {activeMainTab === "why-not-sell" && (
                  <>전국 사장님들이 직접 원하시는 물품의 신규 입점 계약을 제안하는 실시간 상생 건의 보드입니다. <strong className="text-[#f97316]">30추천 도달 시</strong> 대형 도매 MD팀이 즉각 공급처 직거래 발굴에 착수합니다.</>
                )}
                {activeMainTab === "flea-market" && (
                  <>자재 대량 공동구매부터 남은 재고 중고 할인 처분, 대용량 식자재 소분 상호 나눔, 당일 단기 긴급 제빵 알바 연동까지! 전국 매장의 비용 혁신 마켓 플레이스입니다.</>
                )}
                {activeMainTab === "interior" && (
                  <>노후화된 기기 교체나 인테리어 파사드 파트 보수가 고민이신 사장님들이 시공 모집글을 남기시면, 전문 공인 인테리어 빌더들이 <strong className="text-[#f97316]">공개 비교 견적 제안</strong> 및 포트폴리오 상담을 실시간 연동해 드립니다.</>
                )}
                {activeMainTab === "trouble" && (
                  <>매장 운영, 인력 관리, 유통 등 사장님들의 말 못 할 현실적인 모든 우려와 고민을 속 시원히 공유하고, 전국 가맹점주 동료들과 본사 전문가의 실시간 상생 피드백을 수렴하는 소통 허브입니다.</>
                )}
              </p>
            </div>

            {/* 네 개의 대분류 커뮤니티 탭 (깔끔하고 시각적으로 뚜렷한 정렬) */}
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 mb-10 w-full max-w-4xl mx-auto border-b border-stone-200 pb-6">
              {[
                { id: "why-not-sell", label: "💡 이거 왜 안 팔아? 에브리베이크", desc: "도입 희망 상품 건의 및 투표" },
                { id: "flea-market", label: "🛒 에브리베이크 알뜰 광장", desc: "공구·중고거래·소분나눔·당일인력" },
                { id: "interior", label: "🛠️ 빵집 인테리어 매칭", desc: "보수/디자인 요청 및 견적 비교" },
                { id: "trouble", label: "💬 에베 고민창구", desc: "동료 점주 상생 소통 및 고민 해결" }
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
                  <p className="text-xs sm:text-sm font-black tracking-tight">{mainTab.label}</p>
                  <p className={`text-[10px] mt-1 ${activeMainTab === mainTab.id ? "text-stone-300" : "text-stone-400"} font-bold`}>
                    {mainTab.desc}
                  </p>
                </button>
              ))}
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
                          ? `에베 고민 피드 (${communityPosts.filter(p => p.category === activeCommTab).length}개)`
                          : `제안된 아이디어 (${communityPosts.filter(p => p.category === activeCommTab).length}개)`}
                      </span>
                      <span className="text-[10px] text-[#f97316] font-bold">
                        {activeCommTab === "trouble" ? "동료 점주 상생 피드백" : "실시간 투표 반영 완료"}
                      </span>
                    </div>

                    {communityPosts.filter(p => p.category === activeCommTab).length === 0 ? (
                      <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3 col-span-full">
                        <span className="text-4xl text-stone-300">💡</span>
                        <h4 className="text-stone-800 font-bold">등록된 제안이 아직 없습니다</h4>
                        <p className="text-xs text-stone-400">우측 폼을 이용해 첫 번째로 사장님의 혁명적인 입점 건의를 올려 보세요!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {communityPosts.filter(p => p.category === activeCommTab).map((post) => (
                          <div key={post.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-4">
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

                            <div className="space-y-1.5">
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
                                  type="button"
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
                  <div className="lg:col-span-12 xl:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
                    <h3 className="text-xs font-extrabold text-stone-950 mb-2 flex items-center gap-1.5">
                      🛡️ 신제품 도매 입점 긴급 제안 등록
                    </h3>
                    <p className="text-stone-450 text-[10px] mb-4 leading-relaxed">
                      매장에 절실하게 필요한 냉동 벌크 식자재 브랜드, 규격화된 수입 제안 등을 올려주시면 전국 사장님들의 소중한 한 표가 모아 자사 수입 협상력으로 작동합니다.
                    </p>

                    <form onSubmit={handleAddCommunityPost} className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">매장명 / 사장님 존함</label>
                        <input
                          type="text"
                          required
                          value={newCommAuthor}
                          onChange={(e) => setNewCommAuthor(e.target.value)}
                          placeholder="예: 망원 브레드룸 지점장"
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">건의 제안 제목</label>
                        <input
                          type="text"
                          required
                          value={newCommTitle}
                          onChange={(e) => setNewCommTitle(e.target.value)}
                          placeholder="예: 프랑스 포리쉐 수입 밀가루 T55 소분 계약 건의"
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">상세 협력 제안내용</label>
                        <textarea
                          required
                          rows={4}
                          value={newCommContent}
                          onChange={(e) => setNewCommContent(e.target.value)}
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
                    const post = plazaPosts.find(p => p.id === selectedPlazaPostId);
                    if (!post) return <p className="text-center">게시글을 찾을 수 없습니다.</p>;
                    return (
                      <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 animate-fade-in space-y-6">
                        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-stone-100 pb-5">
                          <button
                            type="button"
                            onClick={() => setSelectedPlazaPostId(null)}
                            className="flex items-center gap-1.5 text-xs font-black text-[#f97316] hover:text-orange-600 bg-orange-50 hover:bg-orange-100 px-3.5 py-1.75 rounded-xl transition-all cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> 목록형 광장으로 돌아가기
                          </button>
                          
                          <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
                            <span>등록일: {post.date}</span>
                            <span>|</span>
                            <span className="flex items-center gap-0.5 text-stone-500 font-bold">
                              <MapPin className="w-3.5 h-3.5 text-stone-400" /> {post.location}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                          
                          {/* Left Column: 상세 품목 공기안 및 계약 요약 */}
                          <div className="lg:col-span-7 space-y-6">
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <span className="bg-orange-100 text-[#f97316] font-bold text-[9px] uppercase px-2 py-0.5 rounded">
                                  {post.category === "coop" && "📦 포장 자재 공동구매"}
                                  {post.category === "used" && "🤝 단기 재고 중고장터"}
                                  {post.category === "share" && "🎁 대용량 소분 무료나눔"}
                                  {post.category === "job" && "🚨 당일 땜빵/알바 급구"}
                                </span>
                                <span className="text-xs text-emerald-600 font-extrabold">● 모집/공구 진행중 (실시간)</span>
                              </div>
                              
                              <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug">{post.title}</h2>
                              
                              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3.5">
                                <div className="flex items-center gap-2 text-xs font-bold text-stone-550">
                                  <User className="w-4 h-4 text-[#f97316]" />
                                  <span>작성 점주: <strong>{post.author}</strong></span>
                                  <span className="text-stone-300">|</span>
                                  <span>구역 위치: <strong>{post.location}</strong></span>
                                </div>
                                <p className="text-xs text-stone-600 leading-relaxed font-semibold whitespace-pre-wrap">{post.content}</p>
                              </div>
                            </div>

                            {/* 세부 수치 데이터 박스 */}
                            <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 space-y-4">
                              <h4 className="text-xs font-black text-stone-850 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-[#f97316]" /> 광장 매칭 실시간 마일스톤
                              </h4>
                              
                              <div className="grid grid-cols-2 gap-4">
                                {post.priceInfo && (
                                  <div className="bg-white p-3.5 rounded-xl border border-stone-150">
                                    <span className="block text-[10px] text-stone-400 font-bold">공급 제안 단가</span>
                                    <span className="text-sm font-black text-stone-900 font-mono mt-0.5 block">{post.priceInfo}</span>
                                  </div>
                                )}
                                {post.targetAmount && (
                                  <div className="bg-white p-3.5 rounded-xl border border-stone-150">
                                    <span className="block text-[10px] text-stone-400 font-bold">목표 수주량 / 분량</span>
                                    <span className="text-sm font-black text-stone-900 font-mono mt-0.5 block">{post.targetAmount}</span>
                                  </div>
                                )}
                                {post.urgentsInfo && (
                                  <div className="bg-white p-3.5 rounded-xl border border-stone-150 col-span-2">
                                    <span className="block text-[10px] text-stone-400 font-bold">일정 조율 및 우대 조건</span>
                                    <span className="text-xs font-extrabold text-[#f97316] mt-0.5 block">{post.urgentsInfo}</span>
                                  </div>
                                )}
                              </div>

                              <div className="space-y-2 pt-2 border-t border-orange-100/50">
                                <div className="flex justify-between items-center text-xs font-bold text-stone-700">
                                  <span>현재 매장 참여율 ({post.participantsCount}개 매장 확보)</span>
                                  <span className="text-[#f97316]">{post.participantsCount > 4 ? "공구 성사 확률 98%!" : "추가 참여 대기"}</span>
                                </div>
                                <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-250">
                                  <div 
                                    className="h-full bg-gradient-to-r from-orange-400 to-[#f97316] transition-all duration-500" 
                                    style={{ width: `${Math.min(100, (post.participantsCount / 8) * 100)}%` }}
                                  />
                                </div>
                                <p className="text-[10px] text-stone-400 font-bold">목표 인원/매장 도달 시 EveryBake 프렌즈 전용 즉시 배송 바우처가 자동 활성화됩니다.</p>
                              </div>

                              {/* Interactive Join / Participate Button */}
                              <button
                                type="button"
                                onClick={() => handleJoinPlazaPost(post.id)}
                                className={`w-full py-3.5 rounded-xl text-xs font-black transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                                  post.joinedByMe
                                    ? "bg-stone-150 hover:bg-stone-200 text-stone-700 border border-stone-300"
                                    : "bg-[#f97316] hover:bg-orange-600 text-white shadow-md hover:shadow-lg"
                                }`}
                              >
                                {post.joinedByMe ? "🤝 나의 매장 광장 참여 취소하기" : "🤝 여기에 내 가게도 무상 즉시 참전하기"}
                              </button>
                            </div>
                          </div>

                          {/* Right Column: 세부 실시간 대화식 스레드 (댓글) */}
                          <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-6 space-y-5">
                            <div className="border-b border-stone-150 pb-3 flex justify-between items-center">
                              <h3 className="text-xs font-black text-stone-900">
                                💬 점주 및 업체간 조율 스레드 ({post.comments.length}개)
                              </h3>
                              <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                LIVE STREAMING
                              </span>
                            </div>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 divide-y divide-stone-200/50">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="pt-3.5 first:pt-0 space-y-1">
                                  <div className="flex justify-between items-baseline">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-extrabold text-stone-850">{comment.author}</span>
                                      <span className="text-[8px] bg-stone-150 text-stone-500 font-black px-1.5 py-0.2 rounded">
                                        {comment.role}
                                      </span>
                                    </div>
                                    <span className="text-[9px] text-stone-400 font-mono font-bold">{comment.date}</span>
                                  </div>
                                  <p className="text-xs text-stone-605 leading-relaxed font-semibold">{comment.content}</p>
                                </div>
                              ))}

                              {post.comments.length === 0 && (
                                <p className="text-xs text-stone-400 text-center py-8">아직 공동의 대화가 없습니다. 첫 대화를 제언해 보십시오!</p>
                              )}
                            </div>

                            {/* 댓글 작성란 양식 */}
                            <form 
                              onSubmit={(e) => handleAddPlazaComment(post.id, e)}
                              className="bg-white border border-stone-200 rounded-xl p-3 space-y-3 shadow-xs"
                            >
                              <div className="flex items-center gap-2">
                                <label className="text-[9px] font-extrabold text-stone-400 uppercase">점주명 / 매장명</label>
                                <input
                                  type="text"
                                  value={newPlazaCommentAuthor}
                                  onChange={(e) => setNewPlazaCommentAuthor(e.target.value)}
                                  placeholder="예: 망원 크로플점주 (미기입시 익명)"
                                  className="w-full text-[10px] font-bold text-stone-800 border-none outline-none p-0 focus:ring-0 placeholder-stone-300"
                                />
                              </div>
                              <div className="relative">
                                <textarea
                                  required
                                  rows={2}
                                  value={newPlazaCommentText}
                                  onChange={(e) => setNewPlazaCommentText(e.target.value)}
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
                        { id: "coop", label: "📦 포장자재 공동구매", desc: "박스/비닐백 도매 합산" },
                        { id: "used", label: "🤝 단기 재고 중고장터", desc: "도구 교환 및 아울렛" },
                        { id: "share", label: "🎁 부재료 소분 무료나눔", desc: "대량 유기농 원재료 소분" },
                        { id: "job", label: "🚨 당일 땜빵 제빵인력", desc: "구인 긴급 조달 땜빵" }
                      ].map((subCat) => (
                        <button
                          key={subCat.id}
                          type="button"
                          onClick={() => setActivePlazaTab(subCat.id as any)}
                          className={`flex-1 min-w-[130px] text-center px-4 py-3 rounded-xl transition-all cursor-pointer ${
                            activePlazaTab === subCat.id
                              ? "bg-white text-[#f97316] font-extrabold shadow-sm text-xs border border-stone-200"
                              : "text-stone-605 hover:bg-white/50 text-xs font-bold border border-transparent"
                          }`}
                        >
                          <p className="font-extrabold">{subCat.label}</p>
                          <p className="text-[9px] text-stone-400 mt-0.5 font-semibold">{subCat.desc}</p>
                        </button>
                      ))}
                    </div>

                    {/* 광장 목록 정보 그리드 */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                      
                      {/* Left Column: 게시글 목록 */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="flex justify-between items-center bg-stone-50 border border-stone-200 p-3 rounded-xl">
                          <span className="text-xs font-extrabold text-stone-600 uppercase tracking-wider">
                            목록 결과 현황 ({plazaPosts.filter(p => p.category === activePlazaTab).length}개 가맹점)
                          </span>
                          <span className="text-[10px] text-[#f97316] font-bold">
                            전국 지점 제휴 우대 정책
                          </span>
                        </div>

                        <div className="space-y-4.5">
                          {plazaPosts.filter(p => p.category === activePlazaTab).map((post) => (
                            <div 
                              key={post.id}
                              onClick={() => setSelectedPlazaPostId(post.id)}
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
                                <span className="text-[10px] text-stone-400 font-mono">{post.date}</span>
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
                                  <span>참여 매장 <strong className="text-stone-850">{post.participantsCount}개</strong></span>
                                  <span className="text-stone-200">|</span>
                                  <span className="text-[#f97316] bg-orange-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 border border-orange-100 text-[10px]">
                                    <MessageSquare className="w-3 h-3" /> 댓글 {post.comments.length}
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
                            공동구매 물량 조율이나 중고 자재의 판매 건, 부재료 무상 나눔 제안, 긴급 당일 일손 보조 충원 요구까지! 상세 양식을 배포하면 전 가맹 채널에 실시간 푸쉬 가이드가 작동합니다.
                          </p>
                        </div>

                        <form onSubmit={handleCreatePlazaPost} className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">상호명 / 점주님 존함</label>
                              <input
                                type="text"
                                required
                                value={newPlazaAuthor}
                                onChange={(e) => setNewPlazaAuthor(e.target.value)}
                                placeholder="예: 상수 베이킹웍스 점주"
                                className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">상업 구역 (시/군)</label>
                              <input
                                type="text"
                                required
                                value={newPlazaLocation}
                                onChange={(e) => setNewPlazaLocation(e.target.value)}
                                placeholder="예: 서울 마포구 상암동"
                                className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">모집 공지글 제목</label>
                            <input
                              type="text"
                              required
                              value={newPlazaTitle}
                              onChange={(e) => setNewPlazaTitle(e.target.value)}
                              placeholder={
                                activePlazaTab === "coop" ? "예: 무지 크라프트 포장백 5만장 대량 도매 공구(45% 다운)" :
                                activePlazaTab === "used" ? "예: 리치몬드 도우쉐이퍼 (15kg용) 중고 인하 판매" :
                                activePlazaTab === "share" ? "예: 가든 허브 건조 분말 (5kg 분량) 무료 소분 나눔합니다" :
                                "예: 이번주 토요일 새벽 단기 제빵 보조 일손 구합니다 (시급 1.3만)"
                              }
                              className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">원부자재 및 긴급 땜빵 설명</label>
                            <textarea
                              required
                              rows={3}
                              value={newPlazaContent}
                              onChange={(e) => setNewPlazaContent(e.target.value)}
                              placeholder="상세한 공구 협량 사항이나 상태 사양, 근무 시각 등 요구 조건을 전달해 주세요."
                              className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white p-3 focus:ring-1 focus:ring-[#f97316] outline-hidden resize-none font-medium"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-800">
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">유지단가 / 시급 제안</label>
                              <input
                                type="text"
                                value={newPlazaPriceInfo}
                                onChange={(e) => setNewPlazaPriceInfo(e.target.value)}
                                placeholder="예: 시급 13,000원 / 박스당 1.2만"
                                className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">목표 물량 / 필요 시각</label>
                              <input
                                type="text"
                                value={newPlazaTargetAmount}
                                onChange={(e) => setNewPlazaTargetAmount(e.target.value)}
                                placeholder="예: 200박스 한도 / 선착순 5점포"
                                className="w-full text-xs rounded-xl border border-stone-700 bg-stone-800 text-white px-3 py-2.5 focus:ring-1 focus:ring-[#f97316] outline-hidden font-medium"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase font-bold text-stone-400 mb-1">작성자 상세 요구 조건 (우대/일정)</label>
                            <input
                              type="text"
                              value={newPlazaUrgentsInfo}
                              onChange={(e) => setNewPlazaUrgentsInfo(e.target.value)}
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
                    const post = plazaPosts.find(p => p.id === selectedPlazaPostId);
                    if (!post) return <p className="text-center">요청글을 찾을 수 없습니다.</p>;
                    
                    return (
                      <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
                        <div className="flex flex-wrap justify-between items-center gap-4 border-b border-stone-100 pb-5">
                          <button
                            type="button"
                            onClick={() => setSelectedPlazaPostId(null)}
                            className="flex items-center gap-1.5 text-xs font-black text-[#f97316] hover:text-orange-650 bg-orange-50 hover:bg-orange-100 px-3.5 py-1.75 rounded-xl transition-all cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" /> 프로젝트 목록으로 가기
                          </button>
                          
                          <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
                            <span>접수 코드: {post.id}</span>
                            <span>|</span>
                            <span className="flex items-center gap-0.5 text-stone-500 font-bold">
                              <MapPin className="w-3.5 h-3.5" /> {post.location}
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
                                <span>의뢰 점주: <strong>{post.author}</strong></span>
                              </div>
                              
                              <p className="text-xs text-stone-605 leading-relaxed font-semibold whitespace-pre-wrap">{post.content}</p>
                              
                              {post.detailInfo && (
                                <div className="pt-3 border-t border-stone-200 space-y-1.5">
                                  <span className="text-[10px] uppercase font-bold text-stone-400 block">원하는 소재 규격 및 특이사항</span>
                                  <p className="text-xs text-stone-600/90 font-medium leading-relaxed bg-white p-3 rounded-xl border border-stone-150">{post.detailInfo}</p>
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
                                  <span className="text-stone-950 font-mono text-sm font-black">{post.urgentsInfo || "협의 조율"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>희망 시공 완료 일수:</span>
                                  <span className="text-stone-900">도면 확정 후 3일 이내 초단기 시공 완결</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>시스템 가이드 적용여부:</span>
                                  <span className="text-emerald-700">EveryBake 프랜즈 표준 매뉴얼 컬러 테마 준수</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column: 공인 인테리어 업체사장님들의 역견적 비딩 스트림 */}
                          <div className="lg:col-span-6 bg-[#f8fafc] border border-blue-105 rounded-2xl p-4 sm:p-6 space-y-5">
                            <div className="border-b border-stone-200 pb-3 flex justify-between items-center">
                              <div>
                                <h3 className="text-xs font-black text-[#1e3a8a] flex items-center gap-1">
                                  🔧 공인 인테리어 도장/도색 전문 비딩 스레드
                                </h3>
                                <p className="text-[9px] text-[#2563eb] font-bold mt-0.5">매칭 성사 시 무상 하자 보증 2년 자동 특약 발송</p>
                              </div>
                              <span className="text-[9px] text-white font-extrabold bg-[#2563eb] px-2 py-0.5 rounded shadow-sm">
                                BIDS ACTIVE ({post.comments.length})
                              </span>
                            </div>

                            {/* 역경매 입찰 카드 형태로 고퀄 가시성 연출 */}
                            <div className="space-y-4 max-h-[430px] overflow-y-auto pr-2 divide-y divide-stone-200/40">
                              {post.comments.map((comment) => {
                                const isProfessional = comment.role.includes("업체") || comment.author.includes("디자인") || comment.author.includes("아트") || comment.author.includes("연우") || comment.author.includes("클래스");
                                return (
                                  <div key={comment.id} className="pt-4 first:pt-0 space-y-2.5">
                                    <div className="flex justify-between items-start">
                                      <div className="space-y-0.5">
                                        <div className="flex items-center gap-1.5">
                                          <span className="text-xs font-black text-stone-900">
                                            {isProfessional ? `🏆 ${comment.author}` : comment.author}
                                          </span>
                                          <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${
                                            isProfessional 
                                              ? "bg-blue-100 text-blue-700 border border-blue-200" 
                                              : "bg-stone-100 text-stone-500"
                                          }`}>
                                            {comment.role}
                                          </span>
                                        </div>
                                        {isProfessional && (
                                          <div className="flex items-center gap-1 text-[9px] text-amber-500 font-extrabold">
                                            <span>⭐⭐⭐⭐⭐</span>
                                            <span className="text-stone-400 font-normal">| 공인 빌더인적</span>
                                          </div>
                                        )}
                                      </div>
                                      <span className="text-[10px] text-stone-400 font-mono">{comment.date}</span>
                                    </div>

                                    {/* 업체 견적 제안 상세 및 컨택 가이드 */}
                                    <div className={`p-4 rounded-xl text-xs font-semibold leading-relaxed border ${
                                      isProfessional 
                                        ? "bg-white border-blue-100 text-stone-700 shadow-xs" 
                                        : "bg-stone-50 border-stone-200 text-stone-605"
                                    }`}>
                                      <p className="whitespace-pre-wrap">{comment.content}</p>
                                      
                                      {isProfessional && (
                                        <div className="mt-3 pt-2.5 border-t border-dashed border-stone-150 flex justify-between items-center text-[10px]">
                                          <span className="text-emerald-700 font-bold block">↳ 24시간 내 무상 가맹 실측 대응</span>
                                          <button 
                                            type="button"
                                            onClick={() => alert("선택업체와 보안 전용 스마트 실시간 상담 창이 활성화되었습니다.")}
                                            className="text-[#2563eb] hover:underline font-black bg-transparent border-none p-0 cursor-pointer flex items-center gap-0.5 text-[10px]"
                                          >
                                            상세 견적 조율 창 개설하기 &rarr;
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}

                              {post.comments.length === 0 && (
                                <p className="text-xs text-stone-400 text-center py-8">접수된 전문 업체의 견적이 없습니다. 우측 폼으로 입찰을 진행해 보십시오.</p>
                              )}
                            </div>

                            {/* 전문업체 견적 입찰 참여 양식 폼 */}
                            <form 
                              onSubmit={(e) => handleAddPlazaComment(post.id, e)}
                              className="bg-white border border-[#2563eb]/20 rounded-xl p-3 space-y-3.5 shadow-sm"
                            >
                              <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 flex items-center gap-1.5">
                                  <label className="text-[8px] font-black text-stone-400 uppercase tracking-tighter shrink-0">입찰 참여자/디자인사</label>
                                  <input
                                    type="text"
                                    value={newPlazaCommentAuthor}
                                    onChange={(e) => setNewPlazaCommentAuthor(e.target.value)}
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
                                  onChange={(e) => setNewPlazaCommentText(e.target.value)}
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
                          실시간 시공의뢰 매칭 현황 ({plazaPosts.filter(p => p.category === "interior").length}개 프로젝트)
                        </span>
                        <span className="text-[10px] text-[#f97316] font-bold">
                          공인 시공 파트너 비딩
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {plazaPosts.filter(p => p.category === "interior").map((post) => (
                          <div 
                            key={post.id}
                            onClick={() => setSelectedPlazaPostId(post.id)}
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
                              <span>작성 점주: <strong className="text-stone-850">{post.author}</strong></span>
                              <span className="text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md flex items-center gap-0.5 text-[10px]">
                                🏆 업체 제안 {post.comments.length}개 비딩중
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
                          쇼케이스 유리가 고장났거나 부분 도장 및 파사드 오렌지 아크릴 컬러 도색, 매장 전선 배관 설비 교체 등 견적 제안이 절실한 모든 보수 기획안을 남기세요.
                        </p>
                      </div>

                      <form onSubmit={handleCreatePlazaPost} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">상호 / 의뢰자</label>
                            <input
                              type="text"
                              required
                              value={newPlazaAuthor}
                              onChange={(e) => setNewPlazaAuthor(e.target.value)}
                              placeholder="예: 영등포 크로플팩토리 점주"
                              className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">시공 지역 (시/구)</label>
                            <input
                              type="text"
                              required
                              value={newPlazaLocation}
                              onChange={(e) => setNewPlazaLocation(e.target.value)}
                              placeholder="예: 서울 영등포구 당산동"
                              className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">시공의뢰 한글 설명 제목</label>
                          <input
                            type="text"
                            required
                            value={newPlazaTitle}
                            onChange={(e) => setNewPlazaTitle(e.target.value)}
                            placeholder="예: [부분 도장] 파사드 하이샷시 프레임을 에브리 오렌지 컬러로 도색 의뢰"
                            className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">필요한 하드웨어 시공/의뢰설명</label>
                          <textarea
                            required
                            rows={3}
                            value={newPlazaContent}
                            onChange={(e) => setNewPlazaContent(e.target.value)}
                            placeholder="노후된 부분을 찍은 사진 규격이나 외부 도색 부위에 대한 구체적인 자재 사양, 혹은 전선 배선 설비 길이 등을 서술하십시오."
                            className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none font-medium"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-1 border-t border-stone-100">
                          <div>
                            <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">책정 예산 선</label>
                            <input
                              type="text"
                              value={newPlazaUrgentsInfo}
                              onChange={(e) => setNewPlazaUrgentsInfo(e.target.value)}
                              placeholder="예: 최대 150만원 이내 조율"
                              className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase font-semibold text-[#f97316] mb-1">희망 시공 완료 일수</label>
                            <input
                              type="text"
                              value={newPlazaTargetAmount}
                              onChange={(e) => setNewPlazaTargetAmount(e.target.value)}
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
                        에베 고민 피드 ({communityPosts.filter(p => p.category === "trouble").length}개)
                      </span>
                      <span className="text-[10px] text-[#f97316] font-bold">
                        동료 점주 상생 피드백 & 본사 안심답변
                      </span>
                    </div>

                    {communityPosts.filter(p => p.category === "trouble").length === 0 ? (
                      <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 flex flex-col items-center justify-center space-y-3">
                        <span className="text-4xl text-stone-300">💬</span>
                        <h4 className="text-stone-800 font-bold">등록된 점주 고민이 아직 없습니다</h4>
                        <p className="text-xs text-stone-400">우측 폼을 이용해 첫 번째로 사장님의 깊은 고민을 동료들과 나누어 보세요!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {communityPosts.filter(p => p.category === "trouble").map((post) => (
                          <div key={post.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-4 text-left">
                            <div className="flex justify-between items-start">
                              <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                                post.status.includes("답변 완료")
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-150"
                                  : "bg-amber-50 text-amber-700 border border-amber-100"
                              }`}>
                                {post.status}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono">{post.date}</span>
                            </div>

                            <div className="space-y-1.5">
                              <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug">{post.title}</h3>
                              <p className="text-xs text-stone-605 leading-relaxed font-semibold whitespace-pre-wrap">{post.content}</p>
                            </div>

                            <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-3 justify-between items-center text-xs">
                              <div className="flex items-center gap-1.5 text-stone-500 font-semibold text-[11px]">
                                <User className="w-3.5 h-3.5 text-stone-400" />
                                <span>{post.author}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-stone-400">
                                  공감수 <strong className="text-stone-800 ml-0.5">{post.votes}개</strong>
                                </span>

                                <button
                                  type="button"
                                  onClick={() => setExpandedCommunityPostId(expandedCommunityPostId === post.id ? null : post.id)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                                    expandedCommunityPostId === post.id
                                      ? "bg-stone-900 border-transparent text-white"
                                      : "bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200"
                                  }`}
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>댓글 {post.comments?.length || 0}</span>
                                </button>
                                
                                <button
                                  type="button"
                                  onClick={() => handleVotePost(post.id)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                                    post.votedByMe
                                      ? "bg-orange-50 text-[#f97316] border border-orange-200"
                                      : "bg-stone-50 hover:bg-orange-50 text-stone-700 border border-stone-200 hover:border-orange-200"
                                  }`}
                                >
                                  <ThumbsUp className={`w-3.5 h-3.5 ${post.votedByMe ? "fill-current" : ""}`} />
                                  <span>{post.votedByMe ? "공감 완료" : "공감"}</span>
                                </button>
                              </div>
                            </div>

                            {/* Collapsible Comments Section */}
                            {expandedCommunityPostId === post.id && (
                              <div className="mt-4 pt-4 border-t border-stone-100 space-y-4 animate-fade-in font-sans">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-extrabold text-stone-900 tracking-tight flex items-center gap-1">
                                    <span>💬</span> <span>사장님 피드백 및 답변 ({post.comments?.length || 0})</span>
                                  </h4>
                                  <span className="text-[10px] text-[#f97316] font-bold">에베 실시간 상생망</span>
                                </div>

                                {(!post.comments || post.comments.length === 0) ? (
                                  <p className="text-[10px] text-stone-400 py-3 text-center bg-stone-50 rounded-xl border border-dashed border-stone-150">
                                    등록된 답변이나 댓글이 없습니다. 첫 마디를 나누어 보세요!
                                  </p>
                                ) : (
                                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 select-none">
                                    {post.comments.map((comment) => (
                                      <div 
                                        key={comment.id} 
                                        className={`p-3 rounded-xl border text-[11px] leading-relaxed text-left ${
                                          comment.author.includes("MD팀") || comment.author.includes("본사") || comment.author.includes("EveryBake")
                                            ? "bg-orange-50/70 border-orange-200 text-stone-900 font-medium font-sans"
                                            : "bg-stone-50 border-stone-150 text-stone-700 font-medium font-sans"
                                        }`}
                                      >
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="font-extrabold flex items-center gap-1">
                                            {(comment.author.includes("MD팀") || comment.author.includes("본사") || comment.author.includes("EveryBake")) && (
                                              <span className="px-1 py-0.25 bg-orange-100 text-[#f97316] text-[8px] font-black rounded border border-orange-200 mr-0.5">본사</span>
                                            )}
                                            {comment.author}
                                          </span>
                                          <span className="text-[9px] text-stone-400 font-mono">{comment.date}</span>
                                        </div>
                                        <p className="whitespace-pre-line leading-relaxed">{comment.content}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Simple Inline Comment Addition Form */}
                                <form
                                  onSubmit={(e) => handleAddCommunityComment(post.id, e)}
                                  className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-left"
                                >
                                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                    <div className="sm:col-span-3">
                                      <input
                                        type="text"
                                        required
                                        value={newCommCommentAuthor}
                                        onChange={(e) => setNewCommCommentAuthor(e.target.value)}
                                        placeholder="매장명 / 존함"
                                        className="w-full text-[10px] rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 focus:ring-1 focus:ring-stone-900 outline-hidden font-bold text-stone-800"
                                      />
                                    </div>
                                    <div className="sm:col-span-9 flex gap-1.5">
                                      <input
                                        type="text"
                                        required
                                        value={newCommCommentText}
                                        onChange={(e) => setNewCommCommentText(e.target.value)}
                                        placeholder="따뜻한 격려나 피드백을 한 줄 나눠 주세요..."
                                        className="flex-1 text-[10px] rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 focus:ring-1 focus:ring-stone-900 outline-hidden font-medium text-stone-800"
                                      />
                                      <button
                                        type="submit"
                                        className="px-3 bg-stone-900 hover:bg-black text-white text-[10px] font-bold rounded-lg cursor-pointer transition-colors"
                                      >
                                        전송
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestions Form (Right Side) */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs font-sans">
                    <h3 className="text-xs font-extrabold text-stone-950 mb-2 flex items-center gap-1.5">
                      💬 에베 상생 고민창구 즉시 접수
                    </h3>
                    <p className="text-stone-450 text-[10px] mb-4 leading-relaxed">
                      매장에 말할 수 없는 실무 노고, 기기 문제, 자재 가격 상승 우려, 알바생 구인 고민 등이 있으신가요? 글을 접수하시면 가맹 동료 점주들의 해결 꿀팁과 에브리베이크 상생 본사 협력팀의 맞춤 지원 답변을 지원해 드립니다.
                    </p>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newCommTitle.trim() || !newCommContent.trim() || !newCommAuthor.trim()) return;
                        
                        const newPost: CommunityPost = {
                          id: `cp-trouble-${Date.now()}`,
                          category: "trouble",
                          title: newCommTitle.trim(),
                          content: newCommContent.trim(),
                          author: newCommAuthor.trim(),
                          date: new Date().toISOString().split("T")[0],
                          votes: 1,
                          status: "검토 진행중",
                          votedByMe: true,
                          comments: [
                            {
                              id: `cm-md-auto-${Date.now()}`,
                              author: "EveryBake 상생MD팀 봇",
                              content: "안녕하세요 사장님, 에브리베이크 상생지원팀입니다. 접수해주신 현장 애로사항을 접수하였습니다. 실시간으로 전국 가맹 점주님들의 고견 및 본사 전문 MD 자문팀의 맞춤 솔루션을 정리하여 24시간 이내 최적의 상생 답변을 전달 드리겠습니다.",
                              date: new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0].slice(0, 5)
                            }
                          ]
                        };

                        setCommunityPosts([newPost, ...communityPosts]);
                        setNewCommTitle("");
                        setNewCommContent("");
                        setNewCommAuthor("");
                      }} 
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">매장명 / 사장님 존함</label>
                        <input
                          type="text"
                          required
                          value={newCommAuthor}
                          onChange={(e) => setNewCommAuthor(e.target.value)}
                          placeholder="예: 목동 빵공방 조대표"
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">고민 제목 (핵심 요약)</label>
                        <input
                          type="text"
                          required
                          value={newCommTitle}
                          onChange={(e) => setNewCommTitle(e.target.value)}
                          placeholder="예: 이번 여름철 생지 발효 시간 조절이 너무 까다롭네요."
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3 py-2.5 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#f97316] mb-1">고민 상세 내용</label>
                        <textarea
                          required
                          rows={4}
                          value={newCommContent}
                          onChange={(e) => setNewCommContent(e.target.value)}
                          placeholder="고민이 되는 원자재 수급, 알바 관리, 유통 기한, 바코드 발주, 새벽 출근 로직 등의 실질적 고민 사항을 상세히 남겨주세요."
                          className="w-full text-xs rounded-xl border border-stone-250 bg-white p-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden resize-none font-medium"
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
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">B2B COFFEE STATION</span>
              <h1 className="text-3xl font-black text-[#1c1917] tracking-tight">상업용 기기 & 로스팅 스페셜티 원두</h1>
              <p className="text-stone-550 text-xs sm:text-sm">
                대한민국 초일류 브루바 및 프랜차이즈에 공급되는 고스펙 머신과 WBC 입상 로스터 원두입니다. B2B 파트너 특별 우대 단가로 제안합니다.
              </p>
            </div>

            {/* Coffee Main Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 pb-4">
              {[
                { id: "machine", label: "상업용 머신/기기" },
                { id: "bean", label: "단가 맞춤형 대용량 원두" },
                { id: "barista", label: "바리스타 필수 소모품" }
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
                  {cat.id === "machine" ? "☕ " : cat.id === "bean" ? "🫘 " : "🛠️ "}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Coffee Sub-category Selection based on main category */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedCoffeeMainCat === "machine" && [
                { id: "all", label: "기기 전체" },
                { id: "espresso", label: "에스프레소 머신" },
                { id: "grinder", label: "그라인더" },
                { id: "brewer", label: "자동 브루잉/기타" }
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

              {selectedCoffeeMainCat === "bean" && [
                { id: "blend", label: "블렌드" },
                { id: "single_origin", label: "싱글 오리진" },
                { id: "decaf", label: "디카페인" }
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

              {selectedCoffeeMainCat === "barista" && [
                { id: "supplies", label: "필터, 탬퍼, 세정제 등" }
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
                <p className="text-xs font-extrabold text-[#f97316] uppercase tracking-wider mb-0.5">선택 분류 전문 정보</p>
                <div className="text-xs font-bold text-stone-750">
                  {selectedCoffeeMainCat === "machine" && "상업용 커피 머신/기기 | 고온 스팀 연속 추출에 최적형 성능 및 전국 긴급 A/S 상시 네트워크 제공"}
                  {selectedCoffeeMainCat === "bean" && "스마트 단가 로스팅 원두 | 유명 생산지 및 WBC 로스팅 스페셜티 단가 압축으로 매장 마진 25% 이상 향상 제공"}
                  {selectedCoffeeMainCat === "barista" && "바리스타 전문 용품 | 추출 채널링 완벽 예방 및 에스프레소 추출구 3역 청결 유지 가성비 묶음 패키지"}
                </div>
              </div>
            </div>

            {/* Coffee Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {COFFEE_DATA.filter(item => {
                const matchesMain = item.mainCategory === selectedCoffeeMainCat;
                const matchesSub = selectedCoffeeSubCat === "all" || item.subCategory === selectedCoffeeSubCat;
                return matchesMain && matchesSub;
              }).map((item) => {
                let typeStyle = "bg-orange-50 text-orange-700 border-orange-105";
                if (item.brandType === "프리미엄 수입") {
                  typeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                } else if (item.brandType === "해외 전문") {
                  typeStyle = "bg-violet-50 text-violet-700 border-violet-100";
                } else if (item.brandType === "국산 명가") {
                  typeStyle = "bg-rose-50 text-rose-750 border-rose-100";
                } else if (item.brandType === "자체제작") {
                  typeStyle = "bg-blue-50 text-blue-700 border-blue-100";
                }

                return (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Visual slot */}
                      <div className="w-full h-36 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100 relative group overflow-hidden">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <span className="absolute bottom-2.5 right-2.5 text-[8.5px] font-black text-stone-400 font-mono bg-white border border-stone-200 px-2 py-0.5 rounded-full">
                          {item.spec}
                        </span>
                      </div>

                      {/* Brand and category info */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold border rounded ${typeStyle}`}>
                          {item.brandType}
                        </span>
                        <span className="text-[10px] font-bold text-stone-400">
                          {item.brand}
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-stone-900 leading-tight mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 leading-relaxed font-semibold">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9.5px] text-stone-400 font-semibold">B2B 공급가</span>
                        <span className="text-sm font-black text-stone-900">
                          ₩ {item.price.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddCustomToCart(
                          item.id, 
                          item.name, 
                          item.price, 
                          "bg-orange-50 text-[#f97316]", 
                          item.brand
                        )}
                        className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-xs hover:shadow-sm"
                      >
                        B2B 담기
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info banner at bottom */}
            <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs uppercase tracking-widest text-[#f97316] font-bold">Coffee Station Support</p>
                <h3 className="text-lg font-extrabold tracking-tight">커피 머신 및 기기 도입 설치 전국 동시 기술지원</h3>
                <p className="text-xs text-stone-450 leading-relaxed font-semibold max-w-xl">
                  에브리베이크는 전담 엔지니어 매칭 서비스를 가동 중입니다. 커피 머신 구매 및 스마트 패키지 맞춤 도입 컨설팅부터 수돗물 연수 필터 설치, 세정 케어까지 One-Stop으로 가이드해 드립니다.
                </p>
              </div>
              <button
                onClick={() => handleNav("inquiry")}
                className="bg-white hover:bg-stone-100 text-stone-950 px-5 py-2.5 rounded-xl text-xs font-black shrink-0 transition-transform active:scale-95 shadow-sm"
              >
                B2B 스페셜티 기기 도입 문의 ➔
              </button>
            </div>

          </div>
        )}

        {currentView === "ingredients" && (
          <div className="max-w-5xl mx-auto px-6 py-8 animate-fade-in">
            <button 
              onClick={() => handleNav("home")}
              className="mb-6 flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> 뒤로가기
            </button>

            <div className="mb-8 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#f97316]">PREMIUM RAW MATERIALS</span>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight">엄선 원부자재 B2B 직공급</h1>
              <p className="text-stone-550 text-sm">
                베이커리 오븐 팽창과 풍미의 기틀이 되는 검증된 고품질 원부자재 라인업입니다. 국내외 일류 브랜드 직항 공동 소싱을 통해 최저 단가 공급을 보증합니다.
              </p>
            </div>

            {/* Sub-category Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-stone-200 pb-4">
              {[
                { id: "powder", label: "가루류 (분말류)", role: "🍞 역할: 빵의 기본 골격과 구조 형성" },
                { id: "liquid", label: "액체류 (수분류)", role: "💧 역할: 반죽의 농도 조절, 가루류의 수화" },
                { id: "fat", label: "유지류", role: "🧈 역할: 빵의 질감을 부드럽게 하고 풍미 향상" },
                { id: "sugar", label: "당류", role: "🍯 역할: 이스트의 발효를 돕고 단맛 부여" },
                { id: "ferment", label: "발효/팽창제", role: "🧪 역할: 반죽을 팽창시키는 핵심 역할" },
                { id: "additive", label: "부재료/첨가물", role: "🧂 역할: 맛의 밸런스(소금) 및 식감/향 추가" }
              ].map((sub) => {
                const isActive = selectedIngredientSubCat === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedIngredientSubCat(sub.id as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#f97316] text-white shadow-xs"
                        : "bg-white hover:bg-stone-105 hover:border-stone-400 text-stone-700 border border-stone-200"
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>

            {/* Role highlight box */}
            <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-4 mb-8 flex items-center gap-3">
              <span className="text-xl">💡</span>
              <div>
                <p className="text-xs font-extrabold text-[#f97316] uppercase tracking-wider mb-0.5">선택 품목의 핵심 기능성</p>
                <p className="text-xs font-bold text-stone-750">
                  {selectedIngredientSubCat === "powder" && "가루류 (분말류) | 밀가루(강력/중력/박력), 빵가루, 호밀가루, 아몬드분말 - 빵의 기본 골격과 구조 형성"}
                  {selectedIngredientSubCat === "liquid" && "액체류 (수분류) | 물, 우유, 생크림, 계란 - 반죽의 농도 조절 및 가루 밀가루 단백질 결합(수화) 보조"}
                  {selectedIngredientSubCat === "fat" && "유지류 | 버터, 마가린, 쇼트닝, 올리브유 - 생지 결 조직 연화, 글루텐 윤활, 볼륨감 및 촉촉한 보존 풍미 강화"}
                  {selectedIngredientSubCat === "sugar" && "당류 | 설탕, 꿀, 물엿, 올리고당 - 발효 균(이스트)의 직접 에너지원 제공, 메일라드 마감 및 완만하고 달달한 보수성 향상"}
                  {selectedIngredientSubCat === "ferment" && "발효/팽창제 | 이스트, 베이킹파우더, 천연발효종 - 가스 배출 및 기포를 형성해 반죽을 폭신하게 팽창시키는 베이커리의 핵심 작용"}
                  {selectedIngredientSubCat === "additive" && "부재료/첨가물 | 소금, 견과류, 건과일, 초콜릿 칩, 바닐라 향 - 소금의 글루텐 탄탄 보강 및 앙코르 풍미, 씹히는 식감/아로마 추가"}
                </p>
              </div>
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {INGREDIENTS_DATA.filter(item => item.subCategory === selectedIngredientSubCat).map((item) => {
                // Determine colors based on brand types
                let typeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100";
                if (item.brandType === "프리미엄 수입") {
                  typeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                } else if (item.brandType === "해외 전문") {
                  typeStyle = "bg-violet-50 text-violet-700 border-violet-100";
                } else if (item.brandType === "국산 명가") {
                  typeStyle = "bg-rose-50 text-rose-750 border-rose-100";
                }

                return (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Visual slot */}
                      <div className="w-full h-36 bg-stone-50 rounded-xl mb-4 flex flex-col items-center justify-center p-4 border border-stone-100 relative group overflow-hidden">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <span className="absolute bottom-2.5 right-2.5 text-[8.5px] font-black text-stone-400 font-mono bg-white border border-stone-200 px-2 py-0.5 rounded-full">
                          {item.spec}
                        </span>
                      </div>

                      {/* Brand and category */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className={`px-2 py-0.5 text-[9px] font-extrabold border rounded ${typeStyle}`}>
                          {item.brandType}
                        </span>
                        <span className="text-[10px] font-bold text-stone-400">
                          {item.brand}
                        </span>
                      </div>

                      <h3 className="text-sm font-extrabold text-stone-900 leading-tight mb-2">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-stone-500 leading-relaxed font-semibold">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9.5px] text-stone-400 font-semibold">B2B 점주 공동 도매가</span>
                        <span className="text-sm font-black text-stone-950">
                          ₩ {item.price.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddCustomToCart(
                          item.id, 
                          item.name, 
                          item.price, 
                          "bg-blue-50 text-blue-700", 
                          item.brand
                        )}
                        className="px-3.5 py-1.5 bg-[#f97316] hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-xs hover:shadow-sm"
                      >
                        B2B 담기
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Helpful Notice at the bottom of ingredients */}
            <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-xs uppercase tracking-widest text-[#f97316] font-bold">Safe & Smart Shipping Delivery</p>
                <h3 className="text-lg font-extrabold tracking-tight">원부자재 및 스마트 도우 통합 온·습도 조절 일체 배송</h3>
                <p className="text-xs text-stone-450 leading-relaxed font-semibold max-w-xl">
                  에브리베이크는 냉동 도우 생지의 냉각 상태뿐만 아니라 원부자재의 고유 품질(수분/산화 방지)까지 완벽 보존 장치된 냉장탑차로 스마트 원스톱 동시 일괄 출고 배송해 드립니다.
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
              <ChevronLeft className="w-4 h-4" /> 가맹 본부 쇼핑으로 돌아가기
            </button>

            {/* 헤더 */}
            <div className="mb-8 space-y-2 animate-fade-in">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f97316] bg-orange-50 border border-orange-100 px-2.5 py-0.5 rounded-full inline-block font-mono">
                Step 1 · B2B Order Details
              </span>
              <h1 className="text-3xl font-black text-stone-900 tracking-tight font-sans">발주 주문 및 정시수급 정보 입력</h1>
              <p className="text-stone-500 text-sm leading-relaxed">
                B2B 우대 자격 계약 조건에 맞춰 가맹 매장명 확인 및 희망 납품일, 긴급 연락처를 최종 검토하여 안전 보증 결제 세션으로 연결합니다.
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
                    가맹 회원 및 자동 연계 매장명
                  </h3>
                  
                  <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-bold text-stone-400 font-mono">AUTOMATED B2B STORE ID</p>
                        <p className="text-lg font-black text-stone-900 mt-1 select-all">
                          {userStoreName || "에브리베이크 마포본점"}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-250 flex items-center justify-center gap-1 shrink-0 self-start sm:self-center">
                        <Check className="w-3.5 h-3.5" /> B2B 가맹 인증 계정 연계
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-450 mt-3.5 leading-relaxed">
                      💡 본 점주명은 로그인 인증 자격을 기준으로 사장님의 고유 바코드 발주 시스템 원장에 무선 연동되어 유통에 즉각 보정 기록되며, B2B 도매 가격 전용 우대 계약 단가를 안전하게 보장합니다.
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
                    콜드체인 냉동 탑차 전문 정시 물류 기사 및 가맹점 관리 대표 MD 조직과 실시간 연락 수급이 가능한 연락처 및 납품 일정을 수정 기입하십시오.
                  </p>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!checkoutContact.trim() || !checkoutDeliveryDate.trim()) {
                      alert("⚠️ 연락처와 희망 납품일을 알맞게 기입해 주십시오.");
                      return;
                    }
                    setCurrentView("pg-payment");
                  }} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1.5 font-sans">
                        <Phone className="w-3.5 h-3.5 text-[#f97316]" /> 사장님 긴급 연락처 (핸드폰 번호)
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutContact}
                        onChange={(e) => setCheckoutContact(e.target.value)}
                        placeholder="예: 010-1234-5678"
                        className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3.5 py-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden tracking-wider font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-stone-550 mb-1.5 flex items-center gap-1.5 font-sans">
                        <Calendar className="w-3.5 h-3.5 text-[#f97316]" /> 수급 지정 희망 납품일
                      </label>
                      <input
                        type="date"
                        required
                        value={checkoutDeliveryDate}
                        onChange={(e) => setCheckoutDeliveryDate(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-250 bg-white px-3.5 py-3 focus:ring-1 focus:ring-stone-950 focus:border-stone-950 outline-hidden font-semibold"
                      />
                      <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
                        • EveryBake 냉동물류 특성상 오전 11시 전 최종 주문 시 2일 이후 도착이 가장 강력히 권장됩니다.
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
                    B2B 원장 발주 품목 체크
                  </span>
                  <span className="text-xs text-[#f97316] font-bold">총 {cartItems.reduce((acc, c) => acc + c.quantity, 0)}개</span>
                </h3>
                <p className="text-[10px] text-stone-400 mb-5 leading-relaxed">
                  선택하신 명인들의 프리미엄 발효 생지 및 음료 가공재 도매 수량을 실시간 확인하십시오.
                </p>

                {/* Selected items list */}
                <div className="divide-y divide-stone-100 max-h-[350px] overflow-y-auto pr-1 mb-6">
                  {cartItems.length === 0 ? (
                    <div className="py-12 text-center text-stone-450 text-xs italic">
                      장바구니에 담긴 계약 물품이 전무합니다. 수령하실 품목을 추가해 주십시오.
                    </div>
                  ) : (
                    cartItems.map(({ item, quantity }) => (
                      <div key={item.id} className="py-3.5 flex items-center justify-between gap-3">
                        <div className="flex gap-3 min-w-0">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center p-1 font-bold text-[10px] leading-tight shrink-0 select-none ${item.iconBg}`}>
                            {item.region}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                            <p className="text-[10px] text-stone-400 mt-0.5">{item.masterName}</p>
                            <p className="text-[10px] text-stone-500 mt-1.2 font-bold bg-stone-100 px-1.5 py-0.2 rounded-md inline-block">
                              발주량: {quantity}개
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-stone-850 block">₩ {(item.price * quantity).toLocaleString()}</span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">단위 ₩ {item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cost calculation summary */}
                <div className="border-t border-stone-150 pt-5 space-y-3.5 text-xs text-stone-600 bg-stone-50/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl mt-auto">
                  <div className="flex justify-between">
                    <span>원재료 단가 소계</span>
                    <span className="font-bold text-stone-900">₩ {checkoutSubtotal.toLocaleString()}</span>
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
                    <span className="text-lg text-[#f97316] font-black">₩ {checkoutTotal.toLocaleString()}</span>
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
                      <p className="text-[9px] uppercase tracking-wider text-emerald-400 font-extrabold font-mono">SSL SECURE 256-BIT</p>
                      <p className="text-xs font-bold text-stone-400">B2B SECURE GATEWAY</p>
                    </div>
                  </div>

                  <div className="border-t border-stone-800/80 pt-6" />

                  {/* Order Subject Summary */}
                  <div>
                    <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider font-mono">ORDER HOST STORE</p>
                    <p className="text-base font-black text-white mt-1 select-all">🏪 {userStoreName || "에브리베이크 마포본점"}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider font-mono">B2B RESERVED PRODUCTS</p>
                    <p className="text-sm font-bold text-stone-205 mt-1.5 leading-relaxed">
                      {cartItems[0]?.item?.name || "B2B 명인 계약 생지"} 
                      {cartItems.length > 1 ? ` 외 ${cartItems.length - 1}종` : ""}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-stone-450 uppercase font-bold tracking-wider font-mono">LOGISTICS DELIVERY DETAIL</p>
                    <p className="text-xs font-bold text-stone-300 mt-2 flex flex-col gap-1.5 list-none leading-relaxed">
                      <span>📅 수급지정일: {checkoutDeliveryDate || "지정일"}</span>
                      <span>📞 점주연락처: {checkoutContact || "010-1234-5678"}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-stone-800/60 mt-6 md:mt-0">
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest font-mono">B2B CONTRACT TOTAL AMOUNT</p>
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
                      <p className="text-sm font-black text-white">B2B 원장 결제 전송 처리 중...</p>
                      <p className="text-[10px] text-stone-450 animate-pulse">
                        {selectedPaymentMethod === "card" && "한국 스마트 신용카드 전송망 보안 승인 대기 중..."}
                        {selectedPaymentMethod === "naverpay" && "네이버 ID B2B 원클릭 동기화 안전성 검증 중..."}
                        {selectedPaymentMethod === "kakaopay" && "카카오페이 다중인증 서버 응답 대기 확인 중..."}
                      </p>
                      <p className="text-[9px] text-[#f97316]/80 font-mono mt-2">Any device syncing with B2B EveryBake recipe clouds...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-black text-white mb-1.5 flex items-center gap-1.5 font-sans">
                        <span>💳 최종 수급 결제 수단 선택</span>
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">SAFETY SECURED</span>
                      </h3>
                      <p className="text-[11px] text-stone-400">자영업 세금 혜택 및 법인카드, 실시간 간편 예약 수납을 정식 지원합니다.</p>
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
                        <span className="text-[10px] tracking-tight font-bold">신용/체크카드</span>
                      </button>

                      {/* Naver Pay */}
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod("naverpay")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          selectedPaymentMethod === "naverpay"
                            ? "bg-[#2db400]/10 text-white border-[#2db400] font-extrabold shadow-[0_2px_12px_rgba(45,180,0,0.2)]"
                            : "bg-stone-850 hover:bg-stone-800 text-stone-350 border-stone-800"
                        }`}
                      >
                        <span className="w-5 h-5 bg-[#2db400] text-white text-[11px] font-black rounded flex items-center justify-center select-none font-sans shadow-inner">N</span>
                        <span className="text-[10px] tracking-tight font-bold">네이버페이</span>
                      </button>

                      {/* Kakao Pay */}
                      <button
                        type="button"
                        onClick={() => setSelectedPaymentMethod("kakaopay")}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                          selectedPaymentMethod === "kakaopay"
                            ? "bg-[#fee500] text-stone-950 border-[#fee500] font-extrabold shadow-[0_2px_12px_rgba(254,229,0,0.2)]"
                            : "bg-stone-850 hover:bg-stone-800 text-stone-350 border-stone-800"
                        }`}
                      >
                        <span className="w-5 h-5 bg-stone-950 text-[#fee500] text-[9px] font-black rounded flex items-center justify-center select-none font-sans font-extrabold">talk</span>
                        <span className="text-[10px] tracking-tight">카카오페이</span>
                      </button>
                    </div>

                    {/* Method Detail View */}
                    <div className="bg-stone-850 rounded-2xl p-5 border border-stone-800 min-h-[220px] flex flex-col justify-center animate-fade-in text-stone-300">
                      
                      {selectedPaymentMethod === "card" && (
                        <div className="space-y-4 text-xs animate-fade-in">
                          <p className="text-[10px] font-black tracking-widest text-[#f97316] uppercase font-mono">💳 CREDIT CARD DETAILS INPUT</p>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1 font-sans">카드 번호</p>
                              <input 
                                type="text" 
                                placeholder="4579 - 1234 - 5678 - 9012" 
                                className="w-full bg-stone-900 border border-stone-750 px-3.5 py-2.5 rounded-xl text-xs outline-none text-white focus:border-[#f97316] transition-colors text-center tracking-widest font-mono"
                              />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1 font-sans">유효 기간 (MM/YY)</p>
                                <input 
                                  type="text" 
                                  placeholder="12 / 29" 
                                  className="w-full bg-stone-900 border border-stone-750 px-3.5 py-2.5 rounded-xl text-xs outline-none text-white focus:border-[#f97316] transition-colors text-center font-mono"
                                />
                              </div>
                              <div>
                                <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold mb-1 font-sans">비밀번호 앞 2자리</p>
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
                            <span className="text-green-400 font-bold">네이버페이 원클릭 간편 연동</span> 이 세팅되었습니다.<br/>
                            인증 검사 완료 시 점주님의 기본 설정 법인/상생 계좌로부터 <br/>
                            계약 발주 영수증이 정식 접수 및 자동 수납 예약 처리됩니다.
                          </div>
                          <span className="text-[9.5px] bg-stone-900 text-stone-400 border border-stone-800 px-3 py-1.5 rounded-lg inline-block font-sans">
                            네이버페이 포인트 2.5% B2B 특별 소득공제 및 세금 혜택 반영
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
                            <p className="font-bold text-yellow-400">카카오페이 B2B 실시간 안전 QR 승인</p>
                            <p className="text-stone-400 leading-relaxed">카카오톡 또는 카카오페이 앱 카메라로 모바일 바코드를 스캔하여 빠른 수납 승인을 발급받으십시오.</p>
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
                            shopName: userStoreName || "에브리베이크 마포본점",
                            contact: checkoutContact || "010-1234-5678",
                            deliveryDate: checkoutDeliveryDate || "지정일",
                            paymentMethod: selectedPaymentMethod === "card" ? "신용/체크카드" : selectedPaymentMethod === "naverpay" ? "네이버페이" : "카카오페이",
                            amount: checkoutTotal,
                            date: new Date().toLocaleString(),
                            items: cartItems.map(item => ({
                              id: item.item.id,
                              name: item.item.name,
                              price: item.item.price,
                              quantity: item.quantity
                            }))
                          };

                          setPaymentSuccessOrder(newOrder);
                          setOrderHistory(prev => [newOrder, ...prev]);
                          
                          // Clear cartItems upon successful purchase to finalize purchase flow
                          setCartItems([]);
                        }, 1800);
                      }}
                      className="col-span-8 py-3 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-black tracking-wider transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md hover:scale-101 active:scale-98"
                    >
                      <Check className="w-4 h-4" />
                      <span>₩ {checkoutTotal.toLocaleString()} B2B 최종 결제 승인</span>
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
          <span className="font-extrabold text-stone-800">KCT Partners Co., Ltd.</span>
          <span className="text-[10px] text-stone-300 font-normal">| 베이킹의 새로운 가치와 상호 성장을 이룹니다.</span>
        </div>
        <div className="text-center md:text-right space-y-0.5 text-[11px]">
          <p>&copy; 2026 KCT Partners Co., Ltd. All rights reserved.</p>
          <p className="text-stone-300">중소 자영업자 1인 카페 상생 우수공로부문 대통령상 표창 출원 완료</p>
        </div>
      </footer>

      {/* 🥐🍞 Cute Floating Bread Scroll-to-Top/Bottom Controller 🥯🥖 */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-center select-none">
        
        {/* Scroll Top Button (Toast Bread design) */}
        <div className="relative group">
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#fffbeb] text-[#78350f] border-2 border-[#854d0e] text-[10px] px-2.5 py-1.5 rounded-xl font-black whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-250 pointer-events-none flex items-center gap-1">
            <span>🧈</span> 버터처럼 사르르 (맨 위로)
          </div>
          
          <motion.button
            whileHover={{ scale: 1.15, y: -4, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-14 h-14 bg-[#fffbeb] hover:bg-[#fef3c7] border-[3.5px] border-[#854d0e] rounded-[18px_18px_12px_12px] shadow-lg hover:shadow-xl flex flex-col items-center justify-center cursor-pointer text-[#78350f] focus:outline-hidden transition-colors"
            id="btn-scroll-top"
          >
            {/* Top bread ears shape highlights */}
            <div className="absolute -top-1 left-2 w-4 h-2.5 bg-[#854d0e]/15 rounded-full" />
            <div className="absolute -top-1 right-2 w-4 h-2.5 bg-[#854d0e]/15 rounded-full" />
            
            <ChevronUp className="w-5 h-5 text-[#854d0e] stroke-[2.5px] group-hover:animate-bounce mb-0.5" />
            <span className="text-[14px]">🍞</span>
            <span className="text-[9px] font-black text-[#b45309] -mt-0.5">TOP</span>
          </motion.button>
        </div>

        {/* Scroll Bottom Button (Tasty Pastry design) */}
        <div className="relative group">
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#fffbeb] text-[#78350f] border-2 border-[#854d0e] text-[10px] px-2.5 py-1.5 rounded-xl font-black whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-250 pointer-events-none flex items-center gap-1">
            <span>🍯</span> 시럽과 함께 쭉 (맨 아래로)
          </div>
          
          <motion.button
            whileHover={{ scale: 1.15, y: 4, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}
            className="w-14 h-14 bg-[#fdf4e3] hover:bg-[#faebcd] border-[3.5px] border-[#854d0e] rounded-[14px_14px_18px_18px] shadow-lg hover:shadow-xl flex flex-col items-center justify-center cursor-pointer text-[#78350f] focus:outline-hidden transition-colors"
            id="btn-scroll-bottom"
          >
            {/* Bottom crust visual details */}
            <div className="absolute -bottom-1 left-3 w-8 h-2 bg-[#854d0e]/10 rounded-full" />
            
            <span className="text-[14px]">🥐</span>
            <ChevronDown className="w-5 h-5 text-[#854d0e] stroke-[2.5px] group-hover:translate-y-0.5 transition-transform mt-0.5" />
            <span className="text-[9px] font-black text-[#b45309] -mt-0.5">BTM</span>
          </motion.button>
        </div>

      </div>

      {/* 🥐 Satisfying Global Click Particle Animation Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100001] overflow-hidden">
        {clickParticles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-bread-pop text-2xl select-none"
            style={{
              left: p.x,
              top: p.y,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* 🥖 Beautiful Page Transition Screen Overlay with Flying Breads */}
      {isTransitioning && (
        <div 
          className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#1c1917] transition-all duration-300 ease-out ${
            transitionFadeState === "in" ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          } overflow-hidden`}
        >
          {/* Background Cute Flying Breads with varying delays and top values */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
            <div className="absolute animate-fly-ltr text-4xl" style={{ "--fly-duration": "3.2s", top: "12vh" } as any}>🍞</div>
            <div className="absolute animate-fly-ltr text-4xl" style={{ "--fly-duration": "4.1s", top: "42vh" } as any}>🥖</div>
            <div className="absolute animate-fly-ltr text-4xl" style={{ "--fly-duration": "3.5s", top: "72vh" } as any}>🥯</div>
            <div className="absolute animate-fly-ltr text-4xl" style={{ "--fly-duration": "4.8s", top: "28vh" } as any}>🥞</div>
            <div className="absolute animate-fly-ltr text-4xl" style={{ "--fly-duration": "3.9s", top: "58vh" } as any}>🧁</div>

            <div className="absolute animate-fly-rtl text-4xl" style={{ "--fly-duration": "3.4s", top: "25vh" } as any}>🥐</div>
            <div className="absolute animate-fly-rtl text-4xl" style={{ "--fly-duration": "4.5s", top: "8vh" } as any}>🥨</div>
            <div className="absolute animate-fly-rtl text-4xl" style={{ "--fly-duration": "3.8s", top: "48vh" } as any}>🍩</div>
            <div className="absolute animate-fly-rtl text-4xl" style={{ "--fly-duration": "4.2s", top: "82vh" } as any}>🍪</div>
            <div className="absolute animate-fly-rtl text-4xl" style={{ "--fly-duration": "5.0s", top: "62vh" } as any}>🥯</div>
          </div>

          {/* Slogan Container and logo representation */}
          <div className="relative z-20 text-center px-6 max-w-sm sm:max-w-md space-y-7">
            <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto flex items-center justify-center mb-4 transition-all drop-shadow-[0_15px_30px_rgba(249,115,22,0.4)] animate-bounce duration-1000">
              <img 
                src={everyBakeLogo} 
                alt="EveryBake Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="space-y-4">
              <span className="text-[#f97316] text-[10px] sm:text-xs uppercase font-black tracking-[0.3em] font-mono block animate-pulse">
                EVERYBAKE PREMIUM TRANSITION
              </span>
              <h2 className="text-white text-2xl sm:text-3xl font-black tracking-tight leading-normal">
                당신의 식탁, 당신의 매 순간
              </h2>
              <div className="h-[2px] w-12 bg-[#f97316] mx-auto rounded-full" />
              <h3 className="text-stone-300 text-lg sm:text-xl font-bold tracking-tight">
                에브리베이크
              </h3>
            </div>
          </div>

          {/* Slogan footnote detail */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[10px] text-stone-500 font-extrabold tracking-widest uppercase font-mono bg-stone-950/20 px-4 py-2 rounded-full border border-stone-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
            온·습도 동시 수송 시스템 가동 중
          </div>
        </div>
      )}

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
