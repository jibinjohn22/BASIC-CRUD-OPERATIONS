const express = require('express')
const router = express.Router()
const { poolPromise } = require('../db')

router.get('/', async (req, res) => {
    try {
      const pool = await poolPromise
      const result = await pool.request()
          .query('select * from stocks')      
  
      res.json(result.recordset)
    } catch (err) {
      res.status(500)
      res.send(err.message)
    }
  })


/////post data/////
router.post("/", async (req, res) => {
  const stockList = {
    storeID: req.body.storeID,
    productID: req.body.productID,
    quantity:req.body.quantity,
    openClose: req.body.openClose,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO stocks (storeID,productID,quantity,openClose) VALUES ('" +
          stockList.storeID +
          "','" +
          stockList.productID +
          "','"+stockList.quantity+"','" +
          stockList.openClose +
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
        "UPDATE stocks SET openClose= 0 where storeID = '" +
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
  const stockList = {
    storeID: parseInt(req.params.storeID),
    productID: req.body.productID,
    quantity:req.body.quantity,
    openClose: req.body.openClose,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE stocks SET productID ='" +
          stockList.productID+
          "',quantity='" +
          stockList.quantity+
          "',openClose='" +
          stockList.openClose+
          "' where storeID = '" +
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






module.exports = router