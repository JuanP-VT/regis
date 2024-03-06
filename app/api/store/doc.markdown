# Store Item API

## GET /store-item

Fetches all store items from the database.

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

## POST /store-item

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

### Response

If successful, returns a JSON object with a `message` property set to "success".

If there are missing fields in the request, returns a 400 status code with a JSON object containing a `message` property set to "Missing fields".

If the input validation fails, returns a 400 status code with a JSON object containing a `message` property set to the validation error message.

If the `fileName` already exists in the database, returns a 400 status code with a JSON object containing a `message` property set to "File name already exists".

If there's an error uploading the images, returns a 500 status code with a JSON object containing a `message` property set to "An error occurred uploading the images".

If there's an error storing the item in the database, returns a 500 status code with a JSON object containing a `message` property set to "An error occurred storing the item in the database".
