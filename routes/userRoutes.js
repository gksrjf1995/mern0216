const userRouter = require("express").Router();
const usersController = require("../controller/usersController.js");


userRouter.route("/")
    .get(usersController.getUser)
    .post(usersController.posttUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)


module.exports = userRouter
