import Link from "next/link";
import { CartCountBadge } from "@/components/cart/CartCountBadge";

const loginMenuItems = [
  { label: "My Profile", href: "/profile" },
  { label: "Order", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Orders", href: "/orders" },
  { label: "Rewards", href: "/rewards" },
  { label: "Gift Cards", href: "/gift-cards" }
];

export function Header() {
  return (
    <header className="bg-brand px-4 py-3 text-white shadow-md">
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex justify-end text-xs text-blue-100">
          <span>
            Delivery location: <strong className="text-white">560001, Bengaluru</strong>
          </span>
        </div>

        <div className="flex items-center gap-4">
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

            <button
              className="rounded-sm border border-white/40 px-3 py-1.5"
              type="button"
            >
              More
            </button>

            <div className="group relative">
              <button
                className="rounded-sm bg-white px-5 py-1.5 font-semibold text-brand"
                type="button"
              >
                Login
              </button>

              <div className="invisible absolute right-0 top-[calc(100%+8px)] z-30 w-64 rounded bg-white text-slate-700 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm">
                  <span className="font-medium text-slate-700">New customer?</span>
                  <Link className="font-semibold text-brand" href="/signup">
                    Sign Up
                  </Link>
                </div>

                <ul className="py-2 text-sm">
                  {loginMenuItems.map((item) => (
                    <li key={item.label}>
                      <Link
                        className="block px-4 py-2 hover:bg-slate-100"
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
