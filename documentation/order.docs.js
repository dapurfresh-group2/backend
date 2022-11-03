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
            totalProductPrice: {
              type: "string",
              description: "note from buyer",
              example: "note"
            },
            shippingPrice: {
              type: "string",
              description: "shipping cost",
              example: "5000"
            },
            totalPrice: {
              type: "string",
              description: "total cost to pay",
              example: "25000"
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
            "id": 7,
            "UserId": 1,
            "cartId": 21,
            "name": "bob2",
            "phone": "0823000000001",
            "address": "Jl. Testing",
            "note": null,
            "total_product_price": "note",
            "shipping_price": "5000",
            "total_price": "29000",
            "updatedAt": "2022-11-03T14:22:08.891Z",
            "createdAt": "2022-11-03T14:22:08.891Z"
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

exports.orderDoc = {
  "/api/v1/order/checkout/{cartID}": {
    post: checkout
  }
}