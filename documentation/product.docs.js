const showAllProducts = {
  tags : [ "Product" ],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Show all products",
  description: "This api is used to show all products",
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 9,
              "name": "Kentang",
              "quantity": 5,
              "Price": "6400",
              "image": "/static/images/kentang.png",
              "weight": "500 gram",
              "info": null,
              "createdAt": "2022-10-13T11:27:10.525Z",
              "updatedAt": "2022-10-13T11:27:10.525Z",
              "categoryId": 2,
              "category": {
                "id": 2,
                "name": "Sayur & Kacang",
                "image": "/static/images/sayur-kacang.png",
                "createdAt": "2022-10-13T09:58:26.411Z",
                "updatedAt": "2022-10-13T09:58:26.411Z"
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

const searchProduct = {
  tags : ["Product"],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Search product",
  description: "This api is used to search most match product",
  parameters: [
    {
      in: "path",
      name: "name",
      description: "Product name to search",
      example: "buah naga",
      type: "string"
    }
  ],
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 10,
              "name": "Buah Naga Merah",
              "quantity": 5,
              "Price": "19000",
              "image": "/static/images/buah-naga.png",
              "weight": "500 gram",
              "info": null,
              "createdAt": "2022-10-13T11:28:44.955Z",
              "updatedAt": "2022-10-13T11:28:44.955Z",
              "categoryId": 4,
              "category": {
                "id": 4,
                "name": "Buah",
                "image": "/static/images/buah.png",
                "createdAt": "2022-10-13T11:23:28.757Z",
                "updatedAt": "2022-10-13T11:23:28.757Z"
              }
            }
          }
        }
      }
    },
    404: {
      description: "not found"
    },
    400: {
      description: "bad request"
    }
  }
}

const bestProduct = {
  tags : ["Product"],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Show best product",
  description: "This api is used to show the most 5 bought product",
  responses: {
    "200": {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 2,
              "name": "Brokoli",
              "quantity": 5,
              "price": "19000",
              "image": "/static/images/brokoli.png",
              "weight": "500 gram",
              "info": null,
              "discount": 0,
              "createdAt": "2022-10-13T11:24:16.073Z",
              "updatedAt": "2022-10-13T11:24:16.073Z",
              "categoryId": 2,
              "items_sold": 724
            }
          }
        }
      }
    },
    "404": {
      description: "product not found"
    },
    "400": {
      description: "bad request"
    }
  }
}

exports.productDoc = {
  "/api/v1/products": {
    get: showAllProducts
  },
  "/api/v1/products/{name}": {
    get: searchProduct
  },
  "/api/v1/products/best-products": {
    get: bestProduct
  }
}