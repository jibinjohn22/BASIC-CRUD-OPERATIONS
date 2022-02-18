const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from orders");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const newOrder = {
    orderID: req.body.orderID,
    customerID: req.body.customerID,
    orderStatus: req.body.orderStatus,
    orderDate: req.body.orderDate,
    requiredDate: req.body.requiredDate,
    shippedDate: req.body.shippedDate,
    storeID: req.body.storeID,
    staffID: req.body.staffID,
    statuss: req.body.statuss,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO orders (orderID,customerID,orderStatus,orderDate,requiredDate,shippedDate,storeID,staffID,statuss) VALUES ('" +
          newOrder.orderID +
          "','" +
          newOrder.customerID +
          "','" +
          newOrder.orderStatus +
          "','" +
          newOrder.orderDate +
          "','" +
          newOrder.requiredDate +
          "','" +
          newOrder.shippedDate +
          "','" +
          newOrder.storeID +
          "','" +
          newOrder.staffID +
          "','" +
          newOrder.statuss +
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
  console.log("efwfgwf", req.body.orderID);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE orders SET statuss = 0 where orderID = '" +
          req.body.orderID +
          "'"
      );
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:orderID", async (req, res) => {
  const updateOrder = {
    orderID: parseInt(req.params.orderID),
    customerID: req.body.customerID,
    orderStatus: req.body.orderStatus,
    orderDate: req.body.orderDate,
    requiredDate: req.body.requiredDate,
    shippedDate: req.body.shippedDate,
    storeID: req.body.storeID,
    staffID: req.body.staffID,
    statuss: req.body.statuss,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE orders SET customerID ='" +
          updateOrder.customerID +
          "',orderStatus='" +
          updateOrder.orderStatus +
          "',orderDate='" +
          updateOrder.orderDate +
          "',requiredDate='" +
          updateOrder.requiredDate +
          "',shippedDate='" +
          updateOrder.shippedDate +
          "',storeID='" +
          updateOrder.storeID +
          "',staffID='" +
          updateOrder.staffID +
          "',statuss='" +
          updateOrder.statuss +
          "' where orderID = '" +
          parseInt(req.params.orderID) +
          "'"
      );

    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
