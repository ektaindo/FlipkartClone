import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto mt-4 max-w-6xl rounded bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.value}
              href={`/products?category=${category.value}`}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-6xl rounded bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Best Deals on Top Picks</h2>
          <Link
            href="/products"
            className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
