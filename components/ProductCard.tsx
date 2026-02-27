import { Product } from "@/data/products";

function discountPercentage(originalPrice: number, salePrice: number) {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercentage(product.originalPrice, product.salePrice);

  return (
    <article className="rounded-lg bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 h-32 rounded bg-slate-100" />
      <h3 className="line-clamp-2 text-sm font-semibold">{product.name}</h3>
      <p className="mt-1 text-xs text-slate-500">{product.brand}</p>
      <p className="mt-2 inline-flex rounded bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
        {product.rating} ★
      </p>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-base font-bold">
          ₹{product.salePrice.toLocaleString("en-IN")}
        </span>
        <span className="text-xs text-slate-500 line-through">
          ₹{product.originalPrice.toLocaleString("en-IN")}
        </span>
        <span className="text-xs font-semibold text-green-700">{discount}% off</span>
      </div>
    </article>
  );
}
