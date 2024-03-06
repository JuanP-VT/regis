# DELETE Endpoint

This endpoint is used to delete a specific item from the store.
Only authenticated ADMIN users can delete items from the store.

## Endpoint

`POST /api/path-to-endpoint`

## Request Body

The request body should contain a JSON object with the following property:

- `_id`: The ID of the item to delete. This should be a string that can be converted to a MongoDB ObjectId.

## Responses

### 200 OK

If the item is successfully deleted, the endpoint will return a JSON object with the following property:

- `message`: A string that says "Producto eliminado".

### 400 Bad Request

If the request body does not contain an `_id` or if the `_id` is not a valid MongoDB ObjectId, the endpoint will return a JSON object with the following property:

- `message`: A string that says "No se ha enviado el id del producto" or "Id no válido", respectively.

### 401 Unauthorized

If the user is not authenticated, the endpoint will return a JSON object with the following property:

- `message`: A string that says "No autorizado".

### 404 Not Found

If no item with the given `_id` is found, the endpoint will return a JSON object with the following property:

- `message`: A string that says "No se ha encontrado el producto".
