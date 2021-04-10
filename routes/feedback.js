const db = require("../database");

const router = require("express").Router();

module.exports = router.get("/support", (req, res) => {
  db.query("SELECT * FROM app_feedback", (err, row) => {
    if (err) throw err;
    res.render("support_index", {
      title: "Support Page",
      app_feedback: row,
    });
  });
});
