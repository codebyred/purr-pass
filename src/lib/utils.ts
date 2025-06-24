import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { categories } from "./data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findCategoryWithChildren(category: string) {


  for(const mainCat of categories) {
    
    const match = mainCat.children.find((child)=> child.name === category);
    if (match && match.children) {
      return match;
    }
  }

  return null;

}

export function normalizeCategoryKey(slug: string): string { 

  return slug
    .split("-")
    .map((word)=> word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

}

export function getDefaultVariant() {
  
}

// utils/breadcrumb.ts

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


