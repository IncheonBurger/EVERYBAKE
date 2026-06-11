import { useState } from "react";
import { ShoppingBag, ChevronRight, Award, HelpCircle, Menu, X, ArrowRight, LogIn, LogOut, User, Search } from "lucide-react";
import everyBakeLogo from "../assets/images/everybake_logo_1780361685384.png";

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

  const baseLinks = [
    { id: "equip-list", name: "도우컨디셔너/오븐" },
    { id: "dough-main", name: "생지 라이브러리" },
    { id: "coffee", name: "커피/원두/머신" },
    { id: "ingredients", name: "원부자재" },
    { id: "events", name: "🔥 이벤트/혜택" },
    { id: "community", name: "커뮤니티" },
  ];

  const links = isLoggedIn 
    ? [...baseLinks, { id: "partner-portal", name: "🥐 나의공간" }]
    : baseLinks;

  const handleMobileNav = (view: string) => {
    onNav(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-stone-200 z-40 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* [왼쪽] 브랜드 로고 및 타이틀 */}
        <div className="flex items-center shrink-0">
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none mr-4"
            onClick={() => handleMobileNav("home")}
            id="partners-logo-nav"
          >
            <div className="w-13 h-13 sm:w-15 sm:h-15 transition-all group-hover:scale-105 shrink-0 flex items-center justify-center">
              <img 
                src={everyBakeLogo} 
                alt="EveryBake" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-[17px] sm:text-[21px] text-stone-950 tracking-tighter leading-none group-hover:text-[#f97316] transition-colors">EveryBake</span>
            </div>
          </div>
        </div>

        {/* [중앙] 메인 메뉴 (도우컨디셔너, 생지, 커피, 원부자재, 이벤트, 커뮤니티) */}
        <div className="hidden md:flex items-center justify-center gap-1.5 lg:gap-2.5 xl:gap-4.5 mx-auto">
          {baseLinks.map((link) => {
            const isActive = currentView === link.id || (link.id === "equip-list" && currentView === "equip-detail") || (link.id === "dough-main" && currentView === "dough-detail");
            return (
              <button
                key={link.id}
                onClick={() => onNav(link.id)}
                className={`md:text-[10px] lg:text-[11px] xl:text-xs font-black tracking-tight transition-all relative py-2 px-1 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-[#f97316]"
                    : "text-stone-600 hover:text-[#f97316]"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-[-6px] left-0 right-0 h-0.75 bg-[#f97316] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
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
                className="w-full text-[10.5px] font-bold bg-stone-100 hover:bg-stone-50 border border-stone-200 focus:border-[#f97316] focus:bg-white outline-none pl-7.5 pr-6 py-1.75 rounded-xl transition-all text-stone-850 placeholder-stone-400"
              />
              <Search className="w-3 h-3 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
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
            className="relative p-1.5 sm:p-2.5 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-center cursor-pointer group shrink-0"
            id="cart-toggle-btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-700 group-hover:text-stone-950" />
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
                  : "bg-white hover:bg-stone-50 text-stone-700 border-stone-200 hover:text-stone-900"
              }`}
            >
              <User className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>나의공간</span>
            </button>
          )}

          {/* 로그인 / 로그아웃 단추 */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={onLogout}
              className="hidden sm:flex px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-tight bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all cursor-pointer border border-stone-200 items-center gap-1 shrink-0"
              id="partners-logout-btn"
            >
              <LogOut className="w-3 h-3 text-stone-500" strokeWidth={2.5} />
              <span>로그아웃</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleMobileNav("login")}
              className="hidden sm:flex px-3.5 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-tight bg-stone-900 hover:bg-black text-white transition-all cursor-pointer items-center gap-1 shrink-0"
              id="partners-login-btn"
            >
              <LogIn className="w-3 h-3 text-stone-200" strokeWidth={2.5} />
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
            className="p-1.5 sm:p-2.5 md:hidden rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-center cursor-pointer text-stone-700 hover:text-stone-950 ml-0.5 shrink-0"
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
            {links.map((link) => {
              const isActive = currentView === link.id || (link.id === "equip-list" && currentView === "equip-detail") || (link.id === "dough-main" && currentView === "dough-detail");
              return (
                <button
                  key={link.id}
                  onClick={() => handleMobileNav(link.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                    isActive
                      ? "bg-orange-50 text-[#f97316]"
                      : "text-stone-750 hover:bg-stone-50 hover:text-stone-950"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "text-[#f97316] translate-x-0.5" : "text-stone-300"}`} />
                </button>
              );
            })}
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
