# Store Item API

# API Documentation

## GET /store-items

This endpoint returns a list of store items. ONLY FOR ADMINS

### Request

No parameters needed.

### Response

- `200 OK`: Returns an array of store items.
- `401 Unauthorized`: If the user is not authenticated or not an admin.
- `500 Internal Server Error`: If an error occurred on the server.

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
