"use client";

import { useState } from "react";
import { useCart } from "@/features/cart/CartProvider";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  function placeOrder() {
    setPlaced(true);
    clearCart();
  }

  return (
    <main className="mx-auto mt-4 max-w-3xl rounded bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-slate-600">Review your order and place it.</p>

      {placed ? (
        <section className="mt-6 rounded border border-green-200 bg-green-50 p-4">
          <h2 className="font-semibold text-green-800">Order placed successfully!</h2>
          <p className="mt-1 text-sm text-green-700">
            Thank you for shopping. A confirmation message will be sent shortly.
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

          <button
            className="mt-6 rounded bg-brand px-4 py-2 text-sm font-semibold text-white"
            disabled={items.length === 0}
            onClick={placeOrder}
            type="button"
          >
            Place Order
          </button>
        </>
      )}
    </main>
  );
}
