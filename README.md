# PurrPass

An online pet shop e-commerce platform developed with Next.js, featuring both a customer-facing store and an admin panel. This startup project was built in collaboration with a senior software engineer from LEADS Corporation Limited.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Stucture](#project-structure)
- [Technologies Used](#technologies-used)
- [Documentation](#documentation)
- [Author](#author)

## Features

- Users are able to browse various categories of pet products.
- Users can search for specific pet products.
- Users can place orders for multiple products in a single purchase.
- Admins have the ability to manage products.
- Admins can view and manage customer orders.
- Admins can track and manage inventory.


## Installation

```
git clone https://github.com/codebyred/purr-pass.git
cd purr-pass
npm install
npm run dev
```

## Usage

Currently, the application is under development.

To use it locally:

1. Clone the repository and install dependencies (see [Installation](#installation)).
2. Start the development server:


## Testing

## Project Structure

```
purr-pass/
├── docs/ # Project documentation
├── src/
│ ├── actions/ # Server actions
│ │ ├── category-action.ts # Category-related actions (get, create, update, delete)
│ │ └── product-action.ts # Product-related actions (get, create, update, delete)
│ ├── api/ # API route handlers
│ ├── app/ # Application pages (Next.js app directory)
│ │ ├── (user)/ # User pages
│ │ └── admin/ # Admin pages
│ ├── components/ # React components
│ │ ├── user/ # Components for user pages
│ │ ├── admin/ # Components for admin pages
│ │ └── ui/ # Reusable UI components (shadcn)
│ ├── db/ # Database connection and schemas
│ ├── hooks/ # Custom React hooks
│ └── lib/ # Utilities and types
│ ├── const.ts # Application-wide constants
│ ├── types.ts # Schema and type declarations
│ └── utils.ts # Utility functions
├── package.json # Project metadata and scripts
└── README.md # Project documentation
```

## Documentation

- [API](docs/api.md)
- [Error Handling](docs/error-handling.md)
- [Utility functions](docs/utility.md)

## Author

[codebyred](https://github.com/codebyred)
