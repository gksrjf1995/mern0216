
const router = require("express").Router();
const employess = require("../controller/employess.js")
console.log(employess);

router.get("/",employess.getemployess)


module.exports = router 

