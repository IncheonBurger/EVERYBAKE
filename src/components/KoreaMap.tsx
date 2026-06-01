import React from "react";
import { Info, HelpCircle } from "lucide-react";
import { MAP_PINS_KOREA } from "../data";
import koreaMapImage from "../assets/images/south_korea_vector_map_1779955935282.png";

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
    <div className="w-full bg-white rounded-3xl p-6 relative overflow-hidden h-[500px] md:h-[540px] flex flex-col justify-between shadow-2xl border border-stone-200">
      
      {/* Absolute Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Map Heading */}
      <div className="z-10 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <span className="inline-block text-xs sm:text-sm uppercase tracking-widest font-extrabold text-amber-600 bg-amber-50 px-3.5 py-1.5 rounded-lg border border-amber-200 whitespace-nowrap">
            KCT Core Logistic Mapping
          </span>
          <h3 className="text-stone-900 text-xl sm:text-2.5xl font-black mt-2 font-sans tracking-tight">
            명인생지 스마트 공급망 네트워크
          </h3>
          <p className="text-stone-500 text-xs mt-0.5 font-medium">지리적 데이터에 기반해 실시간으로 추적되는 명장 노드</p>
        </div>
        
        <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 p-2.5 py-2 rounded-xl border border-stone-150 shrink-0">
          <Info className="w-4 h-4 text-amber-600" />
          <span>로컬 핀을 선택하여 마스터 생지를 탐색하십시오.</span>
        </div>
      </div>

      {/* Contained Map, SVG, and Pins Sandbox to prevent any overflow or drift */}
      <div className="absolute inset-x-0 top-[110px] bottom-[72px] flex items-center justify-center select-none overflow-hidden p-4">
        <div className="relative w-full h-full max-w-[340px] max-h-[340px] aspect-square flex items-center justify-center">
          
          {/* Geographically Accurate Minimalist South Korea Map Base */}
          <img
            src={koreaMapImage}
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
              {/* Seoul <-> Jeonju */}
              <path d="M 36 23 L 38 55" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.75" className="map-flow-line" fill="none" />
              {/* Jeonju <-> Busan */}
              <path d="M 38 55 L 76 75" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.75" className="map-flow-line" fill="none" />
            </svg>
          </div>

          {/* Pins positioning system - 1:1 aligned with image and lines */}
          <div className="absolute inset-0 z-20 pointer-events-auto">
            {MAP_PINS_KOREA.map((pin) => {
              const isSelected = selectedPinId === pin.id || activeRegion === pin.city;

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
                    onSelectPin(isSelected ? null : pin.id);
                  }}
                  className="absolute group focus:outline-none -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ top: pin.top, left: pin.left }}
                  title={`${pin.city} - ${pin.master}`}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Modern active pulsing halo */}
                    <span className={`absolute inline-flex h-8 w-8 rounded-full opacity-60 animate-ping duration-[2500ms] ${
                      isSelected 
                        ? "bg-amber-500/40 scale-125" 
                        : "bg-amber-400/20"
                    }`} />
                    
                    {/* Modern glowing LED marker */}
                    <div className={`rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border ${
                      isSelected 
                        ? "w-5 h-5 bg-amber-500 border-white scale-125 shadow-[0_0_15px_rgba(245,158,11,0.9)] ring-4 ring-amber-500/20" 
                        : "w-4 h-4 bg-stone-950 border-amber-500 hover:bg-amber-500 hover:border-white hover:scale-110 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                    }`}>
                      <div className={`rounded-full transition-all duration-300 ${
                        isSelected 
                          ? "w-2 h-2 bg-white" 
                          : "w-1.5 h-1.5 bg-amber-400 animate-pulse"
                      }`} />
                    </div>

                    {/* Pin Text Label Card - Intelligently placed to avoid boundaries */}
                    <div className={`absolute whitespace-nowrap px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 shadow-md pointer-events-none select-none z-50 ${
                      isSelected
                        ? "bg-stone-950 text-white border-stone-950 opacity-100 scale-100"
                        : "bg-white text-stone-800 border-stone-200 opacity-80 group-hover:opacity-100 scale-95 group-hover:scale-100"
                    } ${labelPlacementClass}`}>
                      <span className="text-[9px] text-[#f97316] block font-extrabold leading-none mb-0.5">
                        {pin.city} ● 대한민국 제과명장
                      </span>
                      <span className="flex items-center gap-1 text-stone-900">
                        {pin.master}
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
