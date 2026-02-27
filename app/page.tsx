import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";

export default function HomePage() {
  return (
    <main>
      <Header />

      <section className="mx-auto mt-4 max-w-6xl rounded bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-4 max-w-6xl rounded bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Best Deals on Top Picks</h2>
          <button className="rounded bg-brand px-4 py-2 text-sm font-semibold text-white">
            View All
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
