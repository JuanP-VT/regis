# Endpoint: Capture PayPal Order

Capture a PayPal order.

**Method:** `POST`

**Auth required:** No

## Data Parameters

**Required:**

`orderID` : string

## Success Response

**Condition:** If everything is OK and an order is captured successfully.

**Code:** `200 OK`

**Content example**

```json
{
  "success": true
}
```

## Error Responses

`Condition: If 'orderID' is not provided in the request.`

**Code:** `400 BAD REQUEST`

Content:

```json
{
  "message": "No order ID provided"
}
```

`Condition: If there was an error capturing the order.`

**Code:** `500 INTERNAL SERVER ERROR`

Content:

```json
{
  "message": "Error capturing order"
}
```

`Condition: If there was an error saving the order to the database.`

**Code:** `500 INTERNAL SERVER ERROR`

Content:

```json
{
  "message": "Error saving order to database"
}
```
