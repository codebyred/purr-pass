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

export type VariantFormData = z.infer<typeof variantFormDataSchema>

export const productFormDataSchema = z.object({
  name: z.string(),
  brand: z.string(),
  categoryId: z.string(),
  images: fileSchema,
  variantType: z.string(),
  variants: z.array(variantFormDataSchema),
});

export type ProductFormData = z.infer<typeof productFormDataSchema>;

// Variant Option Schema
export const variantOptionSchema = z.object({
  name: z.string(),
  affectsPrice: z.boolean(),
  values: z.array(z.string()),
});
export type VariantOption = z.infer<typeof variantOptionSchema>;

// Variant Schema
export const variantSchema = z.object({
  sku: z.string(),
  values: z.record(z.string()).optional(),
  currPrice: z.number(),
  originalPrice: z.number(),
  isDefault: z.boolean(),
});
export type Variant = z.infer<typeof variantSchema>;

// Image Schema
export const imageSchema = z.object({
  url: z.string(),
  alt: z.string(),
});
export type Image = z.infer<typeof imageSchema>;

// Category Schema
export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Category = z.infer<typeof categorySchema>;

// Product Schema
export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.string(),
  images: z.array(imageSchema),
  variantOptions: z.array(variantOptionSchema),
  variants: z.array(variantSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Product = z.infer<typeof productSchema>;

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
  slug: string;
  name: string;
  link: string;
  children?: NestedCategory[];
};

