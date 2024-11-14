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
