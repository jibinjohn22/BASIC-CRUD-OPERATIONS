const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");
const { request } = require("../app");

/////get data/////
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from brands");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const newBrand = {
    brandID: req.body.brandID,
    brandName: req.body.brandName,
    statuss:req.body.statuss
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO brands (brandID, brandName) VALUES ('" +
          newBrand.brandID +
          "','" +
          newBrand.brandName +
          "')"
      );

    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

/////delete///////
router.put("/remove", async (req, res) => {
  console.log("efwfgwf", req.body.brandID);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE brands SET statuss= 0 where brandID = '" +
          req.body.brandID +
          "'"
      );
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:brandID", async (req, res) => {
  const newBrand = {
    brandID: parseInt(req.params.brandID),
    brandName: req.body.brandName,
    statuss:req.body.statuss
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE brands SET brandName ='" +
          newBrand.brandName +
          "',statuss='"+newBrand.statuss+"' where brandID = '" +
          parseInt(req.params.brandID) +
          "'"
      );

    res.send(result);
  } catch (err) {
    console.log("vewvf");
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
