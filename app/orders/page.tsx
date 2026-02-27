"use client";

import { useEffect, useState } from "react";

type OrderResponse = {
  orders: {
    id: string;
    subtotal: number;
    paymentStatus: "pending" | "paid" | "failed";
    createdAt: string;
    items: {
      name: string;
      quantity: number;
      price: number;
    }[];
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderResponse["orders"]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      const response = await fetch("/api/orders", { cache: "no-store" });
      const json = (await response.json()) as OrderResponse & { message?: string };
      if (!response.ok) {
        setError(json.message ?? "Please login to view orders.");
        return;
      }

      setOrders(json.orders);
    }

    loadOrders();
  }, []);

  return (
    <main className="mx-auto mt-4 max-w-4xl rounded bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">My Orders</h1>

      {error ? <p className="mt-3 text-red-600">{error}</p> : null}

      <div className="mt-4 space-y-3">
        {orders.map((order) => (
          <article className="rounded border border-slate-200 p-4" key={order.id}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Order #{order.id.slice(-6).toUpperCase()}</h2>
              <span className="text-sm font-medium text-amber-700">
                {order.paymentStatus}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {new Date(order.createdAt).toLocaleString("en-IN")}
            </p>
            <div className="mt-2 space-y-1 text-sm">
              {order.items.map((item, index) => (
                <p key={`${order.id}-${index}`}>
                  {item.name} × {item.quantity} - ₹
                  {(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              ))}
            </div>
            <p className="mt-2 font-semibold">
              Total: ₹{order.subtotal.toLocaleString("en-IN")}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
