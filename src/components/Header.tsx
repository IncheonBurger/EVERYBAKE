import { useState, useEffect, useRef } from "react";
import { ShoppingBag, ChevronRight, ChevronDown, Award, HelpCircle, Menu, X, ArrowRight, LogIn, LogOut, User, Search } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  currentView: string;
  onNav: (view: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  cartCount,
  onCartToggle,
  currentView,
  onNav,
  isLoggedIn,
  onLogout,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [mobileStoreOpen, setMobileStoreOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isAtTop = scrollY < 12;
  const isDarkThemeAtTop = isAtTop && currentView === "home";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setStoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMobileNav = (view: string) => {
    onNav(view);
    setMobileMenuOpen(false);
  };

  const isStoreActive = [
    "equip-list",
    "equip-detail",
    "ai-pos",
    "ai-pos-detail",
    "dough-main",
    "dough-detail",
    "coffee",
    "ingredients"
  ].includes(currentView);

  const isEventActive = currentView === "events";
  const isCommunityActive = currentView === "community";

  const currentNavBg = isAtTop
    ? "bg-transparent border-b-0 border-none shadow-none backdrop-blur-none"
    : "bg-white/95 border-b-0 border-none shadow-none backdrop-blur-md";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${currentNavBg}`} id="main-navigation-bar">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* [왼쪽] 브랜드 로고 및 타이틀 - 프랑스 명품 세리프 스타일로 개편 */}
        <div className="flex items-center shrink-0">
          <div 
            className="cursor-pointer group select-none mr-4"
            onClick={() => handleMobileNav("home")}
            id="partners-logo-nav"
          >
            <span 
              className={`font-gnb-brand font-bold text-2xl sm:text-[28px] tracking-[1.5px] sm:tracking-[2.5px] transition-all duration-300 inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${
                isDarkThemeAtTop 
                  ? "text-white group-hover:text-amber-500" 
                  : "text-stone-900 group-hover:text-[#ba5a13]"
              }`}
            >
              EveryBake
            </span>
          </div>
        </div>

        {/* [중앙] 메인 메뉴 (Store, Event, Community 개편) */}
        <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10 mx-auto">
          
          {/* Store MenuItem with Premium Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setStoreDropdownOpen(true)}
          >
            <button
              type="button"
              onClick={() => setStoreDropdownOpen(!storeDropdownOpen)}
              className={`font-gnb-menu md:text-sm lg:text-[15px] xl:text-[16px] font-black tracking-wide transition-all py-3 px-2 cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                isStoreActive
                  ? "text-[#f97316]"
                  : isDarkThemeAtTop
                    ? "text-stone-200 hover:text-white"
                    : "text-stone-600 hover:text-[#f97316]"
              }`}
            >
              <span>Store</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${storeDropdownOpen ? "rotate-180" : ""} ${isDarkThemeAtTop ? "text-stone-300" : "text-stone-400"}`} />
              {isStoreActive && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.75 bg-[#f97316] rounded-full animate-fade-in" />
              )}
            </button>

            {/* Sub-menu Dropdown Card (Slide Down & Smooth Fade Animation) */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-56 bg-white border border-stone-100 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] py-2.5 z-50 transition-all duration-300 origin-top ${
                storeDropdownOpen
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
              }`}
            >
              {[
                { id: "equip-list", name: "도우컨디셔너/오븐" },
                { id: "ai-pos", name: "AI 포스" },
                { id: "dough-main", name: "생지 라이브러리" },
                { id: "coffee", name: "커피/원두/머신" },
                { id: "ingredients", name: "원부자재" },
              ].map((subItem) => {
                const isSubActive = currentView === subItem.id || (subItem.id === "equip-list" && currentView === "equip-detail") || (subItem.id === "dough-main" && currentView === "dough-detail") || (subItem.id === "ai-pos" && currentView === "ai-pos-detail");
                return (
                  <button
                    key={subItem.id}
                    onClick={() => {
                      onNav(subItem.id);
                      setStoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      isSubActive
                        ? "text-[#f97316] bg-orange-50/50"
                        : "text-stone-650 hover:text-[#f97316] hover:bg-stone-50"
                    }`}
                  >
                    <span>{subItem.name}</span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${isSubActive ? "text-[#f97316] translate-x-0.5" : "text-stone-300"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Category Link */}
          <button
            type="button"
            onClick={() => onNav("events")}
            className={`font-gnb-menu md:text-sm lg:text-[15px] xl:text-[16px] font-black tracking-wide transition-all relative py-3 px-2 cursor-pointer whitespace-nowrap ${
              isEventActive
                ? "text-[#f97316]"
                : isDarkThemeAtTop
                  ? "text-stone-200 hover:text-white"
                  : "text-stone-600 hover:text-[#f97316]"
            }`}
          >
            <span>Event</span>
            {isEventActive && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-0.75 bg-[#f97316] rounded-full animate-fade-in" />
            )}
          </button>

          {/* Community Category Link */}
          <button
            type="button"
            onClick={() => onNav("community")}
            className={`font-gnb-menu md:text-sm lg:text-[15px] xl:text-[16px] font-black tracking-wide transition-all relative py-3 px-2 cursor-pointer whitespace-nowrap ${
              isCommunityActive
                ? "text-[#f97316]"
                : isDarkThemeAtTop
                  ? "text-stone-200 hover:text-white"
                  : "text-stone-600 hover:text-[#f97316]"
            }`}
          >
            <span>Community</span>
            {isCommunityActive && (
              <span className="absolute bottom-[-1px] left-0 right-0 h-0.75 bg-[#f97316] rounded-full animate-fade-in" />
            )}
          </button>

        </div>

        {/* [우측] 검색, 장바구니, 나의공간(마이페이지), 로그인/로그아웃, 제휴신청 */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-3 shrink-0">
          
          {/* 검색 영역 */}
          <div className="hidden lg:flex items-center max-w-[110px] xl:max-w-[150px]">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="제품 검색..."
                className={`w-full text-[10.5px] font-bold border outline-none pl-7.5 pr-6 py-1.75 rounded-xl transition-all ${
                  isDarkThemeAtTop
                    ? "bg-stone-900/40 border-stone-800 text-white placeholder-stone-500 focus:bg-stone-950/60 focus:border-stone-700"
                    : "bg-stone-100 border-stone-200 text-stone-850 placeholder-stone-400 focus:bg-white focus:border-[#f97316]"
                }`}
              />
              <Search className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${isDarkThemeAtTop ? "text-stone-400" : "text-stone-400"}`} />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-stone-200 text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X className="w-2 h-2" />
                </button>
              )}
            </div>
          </div>

          {/* 장바구니 버튼 (우측 상단 상징) */}
          <button
            onClick={onCartToggle}
            className={`relative p-1.5 sm:p-2.5 rounded-xl border transition-all flex items-center justify-center cursor-pointer group shrink-0 ${
              isDarkThemeAtTop
                ? "border-stone-800 hover:border-white hover:bg-stone-900/50"
                : "border-stone-200 hover:border-stone-900 hover:bg-stone-50"
            }`}
            id="cart-toggle-btn"
          >
            <ShoppingBag className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${isDarkThemeAtTop ? "text-stone-200 group-hover:text-white" : "text-stone-700 group-hover:text-stone-950"}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f97316] text-white rounded-full text-[8px] font-black flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* 로그인 시 "나의 공간" 마이페이지 바로가기 단추 노출 (우측 우대) */}
          {isLoggedIn && (
            <button
              type="button"
              onClick={() => onNav("partner-portal")}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                currentView === "partner-portal"
                  ? "bg-amber-50 text-amber-800 border-amber-250 font-black shadow-none"
                  : isDarkThemeAtTop
                    ? "bg-transparent hover:bg-white/10 text-white border-stone-850 hover:text-stone-100"
                    : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200 hover:text-stone-900"
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>나의공간</span>
            </button>
          )}

          {/* 로그인 / 로그아웃 단추 */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className={`hidden sm:flex px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-tight transition-all cursor-pointer border items-center gap-1 shrink-0 ${
                isDarkThemeAtTop
                  ? "bg-transparent hover:bg-white/10 text-white border-stone-800"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200"
              }`}
              id="partners-logout-btn"
            >
              <LogOut className={`w-3 h-3 ${isDarkThemeAtTop ? "text-stone-300" : "text-stone-500"}`} strokeWidth={2.5} />
              <span>로그아웃</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleMobileNav("login")}
              className={`hidden sm:flex px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-tight transition-all cursor-pointer items-center gap-1 shrink-0 ${
                isDarkThemeAtTop
                  ? "bg-white hover:bg-stone-100 text-stone-950 shadow-xs animate-fade-in"
                  : "bg-stone-900 hover:bg-black text-white"
              }`}
              id="partners-login-btn"
            >
              <LogIn className={`w-3 h-3 ${isDarkThemeAtTop ? "text-stone-850" : "text-stone-200"}`} strokeWidth={2.5} />
              <span>로그인</span>
            </button>
          )}

          {/* 입점 제휴 문의 단추 (눈에 띄는 실용성) */}
          <button 
            type="button"
            onClick={() => handleMobileNav("inquiry")}
            className="hidden sm:flex px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-tight bg-[#f97316] hover:bg-orange-650 text-white transition-all cursor-pointer shadow-none hover:shadow-xs items-center gap-0.5 shrink-0"
            id="partners-inquiry-btn"
          >
            <span>제휴문의</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* 햄버거 토글 (모바일 전용) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 sm:p-2.5 md:hidden rounded-xl border transition-all flex items-center justify-center cursor-pointer ml-0.5 shrink-0 ${
              isDarkThemeAtTop
                ? "border-stone-800 hover:border-white text-stone-200 hover:text-white hover:bg-stone-900/50"
                : "border-stone-200 hover:border-stone-900 text-stone-700 hover:text-stone-950 hover:bg-stone-50"
            }`}
            aria-label="Toggle Menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-150 bg-white/98 backdrop-blur-2xl py-4 px-4 shadow-xl space-y-2 animate-fade-in absolute left-0 right-0 top-18 z-50">
          {/* Mobile Search input */}
          <div className="px-1.5 mb-3">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="제품명, 소금빵, 원두 등 검색..."
                className="w-full text-xs font-bold bg-stone-100 hover:bg-stone-50 border border-stone-200 focus:border-[#f97316] focus:bg-white outline-none pl-8.5 pr-8 py-2.5 rounded-xl transition-all text-stone-850 placeholder-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-stone-200 text-stone-550 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>

          <div className="text-[10px] font-black tracking-widest text-[#f97316] uppercase px-3 mb-2">
            서비스 카테고리 바로가기
          </div>
          <div className="grid grid-cols-1 gap-1">
            {/* Store (Accordion on Mobile) */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setMobileStoreOpen(!mobileStoreOpen)}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                  isStoreActive
                    ? "bg-orange-50 text-[#f97316]"
                    : "text-stone-750 hover:bg-stone-50 hover:text-stone-950"
                }`}
              >
                <span>Store</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileStoreOpen ? "rotate-180" : ""}`} />
              </button>
              
              {/* Nested Sub-menus with Accordion transition */}
              {mobileStoreOpen && (
                <div className="pl-4 pr-1 py-1 space-y-1 bg-stone-50 rounded-xl border border-stone-100">
                  {[
                    { id: "equip-list", name: "도우컨디셔너/오븐" },
                    { id: "ai-pos", name: "AI 포스" },
                    { id: "dough-main", name: "생지 라이브러리" },
                    { id: "coffee", name: "커피/원두/머신" },
                    { id: "ingredients", name: "원부자재" },
                  ].map((subItem) => {
                    const isSubActive = currentView === subItem.id || (subItem.id === "equip-list" && currentView === "equip-detail") || (subItem.id === "dough-main" && currentView === "dough-detail") || (subItem.id === "ai-pos" && currentView === "ai-pos-detail");
                    return (
                      <button
                        key={subItem.id}
                        type="button"
                        onClick={() => handleMobileNav(subItem.id)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                          isSubActive
                            ? "text-[#f97316]"
                            : "text-stone-600 hover:text-stone-950"
                        }`}
                      >
                        <span>• {subItem.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 ${isSubActive ? "text-[#f97316]" : "text-stone-300"}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Event Link */}
            <button
              type="button"
              onClick={() => handleMobileNav("events")}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                isEventActive
                  ? "bg-orange-50 text-[#f97316]"
                  : "text-stone-750 hover:bg-stone-50 hover:text-stone-950"
              }`}
            >
              <span>Event</span>
              <ChevronRight className={`w-4 h-4 ${isEventActive ? "text-[#f97316]" : "text-stone-300"}`} />
            </button>

            {/* Community Link */}
            <button
              type="button"
              onClick={() => handleMobileNav("community")}
              className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                isCommunityActive
                  ? "bg-orange-50 text-[#f97316]"
                  : "text-stone-750 hover:bg-stone-50 hover:text-stone-950"
              }`}
            >
              <span>Community</span>
              <ChevronRight className={`w-4 h-4 ${isCommunityActive ? "text-[#f97316]" : "text-stone-300"}`} />
            </button>

            {/* 나의공간 Link for Logged In users */}
            {isLoggedIn && (
              <button
                type="button"
                onClick={() => handleMobileNav("partner-portal")}
                className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                  currentView === "partner-portal"
                    ? "bg-amber-50 text-amber-800"
                    : "text-stone-750 hover:bg-stone-50 hover:text-[#f97316]"
                }`}
              >
                <span>🥐 나의공간</span>
                <ChevronRight className={`w-4 h-4 ${currentView === "partner-portal" ? "text-amber-800" : "text-stone-300"}`} />
              </button>
            )}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleMobileNav("inquiry")}
              className="w-full bg-stone-900 hover:bg-black text-white text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <span>입점 및 제휴 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 border border-stone-200"
              >
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  handleMobileNav("login");
                }}
                className="w-full bg-[#f97316] hover:bg-orange-600 text-white text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                <LogIn className="w-4 h-4" />
                <span>나의공간 로그인</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
