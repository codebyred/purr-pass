import { title } from "process";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

export const heroBanners = [
  {
    imageUrl: "/hero-banner-1.webp",
    alt: "hero bannger"
  },
  {
    imageUrl: "/hero-banner-1.webp",
    alt: "hero bannger"
  }
]


export const adminSidebarItem = [
  {
    group: "Main",
    items: [
      {
        title: "Dashboard",
        url: "/admin/",
        icon: CiGrid42
      }
    ]
  },
  {
    group: "Product Management",
    items: [
      {
        title: "Category",
        url: "/admin/category",
        icon: MdCategory,
        items: [
          {
            title: "List",
            url: "/admin/category/list"
          },
          {
            title: "Create",
            url: "/admin/category/create"
          }
        ]
      },
      {
        title: "Products",
        url: "/admin/product",
        icon: FaBox,
        items: [
          {
            title: "List",
            url: "/admin/product/list"
          },
          {
            title: "Create",
            url: "/admin/product/create"
          }
        ]
      }
    ]
  },
  {
    group: "Order Management",
    items: [
      {
        title: "Orders",
        url: "/admin/order",
        icon: FaListOl
      }
    ]
  }
]

export const variantOptions = [
  {
    id:"1",
    name: "Weight",
    value: "Weight"
  },
  {
    id: "2",
    name: "Color",
    value: "Color"
  }
]

export const defaultPagination = {
  page: 1,
  limit: 2
}


