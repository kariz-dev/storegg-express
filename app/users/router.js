var express = require("express");
var router = express.Router();
const { viewSignin, actionSignin, actonLogOut } = require("./controller");

router.get("/", viewSignin);
router.post("/", actionSignin);
router.get("/logout", actonLogOut);

module.exports = router;
