const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * from customers WHERE customerName like 'J%' ;");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get("/groupby/:totalPurchase", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT count(city),sum(totalPurchase) from customers WHERE city >'" +
          parseInt(req.params.totalPurchase) +
          "';"
      );

    console.log(req.params.city);
    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

router.get("/groupbycity", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT COUNT(customerID),city,sum(totalPurchase) FROM customers GROUP BY city "
      );

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
