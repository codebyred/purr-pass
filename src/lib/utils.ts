import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Categories } from "./data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFeaturedCategories() {

  const featuredItems: string[] = [];

  function findFeatured(items: any[]) {
    for (const item of items) {
      if (item.featured) {
        featuredItems.push(item.name);
      }
      if (Array.isArray(item.children)) {
        findFeatured(item.children);
      }
    }
  }

  findFeatured(Categories);

  return featuredItems;
}

