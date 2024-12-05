import { SortFilterItem } from "@/constants";
import { FilterItem } from "./FilterItem";

export function FilterList({ list }: { list: SortFilterItem[] }) {
  return (
    <nav className="space-y-1">
      <ul className="flex space-x-4">
        {list.map((item, i) => (
          <FilterItem key={i} item={item} />
        ))}
      </ul>
    </nav>
  );
}
