const { categoryDoc } = require("./category.docs");
const { productDoc } = require("./product.docs");
const { profileDoc } = require("./profile.docs");
const { userDoc } = require("./user.docs");

// Better dokumentasi disimpan di folder docs sendiri,
// bukan di helper karena helper itu tujuannya
// untuk membuat fungsi-fungsi bantuan
// bukan dokumentasi

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Dapurfresh API",
    version: "1.0.0",
    description: "REST API for Dapurfresh"
  },
  servers: [{
    url: "http://localhost:3000/",
    description: "Local Dev"
  }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      }
    }
  },
  tags: [
    {
      name: "Product",
      description: "Show products",
    },
    {
      name: "Category",
      description: "Sort products by category"
    },
    {
      name: "User",
      description: "Register and login"
    }
  ],
  paths: {
    ...productDoc,
    ...categoryDoc,
    ...userDoc,
    ...profileDoc
  }
}

module.exports = swaggerDocumentation;