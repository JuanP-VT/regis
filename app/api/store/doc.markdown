# Store Item API

# GET /store-items

Retrieves a paginated list of store items based on the provided query parameters. This endpoint is designed to fetch store items with pagination support, allowing clients to request a subset of store items at a time.

### Request Parameters

- `page` (Query Parameter): The page number of the store items to retrieve. Must be a non-negative integer. Defaults to 1 if not provided or invalid.
- `limit` (Query Parameter): The maximum number of store items to return in the response. Must be a non-negative integer between 0 and 20. Defaults to a sensible value (e.g., 10) if not provided or invalid.

### Response

The response is a JSON object containing the retrieved store items and pagination metadata.

#### Success Response (200 OK)

```json
{
  "storeItems": [
    {
      "fileName": "string",
      "storeItemName": "string",
      "details": "string",
      "mainImageIndex": 0,
      "imageNamesList": ["string"],
      "price": 0,
      "discountPercentage": 0,
      "imageUrlList": ["string"],
      "categoryIDList": ["string"],
      "subCategoryIDList": ["string"]
    }
  ],
  "pagination": {
    "totalItems": 0,
    "totalPages": 0,
    "currentPage": 0,
    "itemsPerPage": 0
  }
}
```

`storeItems`: An array of store item objects.
`pagination`: An object containing pagination metadata.
`totalItems`: The total number of store items available.
`totalPages`: The total number of pages based on the current limit.
`currentPage`: The current page number.
`itemsPerPage`: The number of items per page, as specified by the limit query parameter.

### Error Responses

400 Bad Request: Returned if the provided query parameters are invalid. The response body contains a message detailing the validation error.
{ "message": "Validation error message" }
500 Internal Server Error: Returned if an error occurs while fetching the store items from the database. The response body contains a generic error message.
{ "message": "An error occurred fetching the store items" }

### Response

An array of store items. Each store item is an object with the following properties:

- `fileName`: String
- `storeItemName`: String
- `price`: Number
- `discountPercentage`: Number
- `imageNamesList`: Array of Strings
- `imageUrlList`: Array of Strings
- `details`: String
- `mainImageIndex`: Number

# POST /store-item

Creates a new store item.

### Request

The request should be a `multipart/form-data` with the following fields:

- `fileName`: String
- `storeItemName`: String
- `price`: String
- `discountPercentage`: String
- `images`: Array of Files
- `mainImageIndex`: String
- `details`: String
- `categoryIDList`: Array of Strings
- `subCategoryIDList` Array of Strings

### Response

If successful, returns a JSON object with a `message` property set to "success".

If there are missing fields in the request, returns a 400 status code with a JSON object containing a `message` property set to "Missing fields".

If the input validation fails, returns a 400 status code with a JSON object containing a `message` property set to the validation error message.

If the `fileName` already exists in the database, returns a 400 status code with a JSON object containing a `message` property set to "File name already exists".

If there's an error uploading the images, returns a 500 status code with a JSON object containing a `message` property set to "An error occurred uploading the images".

If there's an error storing the item in the database, returns a 500 status code with a JSON object containing a `message` property set to "An error occurred storing the item in the database".
