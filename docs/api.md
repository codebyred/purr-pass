# API Reference

## Overview

The backend API is built with **Next.js API routes**. These endpoints connect with **MongoDB** to store categories and products.

## Version

**v1**

## Endpoints

- `/products`
- `/categories`

---

### **/categories**

#### **GET /api/v1/categories**
**Request:**
```http
GET /api/v1/products?categoryId=<categoryId>&categorySlug=<categorySlug>&page=<page>&limit=<limit>
```
| Parameter    | Type   | Required | Description                                |
| ------------ | ------ | -------- | ------------------------------------------ |
| parentId   | string | No       | Filter products by category ID.            |
| page         | number | No       | Page number for pagination (default: 1).   |
| limit        | number | No       | Number of products per page (default: 2). |

**Response:**

### **/products**

#### **GET /api/v1/products**

**Request:**

```http
GET /api/v1/products?categoryId=<categoryId>&categorySlug=<categorySlug>&page=<page>&limit=<limit>
```
| Parameter    | Type   | Required | Description                                |
| ------------ | ------ | -------- | ------------------------------------------ |
| categoryId   | string | No       | Filter products by category ID.            |
| categorySlug | string | No       | Filter products by category slug.          |
| page         | number | No       | Page number for pagination (default: 1).   |
| limit        | number | No       | Number of products per page (default: 2). |

  Note: You can use either categoryId or categorySlug for filtering by category.

**Response:**
```
{
  "products": [
    {
      "id": "6868132315ab4bc268ce594f",
      "category": {
        "id": "68653bce3f80581b35637f15",
        "slug": "adult-food",
        "name": "Adult Food",
        "parentId": "68653acf3f80581b35637f11",
        "createdAt": "2025-07-02T14:01:50.908Z",
        "updatedAt": "2025-07-02T14:01:50.908Z",
        "__v": 0
      },
      "slug": "unknown-food-for-cat",
      "name": "Food for cat",
      "brand": "unknown",
      "images": [
        {
          "url": "https://ik.imagekit.io/codebyred/Screenshot_from_2024-08-21_20-40-35_gBJ1lnE8D.png",
          "alt": "Screenshot_from_2024-08-21_20-40-35_gBJ1lnE8D.png"
        },
        {
          "url": "https://ik.imagekit.io/codebyred/Screenshot_from_2024-08-29_16-29-03_CM3-qLMme.png",
          "alt": "Screenshot_from_2024-08-29_16-29-03_CM3-qLMme.png"
        }
      ],
      "variantOptions": [
        {
          "name": "Weight",
          "affectsPrice": false,
          "values": ["5kg"]
        }
      ],
      "variants": [
        {
          "sku": "UNKNOWN-FOODFORCAT-WEIGHT-5KG-0",
          "values": { "Weight": "5kg" },
          "currPrice": 255,
          "originalPrice": 310,
          "isDefault": true
        }
      ],
      "createdAt": "2025-07-04T17:45:07.670Z",
      "updatedAt": "2025-07-04T17:45:07.670Z",
      "__v": 0
    },
    {
      "id": "686814b215ab4bc268ce5951",
      "category": {
        "id": "68653bce3f80581b35637f15",
        "slug": "adult-food",
        "name": "Adult Food",
        "parentId": "68653acf3f80581b35637f11",
        "createdAt": "2025-07-02T14:01:50.908Z",
        "updatedAt": "2025-07-02T14:01:50.908Z",
        "__v": 0
      },
      "slug": "whiskas-pouch-adult-tuna-cat-food",
      "name": "Whiskas Pouch Adult Tuna Cat Food",
      "brand": "Whiskas",
      "images": [
        { "url": "/adult-food.jpg", "alt": "adult food" },
        { "url": "/cat.png", "alt": "adult food" },
        { "url": "/adult-food.jpg", "alt": "adult food" }
      ],
      "variantOptions": [
        {
          "name": "Weight",
          "affectsPrice": true,
          "values": ["5kg", "10kg", "20kg"]
        }
      ],
      "variants": [
        {
          "sku": "WPAT80g-5kg",
          "values": { "Weight": "5kg" },
          "currPrice": 85,
          "originalPrice": 85,
          "isDefault": true
        },
        {
          "sku": "WPAT80g-10kg",
          "values": { "Weight": "10kg" },
          "currPrice": 150,
          "originalPrice": 150,
          "isDefault": false
        },
        {
          "sku": "WPAT80g-20kg",
          "values": { "Weight": "20kg" },
          "currPrice": 750,
          "originalPrice": 750,
          "isDefault": false
        }
      ],
      "createdAt": "2025-07-04T17:51:46.160Z",
      "updatedAt": "2025-07-04T17:51:46.160Z",
      "__v": 0
    }
  ],
  "next": {
    "page": 3,
    "limit": 2
  },
  "prev": {
      "page": 1,
      "limit": 2
  }
}
```

#### **POST /api/v1/products**
**Request:**
```http
POST /api/v1/products
Content-Type: application/json
```
**Request Body:**
```
{
  "slug": "whiskas-pouch-adult-tuna-cat-food",
  "name": "Whiskas Pouch Adult Tuna Cat Food",
  "brand": "Whiskas",
  "category": "68653bce3f80581b35637f15",
  "images": [
    { "url": "/adult-food.jpg", "alt": "adult food" },
    { "url": "/cat.png", "alt": "adult food" },
    { "url": "/adult-food.jpg", "alt": "adult food" }
  ],
  "variantOptions": [
    {
      "name": "Weight",
      "affectsPrice": true,
      "values": ["5kg", "10kg", "20kg"]
    }
  ],
  "variants": [
    {
      "sku": "WPAT80g-5kg",
      "values": { "Weight": "5kg" },
      "currPrice": 85,
      "originalPrice": 85,
      "isDefault": true
    },
    {
      "sku": "WPAT80g-10kg",
      "values": { "Weight": "10kg" },
      "currPrice": 150,
      "originalPrice": 150,
      "isDefault": false
    },
    {
      "sku": "WPAT80g-20kg",
      "values": { "Weight": "20kg" },
      "currPrice": 750,
      "originalPrice": 750,
      "isDefault": false
    }
  ]
}
```
**Response**
- If Product does not exist 
```
{
  "message": "Product created successfully"
}
```
- If product already exists
```
{
  "error": "Product could not be saved"
}
```

### Field Explanation
#### Slug
- What is it?

A URL-friendly unique identifier for the product, usually derived from the product name.
- Example:

"whiskas-pouch-adult-tuna-cat-food"
- How is it generated?

Typically, the product name is lowercased, spaces and special characters are replaced with hyphens (-), ensuring it is unique within your products collection.

#### Sku
- What is it?

SKU (Stock Keeping Unit) is a unique identifier for each variant of a product. It helps in inventory management and sales tracking.

- Example:

"WPAT80g-5kg"

- How is it generated?

Usually generated by combining:

 - Product short code or slug abbreviation
 - Variant options and values
 - Any internal indexing if needed
For example:
```
[PRODUCT_CODE]-[VARIANT_NAME]-[VARIANT_VALUE]-[INDEX]
```
This ensures that each variant (e.g. different weights or sizes) has a unique SKU.
