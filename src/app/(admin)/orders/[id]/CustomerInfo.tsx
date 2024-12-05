import { Order } from "@/types";

export function CustomerInfo({ order }: { order: Order }) {
  return (
    <>
      <div className="flex justify-between">
        <span className="font-medium">User ID</span>
        <span>{order.user.id}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Name</span>
        <span>{order.user.name}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Email</span>
        <span>{order.user.email}</span>
      </div>
    </>
  );
}
