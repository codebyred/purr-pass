import mongoose, { Schema, model, InferSchemaType, models } from "mongoose";

const variantOptionSchema = new Schema(
  {
    name: { type: String, required: true },
    affectsPrice: { type: Boolean, required: true },
    values: { type: [String], required: true },
  },
  { _id: false }
);

const variantSchema = new Schema(
  {
    sku: { type: String, required: true },
    values: { type: Map, of: String, required: false },
    currPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    isDefault: { type: Boolean, required: true },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
);

const categorySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: {
      type: imageSchema,
      required: true 
    }
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

const productSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: { type: [imageSchema], required: true },
    variantOptions: { type: [variantOptionSchema], required: true },
    variants: { type: [variantSchema], required: true },
  },
  {
    timestamps: true,
    collection: "products",
  }
);


type Product = InferSchemaType<typeof productSchema>;
type Category = InferSchemaType<typeof categorySchema>;
export const ProductModel =
  mongoose.models.Product as mongoose.Model<Product> || model<Product>("Product", productSchema);

export const CategoryModel =
  mongoose.models.Category as mongoose.Model<Category> || model<Category>("Category", categorySchema);
