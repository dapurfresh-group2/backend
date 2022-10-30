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

exports.categoryDoc = {
  "/api/v1/categories": {
    get: showAllCategories
  }
}