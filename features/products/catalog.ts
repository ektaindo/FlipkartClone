import { Product, ProductCategory, products } from "@/data/products";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating-desc";

export type ProductQuery = {
  q?: string;
  category?: ProductCategory;
  sort?: SortOption;
};

function bySearchQuery(list: Product[], query?: string) {
  if (!query) {
    return list;
  }

  const normalized = query.trim().toLowerCase();
  return list.filter((product) => {
    return (
      product.name.toLowerCase().includes(normalized) ||
      product.brand.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized)
    );
  });
}

function byCategory(list: Product[], category?: ProductCategory) {
  if (!category) {
    return list;
  }

  return list.filter((product) => product.category === category);
}

function bySort(list: Product[], sort: SortOption = "relevance") {
  const cloned = [...list];

  switch (sort) {
    case "price-asc":
      return cloned.sort((a, b) => a.salePrice - b.salePrice);
    case "price-desc":
      return cloned.sort((a, b) => b.salePrice - a.salePrice);
    case "rating-desc":
      return cloned.sort((a, b) => b.rating - a.rating);
    default:
      return cloned;
  }
}

export function filterProducts(query: ProductQuery) {
  const filtered = byCategory(bySearchQuery(products, query.q), query.category);
  return bySort(filtered, query.sort);
}
