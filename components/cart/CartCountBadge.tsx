"use client";

import { useCart } from "@/features/cart/CartProvider";

export function CartCountBadge() {
  const { totalItems } = useCart();

  return (
    <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-xs font-bold text-slate-900">
      {totalItems}
    </span>
  );
}
