import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, ProductCategory } from "@/data/products";
import { filterProducts, SortOption } from "@/features/products/catalog";

type SearchParams = {
  q?: string;
  category?: ProductCategory;
  sort?: SortOption;
};

export default function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  const q = searchParams.q ?? "";
  const category = searchParams.category;
  const sort = searchParams.sort ?? "relevance";

  const filteredProducts = filterProducts({ q, category, sort });

  return (
    <main className="mx-auto mt-4 max-w-6xl space-y-4">
      <section className="rounded bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold">Products</h1>
        <p className="mt-1 text-sm text-slate-600">
          Filter, sort, and search products with URL-synced query params.
        </p>

        <form className="mt-4 grid gap-3 md:grid-cols-4" method="get">
          <input
            className="rounded border border-slate-300 px-3 py-2 text-sm"
            defaultValue={q}
            name="q"
            placeholder="Search products or brand"
            type="text"
          />

          <select
            className="rounded border border-slate-300 px-3 py-2 text-sm"
            defaultValue={category ?? ""}
            name="category"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <select
            className="rounded border border-slate-300 px-3 py-2 text-sm"
            defaultValue={sort}
            name="sort"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating</option>
          </select>

          <div className="flex gap-2">
            <button
              className="rounded bg-brand px-3 py-2 text-sm font-semibold text-white"
              type="submit"
            >
              Apply
            </button>
            <Link
              className="rounded border border-slate-300 px-3 py-2 text-sm"
              href="/products"
            >
              Reset
            </Link>
          </div>
        </form>
      </section>

      <section className="rounded bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm text-slate-600">
          {filteredProducts.length} product(s) found
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
