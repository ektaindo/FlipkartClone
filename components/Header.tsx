import Link from "next/link";
import { CartCountBadge } from "@/components/cart/CartCountBadge";
import { AuthStatus } from "@/components/auth/AuthStatus";

export function Header() {
  return (
    <header className="bg-brand px-4 py-3 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <Link href="/" className="no-underline">
          <p className="text-xl font-bold leading-none text-white">Flipkart</p>
          <p className="text-xs text-blue-100">Explore Plus</p>
        </Link>
        <input
          className="h-10 w-full rounded-sm border-0 px-3 text-sm text-slate-900 outline-none"
          placeholder="Search for products, brands and more"
          type="text"
        />
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <Link href="/products">Products</Link>
          <Link className="inline-flex items-center gap-1" href="/cart">
            Cart <CartCountBadge />
          </Link>
          <Link href="/checkout">Checkout</Link>
          <Link href="/orders">Orders</Link>
          <AuthStatus />
        </nav>
      </div>
    </header>
  );
}
