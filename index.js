import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import urlModel from "./models/url.model.js";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import authRouter from "./routers/auth.router.js";
import cors from "cors";
dotenv.config({ path: "./.env" });

const app = express();
connectDatabase();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello");
});

app.use("/auth", authRouter);

app.post("/shorten", async (req, res) => {
  console.log("here");
  const { og_url } = req.body;
  const nanoid = customAlphabet(alphanumeric, 6);
  try {
    const newUrl = new urlModel({
      og_url: og_url,
      short_url_code: nanoid(6),
    });
    console.log(newUrl);
    res.send(await newUrl.save());
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/:short_url_code", async (req, res) => {
  try {
    const obj = await urlModel.findOne({
      short_url_code: req.params.short_url_code,
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
