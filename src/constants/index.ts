export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: undefined | "BEST_SELLNG" | "createdAt" | "price";
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
  // { title: "Trending", slug: "trending", sortKey: "BEST_SELLNG", reverse: false },
  { title: "Latest arrivals", slug: "latest-desc", sortKey: "createdAt", reverse: true },
  { title: "Price: Low to High", slug: "price-asc", sortKey: "price", reverse: false },
  { title: "Price: High to Low", slug: "price-desc", sortKey: "price", reverse: true },
];
