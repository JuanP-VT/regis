# Download File Endpoint

This endpoint is used to generate a signed URL for a file in an S3 bucket. The user can use this URL to download the file directly from the S3 bucket.
**NextAuthJS Session Is Required**

## Request

**Method:** `POST`

**Body:**

```json
{
  "fileName": "string"
}
```

`Parameters`:

`fileName`: The name of the file in the S3 bucket. This should be a string between 1 and 255 characters.
Response

**Response**
The response will be a JSON object with a url property. This URL is a signed URL that can be used to download the file from the S3 bucket.

```json
{
  "url": "string"
}
```

Error Responses:

If the user is not authenticated, the response will be { "message": "Unauthorized" } with status code 401.
If the input validation fails, the response will be { "message": error.errors } with status code 400.
If there is an error while generating the signed URL, the response will be { "message": "Error al generar la URL" } with status code 500.
