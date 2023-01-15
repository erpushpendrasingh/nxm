const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/Users.model");
const userRouter = express.Router();
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
     const { email, pass, name, age } = req.body;
     try {
          bcrypt.hash(pass, 5, async (err, secure_password) => {
               if (err) {
                    console.log(err);
               } else {
                    const user = new UserModel({
                         email,
                         pass: secure_password,
                         name,
                         age,
                    });
                    await user.save();
                    res.send({ msg: "Registered" });
               }
          });
     } catch (error) {
          res.send("Error in registering the user");
          console.log("error:", error);
     }
});

userRouter.post("/login", async (req, res) => {
     const { email, pass } = req.body;
     try {
          const user = await UserModel.find({ email });
          const hased_pass = user[0].pass;
          if (user.length > 0) {
               bcrypt.compare(pass, hased_pass, (err, result) => {
                    if (result) {
                         const token = jwt.sign(
                              { userID: user[0]._id },
                              process.env.key
                         );
                         res.send({ msg: "Login Successfull", token: token });
                    } else {
                         res.send("Wrong Credntials");
                    }
               });
          } else {
               res.send("Wrong Credntials");
          }
     } catch (error) {
          res.send("Something went wrong");
          console.log("error:", error);
     }
});

module.exports = {
     userRouter,
};
