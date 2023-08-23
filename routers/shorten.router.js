import express from "express";
import Url from "../models/url.model.js";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const _id = req.user._id;
      const allUrls = await Url.find({
        created_by: _id,
      });

      res.status(200).send({
        urls: allUrls,
        count: allUrls.length,
      });
    } catch (error) {
      res.status(500).send({
        msg: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const { og_url } = req.body;
      const nanoid = customAlphabet(alphanumeric, 6);
      const newUrl = new Url({
        og_url,
        short_url_code: nanoid(6),
        created_by: req.user._id,
      });
      res.status(200).send(await newUrl.save());
    } catch (error) {
      res.status(500).send({
        msg: error.message,
      });
    }
  });

export default router;
