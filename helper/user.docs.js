const register = {
  tags : [ "User" ],
  summary: "Register a new user",
  description: "This api is used to register new user",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "name of the user",
              example: "bob2"
            },
            phone: {
              type: "string",
              description: "phone number of the user",
              example: "0823000000001"
            },
            username: {
              type: "string",
              description: "username of the user",
              example: "bob_test2",
            },
            password: {
              type: "string",
              description: "password of the user",
              example: "bob12345"
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
            message: "register success"
          }
        }
      }
    },
    400: {
      description: "bad request"
    }
  }
}

const login = {
  tags : [ "User" ],
  summary: "Login a new user",
  description: "This api is used to login user and generate a token",
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "username of the user",
              example: "bob_test2",
            },
            password: {
              type: "string",
              description: "password of the user",
              example: "bob12345"
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
              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6ImJvYl90ZXN0MiIsIm5hbWUiOiJib2IyIiwicGhvbmUiOiIwODIzMDAwMDAwMDAxIiwicGFzc3dvcmQiOiIkMmIkMTAkbXUuMEhKTC53ci9xMWZWa28xY0NrZWcucThuWW13Q2Y3YWxUWWFxNmR4UDFQNHdDaDA4YUsiLCJpbWFnZSI6bnVsbCwiYWRkcmVzcyI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0xMC0xOFQxNzowODowMi45MDRaIiwidXBkYXRlZEF0IjoiMjAyMi0xMC0xOFQxNzowODowMi45MDRaIn0sImlhdCI6MTY2NjExMzI2NSwiZXhwIjoxNjY2NzE4MDY1fQ.4JPK9d7fvRfi0EROdoQWzb-PTCnsB7Cq8ZSgpoxFJqs"
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

exports.userDoc = {
  "/api/v1/auth/register": {
    post: register
  },
  "/api/v1/auth/login": {
    post: login
  }
}