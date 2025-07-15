# Utility functions

## async function tryCatch<T>(promise: Promise<T>): Promise<[Error | null, T | null]> 

this function is used instead of writing try catch for every async operation that can fail. In server actions
instead of returning error, errors are thrown this way
```
  const [fetchError, fetchResponse] = await tryCatch(fetch(url));

  if (fetchError || !fetchResponse || !fetchResponse.ok) {
    console.error("Fetch Product Error", fetchError);
    throw new Error(`Could not fetch Product`);
  }
```
so this function must be used to handle the errors properly

## function buildNestedCategories(categories: Category[]) 

The database store the categories as flat arrays, the sub categories contains parentId as reference
This function creates nesting using the parentId and creates categories and sub categories for navigation
in the ui.

## function productFormDataToFormData(data: ProductFormData): FormData 

To simplify admin product form, a different schema is used for Product named ProductFormData. This is a js
object not actual form Data. So we use this function to convert the schema to actual FormData

## function generateBreadcrumbItems(pathname: string)

This function is used genereate the breadCrumb based on current url path.