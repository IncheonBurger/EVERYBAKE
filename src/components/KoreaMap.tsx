import React from "react";
import { Info, HelpCircle } from "lucide-react";
import { MAP_PINS_KOREA } from "../data";

interface KoreaMapProps {
  selectedPinId: string | null;
  onSelectPin: (id: string | null) => void;
  activeRegion: string | null;
}

export default function KoreaMap({
  selectedPinId,
  onSelectPin,
  activeRegion,
}: KoreaMapProps) {
  return (
    <div className="w-full bg-white rounded-3xl p-6 relative overflow-hidden h-[450px] flex flex-col justify-between shadow-2xl border border-stone-200">
      
      {/* Absolute Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Map Heading */}
      <div className="z-10 flex justify-between items-start">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
            KCT Core Logistic Mapping
          </span>
          <h3 className="text-stone-900 text-lg font-black mt-2">
            명인생지 스마트 공급망 네트워크
          </h3>
          <p className="text-stone-500 text-xs mt-0.5">지리적 데이터에 기반해 실시간으로 추적되는 명장 노드</p>
        </div>
        
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 p-2 py-1.5 rounded-xl border border-stone-150">
          <Info className="w-3.5 h-3.5 text-amber-600" />
          <span>로컬 핀을 선택하여 마스터 생지를 탐색하십시오.</span>
        </div>
      </div>

      {/* Contained Map, SVG, and Pins Sandbox to prevent any overflow or drift */}
      <div className="absolute inset-x-0 top-[90px] bottom-[72px] flex items-center justify-center select-none overflow-hidden p-4">
        <div className="relative w-full h-full max-w-[280px] max-h-[280px] aspect-square flex items-center justify-center">
          
          {/* Geographically Accurate Minimalist South Korea Map Base */}
          <img
            src="/src/assets/images/south_korea_vector_map_1779955935282.png"
            alt="South Korea Geographic Base Map"
            className="absolute inset-0 w-full h-full object-contain opacity-[0.85] select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Glowing Network Trajectories Overlay - Locked to image bounds */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <style>{`
                  @keyframes dashFlow {
                    to {
                      stroke-dashoffset: -40;
                    }
                  }
                  .map-flow-line {
                    stroke-dasharray: 6 3;
                    animation: dashFlow 3s linear infinite;
                  }
                `}</style>
              </defs>
              {/* Seoul <-> Daejeon */}
              <path d="M 42 28 L 51 46" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.45" className="map-flow-line" fill="none" />
              {/* Daejeon <-> Daegu */}
              <path d="M 51 46 L 68 62" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.45" className="map-flow-line" fill="none" />
              {/* Daegu <-> Busan */}
              <path d="M 68 62 L 74 72" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.45" className="map-flow-line" fill="none" />
              {/* Daejeon <-> Jeonju */}
              <path d="M 51 46 L 43 56" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.45" className="map-flow-line" fill="none" />
              {/* Jeonju <-> Gwangju */}
              <path d="M 43 56 L 38 68" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.45" className="map-flow-line" fill="none" />
              {/* Gwangju <-> Jeju */}
              <path d="M 38 68 L 34 91" stroke="#f59e0b" strokeWidth="0.75" strokeOpacity="0.25" className="map-flow-line" fill="none" />
            </svg>
          </div>

          {/* Pins positioning system - 1:1 aligned with image and lines */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {MAP_PINS_KOREA.map((pin) => {
              const isSelected = selectedPinId === pin.id || activeRegion === pin.city;
              const isActiveNode = pin.active;

              // Compute intelligent, non-overflowing label placement
              const getKoreaLabelAlignment = (leftPct: string, topPct: string) => {
                const left = parseFloat(leftPct);
                const top = parseFloat(topPct);
                if (top > 80) {
                  return "bottom-5 left-1/2 -translate-x-1/2 mb-1.5";
                }
                if (left > 60) {
                  return "right-5 mr-1.5 top-1/2 -translate-y-1/2";
                }
                return "left-5 ml-1.5 top-1/2 -translate-y-1/2";
              };

              const labelPlacementClass = getKoreaLabelAlignment(pin.left, pin.top);

              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    if (isActiveNode) {
                      onSelectPin(isSelected ? null : pin.id);
                    }
                  }}
                  className={`absolute group focus:outline-none -translate-x-1/2 -translate-y-1/2 ${isActiveNode ? "cursor-pointer" : "cursor-help"}`}
                  style={{ top: pin.top, left: pin.left }}
                  title={`${pin.city} - ${pin.master}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Modern active pulsing halo */}
                    <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-60 animate-ping duration-[2500ms] ${
                      isSelected 
                        ? "bg-amber-500/40 scale-125" 
                        : isActiveNode 
                          ? "bg-amber-400/20" 
                          : "bg-transparent"
                    }`} />
                    
                    {/* Modern glowing LED marker */}
                    <div className={`rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
                      isSelected 
                        ? "w-5 h-5 bg-amber-500 border-white scale-125 shadow-[0_0_15px_rgba(245,158,11,0.9)] ring-4 ring-amber-500/20" 
                        : isActiveNode
                          ? "w-4 h-4 bg-stone-950 border-amber-500 hover:bg-amber-500 hover:border-white hover:scale-110 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                          : "w-3 h-3 bg-stone-100 border-stone-300 opacity-60"
                    }`}>
                      <div className={`rounded-full transition-all duration-300 ${
                        isSelected 
                          ? "w-2 h-2 bg-white" 
                          : isActiveNode 
                            ? "w-1.5 h-1.5 bg-amber-400 animate-pulse" 
                            : "w-1 h-1 bg-stone-400"
                      }`} />
                    </div>

                    {/* Pin Text Label Card - Intelligently placed to avoid boundaries */}
                    <div className={`absolute whitespace-nowrap px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 shadow-md pointer-events-none select-none z-50 ${
                      isSelected
                        ? "bg-stone-950 text-white border-stone-950 opacity-100 scale-100"
                        : "bg-white text-stone-800 border-stone-200 opacity-80 group-hover:opacity-100 scale-95 group-hover:scale-100"
                    } ${labelPlacementClass}`}>
                      <span className="text-[9px] text-stone-400 block font-normal leading-none mb-0.5">
                        {pin.city} {isActiveNode ? "● 제과명장" : "○ 거점 노드"}
                      </span>
                      <span className="flex items-center gap-1">
                        {pin.master}
                        {!isActiveNode && <HelpCircle className="w-3 h-3 text-stone-400" />}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Current selection display footer */}
      <div className="z-10 flex justify-between items-center text-xs text-stone-500 bg-stone-50/80 p-3.5 rounded-2xl border border-stone-200 mt-4">
        <span className="font-semibold text-stone-600">지역 물류 센터 라우팅:</span>
        <span className="font-bold text-stone-800 uppercase tracking-wider">
          {selectedPinId 
            ? MAP_PINS_KOREA.find(p => p.id === selectedPinId)?.city + " 허브 활성화 (소성 최적화 생지 자동 라우팅)"
            : activeRegion 
              ? activeRegion + " 관제 상태 연동 중"
              : "전체 한반도 테루아르 컬렉션 연결 완료"
          }
        </span>
        {(selectedPinId || activeRegion) && (
          <button 
            type="button"
            onClick={() => onSelectPin(null)}
            className="text-amber-600 font-bold hover:underline bg-transparent cursor-pointer"
          >
            초기화
          </button>
        )}
      </div>

    </div>
  );
}
