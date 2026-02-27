"use client";

import { Product } from "@/data/products";
import { useCart } from "@/features/cart/CartProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      className="rounded bg-brand px-3 py-1.5 text-xs font-semibold text-white"
      onClick={() => addItem(product)}
      type="button"
    >
      Add to Cart
    </button>
  );
}
