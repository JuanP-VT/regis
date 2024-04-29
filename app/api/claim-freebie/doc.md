# POST /route

This API endpoint allows a user to claim a freebie item from the store.

## Request

The request should be a POST request with a JSON body containing the following field:

- `itemId`: The ID of the item the user wants to claim.

Example:

```json
{
  "itemId": "60d6c47e68a3d2a30c776b2c"
}
```

Response
The response will be a JSON object. If the request is successful, the response will contain a message indicating that the freebie has been claimed. If there is an error, the response will contain an error message.

Success Response
Status Code: 200
Body:

```json
{
  "message": "Freebie reclamado!"
}
```

Error Responses
Status Code: 400
Missing Item Id
The item is not a freebie
The user has already claimed this freebie
Status Code: 401
Unauthorized
Status Code: 500
Error Connecting To Database
Error Messages
"Missing Item Id": The itemId was not provided in the request body.
"El objecto no es un freebie": The item with the provided itemId is not a freebie.
"Ya haz reclamado este freebie": The user has already claimed this freebie.
"Unauthorized": The user is not authenticated.
"Error Connecting To Database": There was an error connecting to the database.
Notes
The user must be authenticated to use this endpoint.
The item must be a freebie (either the price is 0 or the discount percentage is 100).
The user cannot claim a freebie they have already claimed.
