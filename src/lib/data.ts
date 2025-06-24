import { title } from "process";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBagShopping } from "react-icons/fa6";

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
export const categories = [
  {
    name: "Cat",
    children: [
      {
        name: "Cat Food",
        link: "/product-category/cat-food",
        children: [
          { name: "Adult Food", link: "/product-category/cat-food/adult-food" },
          { name: "Can Food", link: "/product-category/cat-food/can-food" },
          { name: "Kitten Food", link: "/product-category/cat-food/kitten-food" }
        ]
      },
      {
        name: "Cat Toys",
        link: "/product-category/cat-toys"
      },
      {
        name: "Cat Litter",
        link: "/product-category/cat-litter",
        children: [
          { name: "Clumping Cat Litter", link: "/product-category/cat-litter/clumping-cat-litter" },
          { name: "Cat Litter Box", link: "/product-category/cat-litter/clumping-litter-box" }
        ]
      },
      {
        name: "Cat Accessories",
        link: "/product-category/cat-accessories",
        children: [
          { name: "Collar", link: "/product-category/cat-accessories/collar" },
          { name: "Box Tie", link: "/product-category/cat-accessories/box-tie" },
          { name: "Sunglass", link: "/product-category/cat-accessories/sunglass" }
        ]
      }
    ]
  },
  {
    name: "Dog",
    children: [
      {
        name: "Dog Food",
        link: "/product-category/dog-food",
        children: [
          { name: "Puppy Food", link: "/product-category/dog-food/puppy-food" },
          { name: "Adult Food", link: "/product-category/dog-food/adult-food" }
        ]
      },
      {
        name: "Dog Health & Accessories",
        link: "/product-category/dog-health-accessories",
        children: [
          { name: "Dog Harness", link: "/product-category/dog-health-accessories/puppy-food" },
          { name: "Dog Shampoo", link: "/product-category/dog-health-accessories/dog-shampoo" }
        ]
      }
    ]
  },
  {
    name: "Bird",
    children: [
      { name: "Bird Food", link: "/product-category/bird-food" },
      { name: "Bird Cage", link: "/product-category/bird-cage" }
    ]
  },
  {
    name: "Rabbit",
    children: [
      { name: "Rabbit Food", link: "/product-category/rabbit-food" },
      { name: "Rabbit Cage", link: "/product-category/bird-food" }
    ]
  }
];

export const adminSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin/",
    icon: MdOutlineSpaceDashboard,
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: AiOutlineProduct,
    items: [
      {
        title: "Create",
        url: "/admin/product/create"
      }
    ]
  },
  {
    title: "Orders",
    url: "/admin/order",
    icon: FaBagShopping
  }
]



