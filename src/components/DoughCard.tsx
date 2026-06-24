import React from "react";
import { Barcode, Bell, BellOff, ShoppingBag, Radio } from "lucide-react";
import { DoughItem } from "../types";

interface DoughCardProps {
  item: DoughItem;
  onAddToCart: (item: DoughItem) => void;
  onToggleNotification: (id: string) => void;
  isNotificationApplied: boolean;
  onScanShortcut: (id: string) => void;
  activeInOven: boolean;
  onHoverCard: (region: string | null) => void;
  onViewStory?: (id: string) => void;
  rank?: number;
  salesCount?: number;
}

export const DoughCard: React.FC<DoughCardProps> = ({
  item,
  onAddToCart,
  onToggleNotification,
  isNotificationApplied,
  onScanShortcut,
  activeInOven,
  onHoverCard,
  onViewStory,
  rank,
  salesCount,
}) => {
  
  // Format price into elegant KRW
  const formattedPrice = `₩ ${item.price.toLocaleString()}`;

  // Helper for stock dot color and borders
  const getStockClasses = (status: "in" | "low" | "out") => {
    switch (status) {
      case "in":
        return { dot: "bg-emerald-500", text: "text-emerald-700 bg-emerald-50 border-emerald-100" };
      case "low":
        return { dot: "bg-amber-400", text: "text-amber-700 bg-amber-50 border-amber-100" };
      case "out":
        return { dot: "bg-rose-500", text: "text-rose-700 bg-rose-50 border-rose-100 animate-pulse" };
      default:
        return { dot: "bg-stone-400", text: "text-stone-700 bg-stone-50 border-stone-100" };
    }
  };  const getRankClasses = (rk?: number) => {
    if (!rk) return "";
    switch (rk) {
      case 1:
        return "border-stone-450 bg-white ring-1 ring-stone-950/5 shadow-md scale-[1.01]";
      case 2:
        return "border-stone-250 shadow-sm bg-white hover:border-stone-450 hover:shadow-md";
      case 3:
        return "border-stone-200 shadow-xs bg-white hover:border-stone-400 hover:shadow-md";
      default:
        return "";
    }
  };

  const stockStyle = getStockClasses(item.stockStatus);
  const rankStyleClass = getRankClasses(rank);

  return (
    <div 
      className={`group bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between ${
        rank 
          ? rankStyleClass 
          : activeInOven 
            ? "border-stone-900 shadow-md ring-1 ring-stone-900" 
            : "border-stone-200/60 hover:border-stone-400 hover:shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
      }`}
      onMouseEnter={() => onHoverCard(item.region)}
      onMouseLeave={() => onHoverCard(null)}
    >
      <div>
        {/* Card Visual / Display Area */}
        <div className="w-full h-44 bg-stone-50 rounded-2xl mb-4 relative overflow-hidden flex flex-col items-center justify-center p-4 border border-stone-150">
          <div className="absolute inset-0 opacity-[0.015] select-none pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:10px_10px]" />
          
          {rank && (
            <div className={`absolute top-2.5 left-2.5 flex items-center gap-1 text-[9px] font-bold tracking-wider px-2 py-1 rounded shadow-2xs z-10 ${
              rank === 1 ? "bg-stone-900 text-white font-sans" :
              rank === 2 ? "bg-stone-150 text-stone-800 border border-stone-200 font-sans" :
              "bg-stone-100 text-stone-700 border border-stone-150 font-sans"
            }`}>
              <span>{rank === 1 ? "실시간 Best 1" : rank === 2 ? "Best 2" : "Best 3"}</span>
            </div>
          )}

          <span className="text-3xl filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
            {Array.from(item.imageLabel)[0] || "🍞"}
          </span>
          <span className="text-[10px] font-bold text-stone-550 mt-2 tracking-widest font-mono uppercase bg-white/90 border border-stone-200 px-2 py-0.5 rounded shadow-2xs">
            {item.imageLabel}
          </span>

          {/* Glowing active state signal */}
          {activeInOven && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 text-[9px] uppercase font-mono font-bold bg-stone-900 text-white px-2 py-1 rounded shadow">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>OVEN SYNCED</span>
            </div>
          )}
        </div>

        {/* Badges container */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Stock Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-semibold border ${stockStyle.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${stockStyle.dot}`} />
            <span>{item.statusText}</span>
          </div>

          {/* Sales Count Badge */}
          {salesCount && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-800 border border-stone-200/50 font-mono shrink-0">
              <span>금일 누적: {salesCount.toLocaleString()} Box</span>
            </div>
          )}
        </div>

        {/* Content Details */}
        <h3 className="text-sm font-extrabold text-[#1d1d1f] group-hover:text-stone-950 truncate transition-colors">
          {item.name}
        </h3>
        
        <p className="text-[11px] text-stone-400 mb-1 font-semibold">{item.masterName}</p>
        
        <p className="text-[11px] text-stone-500 mb-4 line-clamp-2 product-spec-font">
          {item.description}
        </p>
      </div>

      <div>
        {/* Barcode representation */}
        <div className="flex items-center gap-1.5 bg-stone-50 rounded-xl px-3 py-1.5 border border-stone-200/50 text-[10px] text-stone-550 mb-4 font-mono">
          <Barcode className="w-3.5 h-3.5" />
          <span>{item.barcode}</span>
        </div>

        {/* Bottom actions */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[17px] font-extrabold text-stone-900 tracking-tight">
            {formattedPrice}
          </span>
          
          <button
            type="button"
            onClick={() => onScanShortcut(item.id)}
            className="text-[9px] font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 px-2 py-1 rounded border border-stone-200 hover:border-stone-350 transition-all cursor-pointer font-mono"
            title="기기에 바코드 해동 세팅 즉각 주입"
          >
            기기 주입 ⇡
          </button>
        </div>

        {onViewStory && (
          <button
            type="button"
            onClick={() => onViewStory(item.id)}
            className="w-full mb-2 py-2 bg-stone-50 hover:bg-stone-150/60 text-stone-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-stone-200/50"
          >
            <span>상세 스토리 및 규격 데이터 보기 ↗</span>
          </button>
        )}

        {item.stockStatus === "out" ? (
          <button
            type="button"
            onClick={() => onToggleNotification(item.id)}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isNotificationApplied
                ? "bg-stone-200 hover:bg-stone-300 text-stone-700"
                : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-200"
            }`}
          >
            {isNotificationApplied ? (
              <>
                <BellOff className="w-4 h-4" />
                알림 신청 해제됨
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 animate-swing" />
                원료 입고 알림 받기
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onAddToCart(item)}
            className="w-full py-2.5 bg-stone-950 hover:bg-stone-850 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            장바구니 담기
          </button>
        )}
      </div>
    </div>
  );
};

export default DoughCard;
