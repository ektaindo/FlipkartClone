import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { getCategoryLabel, getProductBySlug } from "@/data/products";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const discount = Math.round(
    ((product.originalPrice - product.salePrice) / product.originalPrice) * 100
  );

  return (
    <main className="mx-auto mt-4 max-w-6xl rounded bg-white p-6 shadow-sm">
      <Link className="text-sm text-brand" href="/products">
        ← Back to products
      </Link>

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="h-80 rounded bg-slate-100" />
        <section>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Brand: {product.brand}</p>
          <p className="text-sm text-slate-600">
            Category: {getCategoryLabel(product.category)}
          </p>
          <p className="mt-3 text-sm text-slate-700">{product.description}</p>

          <p className="mt-4 inline-flex rounded bg-green-600 px-2 py-1 text-sm font-medium text-white">
            {product.rating} ★
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-bold">
              ₹{product.salePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-sm text-slate-500 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-semibold text-green-700">{discount}% off</span>
          </div>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </section>
      </div>
    </main>
  );
}
