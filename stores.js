const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from stores");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const storeList = {
    storeID: req.body.storeID,
    storeName: req.body.storeName,
    email: req.body.email,
    phone: req.body.phone,
    postalAddress: req.body.postalAddress,
    openClose: req.body.openClose,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO stores (storeID,storeName,email,phone,postalAddress,openClose) VALUES ('" +
          storeList.storeID +
          "','" +
          storeList.storeName +
          "','" +
          storeList.email +
          "','" +
          storeList.phone +
          "','" +
          storeList.postalAddress +
          "','" +
          storeList.openClose +
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
  console.log("efwfgwf", req.body.storeID);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE stores SET openClose= 0 where storeID = '" +
          req.body.storeID +
          "'"
      );
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:storeID", async (req, res) => {
  const storeList = {
    storeID: parseInt(req.params.storeID),
    storeName: req.body.storeName,
    email: req.body.email,
    phone: req.body.phone,
    postalAddress: req.body.postalAddress,
    openClose: req.body.openClose,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE stores SET storeName ='" +
          storeList.storeName +
          "',email='" +
          storeList.email +
          "',phone='" +
          storeList.phone +
          "',postalAddress='" +
          storeList.postalAddress +
          "',openClose='" +
          storeList.openClose +
          "'where storeID = '" +
          parseInt(req.params.storeID) +
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
