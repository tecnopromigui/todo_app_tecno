const { Router } = require("express");

const routes = Router();

const userRouter = require("./user.router");
const taskRouter = require("./task.router");

routes.use("/user", userRouter)
routes.use("/task", taskRouter);

module.exports = routes;