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

export type Cart = CartWithProducts & {
  totalQuantity: number;
  totalAmount: number;
};

export type CartItem = Prisma.CartItemGetPayload<{
  select: {
    id: true;
    quantity: true;
    product: {
      omit: { createdAt: true; updatedAt: true };
    };
  };
}>;
