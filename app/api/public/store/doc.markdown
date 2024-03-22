## GET Function

The `GET` function is an asynchronous function used to fetch paginated items based on query filters from a database.

### Parameters

- `req: Request`: The request object from the client.
-

### URL Parameters

`category` - String. Required. Pass an empty string to to get all items
`subcategory` - String. Required. Pass an empty string to to get all items
`page` - Number. Required. Pass 1 to get the first page

### How it works

1. The function first extracts the search parameters from the request URL.
2. It sets the number of items per page and the current page number based on the search parameters.
3. It also extracts the category and subcategory from the search parameters.
4. The function then validates these parameters using the `zod` library.
5. If the parameters are invalid, it returns a JSON response with an error message and a 400 status code.
6. If the parameters are valid, it creates a filter object based on the category and subcategory.
7. The function then connects to the database and fetches the store items based on the filter, skipping the items for the previous pages and limiting the results to the number of items per page.
8. It also calculates the total number of items and the total number of pages for the pagination metadata.
9. The function then returns a JSON response with the store items and the pagination metadata.
10. If an error occurs during this process, it logs the error and returns a JSON response with an error message and a 500 status code.

### Returns

- `NextResponse.json`: A JSON response containing either the store items and the pagination metadata, or an error message and a status code.

### Errors

- If the parameters are invalid, the function returns a JSON response with an error message and a 400 status code.
- If an error occurs during the process, the function logs the error and returns a JSON response with an error message and a 500 status code.
