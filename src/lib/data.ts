export const HeroBanners = [
  {
    imageUrl: "/hero-banner-1.webp",
    alt: "hero bannger"
  },
  {
    imageUrl: "/hero-banner-1.webp",
    alt: "hero bannger"
  }
]

export const Categories = [
  {
    name: "Cat",
    children: [
      {
        name: "Cat Food",
        link: "/product/cat-food",
        children: [
          { name: "Adult Food", link: "/product/cat-food/adult-food" },
          { name: "Can Food", link: "/product/cat-food/can-food" },
          { name: "Kitten Food", link: "/product/cat-food/kitten-food" }
        ]
      },
      {
        name: "Cat Toys",
        link: "/product/cat-toys"
      },
      {
        name: "Cat Litter",
        link: "/product/cat-litter",
        children: [
          { name: "Clumping Cat Litter", link: "/product/cat-litter/clumping-cat-litter" },
          { name: "Cat Litter Box", link: "/product/cat-litter/clumping-litter-box" }
        ]
      },
      {
        name: "Cat Accessories",
        link: "/product/cat-accessories",
        children: [
          { name: "Collar", link: "/product/cat-accessories/collar" },
          { name: "Box Tie", link: "/product/cat-accessories/box-tie" },
          { name: "Sunglass", link: "/product/cat-accessories/sunglass" }
        ]
      }
    ]
  },
  {
    name: "Dog",
    children: [
      {
        name: "Dog Food",
        link: "/product/dog-food",
        children: [
          { name: "Puppy Food", link: "/product/dog-food/puppy-food" },
          { name: "Adult Food", link: "/product/dog-food/adult-food" }
        ]
      },
      {
        name: "Dog Health & Accessories",
        link: "/product/dog-health-accessories",
        children: [
          { name: "Dog Harness", link: "/product/dog-health-accessories/puppy-food" },
          { name: "Dog Shampoo", link: "/product/dog-health-accessories/dog-shampoo" }
        ]
      }
    ]
  },
  {
    name: "Bird",
    children: [
      { name: "Bird Food", link: "/product/bird-food" },
      { name: "Bird Cage", link: "/product/bird-cage" }
    ]
  },
  {
    name: "Rabbit",
    children: [
      { name: "Rabbit Food", link: "/product/rabbit-food" },
      { name: "Rabbit Cage", link: "/product/bird-food" }
    ]
  }
];


