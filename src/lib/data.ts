import { title } from "process";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiGrid42 } from "react-icons/ci";
import { FaBox } from "react-icons/fa6";
import { FaListOl } from "react-icons/fa";

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
    name: "Weight",
    value: "Weight"
  },
  {
    name: "Color",
    value: "Color"
  }
]

export const defaultPagination = {
  page: 1,
  limit: 2
}


