import { Address, Prisma } from "@prisma/client";

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

export type GetCategoryProductsOptions = {
  categorySlug: string;
  status?: string;
  sortKey?: string;
  reverse?: boolean;
};

export type Product = Prisma.ProductGetPayload<{
  include: { category: true };
  omit: { categoryId: true };
}>;

export type OrderItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  product: {
    id: string;
    name: string;
    image: string;
  };
};

export type Order = {
  id: string;
  items: OrderItem[];
  user: { id: string; name: string; email: string };
  paymentIntentId: string;
  paymentStatus: string;
  deliveryStatus: string;
  createdAt: Date;
  updatedAt: Date;
  address: Address | null;
  totalQuantity: number;
  totalAmount: number;
};

export type OrderWithProducts = Prisma.OrderGetPayload<{
  select: {
    items: {
      select: {
        product: {
          select: { id: true; name: true; image: true };
        };
        id: true;
        quantity: true;
        unitPrice: true;
      };
    };
    id: true;
    user: { select: { id: true; name: true; email: true } };
    paymentIntentId: true;
    paymentStatus: true;
    deliveryStatus: true;
    createdAt: true;
    updatedAt: true;
    address: true;
  };
}>;
