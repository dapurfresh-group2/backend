const addToCart = {
  tags : [ "Cart" ],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Add and delete item from cart",
  description: "This api is used to add item or remove item quantity from cart",
  parameters: [
    {
      in: "path",
      name: "id",
      description: "Product id to add to cart",
      example: 2,
      type: "int"
    }
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            quantity: {
             type: "string",
             description: "Quantity product",
             example: "1"
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
          schema: {
            type: "object",
            example: {
                "message": "success",
                "data": {
                  "id": 19,
                  "productId": 2,
                  "cartId": 11,
                  "quantity": 1,
                  "total_price": "19000",
                  "updatedAt": "2022-10-30T07:23:30.820Z",
                  "createdAt": "2022-10-30T07:23:30.820Z"
                }
            }
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

exports.cartDoc = {
  "/api/v1/cart/post-product/{id}": {
    post: addToCart
  }
}