import type { Product, Variant, VariantFormData } from "@/lib/types";
import { Image } from "@/lib/types";
import { tryCatch } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import slugify from "slugify";


