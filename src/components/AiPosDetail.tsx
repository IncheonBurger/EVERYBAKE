import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Download,
  Copy,
  Check,
  Cpu,
  CreditCard,
  Sparkles,
  Layers,
  Smartphone,
  Eye,
  Settings,
  ShieldCheck,
  ArrowRight,
  Play,
  Pause,
  UploadCloud,
  RotateCcw
} from "lucide-react";

interface AiPosDetailProps {
  onBack: () => void;
  onInquiry: () => void;
  // Satisfying general signature parameters for App.tsx compilation safety
  posVoiceTranscript?: string;
  setPosVoiceTranscript?: (val: string) => void;
  posParsedItems?: { name: string; qty: number; price: number }[];
  setPosParsedItems?: (items: { name: string; qty: number; price: number }[]) => void;
  posOvenSignalSent?: boolean;
  setPosOvenSignalSent?: (val: boolean) => void;
  posActiveStatus?: string;
  setPosActiveStatus?: (val: string) => void;
  posWeatherState?: string;
  setPosWeatherState?: (val: string) => void;
  isParsingVoice?: boolean;
  setIsParsingVoice?: (val: boolean) => void;
}

export default function AiPosDetail({ onBack, onInquiry }: AiPosDetailProps) {
  const [showExporter, setShowExporter] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- Interactive Hannet AI Scanner S•CO Simulator ---
  const [selectedBread, setSelectedBread] = useState<string>("sourdough");
  const [scanState, setScanState] = useState<"idle" | "scanning" | "detected" | "paying" | "complete">("idle");
  const [progress, setProgress] = useState(0);

  // Video Player States
  const [videoFileUrl, setVideoFileUrl] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [videoActiveTab, setVideoActiveTab] = useState<"demo" | "upload" | "preview">("preview");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sound generator (Web Audio API)
  const triggerBeep = (freq = 1046.50, duration = 0.15) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.value = freq;
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (_) {}
  };

  useEffect(() => {
    if (selectedBread) {
      setScanState("idle");
      setProgress(0);
      const timer = setTimeout(() => {
        setScanState("scanning");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [selectedBread]);

  useEffect(() => {
    let interval: any;
    if (scanState === "scanning") {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setScanState("detected");
            triggerBeep(1046.50, 0.12); // scanning completed beep
            return 100;
          }
          return prev + 5;
        });
      }, 35);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  const handlePay = () => {
    triggerBeep(880.0, 0.1);
    setScanState("paying");
  };

  const handleSimulatePayment = () => {
    triggerBeep(1318.51, 0.25); // pleasant success chord
    setScanState("complete");
  };

  const handleResetScanner = () => {
    setSelectedBread("sourdough");
    setScanState("idle");
    setProgress(0);
  };

  const mockBreads: Record<string, { name: string; engName: string; price: number; cal: string; weight: string; desc: string; bgClass: string; color: string; ringColor: string; svg: React.ReactNode }> = {
    sourdough: {
      name: "샤워도우 캄파뉴",
      engName: "Sourdough Campagne",
      price: 7800,
      cal: "340 kcal",
      weight: "280g",
      desc: "제과명장 비법 천연 발효종 사워도우에 크랜베리 및 호두가 풍부히 함입되어 겉바속촉 고소함 극대화.",
      bgClass: "from-[#ab723a] to-[#75461c]",
      color: "from-[#e5aa6c] to-[#ab723a]",
      ringColor: "rgba(249,115,22,0.4)",
      svg: (
        <svg className="w-28 h-20 drop-shadow-xl select-none animate-bounce" viewBox="0 0 100 60" fill="none" style={{ animationDuration: '2.5s' }}>
          <ellipse cx="50" cy="32" rx="42" ry="22" fill="url(#sourdoughGrad)" stroke="#5c3818" strokeWidth="1.5" />
          <path d="M15,30 C20,18 80,18 85,30" stroke="#f6ecc4" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3,3" opacity="0.8" />
          <path d="M28,24 Q50,32 72,24" stroke="#4a2c13" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32,18 Q50,25 68,18" stroke="#331e0c" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M35,30 Q50,38 65,30" stroke="#4a2c13" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <radialGradient id="sourdoughGrad" cx="50%" cy="40%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#e5aa6c" />
              <stop offset="60%" stopColor="#ab723a" />
              <stop offset="100%" stopColor="#633c16" />
            </radialGradient>
          </defs>
        </svg>
      )
    },
    croissant: {
      name: "프리미엄 크루아상",
      engName: "Butter Croissant",
      price: 3800,
      cal: "285 kcal",
      weight: "85g",
      desc: "AOP 프랑스 최고급 엘르앤비르 버터의 72레이어 결로 빚어내어 입안 가득 파삭하게 스며드는 버터 풍미.",
      bgClass: "from-[#eaad65] to-[#aa671a]",
      color: "from-[#f3c690] to-[#c5843a]",
      ringColor: "rgba(234,173,101,0.4)",
      svg: (
        <svg className="w-28 h-20 drop-shadow-lg select-none animate-bounce" viewBox="0 0 100 60" fill="none" style={{ animationDuration: '2.5s' }}>
          <path d="M10,32 C20,18 80,18 90,32 C90,32 75,45 50,45 C25,45 10,32 10,32 Z" fill="url(#croissantGrad)" stroke="#8e510c" strokeWidth="1" />
          <path d="M22,34 C30,22 70,22 78,34" stroke="#ce8d48" strokeWidth="7" strokeLinecap="round" />
          <path d="M32,32 C40,19 60,19 68,32" stroke="#eaad65" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M42,30 C45,21 55,21 58,30" stroke="#ffd9aa" strokeWidth="4" strokeLinecap="round" />
          <defs>
            <linearGradient id="croissantGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3c690" />
              <stop offset="50%" stopColor="#c5843a" />
              <stop offset="100%" stopColor="#874e10" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    ciabatta: {
      name: "블랙 올리브 치아바타",
      engName: "Olive Ciabatta",
      price: 4500,
      cal: "245 kcal",
      weight: "160g",
      desc: "엑스트라 버진 올리브유와 블랙 올리브가 촉촉이 어우러져 기분 좋은 부드러움과 단백함을 전하는 웰빙 브레드.",
      bgClass: "from-[#dfcaad] to-[#a28258]",
      color: "from-[#f1e3d0] to-[#cfb390]",
      ringColor: "rgba(162,130,88,0.4)",
      svg: (
        <svg className="w-28 h-20 drop-shadow-lg select-none animate-bounce" viewBox="0 0 100 60" fill="none" style={{ animationDuration: '2.5s' }}>
          <rect x="15" y="16" width="70" height="28" rx="10" fill="url(#ciabattaGrad)" stroke="#7a5d38" strokeWidth="1" />
          <circle cx="30" cy="24" r="3.5" fill="#1c1610" />
          <circle cx="45" cy="32" r="3.2" fill="#1c1610" />
          <circle cx="65" cy="23" r="3.5" fill="#1c1610" />
          <circle cx="55" cy="21" r="2" fill="#1c1610" />
          <circle cx="70" cy="31" r="3.2" fill="#1c1610" />
          <path d="M22,18 C30,17 70,17 78,18" stroke="white" strokeWidth="1" strokeDasharray="2,3" opacity="0.6" />
          <defs>
            <linearGradient id="ciabattaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1e3d0" />
              <stop offset="50%" stopColor="#cfb390" />
              <stop offset="100%" stopColor="#967958" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    pain: {
      name: "뺑 오 쇼콜라",
      engName: "Pain au Chocolat",
      price: 4200,
      cal: "385 kcal",
      weight: "95g",
      desc: "결마다 살아 숨 쉬는 달콤한 벨기에산 프리미엄 리얼 다크 초콜릿 바가 2열로 숨어 매혹적인 조화 유발.",
      bgClass: "from-[#eeaa55] to-[#7f4a0f]",
      color: "from-[#eedaa1] to-[#bf7c37]",
      ringColor: "rgba(127,74,15,0.4)",
      svg: (
        <svg className="w-28 h-20 drop-shadow-lg select-none animate-bounce" viewBox="0 0 100 60" fill="none" style={{ animationDuration: '2.5s' }}>
          <rect x="22" y="14" width="56" height="32" rx="6" fill="url(#painGrad)" stroke="#75430b" strokeWidth="1" />
          <path d="M25,20 Q50,22 75,20" stroke="#b06c27" strokeWidth="3" />
          <path d="M25,28 Q50,30 75,28" stroke="#8c4706" strokeWidth="2.5" />
          <path d="M25,36 Q50,38 75,36" stroke="#c07d34" strokeWidth="2" />
          <rect x="18" y="22" width="6" height="7" rx="1.5" fill="#281404" />
          <rect x="18" y="31" width="6" height="7" rx="1.5" fill="#281404" />
          <rect x="76" y="24" width="6" height="7" rx="1.5" fill="#281404" />
          <defs>
            <linearGradient id="painGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#eedaa1" />
              <stop offset="50%" stopColor="#bf7c37" />
              <stop offset="100%" stopColor="#824c13" />
            </linearGradient>
          </defs>
        </svg>
      )
    }
  };

  // IntersectionObserver for elements with the "reveal" class in React
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // HTML single file code definition matching Premium Gallery & Magazine design exactly
  const singleHtmlCode = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EveryBake - Premium Bakery Platform</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />
    
    <style>
        :root {
            --bg-color: #FAF9F6; /* 고급스러운 웜 오프화이트 */
            --text-main: #1a1a1a;
            --text-muted: #888888;
            --border-color: #e5e5e5;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: var(--bg-color); color: var(--text-main); font-family: 'Pretendard', sans-serif; overflow-x: hidden; }
        
        /* 폰트 유틸리티 */
        .serif { font-family: 'Noto Serif KR', serif; }

        /* --- 1. 투명하고 매끄러운 헤더 --- */
        header {
            position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
            padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center;
            background: transparent; transition: background 0.3s;
        }
        .logo { font-size: 2rem; font-weight: 900; letter-spacing: 1px; cursor: pointer; color: #fff; transition: color 0.3s; }
        .nav-links { display: flex; gap: 3rem; }
        .nav-links a { text-decoration: none; font-weight: 600; color: #fff; font-size: 1rem; transition: color 0.3s; }
        .nav-icons { color: #fff; font-size: 1.2rem; display: flex; gap: 1.5rem; }
        
        /* 스크롤 시 헤더 반전 (흰색 배경) */
        header.scrolled { background: rgba(250, 249, 246, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border-color); }
        header.scrolled .logo, header.scrolled .nav-links a, header.scrolled .nav-icons { color: var(--text-main); }

        /* --- 2. 100vh 풀스크린 메인 슬라이더 (이분할 폐기) --- */
        .hero-slider { position: relative; width: 100%; height: 100vh; overflow: hidden; background: #000; }
        .slide {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            opacity: 0; transition: opacity 1s ease-in-out;
            background-size: cover; background-position: center;
        }
        .slide.active { opacity: 1; z-index: 1; }
        .slide::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); } /* 텍스트 가독성용 딤 처리 */
        
        .slide-content {
            position: absolute; top: 50%; left: 10%; transform: translateY(-50%); z-index: 2; color: #fff;
        }
        .slide-title { font-size: 4.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 1.5rem; }
        .slide-desc { font-size: 1.2rem; font-weight: 300; margin-bottom: 3rem; letter-spacing: 1px; }
        .btn-outline { 
            display: inline-block; padding: 1rem 2.5rem; border: 1px solid #fff; color: #fff; 
            text-decoration: none; font-weight: 400; transition: all 0.3s; 
        }
        .btn-outline:hover { background: #fff; color: #000; }

        /* 슬라이더 컨트롤러 */
        .slider-controls { position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; align-items: center; gap: 2rem; color: #fff; font-size: 1.1rem; }
        .control-btn { cursor: pointer; opacity: 0.7; transition: opacity 0.3s; }
        .control-btn:hover { opacity: 1; }
        .slide-indicator { font-weight: 600; letter-spacing: 2px; }

        /* --- 3. Signature Lineup (갤러리형 추천상품) --- */
        .signature-section { padding: 10rem 5%; background: var(--bg-color); }
        .section-header { margin-bottom: 5rem; text-align: left; }
        .section-subtitle { font-size: 0.9rem; letter-spacing: 3px; color: var(--text-muted); margin-bottom: 1rem; text-transform: uppercase; }
        .section-title { font-size: 3rem; font-weight: 700; color: var(--text-main); }
        
        .gallery-wrap { display: flex; gap: 2rem; overflow-x: auto; padding-bottom: 2rem; scrollbar-width: none; }
        .gallery-wrap::-webkit-scrollbar { display: none; }
        
        .gallery-item { flex: 0 0 400px; cursor: pointer; group; }
        .item-img { width: 100%; height: 500px; background: #e5e5e5; margin-bottom: 1.5rem; overflow: hidden; }
        .item-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .gallery-item:hover .item-img img { transform: scale(1.03); }
        
        .item-info { display: flex; justify-content: space-between; align-items: flex-end; }
        .item-text h4 { font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 600; }
        .item-text p { color: var(--text-muted); font-size: 1rem; }
        .btn-cart { text-decoration: underline; font-weight: 700; font-size: 0.9rem; cursor: pointer; text-underline-offset: 4px; }

        /* --- 4. Magazine / Journal Section (비대칭 레이아웃) --- */
        .journal-section { display: flex; min-height: 80vh; background: #fff; border-top: 1px solid var(--border-color); }
        .journal-img { flex: 1; background: #e5e5e5; background-image: url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop'); background-size: cover; background-position: center; }
        .journal-content { flex: 1; padding: 8rem 5%; display: flex; flex-direction: column; justify-content: center; }
        .journal-content h2 { font-size: 3.5rem; font-weight: 700; line-height: 1.3; margin-bottom: 2rem; }
        .journal-content p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 4rem; max-width: 80%; }
        .btn-dark { display: inline-block; padding: 1rem 3rem; background: var(--text-main); color: #fff; text-decoration: none; width: fit-content; border: 1px solid var(--text-main); transition: all 0.3s; }
        .btn-dark:hover { background: transparent; color: var(--text-main); }
    </style>
</head>
<body>

    <header id="main-header">
        <div class="logo serif">EveryBake</div>
        <nav class="nav-links">
            <a href="#">Store</a>
            <a href="#">Event</a>
            <a href="#">Community</a>
            <a href="#">Partnership</a>
        </nav>
        <div class="nav-icons">
            <span>Log In</span>
            <span>Cart(0)</span>
        </div>
    </header>

    <section class="hero-slider">
        <div class="slide active" style="background-image: url('https://images.unsplash.com/photo-1581336648835-027581179ab8?q=80&w=2070&auto=format&fit=crop');">
            <div class="slide-content">
                <h1 class="slide-title serif">완벽한 굽기의 미학,<br>스마트 디바이스</h1>
                <p class="slide-desc">좁은 매장의 한계를 정복하는 170cm 수직 적층 오븐.</p>
                <a href="#" class="btn-outline">자세히 보기 +</a>
            </div>
        </div>
        <div class="slide" style="background-image: url('https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=2069&auto=format&fit=crop');">
            <div class="slide-content">
                <h1 class="slide-title serif">명장의 숨결이 깃든<br>프리미엄 생지</h1>
                <p class="slide-desc">최고의 재료와 명장의 데이터가 만들어내는 결의 차이.</p>
                <a href="#" class="btn-outline">자세히 보기 +</a>
            </div>
        </div>

        <div class="slider-controls">
            <div class="control-btn" id="prev-btn">〈</div>
            <div class="slide-indicator"><span id="current-slide">1</span> / 2</div>
            <div class="control-btn" id="pause-btn">||</div>
            <div class="control-btn" id="next-btn">〉</div>
        </div>
    </section>

    <section class="signature-section">
        <div class="section-header">
            <p class="section-subtitle">Best Product</p>
            <h2 class="section-title serif">추천상품</h2>
            <p style="color: var(--text-muted); margin-top: 1rem;">지금 가장 사랑받는 인기 상품들을 만나보세요.</p>
        </div>

        <div class="gallery-wrap">
            <div class="gallery-item">
                <div class="item-img"><img src="https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=1914&auto=format&fit=crop" alt="생지"></div>
                <div class="item-info">
                    <div class="item-text">
                        <h4>오리지널 프랑스 크루아상</h4>
                        <p>68,000원</p>
                    </div>
                    <div class="btn-cart">CART</div>
                </div>
            </div>
            <div class="gallery-item">
                <div class="item-img"><img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070&auto=format&fit=crop" alt="생지"></div>
                <div class="item-info">
                    <div class="item-text">
                        <h4>천연 효모 호밀 시골 깜빠뉴</h4>
                        <p>48,000원</p>
                    </div>
                    <div class="btn-cart">CART</div>
                </div>
            </div>
            <div class="gallery-item">
                <div class="item-img"><img src="https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?q=80&w=1974&auto=format&fit=crop" alt="생지"></div>
                <div class="item-info">
                    <div class="item-text">
                        <h4>명장 생지 샘플 패키지</h4>
                        <p>29,900원</p>
                    </div>
                    <div class="btn-cart">CART</div>
                </div>
            </div>
            <div class="gallery-item">
                <div class="item-img"><img src="https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=2070&auto=format&fit=crop" alt="생지"></div>
                <div class="item-info">
                    <div class="item-text">
                        <h4>베이킹 명인 호밀 베이글</h4>
                        <p>49,000원</p>
                    </div>
                    <div class="btn-cart">CART</div>
                </div>
            </div>
        </div>
    </section>

    <section class="journal-section">
        <div class="journal-img"></div>
        <div class="journal-content">
            <p class="section-subtitle">EveryBake Journal</p>
            <h2 class="serif">맛과 정성을 담아<br>빵의 가치를 재해석하다</h2>
            <p>빵을 통해 일상 속 작은 행복과 특별한 순간을 선하는 베이커리. 에브리베이크는 성실한 재료와 정성을 담은 제작 과정으로 최고의 품질을 유지하며, 사람과 사람을 연결하는 커뮤니티로 남겠습니다.</p>
            <a href="#" class="btn-dark">자세히 보기 +</a>
        </div>
    </section>

    <script>
        // 헤더 스크롤 효과
        window.addEventListener('scroll', () => {
            const header = document.getElementById('main-header');
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        // 슬라이더 로직
        const slides = document.querySelectorAll('.slide');
        const currentSlideText = document.getElementById('current-slide');
        let currentSlide = 0;
        let slideInterval;
        let isPlaying = true;

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlideText.innerText = index + 1;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startSlide() { slideInterval = setInterval(nextSlide, 3000); }
        function stopSlide() { clearInterval(slideInterval); }

        document.getElementById('next-btn').addEventListener('click', () => { stopSlide(); nextSlide(); if(isPlaying) startSlide(); });
        document.getElementById('prev-btn').addEventListener('click', () => { stopSlide(); prevSlide(); if(isPlaying) startSlide(); });
        
        const pauseBtn = document.getElementById('pause-btn');
        pauseBtn.addEventListener('click', () => {
            if(isPlaying) { stopSlide(); pauseBtn.innerText = '▶'; }
            else { startSlide(); pauseBtn.innerText = '||'; }
            isPlaying = !isPlaying;
        });

        // 초기 실행
        startSlide();
    </script>
</body>
</html>`;

  // Safe file downloader for the user's convenience
  const downloadSingleHtml = () => {
    const blob = new Blob([singleHtmlCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai_pos_landing.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(singleHtmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans antialiased overflow-x-hidden selection:bg-stone-200 selection:text-black">
      
      {/* 1. Global Navigation sub-header matching Apple UX */}
      <div className="sticky top-[64px] z-40 w-full bg-white/80 backdrop-blur-md border-b border-[#e8e8ed] xs:top-0">
        <div className="max-w-6xl mx-auto px-6 h-14 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="group flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-black transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              스마트 기기
            </button>
            <span className="text-[#e8e8ed]">|</span>
            <span className="text-sm font-bold text-black tracking-tight">
              EveryBake AI POS
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Download and copy HTML block utilities */}
            <button
              onClick={() => setShowExporter(!showExporter)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#1d1d1f] text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              HTML 단일파일 추출
            </button>
            <button
              onClick={onInquiry}
              className="px-4 py-1.5 bg-[#1d1d1f] hover:bg-black text-[11px] font-bold text-white rounded-full transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              도입 상담요청
            </button>
          </div>
        </div>
      </div>
       {/* HTML Exporter Slide Panel */}
      {showExporter && (
        <div id="html-exporter-dock" className="bg-stone-900 border-b border-stone-800 text-stone-300 py-6 px-6 relative animate-fade-in shadow-inner">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#f97316] font-mono tracking-widest">Standalone Page Exporter</span>
              <h4 className="text-base font-bold text-white">단일 HTML 랜딩페이지 다운로드</h4>
              <p className="text-stone-400 text-xs font-light">본 3D 데모 및 인터랙션 요소가 그대로 탑재된 완전 자립식 오프라인 HTML 소스코드를 다운로드하여 즉각 활용하세요.</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                id="btn-copy-code"
                onClick={copyToClipboard}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer border border-stone-700 active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                코드 복사
              </button>
              <button
                id="btn-download-html"
                onClick={downloadSingleHtml}
                className="px-4 py-2 bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                HTML 다운로드
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consolidated High-Fidelity Interactive 3D Scanner Digital Twin */}
      <section className="py-16 bg-[#fafafa] border-b border-stone-200" id="showroom-section">
        <div className="max-w-6xl mx-auto px-6 w-full z-10 relative">
          
          <div className="text-center mb-10 space-y-3">
            <span id="label-showroom-badge" className="text-[10px] font-black tracking-widest text-[#f97316] uppercase bg-[#f97316]/5 px-3.5 py-1.5 rounded-full border border-[#f97316]/10 inline-block font-mono">
              EVERYBAKE SMART DEVICE
            </span>
            <h3 id="heading-showroom-title" className="text-3xl sm:text-4xl font-extrabold text-[#111112] tracking-tight leading-none">
              EveryBake AI POS & 하이브리드 주문형 키오스크 패키지
            </h3>
            <p id="desc-showroom-sub" className="text-stone-500 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
              자동 빵 스캔 기술과 터치패드 오더링 시스템이 하나로 결합된 스마트 결제 디바이스입니다. 손님이 직접 빵을 스캔하고, 음료 주문까지 동시에 처리할 수 있어 점주가 신경 쓸 필요 없는 완벽한 무인 자율 자판 시스템을 구현합니다.
            </p>
          </div>

          {/* Main Product Feature: EveryBake AI POS Set */}
          <div className="mb-14 bg-white border border-stone-200 rounded-[32px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
                  <svg className="w-full h-auto max-w-[345px] drop-shadow-[0_28px_54px_rgba(0,0,0,0.14)] select-none" viewBox="0 0 500 420" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Embedded dynamic styling for smooth hover effects */}
                <style>{`
                  .pos-hover { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
                  .pos-hover:hover { transform: translateY(-4px); filter: drop-shadow(0 32px 64px rgba(0,0,0,0.18)); }
                  .laser-beam { animation: scan-pulse 2.5s infinite ease-in-out; }
                  @keyframes scan-pulse {
                    0%, 100% { opacity: 0.14; }
                    50% { opacity: 0.26; }
                  }
                  .blinking-led { animation: led-blink 1.5s infinite; }
                  @keyframes led-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                  }
                `}</style>

                {/* Ground complex physical drop shadow cascades */}
                <ellipse cx="250" cy="388" rx="220" ry="16" fill="black" opacity="0.05" filter="blur(14px)" />
                <ellipse cx="250" cy="385" rx="180" ry="10" fill="black" opacity="0.07" filter="blur(6px)" />
                <ellipse cx="250" cy="383" rx="120" ry="5" fill="#0f172a" opacity="0.1" filter="blur(2px)" />

                {/* 3D Isometric Base Block - Anodized Aluminum Pedestal Frame */}
                {/* Left side base shadow panel */}
                <path d="M 35 348 L 45 340 L 45 374 L 35 382 Z" fill="#94a3b8" />
                
                {/* Front main metallic surface with perspective bevel */}
                <path d="M 35 348 L 465 348 L 465 372 C 465 378, 455 382, 445 382 L 55 382 C 45 382, 35 378, 35 372 Z" fill="url(#metallic-front)" stroke="#94a3b8" strokeWidth="0.5" />
                {/* Bottom metallic lip/trim */}
                <path d="M 35 370 L 465 370 L 465 376 C 465 380, 455 382, 445 382 L 55 382 C 45 382, 35 380, 35 376 Z" fill="url(#metallic-dark-trim)" />
                
                {/* Top glossy faceplate in isometric perspective */}
                <path d="M 35 348 L 75 315 L 425 315 L 465 348 Z" fill="url(#brushed-metal-top)" stroke="#e2e8f0" strokeWidth="0.5" />
                <path d="M 40 348 L 78 317 L 422 317 L 460 348 Z" fill="url(#brushed-metal-top-in)" opacity="0.9" />

                {/* Ambient Underglow cyan neon reflection */}
                <path d="M 45 352 L 455 352" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
                <path d="M 45 352 L 455 352" stroke="#06b6d4" strokeWidth="9" strokeLinecap="round" opacity="0.25" filter="blur(2px)" />

                {/* High precision laser-etched "Honnet" brand logo on base center display marker */}
                <rect x="210" y="358" width="80" height="15" rx="3.5" fill="#020617" stroke="#334155" strokeWidth="0.5" />
                <text x="250" y="369" fill="#f8fafc" fontSize="10" fontWeight="950" fontFamily="system-ui, sans-serif" letterSpacing="0.9" textAnchor="middle">HONNET</text>
                <circle cx="216" cy="365.5" r="1.5" fill="#10b981" />

                {/* Scales Plate System (Floating double scale sensor layout on left side) */}
                <rect x="52" y="304" width="225" height="15" rx="4.5" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
                {/* Polished metal scale bezel rim */}
                <rect x="55" y="306" width="219" height="7" rx="3" fill="url(#metallic-dark-trim)" />
                {/* Hardened matte glass cover inside plate */}
                <rect x="56" y="305" width="217" height="3" rx="1.5" fill="#334155" />

                {/* Sourdough Bread - EXTREMELY REALISTIC 3D Organic Design */}
                {/* Soft natural contact shadow on the scale platter */}
                <ellipse cx="165" cy="303" rx="68" ry="12" fill="black" opacity="0.32" filter="blur(3.5px)" />
                
                {/* Crust Dome (Multiple rich gradient overlays representing masterfully roasted crust with golden bloom) */}
                <path d="M 92 304 C 84 220, 238 220, 238 304 Z" fill="url(#sourdough-crust-3d)" stroke="#5c2505" strokeWidth="0.75" />
                {/* Golden specular shine layer following the top of the bread */}
                <path d="M 104 290 Q 165 235 226 290" fill="none" stroke="url(#golden-crust-sheen)" strokeWidth="14" strokeLinecap="round" opacity="0.15" filter="blur(1.5px)" />
                
                {/* Flour dusting and visual baking bloom accents */}
                <path d="M 115 264 C 115 244, 215 244, 215 264 Z" fill="#fef3c7" opacity="0.18" filter="blur(3px)" />
                <path d="M 130 252 Q 165 242 195 254" stroke="#fdf2e9" strokeWidth="12" strokeLinecap="round" opacity="0.18" filter="blur(2.5px)" />

                {/* Deeply carved caramelized scoring cuts (grigne cuts) with realistic split gradients */}
                {/* Score Line 1 (Left slice split) */}
                <path d="M 118 284 Q 134 292 148 296" stroke="url(#grigne-cut-depth)" strokeWidth="6" strokeLinecap="round" />
                <path d="M 119 284 Q 134 292 147 296" stroke="#fef3c7" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
                {/* Score Line 2 (Core artistic splits - expanded deep bake profile) */}
                <path d="M 140 262 Q 166 288 186 292" stroke="url(#grigne-cut-depth)" strokeWidth="8" strokeLinecap="round" />
                <path d="M 141 262 Q 166 288 185 292" stroke="#ffedd5" strokeWidth="2.6" strokeLinecap="round" opacity="0.95" />
                {/* Score Line 3 */}
                <path d="M 172 254 Q 196 278 214 282" stroke="url(#grigne-cut-depth)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M 173 254 Q 196 278 213 282" stroke="#fef3c7" strokeWidth="2.0" strokeLinecap="round" opacity="0.9" />
                {/* Score Line 4 */}
                <path d="M 202 258 Q 220 274 231 278" stroke="url(#grigne-cut-depth)" strokeWidth="5.5" strokeLinecap="round" />
                <path d="M 202 258 Q 220 274 231 278" stroke="#fef3c7" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

                {/* Visual texture specs for flour dusting */}
                <circle cx="115" cy="275" r="0.8" fill="#fdf2e9" opacity="0.6" />
                <circle cx="122" cy="265" r="0.6" fill="#fdf2e9" opacity="0.7" />
                <circle cx="155" cy="250" r="1.0" fill="#fdf2e9" opacity="0.8" />
                <circle cx="178" cy="245" r="0.8" fill="#fdf2e9" opacity="0.7" />
                <circle cx="210" cy="265" r="0.6" fill="#fdf2e9" opacity="0.6" />
                <circle cx="225" cy="278" r="0.8" fill="#fdf2e9" opacity="0.5" />

                {/* Visual Vision AI Holographic Target bounding circle and real-time HUD */}
                <ellipse cx="165" cy="272" rx="78" ry="34" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 5" opacity="0.65" />
                <ellipse cx="165" cy="272" rx="82" ry="38" fill="none" stroke="#14b8a6" strokeWidth="0.5" opacity="0.3" />
                
                {/* Advanced Corner Brackets focusing on the bread object */}
                <path d="M 82 272 L 82 255 L 97 255" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.75" />
                <path d="M 248 272 L 248 255 L 233 255" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.75" />
                <path d="M 82 272 L 82 289 L 97 289" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.75" />
                <path d="M 248 272 L 248 289 L 233 289" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.75" />
                
                {/* Floating dynamic telemetry tag */}
                <rect x="131" y="212" width="68" height="13" rx="3" fill="#14b8a6" opacity="0.9" />
                <text x="165" y="221" fill="#ffffff" fontSize="6.5" fontWeight="900" fontFamily="monospace" textAnchor="middle" letterSpacing="0.4">MATCH: 99.8%</text>

                {/* Left Column Structure (Industrial Anodized Space Flight Scanner Column) */}
                {/* Rear support vertical pillar starting from base recess point */}
                <rect x="180" y="60" width="52" height="252" fill="url(#silver-anodized-column)" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* Highlighting 3D specular shine lines on modern metal frame */}
                <rect x="180" y="60" width="6" height="252" fill="#ffffff" opacity="0.45" />
                <rect x="226" y="60" width="6" height="252" fill="#475569" opacity="0.15" />
                
                {/* Top sweeping curve and cantilever projection scanner arm */}
                <path d="M 232 60 L 232 40 C 232 25, 218 14, 198 14 L 102 14 C 90 14, 82 21, 82 31 L 82 52 L 122 52 C 142 52, 180 52, 180 60 Z" fill="url(#silver-anodized-column)" stroke="#94a3b8" strokeWidth="0.5" />
                {/* SPECULAR core glow track */}
                <path d="M 226 60 C 226 50, 222 35, 198 20 L 102 20" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round" />

                {/* Scanner Head Optics Ring System */}
                {/* Glowing turquoise scanner status sapphire ring */}
                <ellipse cx="112" cy="52" rx="16" ry="4" fill="#14b8a6" opacity="0.8" />
                {/* Beautiful deep telephoto premium lens cover */}
                <ellipse cx="112" cy="52" rx="8" ry="2.2" fill="#020617" />
                <circle cx="112" cy="52" r="2" fill="#22d3ee" />
                <circle cx="114" cy="51.2" r="0.75" fill="#ffffff" opacity="0.9" />

                {/* Smart Vision Holographic Laser Conical Beam Cascade overlay & concentric light waves */}
                <path className="laser-beam" d="M112 54 L60 304 L265 304 Z" fill="url(#laser-visual-cone)" opacity="0.15" pointerEvents="none" />
                <ellipse cx="112" cy="110" rx="14" ry="4" fill="none" stroke="#14b8a6" strokeWidth="0.75" opacity="0.25" pointerEvents="none" />
                <ellipse cx="112" cy="180" rx="32" ry="10" fill="none" stroke="#14b8a6" strokeWidth="0.75" opacity="0.2" pointerEvents="none" />
                <ellipse cx="112" cy="250" rx="50" ry="16" fill="none" stroke="#14b8a6" strokeWidth="0.75" opacity="0.15" pointerEvents="none" />

                {/* Right Side - Payment Terminal & Touch Portrait Smart POS Screen */}
                {/* Floating Dual-Hinge Screen mount armature */}
                <path d="M 368 220 L 388 280 L 372 280 Z" fill="url(#brushed-metal-top-in)" stroke="#475569" strokeWidth="0.5" />
                
                {/* Integrated Payment Terminal / NFC Card Reader Dock */}
                <rect x="325" y="235" width="105" height="76" rx="9" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
                <rect x="325" y="235" width="8" height="76" fill="black" opacity="0.04" />
                {/* Dark Payment screen display interface panel */}
                <rect x="336" y="243" width="83" height="42" rx="4.5" fill="#0f172a" />
                
                {/* REAL contactless indicator standard: four multi-colored blinking LEDs (Blue, Yellow, Green, Red) */}
                <g className="blinking-led" opacity="0.95">
                  <circle cx="348" cy="250" r="1.8" fill="#3b82f6" />
                  <circle cx="355" cy="250" r="1.8" fill="#eab308" />
                  <circle cx="362" cy="250" r="1.8" fill="#10b981" />
                  <circle cx="369" cy="250" r="1.8" fill="#ef4444" />
                </g>

                {/* Contactless waves vector indicator */}
                <circle cx="377.5" cy="264" r="7" fill="#1e293b" />
                <path d="M373 264 A4.5 4.5 0 0 1 382 264" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
                <path d="M375 264 A2.5 2.5 0 0 1 380 264" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
                {/* Green ready status LED light blinking */}
                <circle cx="406" cy="274" r="2" fill="#10b981" />
                {/* Smart tactile key guide pad dots / details */}
                <g fill="#94a3b8" opacity="0.75">
                  <circle cx="348" cy="295" r="1.2" />
                  <circle cx="360" cy="295" r="1.2" />
                  <circle cx="372" cy="295" r="1.2" />
                  <circle cx="384" cy="295" r="1.2" />
                  <circle cx="396" cy="295" r="1.2" />
                  <circle cx="408" cy="295" r="1.2" />
                </g>
                <line x1="337" y1="300" x2="418" y2="300" stroke="#ccd1d9" strokeWidth="1.0" />
                
                {/* Credit card slot & BEAUTIFUL INSERTED CREDIT CARD (Navy & Gold Card with smart chip) */}
                <rect x="345" y="291" width="65" height="4.5" rx="1" fill="#020617" />
                {/* Inserted Card body extending out of reader horizontally/downward in perspective */}
                <path d="M 348 293 L 407 293 L 407 318 C 407 320, 404 322, 400 322 L 355 322 C 351 322, 348 320, 348 318 Z" fill="url(#credit-card-gradient)" stroke="#1e293b" strokeWidth="0.5" />
                {/* Shiny Golden Smart Chip */}
                <rect x="354" y="297" width="8" height="6.5" rx="1" fill="#fbbf24" stroke="#d97706" strokeWidth="0.5" />
                {/* Small Visa / Mastercard brand indicator overlay inside card */}
                <circle cx="394" cy="314" r="2.5" fill="#f43f5e" opacity="0.8" />
                <circle cx="398" cy="314" r="2.5" fill="#eab308" opacity="0.8" />
                {/* Silver card name dynamic line */}
                <rect x="354" y="312" width="22" height="1" fill="#f8fafc" opacity="0.6" />

                {/* Portrait Beautiful Premium Borderless POS Touch Panel Screen */}
                {/* High gloss outer bezel chamfer block */}
                <rect x="306" y="26" width="138" height="198" rx="16" fill="#1c1d22" stroke="#475569" strokeWidth="2.5" />
                <rect x="308" y="28" width="134" height="194" rx="14" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />
                {/* True glass glare light sweep overlay */}
                <path d="M309 28 H395 L309 175 Z" fill="white" opacity="0.05" />

                {/* Smart POS Active Retina screen layer (Pure Pitch Black glass panel) */}
                <rect x="313" y="32" width="124" height="186" rx="10" fill="#090a0f" />

                {/* Screen UI - Corporate Brand Identity System */}
                <text x="324" y="47" fill="#f1f5f9" fontSize="8" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.4">EVERYBAKE</text>
                <text x="324" y="53" fill="#10b981" fontSize="4.5" fontWeight="700" fontFamily="monospace" letterSpacing="0.2">VISION SECURE</text>
                
                {/* Retina style system status bar icons (Wifi signal bars, LTE, Battery level, Time) */}
                <g fill="#cbd5e1" opacity="0.8">
                  {/* Digital Clock */}
                  <text x="372" y="46" fill="#cbd5e1" fontSize="5.5" fontWeight="600" fontFamily="monospace" textAnchor="middle">11:32 AM</text>
                  {/* Wifi bars */}
                  <rect x="398" y="42" width="1.5" height="1" rx="0.3" />
                  <rect x="401" y="41" width="1.5" height="2" rx="0.3" />
                  <rect x="404" y="39" width="1.5" height="4" rx="0.3" />
                  {/* Battery level */}
                  <rect x="410" y="39" width="8" height="4" rx="1" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                  <rect x="411" y="40" width="5" height="2" fill="#10b981" />
                  <line x1="419" y1="41" x2="419" y2="42" stroke="#cbd5e1" strokeWidth="0.5" />
                </g>

                <circle cx="428" cy="45" r="2" fill="#10b981" />
                <line x1="313" y1="56" x2="437" y2="56" stroke="#1e293b" strokeWidth="0.75" />

                {/* Screen Main Dashboard - Realtime Scan Analytics */}
                <text x="375" y="71" fill="#38bdf8" fontSize="6.5" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">AI REAL-TIME ANALYSIS</text>
                <text x="375" y="82" fill="#ffffff" fontSize="10.5" fontWeight="1000" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.2">사워도우 브레드</text>
                <text x="375" y="90" fill="#10b981" fontSize="5.5" fontWeight="700" fontFamily="monospace" textAnchor="middle">CONFIDENCE: 99.8% | WEIGHT: 420g</text>

                {/* Scanning zone graphics overlay frame */}
                <rect x="333" y="96" width="84" height="52" rx="5" fill="#0c0e14" stroke="#1e293b" strokeWidth="1" />
                {/* Subtle digital scanning grid pattern */}
                <path d="M 333 110 H 417 M 333 125 H 417 M 333 140 H 417" stroke="#131722" strokeWidth="0.5" strokeDasharray="1 1" />
                
                {/* Miniature bread graphic silhouette */}
                <path d="M348 128 C348 119 354 115 375 115 C396 115 402 119 402 128 C402 130 396 132 375 132 C354 132 348 130 348 128 Z" fill="none" stroke="#22d3ee" strokeWidth="0.75" strokeDasharray="2 1" opacity="0.85" />
                <path d="M356 120 Q361 126 366 127" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.8" />
                <path d="M369 118 Q374 125 379 126" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.8" />
                <path d="M382 120 Q387 126 392 127" stroke="#0ea5e9" strokeWidth="0.5" opacity="0.8" />

                {/* Scanner targeting laser crosshairs corners (Glowing Cyan vectors) */}
                <path d="M336 99 H341" stroke="#22d3ee" strokeWidth="1" />
                <path d="M336 99 V104" stroke="#22d3ee" strokeWidth="1" />
                <path d="M414 99 H409" stroke="#22d3ee" strokeWidth="1" />
                <path d="M414 99 V104" stroke="#22d3ee" strokeWidth="1" />
                <path d="M336 145 H341" stroke="#22d3ee" strokeWidth="1" />
                <path d="M336 145 V140" stroke="#22d3ee" strokeWidth="1" />
                <path d="M414 145 H409" stroke="#22d3ee" strokeWidth="1" />
                <path d="M414 145 V140" stroke="#22d3ee" strokeWidth="1" />

                {/* Live Scanning Scanning Text and indicator */}
                <circle cx="343" cy="138" r="1.5" fill="#10b981" />
                <text x="348" y="140" fill="#10b981" fontSize="4.5" fontWeight="700" fontFamily="monospace">LIVE FEED ACTIVE</text>
                <text x="408" y="140" fill="#64748b" fontSize="4.5" fontWeight="700" fontFamily="monospace" textAnchor="end">0.2s</text>

                {/* Premium "Checkout" Dynamic Button with active match status */}
                <rect x="332" y="156" width="86" height="22" rx="11" fill="url(#btn-blue-gradient)" stroke="#0ea5e9" strokeWidth="0.75" />
                <text x="375" y="170" fill="#ffffff" fontSize="7.5" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.2">결제하기 4,800원</text>

                {/* Footer UI Details on Tablet Screen */}
                <text x="328" y="196" fill="#475569" fontSize="6.5" fontWeight="700" fontFamily="system-ui, sans-serif">도움말</text>
                <text x="422" y="196" fill="#475569" fontSize="6.5" fontWeight="700" fontFamily="system-ui, sans-serif" textAnchor="end">언어 (한국어)</text>

                {/* Precision Rich Gradient Definitions */}
                <defs>
                  {/* Metallic front color stop sequence */}
                  <linearGradient id="metallic-front" x1="35" y1="348" x2="35" y2="382" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="20%" stopColor="#e2e8f0" />
                    <stop offset="60%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>

                  {/* Dark trim bottom shadow edge block */}
                  <linearGradient id="metallic-dark-trim" x1="35" y1="370" x2="35" y2="382" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="100%" stopColor="#334155" />
                  </linearGradient>

                  {/* Top isometric tray light sheen gradients */}
                  <linearGradient id="brushed-metal-top" x1="35" y1="315" x2="465" y2="348" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#f1f5f9" />
                    <stop offset="85%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="brushed-metal-top-in" x1="35" y1="315" x2="35" y2="348" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="30%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>

                  {/* Ultimate 3D Organic Baked Sourdough gradients */}
                  <linearGradient id="sourdough-crust-3d" x1="92" y1="235" x2="238" y2="304" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="20%" stopColor="#d97706" />
                    <stop offset="55%" stopColor="#b45309" />
                    <stop offset="85%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#3b1601" />
                  </linearGradient>
                  <linearGradient id="golden-crust-sheen" x1="104" y1="290" x2="226" y2="290" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
                    <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </linearGradient>

                  {/* Intricate baked cuts (grigne) split highlights */}
                  <linearGradient id="grigne-cut-depth" x1="118" y1="262" x2="231" y2="296" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fdf2e9" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>

                  {/* Anodized aerospace brushed column shading */}
                  <linearGradient id="silver-anodized-column" x1="180" y1="60" x2="232" y2="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f8fafc" />
                    <stop offset="25%" stopColor="#e2e8f0" />
                    <stop offset="65%" stopColor="#cbd5e1" />
                    <stop offset="100%" stopColor="#64748b" />
                  </linearGradient>

                  {/* High visual fidelity scan laser gradient */}
                  <linearGradient id="laser-visual-cone" x1="112" y1="54" x2="112" y2="304" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.85" />
                    <stop offset="40%" stopColor="#14b8a6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Screen blue interactive button gradient */}
                  <linearGradient id="btn-blue-gradient" x1="332" y1="162" x2="418" y2="185" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  
                  {/* Premium credit card gradient */}
                  <linearGradient id="credit-card-gradient" x1="348" y1="293" x2="407" y2="322" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                 </defs>
              </svg>

              <div className="mt-4 text-center">
                <span className="text-[11.5px] font-bold text-stone-800 block">EveryBake AI Terminal System</span>
                <span className="text-[9.5px] text-stone-500 font-medium font-mono">Model S•CO v2.4 (Dual-Twin Plate)</span>
              </div>
            </div>

            {/* Right Column: Product Detail & Pricing (Strictly following user intent) */}
            <div className="flex-1 w-full space-y-8 text-left lg:border-l lg:border-stone-100 lg:pl-10">
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold tracking-widest text-[#f97316] uppercase bg-[#f97316]/5 px-3 py-1 rounded-full border border-[#f97316]/10 inline-block font-mono">
                  Premium Package
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#111112] tracking-tight leading-tight">
                  EveryBake AI POS & 하이브리드 주문형 키오스크 패키지
                </h4>
                <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed font-sans">
                  비전 가이드 센서 기반의 자동 빵 식별 결제뿐만 아니라, 음료 및 사이드 메뉴를 직접 선택할 수 있는 <b>터치패드 오더링 시스템</b>이 결합된 하이브리드 스마트 키오스크입니다. 무인 운영 환경에서도 손님이 스스로 빵 스캔과 커피 주문을 해결하여, 점주가 계산대에 상주하며 신경 쓸 필요가 없는 혁신적인 자동 결제 라이프를 제공합니다.
                </p>
              </div>

              {/* Price Details - 4,500,000 KRW, No rental details */}
              <div className="border-t border-b border-stone-100 py-6 space-y-2">
                <span className="text-stone-400 text-[11px] font-medium block">영구 일시불 판매가</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-black">4,500,000원</span>
                  <span className="text-xs text-stone-500 font-medium">(부가세 포함)</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light font-sans">
                  ※ 렌탈 및 매월 발생하는 정기 결제 비용 없이, 매장에서 하드웨어를 직접 완전 소장하는 패키지 상품입니다.
                </p>
              </div>

              {/* Core Specs */}
              <div className="space-y-4">
                <span className="text-[11px] font-bold text-stone-700 block uppercase tracking-wider font-mono">Core Specs</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2.5 text-xs text-stone-600 font-light">
                    <Check className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-900 block font-sans">온디바이스 비전 AI 카메라</span>
                      Orin Nano 칩셋 가동으로 0.2초 내 빵 규격 자동 탐지
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-stone-600 font-light">
                    <Check className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-900 block font-sans">하이브리드 터치 오더링 UI</span>
                      커피 및 각종 사이드 음료 주문 전용 고감도 10인치 터치패드 탑재
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-stone-600 font-light">
                    <Check className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-900 block font-sans">지능형 듀얼 플레이트 저울</span>
                      무게와 이미지를 교차 실시간 정밀 교정하여 누락 없는 안전 전송 케어
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-stone-600 font-light">
                    <Check className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-900 block font-sans">스마트 통합 페이먼트</span>
                      IC카드 삽입구, MST, NFC 애플/삼성페이 및 QR 일체형 전천후 단말
                    </div>
                  </div>
                  
                  {/* Hybrid ordering concept detail box */}
                  <div className="col-span-1 sm:col-span-2 bg-[#f97316]/5 p-4 rounded-2xl border border-[#f97316]/10 space-y-1 mt-1 text-left">
                    <span className="text-[11px] font-bold text-[#f97316] flex items-center gap-1">
                      💡 점주 관리 제로(Zero-Care) 무인 결제 모델
                    </span>
                    <p className="text-[10.5px] text-stone-600 leading-relaxed font-light">
                      쟁반을 올리면 사워도우, 소금빵 등 매대 빵류는 <b>AI 스캔으로 0.2초 만에 완벽 인식</b>되고, 추가 아메리카노 등은 화면의 <b>터치 키오스크 메뉴판</b>에서 편리하게 선택합니다. 결제 한 번으로 모든 자율 정산이 끝나므로 매장 점주님이 카운터를 종일 지킬 필요가 없습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onInquiry}
                  className="flex-1 py-4 bg-[#1d1d1f] hover:bg-black text-[13px] font-bold text-white rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 font-sans"
                >
                  도입 및 주문 상담요청 <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[13px] font-bold rounded-2xl transition-all active:scale-95 cursor-pointer text-center font-sans"
                >
                  목록으로 돌아가기
                </button>
              </div>
            </div>
          </div>

          {/* Premium Pedestal Case containing Hardware & Software and Card Reader */}
          <div id="3d-pedestal-canvas" className="hidden">
            
            {/* Visual background atmospheric elements */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none" />
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full filter blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-45 -right-45 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch relative z-10">
              
              {/* [LEFT COLUMN: lg:col-span-7] - Real-time Realistically-Modeled Physical Hardware Viewport */}
              <div id="hardware-canvas-container" className="lg:col-span-7 bg-gradient-to-b from-[#e4e9f0] via-[#dde3ee] to-[#ced6e3] rounded-[36px] border border-stone-300/40 p-6 flex flex-col justify-between relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_12px_36px_rgba(0,0,0,0.04)] min-h-[500px] overflow-hidden">
                
                {/* Physical viewport guide lines */}
                <div className="absolute top-4 left-4 text-[9px] font-mono text-stone-500 tracking-widest flex items-center gap-1.5 uppercase">
                  <span className={`inline-block w-2 h-2 rounded-full ${scanState === "scanning" ? "bg-[#f97316] animate-ping" : scanState === "complete" ? "bg-emerald-500" : "bg-[#f97316]"}`}></span>
                  Hannet Dual-Twin Scanner Active
                </div>

                {/* Subtly rotated 3D Device Container using perspective */}
                <div className="flex-1 w-full flex items-center justify-center py-4 scale-[1.03]" style={{ perspective: "1500px" }}>
                  
                  {/* The Realistic 3D Device Frame */}
                  <div 
                    id="3d-hardware-chassis"
                    className="relative w-full max-w-[430px] aspect-[1.15] transition-transform duration-700 ease-out transform"
                    style={{ 
                      transform: "rotateX(14deg) rotateY(-17deg) rotateZ(-1deg)", 
                      transformStyle: "preserve-3d" 
                    }}
                  >
                    {/* Shadow cast on the bottom virtual floor */}
                    <div className="absolute bottom-[-15px] left-[5%] w-[90%] h-[24px] bg-black/35 rounded-full filter blur-xl pointer-events-none" style={{ transform: "rotateX(90deg) translateZ(-40px)" }} />

                    {/* ============================================================== */}
                    {/* 3D SOLID BASE PEDESTAL PLATFORM (Sub-sole Plinth) */}
                    {/* ============================================================== */}
                    {/* Dark heavy steel base bottom profile */}
                    <div className="absolute bottom-[3%] left-[4%] w-[92%] h-[22px] bg-gradient-to-b from-stone-800 via-stone-900 to-black rounded-b-2xl shadow-[0_15px_30px_rgba(0,0,0,0.4)]" style={{ transform: "translateZ(0px)" }} />
                    {/* Brushed aluminium top plate */}
                    <div className="absolute bottom-[6%] left-[2%] w-[96%] h-[14px] bg-gradient-to-b from-stone-100 via-stone-250 to-stone-400 rounded-lg border-t border-white" style={{ transform: "translateZ(5px)" }} />
                    
                    {/* Decorative hardware serial number plate */}
                    <div className="absolute bottom-[8%] left-[8%] px-2 py-0.5 bg-black/80 rounded border border-white/10 text-[6px] font-mono text-stone-400 tracking-wider">
                      S•CO v2.04B
                    </div>

                    {/* ============================================================== */}
                    {/* THICK METALLIC VERTICAL CORE NECK SUPPORT COLUMN */}
                    {/* ============================================================== */}
                    {/* Rising column with chrome highlights */}
                    <div 
                      className="absolute top-[8%] left-[64%] w-[46px] h-[278px] bg-gradient-to-r from-stone-400 via-stone-100 to-stone-300 border-l border-r border-white/20 rounded-t-xl shadow-[6px_10px_25px_rgba(0,0,0,0.15)] z-10 pointer-events-none"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      {/* Integrated LED status strip */}
                      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[4px] h-[165px] rounded-full overflow-hidden bg-stone-900/60 p-[0.5px]">
                        <div 
                          className={`w-full h-full rounded-full transition-all duration-500 ${
                            scanState === "scanning" 
                              ? "bg-[#f97316] shadow-[0_0_12px_#f97316]" 
                              : scanState === "complete" 
                                ? "bg-emerald-500 shadow-[0_0_12px_#10b981]" 
                                : "bg-blue-400 shadow-[0_0_8px_#60a5fa]"
                          }`} 
                        />
                      </div>
                    </div>

                    {/* Vertical column deep shadow spacer behind it */}
                    <div className="absolute top-[12%] left-[68%] w-[16px] h-[260px] bg-black/25 pointer-events-none blur-sm" />

                    {/* ============================================================== */}
                    {/* ELEGANT OVERHEAD CAMERA SUPPORT ARM */}
                    {/* ============================================================== */}
                    {/* Left horizontal projecting arm */}
                    <div 
                      className="absolute top-[6%] left-[24%] w-[180px] h-[32px] bg-gradient-to-b from-stone-50 via-white to-stone-250 border-t border-b border-[#cbd5e1]/40 rounded-l-3xl z-10 pointer-events-none flex items-center justify-start pl-6 shadow-md"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <div className="w-[100px] h-1.5 bg-stone-300/55 rounded-full" />
                    </div>

                    {/* ============================================================== */}
                    {/* SUSPENDED CAMERA SCANNER HEAD POD */}
                    {/* ============================================================== */}
                    {/* Mounted head overlooking plate */}
                    <div 
                      className="absolute top-[12%] left-[26%] w-[50px] h-[20px] bg-gradient-to-b from-stone-400 via-stone-850 to-stone-950 rounded-b-xl z-20 pointer-events-none flex flex-col items-center justify-end shadow-lg"
                      style={{ transform: "translateZ(35px)" }}
                    >
                      {/* Glowing camera lens visual */}
                      <div 
                        className={`w-4 h-1.5 rounded-full mb-1 transition-all duration-500 ${
                          scanState === "scanning" 
                            ? "bg-[#f97316] shadow-[0_0_15px_#f97316]" 
                            : scanState === "complete" 
                              ? "bg-emerald-400 shadow-[0_0_15px_#34d399]" 
                              : "bg-blue-400 shadow-[0_0_10px_#60a5fa]"
                        }`} 
                      />
                    </div>

                    {/* Dynamic Translucent Downward Scan Cone Light */}
                    {scanState === "scanning" && (
                      <div 
                        className="absolute top-[15%] left-[12%] w-[180px] h-[155px] bg-gradient-to-b from-[#f97316]/30 via-[#f97316]/8 to-transparent pointer-events-none z-10 origin-top transform"
                        style={{ 
                          clipPath: "polygon(38% 0%, 54% 0%, 100% 100%, 0% 100%)",
                          transform: "translateZ(20px)"
                        }}
                      />
                    )}

                    {/* ============================================================== */}
                    {/* GLASS SCANNED PLATTER (SENSORY WEIGHING BOARD) */}
                    {/* ============================================================== */}
                    {/* Beautiful 3D angled scales plate */}
                    <div 
                      onClick={() => {
                        if (scanState === "idle") {
                          triggerBeep(880, 0.1);
                          setScanState("scanning");
                        } else if (scanState === "complete") {
                          handleResetScanner();
                        }
                      }}
                      className={`absolute bottom-[11%] left-[3%] w-[235px] h-[175px] bg-gradient-to-b from-[#1b1c1e] to-[#070708] rounded-[28px] border-2 transition-all duration-500 overflow-hidden cursor-pointer shadow-[inset_0_4px_16px_rgba(0,0,0,0.88),0_12px_28px_rgba(0,0,0,0.22)] flex flex-col items-center justify-center group ${
                        scanState === "scanning" 
                          ? "border-[#f97316] ring-4 ring-[#f97316]/20 shadow-[0_0_28px_rgba(249,115,22,0.3)]" 
                          : scanState === "complete"
                            ? "border-emerald-500 shadow-[0_0_22px_rgba(16,185,129,0.2)]"
                            : "border-stone-400/70 hover:border-white"
                      }`}
                      style={{ 
                        transform: "rotateX(62deg) rotateZ(-3deg) translateZ(10px)", 
                        transformStyle: "preserve-3d" 
                      }}
                    >
                      {/* Grid overlay texture */}
                      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
                      
                      {/* Glowing Calibration Crosshairs */}
                      <div className="absolute w-[150px] h-[110px] pointer-events-none">
                        <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-stone-500/80" />
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-stone-500/80" />
                        <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-stone-500/80" />
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-stone-500/80" />
                      </div>

                      {/* Moving laser sweep overlay */}
                      {scanState === "scanning" && (
                        <div className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-[#f97316]/25 to-transparent border-t border-[#f97316]/80 shadow-[0_0_20px_rgba(249,115,22,0.45)] animate-scanner-sweep pointer-events-none z-25" />
                      )}

                      {/* Hardware Branding on the platter glass */}
                      <span className="absolute bottom-3 text-[7.5px] font-black text-stone-500 tracking-widest font-mono uppercase">HANNET DIGITAL COAT V2</span>

                      {/* Display Selected Bread SVG Object */}
                      <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-500 transform ${scanState === "scanning" ? "scale-105" : "scale-100"}`}>
                        {mockBreads[selectedBread].svg}
                        
                        {/* Dynamic contact shading blur under bread */}
                        <div className="w-20 h-2.5 bg-black/75 rounded-full filter blur-md mt-0" />
                      </div>

                      {/* Interactive click hotspot tag */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[7px] font-black tracking-wider text-stone-200 rounded-full flex items-center gap-1 opacity-90 group-hover:bg-black/90 transition-all">
                        <span className={`w-1.5 h-1.5 rounded-full ${scanState === "complete" ? "bg-emerald-400" : "bg-[#f97316] animate-ping"}`} />
                        플레이트 스파크 터치
                      </div>
                    </div>

                    {/* Glass platter edge bevel overlay to give thickness shadow */}
                    <div 
                      className="absolute bottom-[35%] left-[2%] w-[240px] h-[15px] bg-stone-900/90 rounded-b-xl border-t border-stone-600/30 pointer-events-none shadow-lg"
                      style={{ transform: "rotateX(62deg) rotateZ(-3deg) translateZ(8px)" }}
                    />

                    {/* ============================================================== */}
                    {/* INTEGRATED CARD TRANSACTION PAY READ TERMINAL */}
                    {/* ============================================================== */}
                    {/* Dedicated credit card receiver frame on the right pedestal face */}
                    <div 
                      id="card-terminal-chassis"
                      onClick={() => {
                        if (scanState === "paying") {
                          handleSimulatePayment();
                        }
                      }}
                      className={`absolute bottom-[11%] right-[6%] w-[94px] h-[55px] bg-gradient-to-b from-stone-50 via-stone-200 to-stone-300 border border-stone-400 rounded-xl shadow-lg z-20 p-1.5 flex flex-col justify-between transition-all duration-300 group cursor-pointer ${
                        scanState === "paying" 
                          ? "border-[#f97316] ring-2 ring-[#f97316]/30 scale-105 shadow-[0_0_15px_rgba(249,115,22,0.25)]" 
                          : "hover:border-stone-500"
                      }`}
                      style={{ 
                        transform: "rotateX(5deg) rotateY(-5deg) rotateZ(3deg) translateZ(15px)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <div className="flex items-center justify-between text-[6px] font-black text-stone-500 tracking-wider">
                        <span>CARD PAY v2.4</span>
                        <div className="flex gap-0.5">
                          <span className={`w-1 h-1 rounded-full ${scanState === "paying" ? "bg-[#f97316] animate-ping" : scanState === "complete" ? "bg-emerald-500" : "bg-stone-400"}`} />
                          <span className={`w-1 h-1 rounded-full ${scanState === "complete" ? "bg-emerald-500" : "bg-stone-400"}`} />
                        </div>
                      </div>

                      {/* Physical Card insertion slot */}
                      <div className="bg-stone-950 h-3.5 border border-stone-400/40 rounded flex items-center justify-center relative overflow-hidden mt-1 group-hover:bg-black transition-colors">
                        <div className="absolute left-[15%] w-[70%] h-[1px] bg-zinc-800" />
                        <span className="text-[5.5px] text-zinc-400 tracking-tighter col-span-1">CHIP INSERT</span>
                        <div className={`absolute right-1 w-1 h-1 rounded-full ${scanState === "paying" ? "bg-amber-400 animate-pulse" : scanState === "complete" ? "bg-emerald-500" : "opacity-35 bg-emerald-400"}`} />
                      </div>

                      <span className="text-[5px] text-stone-600 font-extrabold text-center font-mono tracking-tighter uppercase mt-1 leading-none">
                        {scanState === "paying" ? "TAP HERE TO PAY" : "S•CO PAY DOCK"}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Additional Hardware design specs footer */}
                <div id="hardware-spec-badge" className="flex justify-between items-center bg-white/60 backdrop-blur-md rounded-2xl border border-stone-200/50 p-3 mt-2 text-[10.5px]">
                  <span className="font-bold text-stone-600 font-mono text-[9px] uppercase tracking-wider">H-DESIGN HW v2.4</span>
                  <div className="flex gap-2">
                    <span className="text-stone-400">외장재:</span>
                    <span className="font-medium text-stone-800">아노다이징 알루미늄</span>
                  </div>
                </div>
              </div>

              {/* [RIGHT COLUMN: lg:col-span-5] - Floating Glassmorphic Touchscreen Tablet (POS Kiosk Software) */}
              <div id="tablet-panel-container" className="lg:col-span-5 flex flex-col justify-between" style={{ perspective: "1000px" }}>
                
                {/* Space-gray modern solid tablet frame */}
                <div 
                  id="tablet-frame"
                  className="w-full bg-[#1c1c1e] rounded-[32px] border-[5px] border-[#2c2c31] p-3 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out transform"
                  style={{ transform: "rotateY(-7deg) rotateX(2deg)", transformStyle: "preserve-3d" }}
                >
                  {/* Gloss shine screen reflection layer overlay */}
                  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none z-30" />

                  {/* Kiosk App Screen Container */}
                  <div className="w-full bg-[#0a0a0c] rounded-[24px] border border-white/5 p-4 flex flex-col justify-between font-sans text-white text-left select-none min-h-[380px] relative z-20 animate-fade-in">
                    
                    {/* Software Top App Navigation Panel bar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-[12px] tracking-widest text-[#f97316] font-mono">Hannet AI</span>
                        <span className="text-[7px] text-stone-500 font-mono bg-white/5 px-1 py-0.5 rounded border border-white/5">v2.0</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[7.5px] text-stone-400 font-bold uppercase tracking-wider font-mono">ONLINE</span>
                      </div>
                    </div>

                    {/* Interactive center stage container of merchant kiosk application */}
                    <div className="flex-1 flex flex-col justify-center items-center py-4 text-center">
                      
                      {scanState === "idle" && (
                        <div className="space-y-4 p-1 animate-fade-in w-full text-center">
                          <h4 className="text-[14px] font-extrabold tracking-tight text-white leading-snug">
                            제품 스캔 대기 상태
                          </h4>
                          <p className="text-[9.5px] text-stone-400 font-light leading-relaxed">
                            스캐너의 하단 플레이트에 신선한 식빵을 올려두거나 아래 버튼을 누르면 인공지능이 무게와 외형을 자동 판독합니다.
                          </p>
                          
                          {/* Central visual placeholder */}
                          <div className="w-16 h-14 border border-dashed border-[#f97316]/40 rounded-xl flex items-center justify-center mx-auto my-1 bg-white/5 relative">
                            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#f97316]" />
                            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#f97316]" />
                            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#f97316]" />
                            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#f97316]" />
                            <span className="text-xl">🍞</span>
                          </div>

                          <button 
                            onClick={() => {
                              triggerBeep(880, 0.1);
                              setScanState("scanning");
                            }}
                            className="w-full py-2.5 bg-[#f97316] hover:bg-[#ea580c] active:scale-95 text-[10px] font-black tracking-wider text-white rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md"
                          >
                            판독 시작하기 <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {scanState === "scanning" && (
                        <div className="space-y-4 animate-pulse w-full text-center">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full border-2 border-emerald-400/20 flex items-center justify-center mx-auto relative overflow-hidden bg-stone-900">
                              <div className="w-full h-0.5 bg-emerald-400 absolute top-1/2 left-0 animate-bounce" />
                              <Cpu className="w-6 h-6 text-emerald-400" />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <p className="text-[12px] font-bold text-emerald-400 tracking-tight">AI 비전 스펙트럼 분석 중...</p>
                            <div className="w-32 h-1.5 bg-stone-800 rounded-full mx-auto overflow-hidden">
                              <div className="h-full bg-[#f97316] transition-all duration-75" style={{ width: `${progress}%` }} />
                            </div>
                          </div>
                          <p className="text-[7.5px] text-stone-500 font-mono tracking-widest uppercase">VISION SYSTEM SECURE SHIFT-KEY</p>
                        </div>
                      )}

                      {scanState === "detected" && (
                        <div className="space-y-3.5 w-full p-0.5 animate-fade-in text-left">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2.5">
                            <div className="flex justify-between items-start">
                              <span className="text-[7.5px] font-black uppercase text-stone-105 bg-emerald-500 px-2 py-0.5 rounded-lg">AI 판독 100% 검출</span>
                              <span className="text-[8px] text-[#f97316] font-mono font-bold">Accuracy 99.8%</span>
                            </div>
                            <div>
                              <h5 className="text-[13px] font-extrabold text-white">{mockBreads[selectedBread].name}</h5>
                              <span className="text-[8.5px] text-stone-400 font-light block">{mockBreads[selectedBread].engName}</span>
                            </div>
                            <div className="flex justify-between text-[10px] border-t border-white/5 pt-2 text-stone-300">
                              <span>중량 / 열량</span>
                              <span className="font-mono font-bold text-white">
                                {mockBreads[selectedBread].weight} ({mockBreads[selectedBread].cal})
                              </span>
                            </div>
                            <div className="flex justify-between text-[12.5px] font-black text-[#f97316] border-t border-white/5 pt-2">
                              <span>최저 단가 정산</span>
                              <span>₩{mockBreads[selectedBread].price.toLocaleString()}</span>
                            </div>
                          </div>

                          <button 
                            onClick={() => {
                              triggerBeep(1046.5, 0.1);
                              handlePay();
                            }}
                            className="w-full py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-[10.5px] font-black tracking-wider text-white rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                          >
                            신용카드 결제 요청 <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {scanState === "paying" && (
                        <div className="space-y-4 text-center p-1 animate-fade-in w-full">
                          <div className="w-14 h-14 rounded-full bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mx-auto">
                            <CreditCard className="w-7 h-7 text-[#f97316] animate-pulse" />
                          </div>
                          <div className="space-y-1.5 leading-relaxed">
                            <p className="text-[12.5px] font-extrabold text-orange-400 tracking-tight">NFC 카드 태그 대기 신호</p>
                            <p className="text-[9px] text-stone-400 font-light leading-relaxed">
                              실물 기기의 우측 하단 <span className="text-[#f97316] font-bold">NFC PAY READER</span> 영역을 클릭하거나 아래 모의 버튼을 클릭해서 결제를 완료하세요.
                            </p>
                          </div>
                          <button 
                            onClick={handleSimulatePayment}
                            className="px-4 py-2 bg-stone-900 border border-white/10 hover:bg-stone-800 text-[9.5px] font-bold text-white rounded-xl transition-all cursor-pointer shadow-md inline-block active:scale-95"
                          >
                            💳 가상 신용카드 태그하기
                          </button>
                        </div>
                      )}

                      {scanState === "complete" && (
                        <div className="space-y-3 p-1 animate-fade-in w-full">
                          <div className="w-11 h-11 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div className="space-y-1 text-center leading-relaxed">
                            <p className="text-[13px] font-black text-emerald-400">결제 완료 & 오븐 연동 성공</p>
                            <p className="text-[8.5px] text-stone-400 font-light leading-relaxed">
                              하단 오븐의 챔버 연동 제어판으로 예열 제어 명령 전산이 송출되었습니다.
                            </p>
                          </div>
                          
                          <div className="bg-stone-900/80 border border-white/5 p-2.5 rounded-xl text-left font-mono">
                            <div className="flex justify-between text-[8px] text-stone-400">
                              <span>IC승인코드:</span>
                              <span className="text-emerald-400 font-bold">KCT7948271</span>
                            </div>
                            <div className="flex justify-between text-[8px] text-stone-400 mt-1">
                              <span>예열 전송:</span>
                              <span className="text-blue-400 font-bold">OVEN_CH1_SYNCED</span>
                            </div>
                            <div className="flex justify-between text-[9.5px] font-black text-white border-t border-white/5 pt-1.5 mt-1.5">
                              <span>실제 총매출:</span>
                              <span>₩{mockBreads[selectedBread].price.toLocaleString()}</span>
                            </div>
                          </div>

                          <button 
                            onClick={handleResetScanner}
                            className="w-full py-2 bg-stone-800 hover:bg-stone-755 text-[9px] font-bold text-stone-200 rounded-xl transition-colors cursor-pointer border border-white/5 active:scale-95"
                          >
                            정정하기 (처음 상태로)
                          </button>
                        </div>
                      )}

                    </div>

                    {/* Kiosk App Screen Footer Info */}
                    <div className="border-t border-white/10 pt-2.5 flex justify-between text-[8.5px] text-stone-500 font-medium">
                      <span>도움말 안내</span>
                      <span>|</span>
                      <span>시각 청각 보조 설정</span>
                    </div>

                  </div>
                </div>

                {/* Additional simulated payment assist trigger bar */}
                {scanState === "paying" && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[10px] text-amber-700 font-light flex items-center justify-between gap-2 shadow-sm mt-3.5 select-none animate-bounce">
                    <span>💡 3D 기기의 검은색 <b>IC 카드 투입구</b>를 마우스로 직접 탭해도 결제 완료 시퀀스로 전환됩니다.</span>
                  </div>
                )}
              </div>

            </div>

            {/* Platform bottom shadow drop edge */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-stone-400/5 to-transparent pointer-events-none" />
          </div>

          {/* Reveal scroll indicator */}
          <div className="flex flex-col items-center justify-center gap-1 text-[9.5px] text-stone-400 font-mono tracking-widest uppercase reveal mt-12">
            <span>SCROLL DOWN TO REVEAL SPECIFICATIONS</span>
            <div className="w-1 h-3 bg-stone-300 rounded-full relative overflow-hidden">
              <div className="w-full h-1/2 bg-stone-400 absolute top-0 rounded-full animate-bounce"></div>
            </div>
          </div>

        </div>
      </section>


      {/* 2.5 AI POS 실물 도입 시연 영상 Section */}
      <section className="py-24 bg-[#fafafa] border-b border-[#e8e8ed]" id="ai-pos-video-section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="text-[10px] font-bold text-[#f97316] uppercase tracking-widest font-mono bg-[#f97316]/5 px-3 py-1 rounded-full border border-[#f97316]/10 inline-block">
              REAL-TIME PRODUCTION PROOF
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight font-sans">
              AI POS 실물 도입 시연 영상
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
              실제 에브리베이커 매장 설치 후 빵 0.2초 식별 분석 및 완벽한 결제 시연 모습을 최고 화질로 감상하세요.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-[32px] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div className="text-left space-y-1">
                <span className="text-xs font-bold text-stone-700 block uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f97316]" /> AI 비전 결제 식별 루프
                </span>
                <p className="text-[11px] text-stone-400 font-light">
                  카메라 센서가 식판 위의 빵 종류와 무게를 완벽하게 연동하는 모습입니다.
                </p>
              </div>
            </div>

            <div className="relative bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-900 aspect-video group">
              <div className="w-full h-full relative">
                <iframe
                  src="https://www.youtube.com/embed/awlHNsoaX94?autoplay=1&mute=1&loop=1&playlist=awlHNsoaX94&controls=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0"
                  title="EveryBake AI POS Real Demonstration"
                  className="w-full h-full border-0 absolute inset-0 opacity-95 text-[#0c0d12] bg-[#0c0d12]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                
                {/* Subtle active state overlays representing real-time telemetry model */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-stone-950/10 pointer-events-none" />
                
                {/* Overlay indicators positioned nicely */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#ffffff]/10 z-10 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black tracking-widest text-[#22d3ee] font-mono">MODEL v2.4 (LIVE ACTIVE)</span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#ffffff]/10 text-[9px] font-bold text-white font-mono z-10 pointer-events-none">
                  SCAN SPEED: 0.2s
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. 360 View Section (정면 / 측면 / 후면) */}
      <section className="py-24 bg-white border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3 reveal">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">360° PRECISION PROFILE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight font-sans">
              모든 각도에서 완벽한 폼팩터.
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
              어떤 각도에서도 타협 없는 일체형 아키텍처.<br />
              인간 공학과 미니멀리즘 디자인이 빚어낸 견고하고 유려한 자태.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* 3.1 FRONT */}
            <div className="bg-white rounded-[28px] border border-[#e8e8ed]/80 p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md hover:border-stone-300 transition-all h-[420px] reveal">
              <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono bg-[#f97316]/5 px-2.5 py-0.5 rounded-full border border-[#f97316]/10">01 / FRONT VIEW</span>
              <div className="flex-1 w-full flex items-center justify-center bg-[#f5f5f7]/60 my-4 rounded-2xl p-4">
                {/* Custom Precise Front view Vector SVG */}
                <svg className="w-auto h-32 text-stone-800 drop-shadow-md select-none" viewBox="0 0 100 100" fill="none">
                  {/* Stand Column front view */}
                  <rect x="42" y="15" width="16" height="70" rx="3" fill="#e5e5eb" stroke="#cbd5e1" strokeWidth="1" />
                  {/* Screen panel centered front projection */}
                  <rect x="52" y="28" width="34" height="42" rx="4" fill="#111111" stroke="#333333" strokeWidth="1.5" />
                  <rect x="55" y="31" width="28" height="30" rx="2" fill="#222222" />
                  <rect x="67" y="63" width="4" height="3" fill="#ff7300" rx="0.5" />
                  {/* Camera arm extending to left */}
                  <path d="M42,20 H18 C18,20 18,25 24,25 H42" fill="#e5e5eb" stroke="#cbd5e1" strokeWidth="0.5" />
                  {/* Scanner Head pod */}
                  <rect x="20" y="25" width="12" height="6" rx="2.5" fill="#333333" />
                  <circle cx="26" cy="30" r="1.5" fill="#10b981" />
                  {/* Platter flat projection */}
                  <rect x="10" y="80" width="80" height="6" rx="2" fill="#333333" />
                  <rect x="15" y="78" width="50" height="2" fill="#1a1a1a" />
                  {/* Sourdough placeholder flat profile */}
                  <path d="M22,78 C25,70 45,70 48,78 Z" fill="#b48350" />
                  {/* Payment Card terminal on right base */}
                  <rect x="68" y="72" width="18" height="10" rx="2.5" fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.5" />
                  <rect x="71" y="74" width="12" height="2" fill="#111" />
                </svg>
              </div>
              <div className="space-y-1 w-full">
                <h4 className="text-xs font-black text-black">정면에 최적화된 작동 중심 구조</h4>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  한 장의 터치 플레이트와 저지상고 디자인. 정교한 대칭 구조가 결제 시 주의 분산을 완벽히 제거합니다.
                </p>
              </div>
            </div>

            {/* 3.2 SIDE */}
            <div className="bg-white rounded-[28px] border border-[#e8e8ed]/80 p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md hover:border-stone-300 transition-all h-[420px] reveal">
              <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono bg-[#f97316]/5 px-2.5 py-0.5 rounded-full border border-[#f97316]/10">02 / SIDE VIEW</span>
              <div className="flex-1 w-full flex items-center justify-center bg-[#f5f5f7]/60 my-4 rounded-2xl p-4">
                {/* Custom Precise Side view Vector SVG */}
                <svg className="w-auto h-32 text-stone-800 drop-shadow-md select-none" viewBox="0 0 100 100" fill="none">
                  {/* L-shaped Profile stand */}
                  <path d="M25,82 H80 V75 H68 L68,26 C68,20 60,14 45,14 H20 V22 H45 C50,22 56,26 56,32 L56,75 H25 Z" fill="#e5e5eb" stroke="#cbd5e1" strokeWidth="1" />
                  {/* Tilted screen (Side edge profile) */}
                  <path d="M68,30 L76,26 L79,56 L71,60 Z" fill="#111111" stroke="#333" strokeWidth="1" />
                  {/* Scanner cylindrical head profile */}
                  <rect x="22" y="22" width="16" height="12" rx="3" fill="#333" />
                  <circle cx="30" cy="32" r="2" fill="#10b981" />
                  {/* Card Terminal side piece */}
                  <path d="M68,64 L78,61 L82,75 L72,75 Z" fill="#cccccc" />
                  {/* Bottom Foot base elements */}
                  <rect x="15" y="80" width="70" height="4" rx="1" fill="#1a1a1a" />
                  {/* Bread profile side view */}
                  <ellipse cx="33" cy="77" rx="12" ry="5" fill="#a26932" />
                </svg>
              </div>
              <div className="space-y-1 w-full">
                <h4 className="text-xs font-black text-black">인체공학적 수직 암 설계</h4>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  가장 편안한 조작 각도인 15도 경사각을 지탱해내는 120도 알루미늄 외팔보 칼럼 프레임.
                </p>
              </div>
            </div>

            {/* 3.3 REAR */}
            <div className="bg-white rounded-[28px] border border-[#e8e8ed]/80 p-6 flex flex-col justify-between items-center shadow-sm hover:shadow-md hover:border-stone-300 transition-all h-[420px] reveal">
              <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono bg-[#f97316]/5 px-2.5 py-0.5 rounded-full border border-[#f97316]/10">03 / REAR VIEW</span>
              <div className="flex-1 w-full flex items-center justify-center bg-[#f5f5f7]/60 my-4 rounded-2xl p-4">
                {/* Custom Precise Rear view Vector SVG */}
                <svg className="w-auto h-32 text-stone-800 drop-shadow-md select-none" viewBox="0 0 100 100" fill="none">
                  {/* Back Column view hiding wires */}
                  <rect x="42" y="15" width="16" height="70" rx="3" fill="#e5e5eb" stroke="#cbd5e1" strokeWidth="1" />
                  {/* Sleek cover plate running vertically */}
                  <rect x="47" y="24" width="6" height="52" rx="1" fill="#cccccc" />
                  {/* Hidden outlet groove and subtle logos */}
                  <circle cx="50" cy="80" r="2.5" fill="#222" />
                  <path d="M48,82 L52,82" stroke="#444" strokeWidth="1" />
                  {/* Back profile of Kiosk screen */}
                  <rect x="14" y="28" width="34" height="42" rx="4" fill="#1c1c1e" stroke="#2c2c2e" strokeWidth="1" />
                  <rect x="22" y="44" width="18" height="12" rx="1" fill="#111111" />
                  {/* Heavy base footer projection */}
                  <rect x="10" y="80" width="80" height="6" rx="2" fill="#333333" />
                </svg>
              </div>
              <div className="space-y-1 w-full">
                <h4 className="text-xs font-black text-black">타협 없는 뒤태 선 정리</h4>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                  후면 내부 공간으로 전원선을 깔끔하게 매립시켜 어느 방향에서나 매장을 단정하게 유지합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section (작동 방식) */}
      <section className="py-24 bg-[#f5f5f7] border-b border-[#e8e8ed]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3 reveal">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-mono">FLOW PIPELINE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight font-sans">
              더 빠르고, 더 스마트한 셀프 계산 경험.
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto font-light leading-relaxed">
              빵을 올리고, 형태를 감지하여 최종 승인까지 물 흐르듯 가동되는 완전 무결 프로세스입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Step 1 */}
            <div className="bg-white rounded-[24px] border border-[#e8e8ed]/80 shadow-xs hover:border-black transition-all p-6 flex flex-col justify-between h-[360px] reveal">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#f97316] font-mono">STEP 01</span>
                <h4 className="text-sm font-bold text-black">01 빵을 올리면</h4>
                <p className="text-[11px] text-[#86868b] leading-relaxed font-light">
                  정밀하게 보정된 비전 감응식 로드셀 저울 플레이트가 중량을 완벽하게 실시간 계측합니다.
                </p>
              </div>
              <div className="w-full h-[150px] relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-stone-100/50 border border-stone-100 flex items-center justify-center p-2">
                <svg className="w-auto h-28 text-stone-700 select-none drop-shadow-md" viewBox="0 0 120 100" fill="none">
                  {/* Base Platform Shadow */}
                  <ellipse cx="60" cy="80" rx="45" ry="10" fill="#000" opacity="0.12" filter="blur(2px)" />
                  {/* 3D Base of the scale plate */}
                  <path d="M20,70 L100,70 L104,78 L16,78 Z" fill="#2c2c2e" />
                  <rect x="18" y="76" width="84" height="6" rx="2" fill="#1c1c1e" />
                  {/* Metal Platter Plate */}
                  <path d="M22,68 L98,68 L101,74 L19,74 Z" fill="url(#scalePlatMetal)" />
                  {/* Rounded Scanning Mat */}
                  <ellipse cx="60" cy="71" rx="35" ry="7" fill="#1c1c1e" stroke="#2c2c2e" strokeWidth="0.5" />
                  {/* Holographic grid scanner overlay */}
                  <ellipse cx="60" cy="71" rx="33" ry="5.5" fill="none" stroke="#f97316" strokeWidth="0.75" strokeDasharray="3,2" opacity="0.6" />
                  {/* Premium sourdough bread with realistic coloring & highlights */}
                  <g transform="translate(60, 52)">
                    {/* Shadow */}
                    <ellipse cx="0" cy="12" rx="24" ry="6" fill="#000" opacity="0.3" filter="blur(1px)" />
                    {/* Yeast Body */}
                    <path d="M-22,8 C-25,-8 25,-8 22,8 Z" fill="url(#sourdoughMain)" stroke="#814e1c" strokeWidth="0.75" />
                    {/* Slashes on the crust */}
                    <path d="M-12,2 C-10,-4 -6,-4 -4,2" stroke="#52300b" strokeWidth="1.25" strokeLinecap="round" />
                    <path d="M-3,3 C-1,-3 3,-3 5,3" stroke="#52300b" strokeWidth="1.25" strokeLinecap="round" />
                    <path d="M6,2 C8,-4 12,-4 14,2" stroke="#52300b" strokeWidth="1.25" strokeLinecap="round" />
                    {/* Flour sprinkle dust effect */}
                    <ellipse cx="-1" cy="0" rx="14" ry="5" fill="#ffffff" opacity="0.25" filter="blur(0.5px)" />
                  </g>
                  {/* Downward weight indicator lines with glowing gradient */}
                  <path d="M60,10 V34 M55,30 L60,35 L65,30" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="60" cy="35" r="1.5" fill="#f97316" className="animate-ping" />
                  <defs>
                    <linearGradient id="scalePlatMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e5e5ea" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <radialGradient id="sourdoughMain" cx="50%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#f5ca93" />
                      <stop offset="70%" stopColor="#cc8943" />
                      <stop offset="100%" stopColor="#8c511a" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
 
            {/* Step 2 */}
            <div className="bg-white rounded-[24px] border border-[#e8e8ed]/80 shadow-xs hover:border-black transition-all p-6 flex flex-col justify-between h-[360px] reveal">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#f97316] font-mono">STEP 02</span>
                <h4 className="text-sm font-bold text-black">02 AI가 인식하고</h4>
                <p className="text-[11px] text-[#86868b] leading-relaxed font-light">
                  고화소 카메라 가이드가 외형 질감 지도를 대조하여 0.2초 이내 품종을 인식합니다.
                </p>
              </div>
              <div className="w-full h-[150px] relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-stone-100/50 border border-stone-100 flex items-center justify-center p-2">
                <svg className="w-auto h-28 text-stone-700 select-none drop-shadow-md" viewBox="0 0 120 100" fill="none">
                  {/* Background scanner cone glow */}
                  <polygon points="60,18 10,75 110,75" fill="url(#scannerConeGlow)" opacity="0.25" />
                  {/* Camera Bar unit */}
                  <rect x="35" y="8" width="50" height="12" rx="4" fill="#1d1d1f" stroke="#333" strokeWidth="1" />
                  <circle cx="60" cy="14" r="3.5" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                  <circle cx="60" cy="14" r="1.5" fill="#22c55e" className="animate-pulse" />
                  <circle cx="45" cy="14" r="1.5" fill="#555" />
                  <circle cx="75" cy="14" r="1.5" fill="#555" />
                  {/* Bread plate */}
                  <ellipse cx="60" cy="76" rx="40" ry="7" fill="#121212" opacity="0.8" />
                  <ellipse cx="60" cy="76" rx="38" ry="5.5" fill="none" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="2,2" />
                  {/* Sourdough under scanning */}
                  <path d="M40,76 C36,62 84,62 80,76 Z" fill="url(#sourdoughStep2)" stroke="#52300b" strokeWidth="0.5" />
                  {/* Biometric overlay point clouds */}
                  <path d="M38,76 Q60,65 82,76" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3,1" className="animate-pulse" />
                  <path d="M44,70 Q60,58 76,70" stroke="#22c55e" strokeWidth="1.25" strokeDasharray="4,2" />
                  <line x1="60" y1="18" x2="60" y2="76" stroke="#22c55e" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.5" />
                  {/* Telemetry points */}
                  <circle cx="48" cy="71" r="1.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.5" />
                  <circle cx="72" cy="71" r="1.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="0.5" />
                  <circle cx="60" cy="64" r="1.5" fill="#22c55e" stroke="#ffffff" strokeWidth="0.5" />
                  {/* Laser scanning line */}
                  <line x1="28" y1="67" x2="92" y2="67" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                  <defs>
                    <linearGradient id="scannerConeGlow" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                    </linearGradient>
                    <radialGradient id="sourdoughStep2" cx="50%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#eedaa1" />
                      <stop offset="100%" stopColor="#a26932" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
 
            {/* Step 3 */}
            <div className="bg-white rounded-[24px] border border-[#e8e8ed]/80 shadow-xs hover:border-black transition-all p-6 flex flex-col justify-between h-[360px] reveal">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#f97316] font-mono">STEP 03</span>
                <h4 className="text-sm font-bold text-black">03 상품과 가격 확인</h4>
                <p className="text-[11px] text-[#86868b] leading-relaxed font-light">
                  정밀 도출된 상품명과 실시간 단가표가 고정된 화면 상에 미려하게 렌더링됩니다.
                </p>
              </div>
              <div className="w-full h-[150px] relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-stone-100/50 border border-stone-100 flex items-center justify-center p-2">
                <svg className="w-auto h-28 text-stone-700 select-none drop-shadow-md" viewBox="0 0 120 100" fill="none">
                  {/* Tablet Outer frame */}
                  <rect x="24" y="8" width="72" height="84" rx="8" fill="#1a1a1c" stroke="#2c2c2e" strokeWidth="2" />
                  {/* Inner screen */}
                  <rect x="28" y="12" width="64" height="76" rx="4" fill="#0d0d0f" />
                  {/* Gloss highlight on glass */}
                  <path d="M28,12 L92,12 L60,88 Z" fill="#ffffff" opacity="0.04" />
                  {/* Branding bar */}
                  <text x="34" y="24" fill="#f97316" fontSize="5.5" fontWeight="900" letterSpacing="0.25" fontFamily="Inter, sans-serif">HANNET AI</text>
                  <circle cx="84" cy="22" r="2.5" fill="#22c55e" />
                  {/* Bread Name */}
                  <text x="34" y="38" fill="#f8fafc" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">샤워도우 캄파뉴</text>
                  <text x="34" y="46" fill="#94a3b8" fontSize="4.5" fontFamily="sans-serif">Sourdough Campagne</text>
                  {/* Horizontal Line */}
                  <line x1="34" y1="52" x2="86" y2="52" stroke="#222" strokeWidth="0.75" />
                  {/* Spec labels and values */}
                  <text x="34" y="60" fill="#64748b" fontSize="4" fontFamily="sans-serif">중량 / 에너지</text>
                  <text x="86" y="60" fill="#cbd5e1" fontSize="4.5" textAnchor="end" fontFamily="sans-serif">280g / 340 kcal</text>
                  {/* Total price bar */}
                  <rect x="32" y="66" width="56" height="16" rx="3" fill="#151518" stroke="#f97316" strokeWidth="0.5" />
                  <text x="38" y="76" fill="#e2e8f0" fontSize="5" fontWeight="bold" fontFamily="sans-serif">TOTAL</text>
                  <text x="82" y="77" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">₩7,800</text>
                  {/* Small OK stamp */}
                  <g transform="translate(82, 33) scale(0.8)">
                    <circle cx="5" cy="5" r="5" fill="#10b981" />
                    <path d="M2.5,5 L4.2,6.5 L7.5,3.2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                </svg>
              </div>
            </div>
 
            {/* Step 4 */}
            <div className="bg-white rounded-[24px] border border-[#e8e8ed]/80 shadow-xs hover:border-black transition-all p-6 flex flex-col justify-between h-[360px] reveal">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-[#f97316] font-mono">STEP 04</span>
                <h4 className="text-sm font-bold text-black">04 결제 완료</h4>
                <p className="text-[11px] text-[#86868b] leading-relaxed font-light">
                  스마트 비접촉 NFC 수취 또는 카드를 안착 슬롯에 투입하여 전산 결제를 완수합니다.
                </p>
              </div>
              <div className="w-full h-[150px] relative overflow-hidden rounded-xl bg-gradient-to-b from-stone-50 to-stone-100/50 border border-stone-100 flex items-center justify-center p-2">
                <svg className="w-auto h-28 text-stone-700 select-none drop-shadow-md" viewBox="0 0 120 100" fill="none">
                  {/* Payment Terminal Base */}
                  <rect x="35" y="15" width="50" height="70" rx="6" fill="url(#step4TerminalGrad)" stroke="#cbd5e1" strokeWidth="1" />
                  {/* Screen overlay of terminal */}
                  <rect x="41" y="22" width="38" height="18" rx="2" fill="#0f172a" />
                  <text x="60" y="30" fill="#22c55e" fontSize="4.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PAYMENT SUCCESS</text>
                  <text x="60" y="36" fill="#94a3b8" fontSize="3" textAnchor="middle" fontFamily="sans-serif">₩7,800</text>
                  {/* Glowing NFC Indicators */}
                  <path d="M48,52 A5,5 0 0,1 48,62" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
                  <path d="M52,54 A2,2 0 0,1 52,60" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="56" cy="57" r="1" fill="#22c55e" />
                  {/* Credit Card inserting/tagged */}
                  <g transform="translate(62, 50)">
                    {/* Glowing Credit Card */}
                    <rect x="0" y="0" width="20" height="14" rx="2" fill="url(#step4CardGrad)" stroke="#1e3a8a" strokeWidth="0.5" />
                    {/* Gold Microchip */}
                    <rect x="3" y="3" width="4" height="3" rx="0.5" fill="#f59e0b" />
                    {/* Matte stripe */}
                    <rect x="0" y="9" width="20" height="1.5" fill="#000" opacity="0.4" />
                    {/* Metallic logo mark */}
                    <circle cx="15" cy="11" r="1.5" fill="#ef4444" />
                    <circle cx="17" cy="11" r="1.5" fill="#eab308" opacity="0.8" />
                  </g>
                  {/* Celebration stars */}
                  <path d="M20,25 L21.5,27 L23.5,27.5 L21.5,28 L20,30 L18.5,28 L16.5,27.5 L18.5,27 Z" fill="#fbbf24" opacity="0.9" />
                  <path d="M100,55 L101.5,57 L103.5,57.5 L101.5,58 L100,60 L98.5,58 L96.5,57.5 L98.5,57 Z" fill="#fbbf24" opacity="0.9" />
                  <defs>
                    <linearGradient id="step4TerminalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                    <linearGradient id="step4CardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Hybrid Kiosk Showcase Section (하이브리드 주문형 키오스크 대형 쇼케이스) */}
      <section className="py-24 bg-white text-stone-900 border-b border-stone-200 relative overflow-hidden">
        {/* Subtle grid background for light canvas */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6 text-left reveal">
              <span className="text-[10px] font-black text-[#f97316] uppercase tracking-widest font-mono bg-[#f97316]/10 px-2.5 py-1 rounded-md border border-[#f97316]/20 inline-block">
                HYBRID SELF-ORDERING & SCAN
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-stone-900">
                빵 스캔과 커피 주문을 하나로.<br/>
                <span className="text-[#f97316]">완벽한 하이브리드 키오스크</span>
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                단순히 빵을 인식하는 것에 그치지 않습니다. 고객이 쟁반을 올려 빵을 초고속 자동 인식하는 동시에, 내장된 고선명 대형 터치 스크린 메뉴판을 통해 음료나 각종 부자재를 직접 오더링하는 진정한 하이브리드 자율 결제를 실현합니다.
              </p>
              
              <div className="space-y-5 pt-2 border-t border-stone-200">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97316] to-amber-500 flex items-center justify-center shrink-0 shadow-lg text-white font-bold text-lg">
                    🥤
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-stone-900">자율 터치패드 오더링 (Coffee & Beverage)</h5>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                      아메리카노, 에이드, 라떼 등 추가 가공이 필요하거나 쇼케이스 외부의 음료 상품들을 고객이 직관적인 터치 조작으로 셀프 즉석 추가할 수 있습니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97316] to-amber-500 flex items-center justify-center shrink-0 shadow-lg text-white font-bold text-lg">
                    🤖
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-stone-900">0.2초 AI 실시간 식판 스캐닝</h5>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                      바쁜 출근 시간이나 몰리는 피크 타임에도 여러 종류의 단과자빵이나 베이글을 가볍게 트레이에 올려만 주면 비전 인공지능이 일괄적으로 즉시 품목을 완성합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f97316] to-amber-500 flex items-center justify-center shrink-0 shadow-lg text-white font-bold text-lg">
                    🏪
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-stone-900">매장 무인화 완료 (Zero-Care Autonomous Shop)</h5>
                    <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                      손님이 스스로 빵 스캔과 음료 주문을 원스톱으로 처리하므로 카운터를 지키던 직원이 제조나 제품 진열에 더 많은 시간을 할애하거나 아예 무인으로 24시간 안심 운영할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration: Gorgeous Simulated Hybrid POS Terminal */}
            <div className="lg:col-span-7 bg-[#0c0d12] rounded-[32px] p-6 border border-stone-800 shadow-2xl relative overflow-hidden flex flex-col justify-between h-auto sm:h-[520px] reveal">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full filter blur-[80px] pointer-events-none" />
              
              {/* Simulator Header */}
              <div className="flex justify-between items-center pb-4 border-b border-stone-800 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest text-[#22d3ee] font-mono">HYBRID POS ACTIVE</span>
                </div>
                <span className="text-[9px] font-bold text-stone-500 font-mono">STANDBY / NO ATTENDANT REQUIRED</span>
              </div>

              {/* Layout Mockup of Screen */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch flex-1">
                {/* Simulated POS Screen (Left inside simulator screen) */}
                <div className="md:col-span-7 bg-[#121214] rounded-2xl border border-stone-800 p-4 flex flex-col justify-between text-left relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black text-[#f97316] tracking-wider uppercase font-mono">TOUCH ORDER KIOSK</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">자율 정산 모드</span>
                    </div>

                    {/* Interactive Selection Menu Mockup */}
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-bold text-stone-400 block">🥤 추천 오더링 메뉴 (터치하여 즉시 추가)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-stone-900 p-2 rounded-lg border border-[#f97316]/40 cursor-pointer transition-all flex flex-col justify-between h-18 text-left relative">
                          <span className="text-[10px] font-bold text-stone-200">아이스 아메리카노</span>
                          <div className="flex justify-between items-end">
                            <span className="text-[8px] text-stone-500 font-light">Premium Arabica</span>
                            <span className="text-[10px] font-bold text-amber-400">+3,500원</span>
                          </div>
                          {/* Checked indicator */}
                          <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[#f97316] flex items-center justify-center text-[7px] font-black text-white">✓</div>
                        </div>
                        <div className="bg-stone-900/50 p-2 rounded-lg border border-stone-800 cursor-pointer transition-all flex flex-col justify-between h-18 text-left">
                          <span className="text-[10px] font-bold text-stone-300">리얼 바닐라 라떼</span>
                          <div className="flex justify-between items-end">
                            <span className="text-[8px] text-stone-500 font-light">Organic Milk</span>
                            <span className="text-[10px] font-bold text-stone-400">4,200원</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Receipt Items list with mix of scan and touch order */}
                    <div className="space-y-2 pt-2 border-t border-stone-850">
                      <span className="text-[9px] font-bold text-stone-400 block">🛒 결제 장바구니 내역</span>
                      
                      <div className="space-y-1.5 max-h-28 overflow-y-auto font-mono text-[9px]">
                        {/* Scanned bread */}
                        <div className="flex justify-between items-center text-stone-300 bg-stone-900/40 px-2 py-1 rounded">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-sans">AI 스캔</span>
                            <span>소금 버터롤 (1개)</span>
                          </div>
                          <span className="font-bold text-stone-100">2,800원</span>
                        </div>
                        {/* Scanned bread */}
                        <div className="flex justify-between items-center text-stone-300 bg-stone-900/40 px-2 py-1 rounded">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-sans">AI 스캔</span>
                            <span>깜파뉴 오 쇼콜라</span>
                          </div>
                          <span className="font-bold text-stone-100">4,500원</span>
                        </div>
                        {/* Touched menu item */}
                        <div className="flex justify-between items-center text-[#f97316] bg-[#f97316]/10 px-2 py-1 rounded border border-[#f97316]/20">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[8px] px-1 py-0.2 rounded bg-[#f97316]/20 text-[#f97316] font-sans">터치오더</span>
                            <span className="font-bold">아이스 아메리카노</span>
                          </div>
                          <span className="font-bold text-[#f97316]">3,500원</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-850 flex justify-between items-center">
                    <div>
                      <span className="text-[8px] text-stone-500 block">TOTAL AMOUNT</span>
                      <span className="text-sm font-bold text-amber-400 font-mono">10,800원</span>
                    </div>
                    <button className="bg-[#f97316] text-white text-[9px] font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-[#f97316]/20 transition-transform active:scale-95 cursor-pointer font-sans">
                      자율 계산하기 →
                    </button>
                  </div>
                </div>

                {/* 3D tray visualization on the right of the screen */}
                <div className="md:col-span-5 flex flex-col justify-between bg-stone-900/40 rounded-2xl border border-stone-800/80 p-4 text-center">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black text-stone-400 tracking-wider uppercase font-mono">TRAY VISION SCANNER</span>
                    <p className="text-[9px] text-stone-500 font-light leading-snug">
                      트레이 위의 빵을 올리는 즉시 실시간 무게/비전 교차 분석
                    </p>
                  </div>

                  {/* SVG Tray Scan Graphic */}
                  <div className="flex-1 flex items-center justify-center my-4">
                    <svg className="w-full h-28 text-stone-700 select-none drop-shadow-md" viewBox="0 0 100 80" fill="none">
                      {/* Scale Platform Base */}
                      <ellipse cx="50" cy="65" rx="36" ry="8" fill="#000" opacity="0.4" />
                      <path d="M18,58 L82,58 L85,63 L15,63 Z" fill="#2d2d30" />
                      
                      {/* Laser grid glowing sweep effect */}
                      <ellipse cx="50" cy="59" rx="28" ry="5.5" fill="none" stroke="#22c55e" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.7" />
                      
                      {/* Simulated salt bread and campange */}
                      <g transform="translate(50, 44)">
                        {/* Campagne */}
                        <path d="M-18,10 C-22,-4 5,-4 2,10 Z" fill="#78350f" stroke="#451a03" strokeWidth="0.5" transform="rotate(-10)" />
                        <path d="M-10,4 Q-5,-1 0,4 M-4,5 Q1,0 6,5" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                        
                        {/* Salt Bread */}
                        <path d="M-2,14 C-4,4 18,4 16,14 Z" fill="#d97706" stroke="#92400e" strokeWidth="0.5" transform="rotate(15)" />
                        <ellipse cx="7" cy="8" rx="5" ry="1.5" fill="#fff" opacity="0.4" />
                      </g>

                      {/* Scanning visual brackets */}
                      <path d="M22,35 L14,35 L14,43" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" />
                      <path d="M78,35 L86,35 L86,43" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" />
                      <path d="M22,64 L14,64 L14,56" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" />
                      <path d="M78,64 L86,64 L86,56" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" />

                      {/* Success Scan Green Beam */}
                      <line x1="14" y1="48" x2="86" y2="48" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" className="animate-pulse" />
                    </svg>
                  </div>

                  <div className="bg-stone-950/80 p-2 rounded-lg border border-stone-850/60 flex items-center justify-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    <span className="text-[8.5px] font-bold text-stone-300 font-sans">실물 트레이 결제 완료 대기</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info Footer */}
              <p className="text-[10px] text-stone-500 font-light mt-4 text-center leading-relaxed">
                ※ EveryBake 하이브리드 키오스크는 신용카드 단말기 탑재는 물론 바코드/QR 리더, 영수증 프린터까지 하나의 프레임에 올인원으로 완성됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Details & Material (디테일 컷) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3 reveal">
            <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest font-mono">INNOVATIVE DETAILS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
              정밀한 설계, 혁신적인 디테일.
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto font-light leading-relaxed">
              어느 한 구석 소홀함이 없는 완벽한 하드웨어 컴포넌트 마감입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 text-left">
            {/* DETAIL 1 */}
            <div className="bg-[#f5f5f7] rounded-[28px] p-6 flex flex-col justify-between hover:shadow-md transition-all h-[420px] reveal">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono">01 / VISION SCANNER</span>
                <h4 className="text-sm font-extrabold text-black">고해상도 카메라 & LED 조명</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  카메라 어셈블리 주위의 라이트 가이드가 실시간 AI 비전 상태를 비추어 결제 신주율을 상승시킵니다.
                </p>
              </div>
              <div className="flex-1 w-full relative overflow-hidden rounded-2xl bg-white border border-stone-100 my-4 flex items-center justify-center p-2" style={{ height: "220px" }}>
                <svg className="w-auto h-36 drop-shadow-lg select-none" viewBox="0 0 120 120" fill="none">
                  {/* Heavy outer metallic casing */}
                  <circle cx="60" cy="60" r="50" fill="url(#metalCaseGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
                  <circle cx="60" cy="60" r="44" fill="#0f0f11" stroke="#334155" strokeWidth="2.5" />
                  {/* Concentric guidelines */}
                  <circle cx="60" cy="60" r="38" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3,6" opacity="0.8" />
                  {/* Status LED Ring */}
                  <circle cx="60" cy="60" r="32" fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.9" className="animate-pulse" />
                  {/* Inner iris */}
                  <circle cx="60" cy="60" r="26" fill="url(#darkLensAperture)" />
                  {/* Aperture blades */}
                  <path d="M42,48 L56,40 M64,34 L64,48 M78,48 L64,56 M78,72 L64,64 M64,86 L64,72 M42,72 L56,64" stroke="#4a5568" strokeWidth="1" opacity="0.6" />
                  {/* Optical glass */}
                  <circle cx="60" cy="60" r="18" fill="url(#glassLensRefinement)" stroke="#1a202c" strokeWidth="1.5" />
                  {/* Glowing lens core */}
                  <circle cx="60" cy="60" r="8" fill="#15803d" opacity="0.9" />
                  <circle cx="60" cy="60" r="4" fill="#22c55e" />
                  {/* Glare reflections */}
                  <ellipse cx="53" cy="53" rx="4" ry="2" fill="#ffffff" opacity="0.5" transform="rotate(-30,53,53)" />
                  <ellipse cx="67" cy="67" rx="2" ry="1" fill="#ffffff" opacity="0.3" transform="rotate(-30,67,67)" />
                  <defs>
                    <linearGradient id="metalCaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="30%" stopColor="#cbd5e1" />
                      <stop offset="70%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="darkLensAperture" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a1c1e" />
                      <stop offset="100%" stopColor="#0a0a0b" />
                    </linearGradient>
                    <radialGradient id="glassLensRefinement" cx="35%" cy="35%" r="70%">
                      <stop offset="0%" stopColor="#2a4365" />
                      <stop offset="60%" stopColor="#1a202c" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* DETAIL 2 */}
            <div className="bg-[#f5f5f7] rounded-[28px] p-6 flex flex-col justify-between hover:shadow-md transition-all h-[420px] reveal">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono">02 / CURVED LIGHT GUIDE</span>
                <h4 className="text-sm font-extrabold text-black">부드러운 곡선과 라이트 가이드</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  부드럽게 벤딩 가공된 프레임 쉘을 관통하는 백색 LED 띠가 지적인 정체성을 한층 승강시킵니다.
                </p>
              </div>
              <div className="flex-1 w-full relative overflow-hidden rounded-2xl bg-white border border-stone-100 my-4 flex items-center justify-center p-2" style={{ height: "220px" }}>
                <svg className="w-auto h-36 drop-shadow-lg select-none" viewBox="0 0 120 120" fill="none">
                  {/* Heavy Base Foot representing physical unit mounting */}
                  <rect x="15" y="90" width="55" height="10" rx="3" fill="#2c2c2e" />
                  {/* Outer bracket arm casing curve with realistic silver metallic gradient */}
                  <path d="M22,90 H56 C74,90 86,78 86,60 V20" stroke="url(#heavyBarMetal)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Inner bracket arm core body */}
                  <path d="M22,90 H56 C74,90 86,78 86,60 V20" stroke="#f8fafc" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Status Indicator LED groove running in the center */}
                  <path d="M28,90 H56 C74,90 86,78 86,60 V30" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Illuminated portion of guide representing AI signal pulse */}
                  <path d="M40,90 H56 C74,90 86,78 86,60 V45" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                  {/* Highly glowing status bulb terminal */}
                  <circle cx="86" cy="45" r="4" fill="#f97316" className="animate-pulse" />
                  <circle cx="86" cy="45" r="2" fill="#ffffff" />
                  <defs>
                    <linearGradient id="heavyBarMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="40%" stopColor="#cbd5e1" />
                      <stop offset="70%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* DETAIL 3 */}
            <div className="bg-[#f5f5f7] rounded-[28px] p-6 flex flex-col justify-between hover:shadow-md transition-all h-[420px] reveal">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono">03 / STAINLESS PLATTER</span>
                <h4 className="text-sm font-extrabold text-black">논슬립 스캔 매트</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  이물질 유입과 위생 감쇄를 원천 격리하는 매트 표면은 가벼운 타월 세척으로 윤기를 원상 복귀합니다.
                </p>
              </div>
              <div className="flex-1 w-full relative overflow-hidden rounded-2xl bg-white border border-stone-100 my-4 flex items-center justify-center p-2" style={{ height: "220px" }}>
                <svg className="w-auto h-36 drop-shadow-lg select-none" viewBox="0 0 120 120" fill="none">
                  {/* Isometric Platter plate support */}
                  <polygon points="10,90 110,90 98,35 22,35" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                  {/* Silicone mat itself with linear gradient */}
                  <polygon points="13,87 107,87 95,38 25,38" fill="url(#siliconeMatGrad)" />
                  {/* Matrix of rubber grip dots (isometric rows) */}
                  <g opacity="0.3">
                    {/* Row 1 */}
                    <circle cx="34" cy="50" r="1.5" fill="#111" />
                    <circle cx="50" cy="50" r="1.5" fill="#111" />
                    <circle cx="66" cy="50" r="1.5" fill="#111" />
                    <circle cx="82" cy="50" r="1.5" fill="#111" />
                    {/* Row 2 */}
                    <circle cx="28" cy="65" r="1.5" fill="#111" />
                    <circle cx="44" cy="65" r="1.5" fill="#111" />
                    <circle cx="60" cy="65" r="1.5" fill="#111" />
                    <circle cx="76" cy="65" r="1.5" fill="#111" />
                    <circle cx="92" cy="65" r="1.5" fill="#111" />
                    {/* Row 3 */}
                    <circle cx="22" cy="80" r="1.5" fill="#111" />
                    <circle cx="38" cy="80" r="1.5" fill="#111" />
                    <circle cx="54" cy="80" r="1.5" fill="#111" />
                    <circle cx="70" cy="80" r="1.5" fill="#111" />
                    <circle cx="86" cy="80" r="1.5" fill="#111" />
                    <circle cx="102" cy="80" r="1.5" fill="#111" />
                  </g>
                  {/* Laser centering crosshair indicator glowing in emerald green */}
                  <path d="M60,42 L60,83 M35,60 H85" stroke="#10b981" strokeWidth="1" opacity="0.55" strokeDasharray="3,3" />
                  <circle cx="60" cy="60" r="6" fill="none" stroke="#10b981" strokeWidth="1.25" opacity="0.8" className="animate-pulse" />
                  <circle cx="60" cy="60" r="1" fill="#10b981" />
                  <defs>
                    <linearGradient id="siliconeMatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e1b4b" />
                      <stop offset="50%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#020617" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* DETAIL 4 */}
            <div className="bg-[#f5f5f7] rounded-[28px] p-6 flex flex-col justify-between hover:shadow-md transition-all h-[420px] reveal">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#f97316] tracking-wider uppercase font-mono">04 / NFC TERMINAL</span>
                <h4 className="text-sm font-extrabold text-black">통합 결제 모듈</h4>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  IC 안치 슬롯, RF 터치 패드, MST 리더 스마트 일체화 동글이 원스톱 결제 게이트를 완벽 조율합니다.
                </p>
              </div>
              <div className="flex-1 w-full relative overflow-hidden rounded-2xl bg-white border border-stone-100 my-4 flex items-center justify-center p-2" style={{ height: "220px" }}>
                <svg className="w-auto h-36 drop-shadow-lg select-none" viewBox="0 0 120 120" fill="none">
                  {/* Solid terminal chassis with smooth silver body gradient */}
                  <rect x="20" y="20" width="80" height="80" rx="10" fill="url(#payChassisMetal)" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Brushed top panel glass faceplate */}
                  <rect x="26" y="26" width="68" height="68" rx="6" fill="#0f172a" />
                  {/* Gloss glaze overlay */}
                  <path d="M26,26 L94,26 L60,94 Z" fill="#ffffff" opacity="0.05" />
                  {/* Sleek magnetic/IC card insert slot with golden border guidelines */}
                  <rect x="32" y="38" width="56" height="8" rx="2" fill="#020617" stroke="#fbbf24" strokeWidth="0.75" />
                  {/* Contactless symbol indicators (3 colored states) */}
                  <g transform="translate(42, 58)">
                    {/* NFC wave line */}
                    <path d="M0,0 A6,6 0 0,1 0,12" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
                    <path d="M4,2 A3,3 0 0,1 4,10" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="6" r="1" fill="#f97316" />
                  </g>
                  {/* Status LEDs (Green, Green, gray) */}
                  <circle cx="82" cy="64" r="2.5" fill="#22c55e" className="animate-pulse" />
                  <circle cx="82" cy="72" r="2.5" fill="#22c55e" />
                  <circle cx="82" cy="80" r="2.5" fill="#475569" />
                  {/* Text labels print */}
                  <text x="34" y="85" fill="#475569" fontSize="4.5" fontWeight="900" fontFamily="monospace">S•CO ELECTRONIC PAY</text>
                  <defs>
                    <linearGradient id="payChassisMetal" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="50%" stopColor="#cbd5e1" />
                      <stop offset="100%" stopColor="#64748b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spec Table Info */}
      <section className="bg-white py-20 border-t border-[#e8e8ed] text-left">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <div className="space-y-2 reveal">
            <h3 className="text-lg font-bold text-black tracking-tight text-left">시스템 기기 성능 사상서</h3>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              에브리베이크 매장에 동치 납품되는 공식 규격 하드웨어 전기 제원 사양서입니다.
            </p>
          </div>

          <div className="border border-[#e8e8ed] bg-[#f5f5f7]/30 rounded-2xl overflow-hidden reveal">
            <div className="grid grid-cols-3 border-b border-[#e8e8ed] bg-[#f5f5f7]/60 px-6 py-3.5 text-xs font-bold text-[#86868b] font-mono">
              <div>구분 명서</div>
              <div className="col-span-2">상세 제원 사양 사안</div>
            </div>
            <div className="grid grid-cols-3 border-b border-[#e8e8ed] px-6 py-4 text-xs text-stone-700">
              <div className="font-bold text-black">동작 치수 및 실중량</div>
              <div className="col-span-2 font-light">540mm(W) x 390mm(D) x 460mm(H) | 약 12.0kg 본체 실중량</div>
            </div>
            <div className="grid grid-cols-3 border-b border-[#e8e8ed] px-6 py-4 text-xs text-stone-700">
              <div className="font-bold text-black">정밀 비전 마이크로 코어</div>
              <div className="col-span-2 font-light">Nvidia Jetson Orin Nano 기반 온디바이스 심층 신경망 가동 싱킹 유닛</div>
            </div>
            <div className="grid grid-cols-3 border-b border-[#e8e8ed] px-6 py-4 text-xs text-stone-700">
              <div className="font-bold text-black">스마트 카메라 검출 핀</div>
              <div className="col-span-2 font-light">1200만 화소 초고화소 왜곡 감쇠 렌즈 | F/1.8 컴포지션 조리개 렌즈 조리개 장착</div>
            </div>
            <div className="grid grid-cols-3 px-6 py-4 text-xs text-stone-700">
              <div className="font-bold text-black">통선 채널 무선 칩셋</div>
              <div className="col-span-2 font-light">Wi-Fi 6E (802.11 ax), Bluetooth 5.2 스마트 무선 링크 어셈블리 내장</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer block */}
      <footer className="bg-[#f5f5f7] py-14 text-center border-t border-[#e8e8ed] text-[11px] text-[#86868b] font-light">
        <div className="max-w-4xl mx-auto px-6 space-y-3">
          <p>
            ※ 하드웨어 기기는 출하 가공 라인 및 지능형 펌웨어 업데이트 상황에 따라 개별 형상과 실 스펙이 조율될 수 있습니다. 2년 무상 기기 유지 케어를 영위합니다.
          </p>
          <p className="font-medium text-black">
            © 2026 EveryBake AI POS Solutions & Retail Engineering. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
