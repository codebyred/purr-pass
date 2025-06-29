import mongoose, { Schema, Document, model } from "mongoose";

interface VariantOption {
  name: string;
  affectsPrice: boolean;
  values: string[];
}

interface Variant {
  sku: string;
  values?: Record<string, string>;
  currPrice: number;
  originalPrice: number;
  isDefault: boolean;
}

interface Image {
  src: string;
  alt: string;
}

interface Product extends Document {
  name: string;
  brand: string;
  category: {
    id: string;
    name: string;
  };
  images: Image[];
  variantOptions: VariantOption[];
  variants: Variant[];
}

const VariantOptionSchema = new Schema<VariantOption>(
  {
    name: { type: String, required: true },
    affectsPrice: { type: Boolean, required: true },
    values: { type: [String], required: true },
  },
  { _id: false }
);

const VariantSchema = new Schema<Variant>(
  {
    sku: { type: String, required: true },
    values: { type: Map, of: String, required: false },
    currPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    isDefault: { type: Boolean, required: true },
  },
  { _id: false }
);

const ImageSchema = new Schema<Image>(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<Product>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  images: { type: [ImageSchema], required: true },
  variantOptions: { type: [VariantOptionSchema], required: true },
  variants: { type: [VariantSchema], required: true },
});


export const ProductModel = model<Product>("Product", ProductSchema);
