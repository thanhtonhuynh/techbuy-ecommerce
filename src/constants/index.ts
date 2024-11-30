export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: undefined | "purchasedCount" | "createdAt" | "price";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: undefined,
  reverse: false,
};

export const sortFilters: SortFilterItem[] = [
  defaultSort,
  { title: "Most popular", slug: "most-popular", sortKey: "purchasedCount", reverse: true }, // desc
  { title: "Latest arrivals", slug: "latest-desc", sortKey: "createdAt", reverse: true },
  { title: "Price: Low to High", slug: "price-asc", sortKey: "price", reverse: false },
  { title: "Price: High to Low", slug: "price-desc", sortKey: "price", reverse: true },
];

export const DELIVERY_STATUSES = [
  "awaiting payment",
  "pending",
  "scheduled",
  "shipped",
  "delivered",
];
