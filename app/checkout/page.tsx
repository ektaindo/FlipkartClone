"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/CartProvider";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function placeOrder() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.salePrice
          }))
        })
      });

      const json = (await response.json()) as { message?: string };
      if (!response.ok) {
        setError(json.message ?? "Unable to place order.");
        return;
      }

      setPlaced(true);
      clearCart();
    } catch {
      setError("Network error while placing order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto mt-4 max-w-3xl rounded bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-slate-600">Review your order and place it.</p>

      {placed ? (
        <section className="mt-6 rounded border border-green-200 bg-green-50 p-4">
          <h2 className="font-semibold text-green-800">Order placed successfully!</h2>
          <p className="mt-1 text-sm text-green-700">
            Payment status is currently <strong>pending</strong>. Check your Orders page.
          </p>
        </section>
      ) : (
        <>
          <section className="mt-6 space-y-2 rounded border border-slate-200 p-4">
            <h2 className="font-semibold">Order Summary ({items.length} items)</h2>
            {items.map((item) => (
              <div className="flex justify-between text-sm" key={item.product.id}>
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>
                  ₹{(item.product.salePrice * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
            <div className="border-t pt-2 font-bold">
              Total: ₹{subtotal.toLocaleString("en-IN")}
            </div>
          </section>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button
            className="mt-6 rounded bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            disabled={items.length === 0 || loading}
            onClick={placeOrder}
            type="button"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </>
      )}
    </main>
  );
}
