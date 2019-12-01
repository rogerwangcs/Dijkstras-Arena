const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
// router.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
// });

module.exports = router;
