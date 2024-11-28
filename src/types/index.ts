import { Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  select: {
    items: {
      select: {
        product: {
          omit: { createdAt: true; updatedAt: true };
        };
        id: true;
        quantity: true;
      };
    };
    id: true;
    userId: true;
  };
}>;

export type CartItem = {
  id: string;
  quantity: number;
  totalAmount: number;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
};

export type Cart = {
  id: string;
  items: CartItem[];
  userId: string | null;
  totalQuantity: number;
  totalAmount: number;
};

export type GetProductsOptions = {
  status?: string;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
  page?: number;
  perPage?: number;
};
