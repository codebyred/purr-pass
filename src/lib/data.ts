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
        featured: true,
        children:[{name:"Adult Food",},{name: "Can Food",},{name: "Kitten Food",}] 
      },
      {
        name: "Cat Toys",
        featured: true,
      },
      {
        name: "Cat Litter",
        children:[{name:"Clumping Cat Litter",},{name: "Cat Litter Box",}]
      },
      {
        name: "Cat Accessories",
        children: [{name:"Collar",},{name:"Box Tie",},{name:"Sunglass",}]
      }
    ]
  },
  {
    name: "Dog",
    children: [
      {
        name: "Dog Food",
        children: [{name:"Puppy Food"}, {name:"Adult Food"}]
      },
      {
        name: "Dog Health & Accessories",
        children: [{name: "Dog Harness"},{name: "Dog Shampoo",}]
      }
    ]
  },
  {
    name: "Bird",
    children: [{name:"Bird Food"}, {name:"Bird Cage", featured: true}]
  },
  {
    name: "Rabbit",
    children: [{name:"Rabbit Food"}, {name:"Rabbit Cage"}]
  }
];


