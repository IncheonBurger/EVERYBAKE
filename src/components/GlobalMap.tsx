import React from "react";
import { Globe2, Info, HelpCircle } from "lucide-react";
import { MAP_PINS_GLOBAL } from "../data";
import globalWorldMap from "../assets/images/minimalist_world_map_1779955959002.png";

interface GlobalMapProps {
  selectedPinId: string | null;
  onSelectPin: (id: string | null) => void;
  activeRegion: string | null;
}

export default function GlobalMap({
  selectedPinId,
  onSelectPin,
  activeRegion,
}: GlobalMapProps) {
  return (
    <div className="w-full bg-white rounded-3xl p-6 relative overflow-hidden h-[450px] flex flex-col justify-between shadow-2xl border border-stone-200">
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Map Heading */}
      <div className="z-10 flex justify-between items-start">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 flex items-center gap-1.5 w-fit">
            <Globe2 className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
            KCT Global Network Gateway
          </span>
          <h3 className="text-stone-900 text-lg font-black mt-2">
            글로벌 콜드체인 원료 수급 연동망
          </h3>
          <p className="text-stone-500 text-xs mt-0.5">
            전 세계 유명 베이커리의 생지와 품질 데이터를 완벽하게 수집 및 항공 관제 연동합니다.
          </p>
        </div>
      </div>

      {/* Scale-locked contained Map Sandbox to verify perfect bounding and alignment */}
      <div className="absolute inset-x-0 top-[90px] bottom-[72px] flex items-center justify-center select-none overflow-hidden p-4">
        <div className="relative w-full h-full max-w-[500px] max-h-[280px] aspect-[1.8/1] flex items-center justify-center">
          
          {/* Geographically Accurate World Map Base */}
          <img
            src={globalWorldMap}
            alt="Global Logistics Base Map"
            className="absolute inset-0 w-full h-full object-contain opacity-[0.8] select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Smooth, Glowing Trajectory Lines Converging on South Korea - Locked to wrapper bounds */}
          <div className="absolute inset-0 pointer-events-none z-10 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <style>{`
                  @keyframes dashGlobal {
                    to {
                      stroke-dashoffset: -30;
                    }
                  }
                  .global-trajectory {
                    stroke-dasharray: 6 3;
                    animation: dashGlobal 2.5s linear infinite;
                  }
                  .glowing-glow {
                    filter: drop-shadow(0 0 4px #2563eb);
                  }
                `}</style>
              </defs>
              
              {/* Japan -> Korea Hub */}
              <path d="M 80 42 Q 77.5 38.5 75 43" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.8" className="global-trajectory glowing-glow" fill="none" />
              
              {/* China -> Korea Hub */}
              <path d="M 71 45 Q 73 40 75 43" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.8" className="global-trajectory glowing-glow" fill="none" />
              
              {/* Europe -> Korea Hub */}
              <path d="M 47 33 Q 61 23 75 43" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.7" className="global-trajectory glowing-glow" fill="none" />
              
              {/* US -> Korea Hub */}
              <path d="M 21 38 Q 48 15 75 43" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.7" className="global-trajectory glowing-glow" fill="none" />
              
              {/* Canada -> Korea Hub */}
              <path d="M 19 32 Q 47 10 75 43" stroke="#2563eb" strokeWidth="0.8" strokeOpacity="0.7" className="global-trajectory glowing-glow" fill="none" />
            </svg>
          </div>

          {/* Map Nodes Container - Geographically synchronized */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {MAP_PINS_GLOBAL.map((pin) => {
              const isSelected = selectedPinId === pin.id || activeRegion === pin.city;
              const isHub = pin.isHub;
              const hasAction = pin.id === "g-001" || pin.id === "g-002"; // 도쿄 or 파리

              // Compute intelligent, non-overflowing label placement for global nodes
              const getGlobalLabelAlignment = (leftPct: string, topPct: string, isHubNode?: boolean) => {
                if (isHubNode) {
                  return "bottom-6 left-1/2 -translate-x-1/2 mb-1.5";
                }
                const left = parseFloat(leftPct);
                if (left >= 70) {
                  return "right-5 mr-1 top-1/2 -translate-y-1/2";
                }
                return "left-5 ml-1 top-1/2 -translate-y-1/2";
              };

              const labelPlacementClass = getGlobalLabelAlignment(pin.left, pin.top, isHub);

              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    if (hasAction) {
                      onSelectPin(isSelected ? null : pin.id);
                    }
                  }}
                  className={`absolute group focus:outline-none -translate-x-1/2 -translate-y-1/2 ${isHub ? "cursor-default" : hasAction ? "cursor-pointer" : "cursor-help"}`}
                  style={{ top: pin.top, left: pin.left }}
                  title={`${pin.city} (${pin.country})`}
                  disabled={isHub}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Visual pulse rings */}
                    <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-65 animate-ping duration-[3000ms] ${
                      isHub 
                        ? "bg-blue-500/20 scale-125" 
                        : isSelected 
                          ? "bg-blue-600/30" 
                          : hasAction 
                            ? "bg-blue-400/20" 
                            : "bg-stone-300/15"
                    }`} />
                    
                    {/* Indicator dot */}
                    <div className={`rounded-full border-2 flex items-center justify-center shadow transition-all duration-300 ${
                      isHub
                        ? "w-4.5 h-4.5 bg-blue-600 border-white shadow-[0_0_12px_rgba(37,99,235,0.8)]"
                        : isSelected
                          ? "w-4 h-4 bg-blue-500 border-white scale-110 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                          : hasAction
                            ? "w-3.5 h-3.5 bg-stone-950 border-blue-400 group-hover:bg-blue-400 group-hover:border-white group-hover:scale-105"
                            : "w-3 h-3 bg-stone-100 border-stone-400 opacity-60"
                    }`}>
                      <div className={`rounded-full ${
                        isHub 
                          ? "w-1.5 h-1.5 bg-white" 
                          : isSelected || hasAction 
                            ? "w-1 h-1 bg-blue-400" 
                            : "w-1 h-1 bg-stone-400"
                      }`} />
                    </div>

                    {/* Pin Text Label Card - Intelligently placed to avoid boundaries */}
                    <div className={`absolute whitespace-nowrap px-2.5 py-1.5 rounded-lg border text-[10px] font-bold transition-all duration-300 shadow-sm pointer-events-none select-none z-50 ${
                      isHub
                        ? "bg-blue-600 text-white border-blue-600 opacity-100"
                        : isSelected
                          ? "bg-stone-950 text-white border-stone-950 opacity-100 scale-100"
                          : "bg-white text-stone-700 border-stone-200 opacity-80 group-hover:opacity-100 scale-95 group-hover:scale-100"
                    } ${labelPlacementClass}`}>
                      <span className="text-[8px] text-stone-400 block font-normal leading-none mb-0.5">
                        {pin.country} {isHub ? "Center Hub" : hasAction ? "● Partner" : "○ Route"}
                      </span>
                      <span className="flex items-center gap-1">
                        {pin.city}
                        {!isHub && !hasAction && <HelpCircle className="w-2.5 h-2.5 text-stone-400" />}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Global Status Footer */}
      <div className="z-10 flex justify-between items-center text-xs text-stone-500 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200 mt-4">
        <span className="font-semibold text-stone-600">글로벌 관제 로그:</span>
        <span className="font-bold text-blue-600 uppercase tracking-wider">
          {selectedPinId === "g-001"
            ? "도쿄 A 베이커리 메론빵 직수입 물류 연동"
            : selectedPinId === "g-002"
              ? "파리 B 블랑제리 프리미엄 바게트 항공 물류 연동"
              : "글로벌 콜드체인 실시간 항공 관제망 완벽 제어 중"
          }
        </span>
      </div>

    </div>
  );
}
