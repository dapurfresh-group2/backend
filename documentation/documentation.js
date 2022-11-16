const { cartDoc } = require("./cart.docs");
const { categoryDoc } = require("./category.docs");
const { orderDoc } = require("./order.docs");
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
      name: "User",
      description: "Register and login"
    },
    {
      name: "Product",
      description: "Show products",
    },
    {
      name: "Category",
      description: "Sort products by category"
    },
    {
      name: "Cart",
      description: "All about cart"
    },
    {
      name: "Order",
      description: "Order the products from cart"
    }
  ],
  paths: {
    ...productDoc,
    ...categoryDoc,
    ...userDoc,
    ...profileDoc,
    ...cartDoc,
    ...orderDoc
  }
}

module.exports = swaggerDocumentation;