import { Order } from "@/types";

export function CustomerInfo({ order }: { order: Order }) {
  return (
    <>
      <p className="flex justify-between">
        <span>User ID</span>
        <span>{order.user.id}</span>
      </p>

      <p className="flex justify-between">
        <span>Name</span>
        <span>{order.user.name}</span>
      </p>

      <p className="flex justify-between">
        <span>Email</span>
        <span>{order.user.email}</span>
      </p>
    </>
  );
}
