const db = require("../database");

const router = require("express").Router();

module.exports = router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, row) => {
    if (err) throw err;
    res.render("user_index", {
      title: "Users",
      users: row,
    });
  });
});
