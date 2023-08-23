import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import urlModel from "./models/url.model.js";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import authRouter from "./routers/auth.router.js";
import cors from "cors";
import authVerify from "./middlewares/authVerify.js";
import shortenRouter from "./routers/shorten.router.js";
dotenv.config({ path: "./.env" });

const app = express();
connectDatabase();
app.use(express.json());
app.use(cors());

app.get("/api", authVerify, (req, res) => {
  res.send("Working ");
});

app.use("/api/auth", authRouter);
app.use("/api/shorten", authVerify, shortenRouter);

app.get("/redirect/:code", async (req, res) => {
  console.log("hi");
  try {
    const obj = await urlModel.findOne({
      short_url_code: req.params.code,
    });
    res.redirect(obj.og_url);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Connected to PORT:${process.env.PORT}!`);
});
