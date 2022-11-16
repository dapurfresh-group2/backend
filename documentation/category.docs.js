const showAllCategories = {
  tags : [ "Category" ],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Show all categories",
  description: "This api is used to show all categories",
  responses: {
    200: {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 1,
              "name": "Bumbu",
              "image": "/static/images/bumbu.png",
              "createdAt": "2022-10-13T09:54:08.805Z",
              "updatedAt": "2022-10-13T09:54:08.805Z"
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

const showProductsByCategory = {
  tags: ["Category"],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Get products by category",
  description: "This api used to show products by Category",
  parameters: [
    {
      in: "query",
      name: "categoryId",
      description: "Category ID",
      example: 2,
      type: "int"
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
                "id": 1,
                "name": "Kangkung",
                "quantity": 5,
                "price": null,
                "image": "/static/images/kangkung.png",
                "weight": "1 ikat",
                "info": "1 ikat kangkung setara dengan 500 gram",
                "createdAt": "2022-10-13T11:18:50.982Z",
                "updatedAt": "2022-10-13T11:18:50.982Z",
                "categoryId": 2
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

exports.categoryDoc = {
  "/api/v1/categories": {
    get: showAllCategories
  },
  "/api/v1/products/": {
    get: showProductsByCategory
  }
}