import React, { useState } from "react";
import { X, Trash2, Plus, Minus, CreditCard, ChevronRight, CheckCircle2, Bell } from "lucide-react";
import { DoughItem } from "../types";

interface CartItem {
  item: DoughItem;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  notifications: string[]; // DoughIds registered for notification
  onRemoveNotification: (id: string) => void;
  allDoughs: DoughItem[];
  isLoggedIn?: boolean;
  onRedirectLogin?: () => void;
  userStoreName?: string;
  onGoToCheckout?: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  notifications,
  onRemoveNotification,
  allDoughs,
  isLoggedIn = false,
  onRedirectLogin = () => {},
  userStoreName = "",
  onGoToCheckout = () => {},
}: CartSidebarProps) {
  const [shopName, setShopName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [contact, setContact] = useState("");
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  React.useEffect(() => {
    if (isLoggedIn && userStoreName) {
      setShopName(userStoreName);
    }
  }, [isLoggedIn, userStoreName]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, cItem) => sum + cItem.item.price * cItem.quantity,
    0
  );
  
  const deliveryFee = subtotal > 150000 || subtotal === 0 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsOrdering(true);
    // Simulate server-side order receipt processing
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      setOrderId(`KCT-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const handleReset = () => {
    onClearCart();
    setOrderSuccess(false);
    setShopName("");
    setContact("");
    setDeliveryDate("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Black backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-stone-200">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-stone-900">장바구니 & 대기목록</h2>
              <p className="text-xs text-stone-400">발제 주문 및 알람 신청 내역</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!orderSuccess ? (
            <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
              {/* Product list */}
              <div className="flex-1 px-6 py-4">
                {cartItems.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-stone-400 gap-3 border-2 border-dashed border-stone-100 rounded-2xl mb-6">
                    <ShoppingBagIcon />
                    <span className="text-sm font-medium">장바구니가 비어 있습니다.</span>
                    <span className="text-xs text-stone-400">명장의 생지 컬렉션을 담아보세요.</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase font-extrabold tracking-widest text-stone-400 mb-2">선택한 프리미엄 생지</h3>
                    {cartItems.map(({ item, quantity }) => (
                      <div 
                        key={item.id}
                        className="flex gap-4 p-3 rounded-xl border border-stone-100 bg-white shadow-xs hover:shadow-sm transition-shadow"
                      >
                        <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-center p-1 text-xs font-bold leading-tight ${item.iconBg}`}>
                          {item.region}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-stone-900 truncate">{item.name}</h4>
                          <p className="text-xs text-stone-400 mb-2">{item.masterName}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-stone-900">
                              ₩ {item.price.toLocaleString()}
                            </span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2 border border-stone-200 rounded-full bg-stone-50 p-0.5">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white text-stone-600 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-semibold px-1 w-4 text-center">{quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white text-stone-600 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 rounded text-stone-300 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Notification applications */}
                <div className="mt-8 border-t border-stone-100 pt-6">
                  <h3 className="text-xs uppercase font-extrabold tracking-widest text-stone-400 mb-3 flex items-center gap-1.5">
                    <Bell className="w-3..5 h-3.5 text-stone-500" />
                    숙성 알림 신청 현황 ({notifications.length})
                  </h3>
                  {notifications.length === 0 ? (
                    <p className="text-xs text-stone-400 italic">현재 신청된 생산 알림이 없습니다.</p>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map((id) => {
                        const matched = allDoughs.find((d) => d.id === id);
                        if (!matched) return null;
                        return (
                          <div 
                            key={id} 
                            className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs"
                          >
                            <div className="min-w-0 pr-2">
                              <p className="font-semibold text-stone-800 truncate">{matched.name}</p>
                              <p className="text-[10px] text-stone-400">{matched.masterName} · 생산 대기 중</p>
                            </div>
                            <button
                              onClick={() => onRemoveNotification(id)}
                              className="text-stone-300 hover:text-stone-700 transition-colors font-medium cursor-pointer flex-shrink-0"
                            >
                              해제
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing & Checkout Form */}
              {cartItems.length > 0 && (
                <div className="border-t border-stone-200 bg-stone-50 p-6 space-y-4">
                  <div className="space-y-2 text-sm text-stone-600">
                    <div className="flex justify-between">
                      <span>상품 소계</span>
                      <span className="font-semibold text-stone-900">₩ {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>콜드체인 배송비</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-stone-500 text-xs font-semibold bg-stone-200/60 px-2 py-0.5 rounded">
                            ₩ 15만 이상 무료
                          </span>
                        ) : (
                          `₩ ${deliveryFee.toLocaleString()}`
                        )}
                      </span>
                    </div>
                    <div className="border-t border-stone-200/80 my-2" />
                    <div className="flex justify-between text-base font-bold text-stone-900 pt-1">
                      <span>최종 합계</span>
                      <span className="text-lg text-stone-950">₩ {total.toLocaleString()}</span>
                    </div>
                  </div>

                  {!isLoggedIn ? (
                    <div className="bg-amber-50/80 border border-amber-200/50 p-4 rounded-xl text-center space-y-3 mt-4">
                      <p className="text-[11px] font-semibold text-stone-750 leading-relaxed">
                        🚨 <span className="text-amber-800 font-extrabold">로그인 상태가 아닙니다!</span> <br/>
                        가맹점 계약 관리 및 물량 수급을 위해 <br/>
                        점주 인증 후 주문 및 결제 단계로 진입할 수 있습니다.
                      </p>
                      <button
                        type="button"
                        onClick={onRedirectLogin}
                        className="w-full py-3 bg-stone-900 hover:bg-black text-[#f97316] hover:text-white rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm border border-[#f97316]/20"
                      >
                        에베인 로그인 →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div className="bg-stone-100/60 border border-stone-200/50 rounded-xl p-3 text-left">
                        <p className="text-[9px] uppercase font-bold text-stone-400">인증 가맹 매장</p>
                        <p className="text-xs font-black text-stone-800 flex items-center gap-1 mt-0.5">
                          🏪 {userStoreName || "인증 가맹점"} <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">B2B 인증완료</span>
                        </p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={onGoToCheckout}
                        className="w-full py-3 bg-[#f97316] hover:bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-101"
                      >
                        <CreditCard className="w-4 h-4" />
                        주문서 작성 및 결제진행하기 ({cartItems.length}개)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Order success view */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-50/50">
              <CheckCircle2 className="w-16 h-16 text-stone-900 mb-4 animate-scale-up" />
              <h3 className="text-xl font-extrabold text-stone-900 mb-1">발주 신청 완료</h3>
              <p className="text-xs text-stone-400 mb-6">주문하신 계약 원장이 KCT 허브에 접수되었습니다.</p>

              <div className="w-full bg-white border border-stone-200/80 rounded-2xl p-5 text-left text-xs space-y-2.5 mb-8 shadow-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">발주 번호</span>
                  <span className="font-mono font-bold text-stone-900">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">신청 매장</span>
                  <span className="font-bold text-stone-900">{shopName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">희망 일자</span>
                  <span className="font-bold text-stone-900">{deliveryDate}</span>
                </div>
                <div className="flex justify-between border-t border-stone-100 pt-2.5 mt-2">
                  <span className="font-semibold text-stone-800">최종 청구액</span>
                  <span className="font-extrabold text-stone-950">₩ {total.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 leading-relaxed mb-8 max-w-xs">
                KCT Smart Pro 냉동 유통선으로 배송 전날 스마트 기기로 바코드 최적 설정 모듈이 즉각 자동 동기화됩니다.
              </p>

              <button
                onClick={handleReset}
                className="w-full max-w-xs py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer"
              >
                쇼핑 계속하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 border border-stone-100">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    </div>
  );
}
