const checkout = {
  tags : [ "Order" ],
  summary: "Order products",
  security: [
    {
      bearerAuth: []
    }
  ],
  description: "This api is used to order product",
  parameters: [
    {
      in: "path",
      name: "cartID",
      description: "Id of cart to checkout",
      example: "21",
      type: "string"
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of the buyer",
              example: "bob2"
            },
            phone: {
              type: "string",
              description: "phone number of the buyer",
              example: "0823000000001"
            },
            address: {
              type: "string",
              description: "address of the buyer",
              example: "Jl. Testing",
            },
            note: {
              type: "string",
              description: "note from buyer",
              example: "note"
            },
            totalProductPrice: {
              type: "string",
              description: "note from buyer",
              example: "insert value based on final price response. ex = 25000"
            },
            shippingPrice: {
              type: "string",
              description: "shipping cost",
              example: "5000"
            },
            totalPrice: {
              type: "string",
              description: "total cost to pay",
              example: "sum final price with shipping price. ex = 30000"
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          type: "object",
          example: {
            "status": "Proses",
            "id": 19,
            "UserId": 1,
            "cartId": 52,
            "name": "bob2",
            "phone": "0823000000001",
            "address": "Jl. Testing",
            "note": "note",
            "total_product_price": "48400",
            "shipping_price": "5000",
            "total_price": "53400",
            "updatedAt": "2022-11-07T10:44:25.768Z",
            "createdAt": "2022-11-07T10:44:25.768Z"
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

const history = {
  tags : [ "Order" ],
  summary: "Transaction history",
  security: [
    {
      bearerAuth: []
    }
  ],
  description: "This api is used to show history from now to back 7 days",
  responses: {
    "200": {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 12,
              "name": "test",
              "phone": "0123456",
              "address": "jakarta",
              "note": "only test",
              "status": "Batal",
              "note": "5200",
              "shipping_price": "1000",
              "total_price": "6200",
              "createdAt": "2022-11-05T08:23:01.915Z",
              "updatedAt": "2022-11-05T08:25:03.782Z",
              "UserId": 1,
              "cartId": 33,
              "cart": {
                "id": 33,
                "status": false,
                "createdAt": "2022-11-05T08:22:13.463Z",
                "updatedAt": "2022-11-05T08:23:02.143Z",
                "UserId": 1,
                "cart_items": [
                  {
                    "id": 49,
                    "quantity": 12,
                    "total_price": "62400",
                    "createdAt": "2022-11-05T08:22:13.522Z",
                    "updatedAt": "2022-11-06T10:09:00.973Z",
                    "productId": 1,
                    "cartId": 33
                  }
                ]
              }
            }
          }
        }
      }
    },
    "400": {
      description: "bad request"
    }
  }
}

const cancelOrder = {
  tags : [ "Order" ],
  summary: "Cancel order by ID",
  security: [
    {
      bearerAuth: []
    }
  ],
  description: "This api is used to cancel product by id located in params",
  parameters: [
    {
      in: "path",
      name: "orderID",
      description: "Id of order to cancel",
      example: "12",
      type: "string"
    }
  ],
  responses: {
    "200": {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 19,
              "name": "bob2",
              "phone": "0823000000001",
              "address": "Jl. Testing",
              "note": "note",
              "status": "Batal",
              "total_product_price": "48400",
              "shipping_price": "5000",
              "total_price": "53400",
              "createdAt": "2022-11-07T10:44:25.768Z",
              "updatedAt": "2022-11-07T10:44:45.362Z",
              "UserId": 1,
              "cartId": 52
            }
          }
        }
      }
    },
    "400": {
      description: "bad request"
    }
  }
}

exports.orderDoc = {
  "/api/v1/order/checkout/{cartID}": {
    post: checkout
  },
  "/api/v1/order/history": {
    get: history
  },
  "/api/v1/order/cancel-order/{orderID}": {
    post: cancelOrder
  }
}