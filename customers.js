const express = require("express");
const { request } = require("../app");
const router = express.Router();
const { poolPromise } = require("../db");

///////get data//////
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from customers");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const names = {
    customerID: req.body.customerID,
    customerName: req.body.customerName,
    email: req.body.email,
    phone: req.body.phone,
    postalAddress: req.body.postalAddress,
  };
  console.log(names);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO customers (customerID, customerName,email, phone, postalAddress, yes_no) VALUES ('" +
          names.customerID +
          "','" +
          names.customerName +
          "','" +
          names.email +
          "','" +
          names.phone +
          "','" +
          names.postalAddress +
          "', 1)"
      );

    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});



/////delete///////
router.put("/remove", async (req, res) => {
 console.log('efwfgwf', req.body.customerID)
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE Customers SET yes_no = 0 where customerID = '" + req.body.customerID + "'"
        );
    res.send(result);

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:customerID", async (req, res) => {
  const names = {
    customerID: parseInt(req.params.customerName),
    customerName: req.body.customerName,
    email: req.body.email,
    phone: req.body.phone,
    postalAddress: req.body.postalAddress,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE Customers SET customerName ='" +
          names.customerName +
          "',email='" +
          names.email +
          "',phone='" +
          names.phone +
          "',postalAddress='" +
          names.postalAddress +
          "' where customerID = '" +
          parseInt(req.params.customerID) +
          "'"
      );

    res.send(result);
  } catch (err) {
    console.log('vewvf')
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
