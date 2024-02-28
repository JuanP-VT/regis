# DELETE File Endpoint

## Endpoint

`POST /delete-file`

## Description

This endpoint deletes a file and its associated images from an S3 bucket and removes the file reference from the database.

## Request Body

The request body must be a JSON object with the following property:

- `fileName` (string): The name of the file to be deleted.

## Response

The response is a JSON object. If the operation is successful, the object contains a `message` property with the value "File deleted successfully". If an error occurs, the object contains an `error` property with a description of the error.

## Errors

The endpoint may return one of the following errors:

- 400: "File name is required" - The `fileName` property is missing, not a string, or an empty string in the request body.
- 500: "Error finding document in database" - An error occurred while trying to find the file reference in the database.
- 500: "Error deleting images in bucket" - An error occurred while trying to delete the images associated with the file from the S3 bucket.
- 500: "Error deleting document in database" - An error occurred while trying to delete the file reference from the database.
- 500: "Error deleting file in bucket" - An error occurred while trying to delete the file from the S3 bucket.

## Example

Request:

```json
{
  "fileName": "example.jpg"
}
```
