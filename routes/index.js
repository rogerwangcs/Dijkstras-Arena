const express = require("express");
const router = express.Router();

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build"));
});
// router.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
//   c;
// });

module.exports = router;
