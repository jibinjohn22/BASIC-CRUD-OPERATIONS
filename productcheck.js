const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

router.get("/:productID", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "SELECT products.productID,products.productName,products.categoryID,categories.categoryName,products.modelYear,products.listPrice,stocks.quantity FROM products,stocks,categories WHERE products.productID = stocks.productID and products.categoryID=categories.categoryID AND products.productID = '" +
          parseInt(req.params.productID) +
          "';"
      );

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

module.exports = router;
