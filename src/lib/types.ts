import { z } from "zod";

export const fileSchema = z
  .any()
  .refine((files) => files instanceof FileList && files.length > 0, {
    message: "At least one file is required",
});

export const variantFormDataSchema = z.object({
  value: z.string(),
  discount: z.number().optional(),
  price: z.number().optional(),
  isDefault: z.boolean(),
});

export const productFormDataSchema = z.object({
  name: z.string(),
  brand: z.string(),
  categoryId: z.string(),
  images: fileSchema,
  variantType: z.string(),
  variants: z.array(variantFormDataSchema),
});

export type ProductFormData = z.infer<typeof productFormDataSchema>;

export type VariantInputValue = {
  name: string,
  value: string
}

export type CategoryInputValue = {
  name: string,
  value: string
}

export type NestedCategory = {
  id: string;
  name: string;
  link: string;
  children?: NestedCategory[];
};

export type FlatCategory = {
  id: string;
  name: string;
  parentId?: string;
};
