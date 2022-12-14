const Order = require("../models/order");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");
const Product = require("../models/product")
const User = require("../models/user")
const { Sequelize, Op } = require("sequelize");
const moment = require("moment");

exports.createOrder = async (
  userID,
  cartID,
  name,
  phone,
  address,
  note,
  totalProductPrice,
  shippingPrice,
  totalPrice
) => {
  const newOrder = await Order.create({
    UserId: userID,
    cartId: cartID,
    name: name,
    phone: phone,
    address: address,
    note: note,
    total_product_price: totalProductPrice,
    shipping_price: shippingPrice,
    total_price: totalPrice,
  });

  return newOrder;
};

exports.getDetailOrder = async (orderID, userID) => {
  const order = await Order.findOne({
    where: {
      id: orderID,
      UserId: userID
    },
    include: [{
        model: Cart,
        include: [{
          model: CartItem,
          include: [{
            model: Product
          }]
        }] 
      },
    ],
  })

  return order
}

exports.getHistory = async (userID) => {
  const History = await Order.findAll({
    where: {
      UserId: userID,
      updatedAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
      },
    },
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: Cart,
        include: [
          {
            model: CartItem,
            include: [
              {
                model: Product
              }
            ]
          },
        ],
      },
    ],
  });

  return History;
};

exports.cancelOrder = async (userID, OrderId) => {
  const cancelOrder = await Order.findOne({
    where: {
      UserId: userID,
      id: OrderId,
    },
  });

  cancelOrder.status = "Batal";
  cancelOrder.save();

  return cancelOrder;
};
