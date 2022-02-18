const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");
const { request } = require("../app");

////get the data.//////
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from categories");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const newCategory = {
    categoryID: req.body.categoryID,
    categoryName: req.body.categoryName,
    stockStatus: req.body.stockStatus,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO categories (categoryID, categoryName,stockStatus) VALUES ('" +
          newCategory.categoryID +
          "','" +
          newCategory.categoryName +
          "','" +
          newCategory.stockStatus +
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
  console.log("efwfgwf", req.body.categoryID);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE categories  SET stockStatus = 0 where categoryID = '" +
          req.body.categoryID +
          "'"
      );
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:categoryID", async (req, res) => {
  const categoryUpgrade = {
    categoryID: parseInt(req.params.categoryID),
    categoryName: req.body.categoryName,
    stockStatus: req.body.stockStatus,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE categories SET categoryName ='" +
          categoryUpgrade.categoryName +
          "',stockStatus='" +
          categoryUpgrade.stockStatus +
          "' where categoryID = '" +
          parseInt(req.params.categoryID) +
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
