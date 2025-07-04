import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NestedCategory, CategoryInputValue, ProductFormData} from "./types";
import { Category } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findCategoryWithChildren(category: string, categories: NestedCategory[]) {

  for (const mainCat of categories) {
    const match = mainCat.children?.find((child) => child.name === category);
    if (match && match.children) {
      return match;
    }
  }
  return null;
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

export function extractLeafCategories(categories: NestedCategory[]) {
  const seen = new Set<string>();
  const result: CategoryInputValue[] = [];

  function traverse(nodes: NestedCategory[]) {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      } else if (node.name && !seen.has(node.name)) {
        seen.add(node.name);
        result.push({ name: node.name, value: node.name });
      }
    }
  }

  traverse(categories);
  return result;
}

export function buildNestedCategories(categories: Category[]) {
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

      node.link = `${parent.link}/${node.slug}}`;

      parent.children.push(node);

    } else {
      node.link = `/product-category`;
      nestedCategories.push(node)
    }
  })

  return nestedCategories
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
export function normalizeSlug(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function convertProductDataToFormData(data: ProductFormData): FormData {
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

export function generateSku(productFormData: ProductFormData, other:string[]) {
  const shortName = productFormData.name.replace(/\s+/g, "").substring(0, 3).toUpperCase();
  return `${shortName}-${other.join("-")}`
}

export async function tryCatch<T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err as Error, null];
  }
}