const express = require("express");
const Tenant = require("../models/tenant");
const router = express.Router();

// create a new tenant
router.post("/", async (req, res) => {
  const { name, database, color } = req.body;
  try {
    if (!(name && database))
      return res.status(400).json({ message: "All fields are required" });
    const tenant = new Tenant({
      name,
      database,
      color,
    });
    const newTenant = await tenant.save();

    return res.status(201).json(newTenant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get all tenants
router.get("/", async (req, res) => {
  try {
    const tenants = await Tenant.find();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get one tenant
router.get("/:id", async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (tenant == null) {
      return res.status(404).json({ message: "Cannot find tenant" });
    }
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
