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


export const flatCategories = [
  { id: "1", name: "Cat" },
  { id: "11", name: "Cat Food", parentId: "1" },
  { id: "111", name: "Adult Food", parentId: "11" },
  { id: "112", name: "Can Food",  parentId: "11" },
  { id: "113", name: "Kitten Food", parentId: "11" },
  { id: "12", name: "Cat Toys", parentId: "1" },
  { id: "13", name: "Cat Litter", parentId: "1" },
  { id: "131", name: "Clumping Cat Litter", parentId: "13" },
  { id: "132", name: "Cat Litter Box", parentId: "13" },
  { id: "14", name: "Cat Accessories", parentId: "1" },
  { id: "141", name: "Collar", parentId: "14" },
  { id: "142", name: "Box Tie", parentId: "14" },
  { id: "143", name: "Sunglass", parentId: "14" },

  { id: "2", name: "Dog" },
  { id: "21", name: "Dog Food", parentId: "2" },
  { id: "211", name: "Puppy Food", parentId: "21" },
  { id: "212", name: "Adult Food", parentId: "21" },
  { id: "22", name: "Dog Health & Accessories", parentId: "2" },
  { id: "221", name: "Dog Harness", parentId: "22" },
  { id: "222", name: "Dog Shampoo", parentId: "22" },

  { id: "3", name: "Bird" },
  { id: "31", name: "Bird Food", parentId: "3" },
  { id: "32", name: "Bird Cage", parentId: "3" },

  { id: "4", name: "Rabbit" },
  { id: "41", name: "Rabbit Food", parentId: "4" },
  { id: "42", name: "Rabbit Cage", parentId: "4" }
];


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



