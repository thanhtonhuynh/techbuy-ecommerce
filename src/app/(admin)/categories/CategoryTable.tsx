import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategoriesWithProductCount } from "@/data-access/category";
import { CategoryActions } from "./CategoryActions";

export async function CategoryTable() {
  const categories = await getCategoriesWithProductCount();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>Slug</TableHead>

          <TableHead>Products</TableHead>

          <TableHead className="w-10">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.length ? (
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold">{category.name}</span>
                  <span className="text-muted-foreground">{category.id}</span>
                </div>
              </TableCell>

              <TableCell>{category.slug}</TableCell>

              <TableCell>{category._count.products}</TableCell>

              <TableCell>
                <CategoryActions category={category} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center font-bold">
              No categories found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
