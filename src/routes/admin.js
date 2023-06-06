const express = require("express");
const router = express.Router();

const User = require("../models/User.js");
const Game = require("../models/Game.js");
const Order = require("../models/Order.js");

async function getStats() {
  return {
    salesThisMonth: await Order.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().setDate(1)),
            $lt: new Date(new Date().setDate(1)).setMonth(
              new Date().getMonth() + 1
            ),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]).then((res) => {
      return displayCurrency(res[0]?.total || 0);
    }),
    newCustomers: await User.countDocuments({
      role: "user",
      created: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    }),
  };
}

async function handlePage(req, res, page) {
  let username = req?.session?.username;
  if (!username) {
    res.redirect("/login");
  } else {
    let user = await User.findOne({ username: req?.session?.username });
    if (user.role !== "admin") {
      res.send("You are not authorized to view this page");
    } else {
      res.render(`pages/admin/${page}`, {
        user: user,
        orders: await Order.find({}).sort({ date: -1 }),
        users: await User.find({}).sort({ created: -1 }),
        products: await Game.find({}).sort({ created: -1 }),
        stats: await getStats(),
        selectedPage: page,
      });
    }
  }
}

function displayCurrency(num) {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

router.get("/", (req, res) => {
  res.redirect("/admin/home");
});

router.get("/home", async (req, res) => {
  handlePage(req, res, "home");
});

router.get("/orders", (req, res) => {
  handlePage(req, res, "orders");
});

router.get("/users", (req, res) => {
  handlePage(req, res, "users");
});

router.get("/products", (req, res) => {
  handlePage(req, res, "products");
});

module.exports = router;
