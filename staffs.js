const express = require("express");
const router = express.Router();
const { poolPromise } = require("../db");

router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from staffs");

    res.json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////post data/////
router.post("/", async (req, res) => {
  const staffList = {
    staffID: req.body.staffID,
    staffName: req.body.staffName,
    email: req.body.email,
    phone: req.body.phone,
    storeID: req.body.storeID,
    managerID: req.body.managerID,
    active: req.body.active,
  };

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "INSERT INTO staffs (staffID,staffName,email,phone,storeID,managerID,active) VALUES ('" +
          staffList.staffID +
          "','" +
          staffList.staffName +
          "','" +
          staffList.email +
          "','" +
          staffList.phone +
          "','" +
          staffList.storeID +
          "','" +
          staffList.managerID +
          "','" +
          staffList.active +
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
  console.log("efwfgwf", req.body.staffID);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE staffs SET active = 0 where staffID = '" +
          req.body.staffID +
          "'"
      );
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

//////updating table/////////
router.put("/:staffID", async (req, res) => {
  const staffList = {
    staffID: parseInt(req.params.staffID),
    staffName: req.body.staffName,
    email: req.body.email,
    phone: req.body.phone,
    storeID: req.body.storeID,
    managerID: req.body.managerID,
    active: req.body.active,
  };
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "UPDATE staffs SET staffName ='" +
          staffList.staffName +
          "',email='" +
          staffList.email +
          "',phone='" +
          staffList.phone +
          "',storeID='" +
          staffList.phone +
          "',managerID='" +
          staffList.managerID +
          "',active='" +
          staffList.active +
          "' where staffID = '" +
          parseInt(req.params.staffID) +
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
