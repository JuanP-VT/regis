This function is an endpoint to create a new PayPal order.

## Function

The `POST` function is an asynchronous function that takes a request as an argument.

### Arguments

Takes an object with the property cart, representing the items in the shopping cart.

**Request**:

    ```json
    {
        "cart":[StoreItemDB_ID] // Array of StoreItemDB_IDs
    }
    ```
    The Endpoint is going to capture the ids of the item to check if they exist in the database.
    So  technically only the ids are needed.

### Process

1. It first tries to get the session using `getServerSession(OPTIONS)`. If there's no session, it returns a JSON response with the message "Unauthorized" and a status of 401.
2. It validates the incoming request by checking if there are items in the cart. If there are no items, it returns a JSON response with the message "No items in cart" and a status of 400.
3. It connects to the database and finds the items in the shopping cart. If no items are found, it returns a JSON response with the message "No items found" and a status of 400.
4. It calculates the total price of the items and creates a new PayPal order.
5. It finds the user DB ID to use a custom ID for the order.
6. It maps over the found items and creates a `purchase_units` array.
7. It sends a request to PayPal to create the order.
8. If there's an error during this process, it logs the error and returns a JSON response with the message "Unauthorized" and a status of 401.

### Return

The function returns a JSON response with the ID of the created order.
