const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from products");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const productList = {
    productID: req.body.productID,
    productName: req.body.productName,
    categoryID: req.body.categoryID,
    modelYear: req.body.modelYear,
    listPrice: req.body.listPrice,
    stockStatus: req.body.stockStatus,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO products (productID,productName,categoryID,modelYear,listPrice,stockStatus) VALUES ('" +
          productList.productID +
          "','" +
          productList.productName +
          "','" +
          productList.categoryID +
          "','" +
          productList.modelYear +
          "','" +
          productList.listPrice +
          "','" +
          productList.stockStatus +
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
  console.log("efwfgwf", req.body.productID);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE products SET stockStatus = 0 where productID = '" +
          req.body.productID +
          "'"
      );
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:productID", async (req, res) => {
  const productList = {
    productID: parseInt(req.params.productID),
    productName: req.body.productName,
    categoryID: req.body.categoryID,
    modelYear: req.body.modelYear,
    listPrice: req.body.listPrice,
    stockStatus: req.body.stockStatus,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE products SET productName ='" +
          productList.productName +
          "',categoryID='" +
          productList.categoryID +
          "',modelYear='" +
          productList.modelYear +
          "',listprice='" +
          productList.listPrice +
          "',stockStatus='" +
          productList.stockStatus +
          "' where productID = '" +
          parseInt(req.params.productID) +
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
