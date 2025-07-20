import { z } from "zod";
import { maxFileSize } from "./const";

export const fileSchema = z
  .any()
  .refine((files) => files instanceof FileList && files.length > 0, {
    message: "At least one file is required", 
  })
  .refine((files)=>{
    if(!(files instanceof FileList)) return false
    return Array.from(files).every((file)=> file.size <= maxFileSize)
  }, {message: "Each file must be less than or equal to 10MB"})

export const variantValueSchema = z.object({
  id: z.string().optional(),
  name: z.string()
})

export type VariantValue = z.infer<typeof variantValueSchema>

export const variantFormDataSchema = z.object({
  value: z.string().min(1, { message: "Variant value is required" }),
  stock: z.number().optional(),
  discount: z.number().optional(),
  price: z.number().optional(),
  isDefault: z.boolean(),
});

export type VariantFormData = z.infer<typeof variantFormDataSchema>

export const categoryFomDataSchema = z.object({
  name: z.string(),
  parentId: z.string().nullable(),
  featured: z.boolean(),
  image: z.any()
})

export type CategoryFormData = z.infer<typeof categoryFomDataSchema>

export const productFormDataSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters" }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters" }),
  categoryId: z.string(),
  featured: z.boolean(),
  images: fileSchema,
  variantType: z.string(),
  variants: z.array(variantFormDataSchema),
});

export type ProductFormData = z.infer<typeof productFormDataSchema>;

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
  url: z.string(),
  alt: z.string(),
});
export type Image = z.infer<typeof imageSchema>;

export const categorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  parentId: z.string().nullable(),
  image:imageSchema,
  featured: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Category = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  brand: z.string(),
  category: z.union([z.string(), categorySchema]),
  images: z.array(imageSchema),
  variantOptions: z.array(variantOptionSchema),
  variants: z.array(variantSchema),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Product = z.infer<typeof productSchema>;

export type PartialProduct = Pick<Product, "id" | "name" | "brand" | "category">;

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




