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

const getCartActive = {
  tags : [ "Cart" ],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Show active cart",
  description: "This api is used to show whether cart is active or not",
  responses: {
    "200": {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 28,
              "status": true,
              "createdAt": "2022-11-03T09:55:55.950Z",
              "updatedAt": "2022-11-03T09:55:55.950Z",
              "UserId": 1,
              "cart_items": [
                {
                  "productId": 9,
                  "quantity": 3,
                  "total_price": "24000",
                  "product": {
                    "name": "Kentang"
                  }
                }
              ],
              "final_price": 24000
            }
          }
        }
      }
    },
    "404": {
      description: "not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "message": "cart active not found"
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

exports.cartDoc = {
  "/api/v1/cart/post-product/{id}": {
    post: addToCart
  },
  "/api/v1/cart": {
    get: getCartActive
  }
}