const express = require("express");
const { signUp, logIn } = require("../controllers/users");
const userRouter = express.Router();


userRouter.post("/signup", signUp);

userRouter.post("/login", logIn);

module.exports = userRouter;
