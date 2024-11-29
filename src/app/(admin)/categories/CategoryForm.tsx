"use client";

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
import { CategoryInput, CategorySchema } from "@/lib/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addCategoryAction } from "./actions";

export function CategoryForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CategoryInput>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  async function onSubmit(data: CategoryInput) {
    startTransition(async () => {
      const error = await addCategoryAction(data);

      if (error) toast.error(error);
      else {
        form.reset();
        toast.success("Category added successfully");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Example: iPhone" />
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
                <Input {...field} placeholder="Example: iphone" />
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
