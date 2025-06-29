import { z } from "zod";

export const variantOptionSchema = z.object({
  name: z.string(),
  affectsPrice: z.boolean(),
  values: z.array(z.string()),
});

export type VariantOption = z.infer<typeof variantOptionSchema>;

export const variantSchema = z.object({
  sku: z.string(),
  values: z.record(z.string()).optional(),
  currPrice: z.number(),
  originalPrice: z.number(),
  isDefault: z.boolean(),
});

export type Variant = z.infer<typeof variantSchema>;

export const imageSchema = z.object({
  src: z.string(),
  alt: z.string()
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.object({
    id: z.string(),
    name: z.string(),
  }),
  images: z.array(imageSchema),
  variantOptions: z.array(variantOptionSchema),
  variants: z.array(variantSchema),
});

export type Product = z.infer<typeof productSchema>;

export const productDataSchema = z.object({
  products: z.array(productSchema),
});

export type ProductData = z.infer<typeof productDataSchema>;


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
