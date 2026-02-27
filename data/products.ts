export type ProductCategory =
  | "mobiles"
  | "fashion"
  | "electronics"
  | "home"
  | "appliances"
  | "beauty";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  rating: number;
  salePrice: number;
  originalPrice: number;
  description: string;
};

export const categories: { label: string; value: ProductCategory }[] = [
  { label: "Mobiles", value: "mobiles" },
  { label: "Fashion", value: "fashion" },
  { label: "Electronics", value: "electronics" },
  { label: "Home", value: "home" },
  { label: "Appliances", value: "appliances" },
  { label: "Beauty", value: "beauty" }
];

export const products: Product[] = [
  {
    id: "1",
    slug: "noise-air-buds-pro-3",
    name: "Noise Air Buds Pro 3",
    brand: "Noise",
    category: "electronics",
    rating: 4.2,
    salePrice: 1799,
    originalPrice: 4999,
    description: "ANC true wireless earbuds with fast charging and clear calls."
  },
  {
    id: "2",
    slug: "samsung-galaxy-m14-5g",
    name: "Samsung Galaxy M14 5G",
    brand: "Samsung",
    category: "mobiles",
    rating: 4.4,
    salePrice: 12999,
    originalPrice: 16999,
    description: "Long battery life 5G smartphone with smooth display experience."
  },
  {
    id: "3",
    slug: "asus-vivobook-15",
    name: "ASUS Vivobook 15",
    brand: "ASUS",
    category: "electronics",
    rating: 4.1,
    salePrice: 38990,
    originalPrice: 54990,
    description: "Thin-and-light laptop for daily productivity and student work."
  },
  {
    id: "4",
    slug: "puma-club-ii-sneakers",
    name: "Puma Club II Sneakers",
    brand: "Puma",
    category: "fashion",
    rating: 4.3,
    salePrice: 2499,
    originalPrice: 4999,
    description: "Comfortable everyday sneakers with sporty casual styling."
  },
  {
    id: "5",
    slug: "philips-air-fryer-hd9200",
    name: "Philips Air Fryer HD9200",
    brand: "Philips",
    category: "appliances",
    rating: 4.5,
    salePrice: 6999,
    originalPrice: 9999,
    description: "Healthy low-oil cooking appliance with rapid air technology."
  },
  {
    id: "6",
    slug: "lakme-sun-expert-spf-50",
    name: "Lakme Sun Expert SPF 50",
    brand: "Lakme",
    category: "beauty",
    rating: 4.0,
    salePrice: 399,
    originalPrice: 599,
    description: "Lightweight sunscreen lotion suitable for daily UV protection."
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryLabel(category: ProductCategory) {
  return categories.find((item) => item.value === category)?.label ?? category;
}
