"use client";

import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { ProductsTable } from "./ProductsTable";

export function Products({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  return (
    <>
      <Input
        placeholder="Search products"
        onChange={(e) => {
          const query = e.target.value;
          setProducts(
            initialProducts.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase()),
            ),
          );
        }}
      />

      <ProductsTable products={products} />
    </>
  );
}
