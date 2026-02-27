"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/CartProvider";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <main className="mx-auto mt-4 max-w-6xl rounded bg-white p-4 shadow-sm">
      <h1 className="text-xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <section className="mt-4 rounded border border-dashed border-slate-300 p-6 text-center">
          <p className="text-slate-600">Your cart is empty.</p>
          <Link
            className="mt-3 inline-block rounded bg-brand px-4 py-2 text-white"
            href="/products"
          >
            Browse products
          </Link>
        </section>
      ) : (
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
          <section className="space-y-3">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="rounded border border-slate-200 p-3"
              >
                <h2 className="font-semibold">{item.product.name}</h2>
                <p className="text-sm text-slate-500">
                  ₹{item.product.salePrice.toLocaleString("en-IN")}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    className="rounded border px-2"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="rounded border px-2"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                  <button
                    className="ml-auto text-sm font-semibold text-red-600"
                    onClick={() => removeItem(item.product.id)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded border border-slate-200 p-4">
            <h2 className="font-semibold">Price Details</h2>
            <div className="mt-3 flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-green-700">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="mt-3 border-t pt-3 font-bold">
              Total: ₹{subtotal.toLocaleString("en-IN")}
            </div>
            <Link
              className="mt-4 block rounded bg-brand px-4 py-2 text-center text-sm font-semibold text-white"
              href="/checkout"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
