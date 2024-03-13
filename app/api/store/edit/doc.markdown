# POST Endpoint in route.ts

This endpoint is used to update a store item in the database and the images in the S3 bucket.

## Request

The request should be a POST request with form data.

### Parameters

- `storeItemID` (String): The ID of the store item to update.
- `fileName` (String): The name of the file.
- `storeItemName` (String): The name it has in store.
- `price` (Number): The price of the store item.
- `discountPercentage` (Number): The discount percentage of the store item.
- `details` (String): The details of the store item.
- `mainImageIndex` (Number): The index of the main image.
- `imageNamesList` (Array of Strings): The list of image names.
- `imageUrlList` (Array of Strings): The list of image URLs.
- `newImages` (Array of Files, optional): The new images to upload.
- `categoryIDList` (Array of Strings): valid mongodb category document id
- `subCategoryIDList` (Array of Strings) valid subcategory id (uuidv4)

## Response

The response will be a JSON object. If the update is successful, the status code will be 200 and the message will be "Producto actualizado". If there is an error, the status code will be 500 and the message will be "Error al actualizar en base de datos".

## Errors

- If the environment variables `S3_IMAGE_BUCKET_NAME`, `CLOUDFRONT_URL`, or `S3_FILES_BUCKET_NAME` are not set, the server will throw an error.
- If the user is not authenticated or is not an admin, the server will return a 401 Unauthorized error.
- If the `storeItemID` is not a valid MongoDB ObjectId, the server will return a 400 Bad Request error.
- If the validation of the new store item fails, the server will return a 400 Bad Request error.
- If the store item is not found in the database, the server will return a 404 Not Found error.
- If there is an error deleting images from the S3 bucket, the server will return a 500 Internal Server Error.
- If there is an error uploading new images to the S3 bucket, the server will return a 500 Internal Server Error.
