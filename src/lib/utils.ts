import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NestedCategory, CategoryInputValue, ProductFormData, CategoryFormData} from "./types";
import { Category } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)

  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const name = decodeURIComponent(segment)
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

    return { name, link: href }
  })
  return [{ name: 'Home', link: '/' }, ...breadcrumbItems]
}

export function buildNestedCategories(categories: Category[]) {
  /*
  funtion to build nested category path for ui navigation
  */
  const categoryMap = new Map<string, NestedCategory>();
  categories.map((cat) => (
    categoryMap.set(cat.id, {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      link: "",
      children: []
    })
  ))

  const nestedCategories: NestedCategory[] = [];

  categories.forEach((cat) => {

    const node = categoryMap.get(cat.id);

    if (!node) return;

    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId.toString());

      if (!parent || !parent.children) return;

      node.link = `${parent.link}/${node.slug}`;

      parent.children.push(node);

    } else {
      node.link = `/product-category/${node.slug}`;
      nestedCategories.push(node)
    }
  })

  return nestedCategories
}


export function productFormDataToFormData(data: ProductFormData): FormData {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("brand", data.brand);
  formData.append("categoryId", data.categoryId);
  formData.append("variantType", data.variantType);

  for (let i = 0; i < data.images.length; i++) {
    formData.append("images", data.images[i]);
  }

  formData.append("variants", JSON.stringify(data.variants));

  return formData;
}

export function categoryFormDataToFormData(data: CategoryFormData) {
  const formData = new FormData();

  if (data.parentId && data.parentId != "none") {
    formData.append("parentId", data.parentId);
  }
  formData.append("name", data.name);
  
  formData.append("featured", String(data.featured));

  if (data.image instanceof FileList && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }

  return formData;
}

export async function tryCatch<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err as Error, null];
  }
}

export async function sleep(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}