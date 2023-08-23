import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });

    if (emailExists) {
      res.status(400).send({
        msg: "Email already exists!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send({
      msg: "User created Successfully!",
    });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(400).send({
        msg: "Email doesn't exists!",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).send({
        msg: "Password Incorrect!",
      });
      return;
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_TOKEN);
    res.status(200).send({
      msg: "Login successfull!",
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
    });
  }
});

export default router;
