import { SortFilterItem } from "@/constants";
import { FilterItem } from "./FilterItem";

export function FilterList({ list }: { list: SortFilterItem[] }) {
  return (
    <nav className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8">
      <h3 className="text-sm font-normal text-muted-foreground">Sort by</h3>

      <ul className="flex space-x-4">
        {list.map((item, i) => (
          <FilterItem key={i} item={item} />
        ))}
      </ul>
    </nav>
  );
}
