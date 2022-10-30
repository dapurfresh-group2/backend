const showProfile = {
  tags : [ "User" ],
  security: [
    {
      bearerAuth: []
    }
  ],
  summary: "Show profile of the user",
  description: "This api is used to show information of the user",
  responses: {
    "200": {
      description: "success",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "id": 1,
              "username": "bob_test2",
              "name": "bob3",
              "phone": "000000123",
              "password": "$2b$10$mu.0HJL.wr/q1fVko1cCkeg.q8nYmwCf7alTYaq6dxP1P4wCh08aK",
              "image": null,
              "address": "pppppp",
              "createdAt": "2022-10-18T17:08:02.904Z",
              "updatedAt": "2022-10-20T04:06:47.943Z"
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

const editProfile = {
  tags: [ "User" ],
  security: [
    {
      bearerAuth: [],
    }
  ],
  summary: "Edit information of the user",
  description: "This api is used to edit information of the user",
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "New name of the user",
              example: "bob5"
            },
            phone: {
              type: "string",
              description: "New phone number of the user",
              example: "082176359283"
            },
            address: {
              type: "string",
              description: "New address of the user",
              example: "Gang 3D no 7 Keputih"
            },
            file: {
              type: "string",
              format: "binary",
              description: "New image for the user"
            }
          }
        }
      }
    }
  },
  responses: {
    "200": {
      description: "success",
    },
    "400": {
      description: "bad request"
    }
  }
}

exports.profileDoc = {
  "/api/v1/profile/user": {
    get: showProfile
  },
  "/api/v1/profile/edit": {
    put: editProfile
  }
}