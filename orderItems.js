const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get('/', async (req, res) => {
    try {
      const pool = await poolPromise
      const result = await pool.request()
          .query('select * from orderItems')      
  
      res.json(result.recordset)
    } catch (err) {
      res.status(500)
      res.send(err.message)
    }
  })



//////post data/////
router.post("/", async (req, res) => {
  const orderList = {
    orderID: req.body.orderID,
    productID: req.body.productID,
    quantity:req.body.quantity,
    listPrice:req.body.listPrice,
    discount:req.body.discount,
    stockStatus: req.body.stockStatus,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO orderItems (orderID,productID,quantity,listPrice,discount,stockStatus) VALUES ('" +
          orderList.orderID+
          "','" +
          orderList.productID +
          "','" +
          orderList.quantity +
          "','"+orderList.listPrice+"','"+orderList.discount+"','"+orderList.stockStatus+"')"
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
        "UPDATE orderItems  SET stockStatus = 0 where orderID = '" +
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
  const orderList= {
    orderID: parseInt(req.params.orderID),
    productID: req.body.productID,
    quantity:req.body.quantity,
    listPrice:req.body.listPrice,
    discount:req.body.discount,
    stockStatus: req.body.stockStatus,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE orderItems SET productID ='" +
          orderList.productID+
          "',quantity='" +
          orderList.quantity +
          "',listPrice='" +
          orderList.listPrice+
          "',discount='" +
          orderList.discount+
          "',stockStatus='" +
          orderList.stockStatus +
          "' where orderID = '" +
          parseInt(req.params.orderID) +
          "'"
      );

    res.send(result);
  } catch (err) {
    console.log("vewvf");
    res.status(500);
    res.send(err.message);
  }
});






module.exports = router