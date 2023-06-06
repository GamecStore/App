const express = require("express");
const router = express.Router();

const User = require("../models/User.js");
const Game = require("../models/Game.js");
const Order = require("../models/Order.js");

async function getStats() {
  const lastMonthStartDate = new Date();
  lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1);
  lastMonthStartDate.setHours(0, 0, 0, 0);
  return {
    salesThisMonth: await Order.aggregate([
      {
        $match: {
          date: { $gte: lastMonthStartDate },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]).then((res) => {
      return displayCurrency(res[0]?.totalSales || 0);
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

async function getOrders() {
  let orders = await Order.find({}).sort({ date: -1 });
  let ordersWithUsers = [];
  for (let order of orders) {
    let user = await User.findById(order.user);
    ordersWithUsers.push({ ...order._doc, user: user });
  }
  return ordersWithUsers;
}

async function handlePage(req, res, page, data = {}) {
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
        orders: await getOrders(),
        users: await User.find({}).sort({ created: -1 }),
        products: await Game.find({}).sort({ created: -1 }),
        stats: await getStats(),
        selectedPage: page,
        ...data,
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

router.post("/users/delete/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect("/admin/users");
});

router.post("/users/switchrole/:id", async (req, res) => {
  let user = await User.findById(req.params.id);
  user.role = user.role === "user" ? "admin" : "user";
  await user.save();
  res.redirect("/admin/users");
});

router.get("/products", (req, res) => {
  handlePage(req, res, "products");
});

router.post("/products/delete/:id", async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.redirect("/admin/products");
});

router.post("/products/edit/:id", async (req, res) => {
  let game = await Game.findById(req.params.id);
  handlePage(req, res, "editProduct", { game: game });
})

module.exports = router;
