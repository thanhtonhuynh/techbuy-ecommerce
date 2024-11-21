"use client";

import { Cart, CartItem } from "@/types";
import { Product } from "@prisma/client";
import { createContext, use, useContext, useMemo, useOptimistic } from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product } }
  | {
      type: "UPDATE_ITEM";
      payload: { productId: string; updateType: UpdateType };
    }
  | { type: "CLEAR_CART" };

type CartContextType = {
  optimisticCart: Cart | null;
  addOptimisticItem: (product: Product) => void;
  updateOptimisticItem: (productId: string, updateType: UpdateType) => void;
  clearOptimisticCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function createEmptyCart(): Cart {
  return {
    id: "",
    items: [],
    userId: null,
    totalQuantity: 0,
    totalAmount: 0,
  };
}

function createOrUpdateCartItem(itemInCart: CartItem | undefined, product: Product): CartItem {
  const quantity = itemInCart ? itemInCart.quantity + 1 : 1;

  return {
    id: itemInCart?.id || "",
    quantity,
    totalAmount: quantity * product.price,
    product: {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    },
  };
}

function updateCartItem(item: CartItem, updateType: UpdateType): CartItem | null {
  if (updateType === "delete") return null;

  const newQuantity = updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity === 0) return null;

  return {
    ...item,
    quantity: newQuantity,
    totalAmount: newQuantity * item.product.price,
  };
}

function cartReducer(state: Cart | null, action: CartAction): Cart {
  const currentCart = state || createEmptyCart();

  switch (action.type) {
    case "ADD_ITEM": {
      const { product } = action.payload;

      const itemInCart = currentCart.items.find((item) => item.product.id === product.id);
      const updatedItem = createOrUpdateCartItem(itemInCart, product);

      const updatedItems = itemInCart
        ? currentCart.items.map((item) => (item.product.id === product.id ? updatedItem : item))
        : [...currentCart.items, updatedItem];

      return {
        ...currentCart,
        items: updatedItems,
        totalQuantity: currentCart.totalQuantity + 1,
        totalAmount: currentCart.totalAmount + product.price,
      };
    }

    case "UPDATE_ITEM": {
      const { productId, updateType } = action.payload;

      const updatedItems = currentCart.items
        .map((item) => (item.product.id === productId ? updateCartItem(item, updateType) : item))
        .filter(Boolean) as CartItem[];

      return {
        ...currentCart,
        items: updatedItems,
        totalQuantity: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: updatedItems.reduce((sum, item) => sum + item.totalAmount, 0),
      };
    }

    case "CLEAR_CART":
      return createEmptyCart();

    default:
      return currentCart;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | null>;
}) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(initialCart, cartReducer);

  function addOptimisticItem(product: Product) {
    updateOptimisticCart({ type: "ADD_ITEM", payload: { product } });
  }

  function updateOptimisticItem(productId: string, updateType: UpdateType) {
    updateOptimisticCart({ type: "UPDATE_ITEM", payload: { productId, updateType } });
  }

  function clearOptimisticCart() {
    updateOptimisticCart({ type: "CLEAR_CART" });
  }

  const value = useMemo(
    () => ({
      optimisticCart,
      addOptimisticItem,
      updateOptimisticItem,
      clearOptimisticCart,
    }),
    [optimisticCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
