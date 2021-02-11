const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Host = require("../models/host");

router.get("/", (req, res, next) => {
  Host.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const host = new Host({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    isActive: true
  });
  host
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /host",
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:hostName", (req, res, next) => {
  const hostName = req.params.hostName;
  Host.findOne({name: hostName})
    .exec()
    .then(host => {
      console.log("From database", host);
      if (host) {
        res.status(200).json(host);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.delete("/:hostId", (req, res, next) => {
  const id = req.params.hostId;
  Host.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
