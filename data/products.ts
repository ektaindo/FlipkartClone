export type Product = {
  id: string;
  name: string;
  brand: string;
  rating: number;
  salePrice: number;
  originalPrice: number;
};

export const categories = [
  "Top Offers",
  "Mobiles",
  "Fashion",
  "Electronics",
  "Home",
  "Appliances",
  "Travel",
  "Beauty"
];

export const products: Product[] = [
  {
    id: "1",
    name: "Noise Air Buds Pro 3",
    brand: "Noise",
    rating: 4.2,
    salePrice: 1799,
    originalPrice: 4999
  },
  {
    id: "2",
    name: "Samsung Galaxy M14 5G",
    brand: "Samsung",
    rating: 4.4,
    salePrice: 12999,
    originalPrice: 16999
  },
  {
    id: "3",
    name: "ASUS Vivobook 15",
    brand: "ASUS",
    rating: 4.1,
    salePrice: 38990,
    originalPrice: 54990
  },
  {
    id: "4",
    name: "Puma Club II Sneakers",
    brand: "Puma",
    rating: 4.3,
    salePrice: 2499,
    originalPrice: 4999
  }
];
