"use client";

import { LoadingButton } from "@/components/buttons/LoadingButton";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/extension/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EditProductSchema, NewProductSchema, ProductInput } from "@/lib/validations/product";
import { Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editProductAction } from "../[id]/edit/actions";
import { addProductAction } from "./actions";

export function ProductForm({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProductInput>({
    resolver: zodResolver(product ? EditProductSchema : NewProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      categoryId: product?.category.id || "",
      image: [],
    },
  });
  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4, // 4MB
    multiple: false,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  } satisfies DropzoneOptions;

  async function onSubmit(data: ProductInput) {
    startTransition(async () => {
      const error = product
        ? await editProductAction(product.id, data)
        : await addProductAction(data);

      if (error) toast.error(error);
      else {
        form.reset();
        toast.success("Product created successfully");
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
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="iPhone 16 Pro" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="The best phone ever" className="h-32" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price in Cents</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="0"
                  onFocus={(e) => e.target.select()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Image</FormLabel>

              {product && (
                <div className="flex items-center gap-1.5 text-sm font-medium leading-none tracking-tight">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="aspect-auto rounded-md object-cover"
                    width={128}
                    height={128}
                  />
                  <span>{product.image.split("/").slice(-1)[0]}</span>
                </div>
              )}

              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropZoneConfig}
                  className="rounded-lg border p-2"
                >
                  <FileInput>
                    <ImagePlus size={20} />
                    <p>
                      <span className="font-semibold">Click to upload</span>
                      &nbsp; or drag and drop
                    </p>
                    <p className="text-xs">PNG, JPEG, JPG or WEBP</p>
                  </FileInput>

                  {field.value && field.value.length > 0 && (
                    <FileUploaderContent>
                      {field.value.map((file, i) => (
                        <FileUploaderItem key={i} index={i}>
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="aspect-auto rounded-md object-cover"
                            width={128}
                            height={128}
                          />
                          <span>{file.name}</span>
                        </FileUploaderItem>
                      ))}
                    </FileUploaderContent>
                  )}
                </FileUploader>
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
