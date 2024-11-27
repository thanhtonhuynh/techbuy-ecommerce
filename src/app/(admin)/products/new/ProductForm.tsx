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
import { NewProductInput, NewProductSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addProductAction } from "./actions";

export function ProductForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewProductInput>({
    resolver: zodResolver(NewProductSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
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

  async function onSubmit(data: NewProductInput) {
    startTransition(async () => {
      const { error } = await addProductAction(data);

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
                <Input {...field} placeholder="The best phone ever" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} placeholder="iPhone" />
              </FormControl>
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
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl className="border">
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  dropzoneOptions={dropZoneConfig}
                  className="rounded-lg p-2"
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
