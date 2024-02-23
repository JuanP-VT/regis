# Store Items API

## GET /api/store

This endpoint is used to retrieve all store items.

### Request

The request should be a GET request. No parameters are required.

### Response

The response will be a JSON array containing all store items. Each item in the array is an object representing a store item.

### Errors

- If there is an error while processing the request, the response will be `{ "message": "There was an error fetching store items", "status": 500 }`.

### Example

```bash
curl -X GET http://localhost:3000/api/store
```

## POST /api/store

This endpoint is used to create a new store item.

### Request

The request should be a `multipart/form-data` POST request with the following fields:

- `fileName` (string): The name of the file.
- `storeItemName` (string): The name of the store item.
- `price` (string): The price of the store item.
- `discountPercentage` (string): The discount percentage for the store item.
- `images` (file array): The images for the store item.
- `mainImageIndex` (string): The index of the main image in the images array.
- `details` (string): The details of the store item.

### Response

The response will be a JSON object. If the request is successful, it will contain the newly created store item. If there is an error, it will contain a `message` field with a description of the error and a `status` field with the HTTP status code.

### Errors

- If any of the fields are missing, the response will be `{ "message": "Missing fields", "status": 400 }`.
- If there is an error while processing the request, the response will be `{ "message": "Error message", "status": 500 }`.

### Example

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "fileName=file.jpg" -F "storeItemName=Item" -F "price=100" -F "discountPercentage=10" -F "images=@image1.jpg" -F "images=@image2.jpg" -F "mainImageIndex=0" -F "details=Details" http://URL/api/store
```
