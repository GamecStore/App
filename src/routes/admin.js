const express = require("express");
const router = express.Router();

const User = require("../models/User.js");
const Game = require("../models/Game.js");

async function getStats() {
  return {
    salesThisMonth: 0,
    newCustomers: await User.countDocuments({
      role: "user",
      createdAt: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    })
  }
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
      res.render(`pages/admin/${page}`, { user: user, stats: await getStats(), selectedPage: page});
    }
  }
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
