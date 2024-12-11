import { LoadingButton } from "@/components/buttons/LoadingButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CategoryInput, CategorySchema } from "@/lib/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addCategoryAction, updateCategoryAction } from "./actions";

export function CategoryForm({
  className,
  setOpen,
  category,
}: {
  className?: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  category?: Category;
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
    },
  });

  async function onSubmit(data: CategoryInput) {
    startTransition(async () => {
      const error = category
        ? await updateCategoryAction(category.id, data)
        : await addCategoryAction(data);

      if (error) toast.error(error);
      else {
        setOpen(false);
        toast.success("Category added successfully");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Example: iPhone"
                  className="text-sm"
                  onFocus={(e) => e.target.select()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormDescription>Unique identifier for the category</FormDescription>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Example: iphone"
                  className="text-sm"
                  onFocus={(e) => e.target.select()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" className="w-full" loading={isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
