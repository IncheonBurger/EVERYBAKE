import { useState } from "react";
import { ShoppingBag, ChevronRight, Award, HelpCircle, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartToggle: () => void;
  currentView: string;
  onNav: (view: string) => void;
}

export default function Header({
  cartCount,
  onCartToggle,
  currentView,
  onNav,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { id: "equip-list", name: "도우컨디셔너 / 오븐" },
    { id: "dough-main", name: "프리미엄 생지 라이브러리" },
    { id: "coffee", name: "커피 원두 / 머신" },
    { id: "community", name: "에브리베이크 커뮤니티" },
  ];

  const handleMobileNav = (view: string) => {
    onNav(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-stone-200 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none mr-2"
          onClick={() => handleMobileNav("home")}
          id="partners-logo-nav"
        >
          <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-[#f97316] to-[#ea580c] flex items-center justify-center text-white font-black text-sm tracking-widest transition-transform group-hover:scale-105 shadow-sm shrink-0">
            E
          </div>
          <div className="flex items-center sm:block">
            <span className="font-black text-[15px] sm:text-[17px] text-stone-900 tracking-tight">EveryBake</span>
            <span className="ml-1 sm:ml-1.5 text-[8px] sm:text-[8.5px] uppercase font-bold tracking-widest text-[#f97316] bg-orange-50 border border-orange-100/50 px-1 sm:px-1.5 py-0.5 rounded shrink-0">
              B2B
            </span>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className={`text-xs font-semibold tracking-tight transition-colors relative py-1.5 cursor-pointer ${
                currentView === link.id || (link.id === "equip-list" && currentView === "equip-detail") || (link.id === "dough-main" && currentView === "dough-detail")
                  ? "text-[#f97316] font-extrabold"
                  : "text-stone-600 hover:text-[#f97316]"
              }`}
            >
              {link.name}
              {(currentView === link.id || (link.id === "equip-list" && currentView === "equip-detail") || (link.id === "dough-main" && currentView === "dough-detail")) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#f97316] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Cart & Actions & Mobile Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onCartToggle}
            className="relative p-2 rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-center cursor-pointer group"
            id="cart-toggle-btn"
          >
            <ShoppingBag className="w-4 h-4 text-stone-700 group-hover:text-stone-950" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#f97316] text-white rounded-full text-[9px] font-black flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            type="button"
            onClick={() => handleMobileNav("inquiry")}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs font-bold tracking-tight bg-[#f97316] hover:bg-orange-650 text-white transition-all cursor-pointer shadow-[0_2px_8px_rgba(249,115,22,0.25)] hover:shadow-md flex items-center gap-1"
            id="partners-inquiry-btn"
          >
            <span className="hidden sm:inline">입점 및 제휴 문의</span>
            <span className="inline sm:hidden">제휴문의</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger Menu Toggle (Mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-xl border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all flex items-center justify-center cursor-pointer text-stone-700 hover:text-stone-950 ml-1"
            aria-label="Toggle Menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-150 bg-white/98 backdrop-blur-2xl py-4 px-4 shadow-xl space-y-2 animate-fade-in absolute left-0 right-0 top-16 z-50">
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
          <div className="pt-2">
            <button
              onClick={() => handleMobileNav("inquiry")}
              className="w-full bg-stone-900 hover:bg-black text-white text-xs font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <span>입점 및 제휴 신청하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
