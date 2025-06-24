import mongoose from "mongoose";

const VariantOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affectsPrice: { type: Boolean, required: true },
  values: { type: [String], required: true },
});

const VariantSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  values: {
    type: Map,
    of: String,
    required: false,
  },
  currPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  isDefault: { type: Boolean, required: true },
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: { type: [String], required: true },
  variantOptions: { type: [VariantOptionSchema], default: [] },
  variants: { type: [VariantSchema], required: true },
});

export const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);
