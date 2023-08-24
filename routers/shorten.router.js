import express from "express";
import Url from "../models/url.model.js";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary";
import { body, validationResult } from "express-validator";
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
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.query;
      const url = await Url.exists({ _id: id });

      if (!url) {
        res.status(400).send({
          msg: "URl doesn't exists!",
        });
        return;
      }

      await Url.deleteOne({ _id: id });
      res.status(200).send({
        msg: "URL deleted!",
      });
    } catch (error) {
      res.status(500).send({
        msg: error.message,
      });
    }
  })
  .put(body("og_url").isURL(), async (req, res) => {
    try {
      const result = validationResult(req);
      // if (result.isEmpty()) {
      const { id, og_url } = req.body;
      if (!id && !og_url) {
        res.status(400).send("Please provide a ID and URL");
        return;
      }

      const url = await Url.findOne({ _id: id });
      url.og_url = og_url;
      await url.save();
      res.status(200).send({
        msg: "URL updated!",
      });
      // } else {
      //   res.status(400).send({
      //     msg: "URL not found!",
      //   });
      // }
    } catch (error) {
      res.status(500).send({
        msg: error.message,
      });
    }
  });

export default router;
