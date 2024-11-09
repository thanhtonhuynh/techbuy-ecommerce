import { CircleAlert } from "lucide-react";

export default async function NotFound() {
  return (
    <section className="absolute left-1/2 top-1/2 w-screen -translate-x-1/2 -translate-y-1/2 p-2 md:w-2/3 md:p-0">
      <div className="flex items-center gap-4 rounded-md border border-destructive p-8 text-destructive shadow-md">
        <CircleAlert size={32} />

        <div className="flex flex-col gap-4">
          <h1>Access Denied!</h1>
          <p>
            The resource you are trying to access is restricted or not available
            at the moment.
          </p>
        </div>
      </div>
    </section>
  );
}
