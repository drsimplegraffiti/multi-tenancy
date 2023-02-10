const express = require("express");
const mongoose = require("mongoose");
const Tenant = require("../models/tenant");
const ItemSchema = require("../models/item");
const router = express.Router();

/**
 * It takes a tenantId, finds the tenant in the Tenant collection, and then creates a new connection to
 * the tenant's database.
 * @param tenantId - The id of the tenant
 * @returns A connection to the tenant's database.
 */
const getTenantDb = async (tenantId) => {
  const tenant = await Tenant.findById(tenantId);
  if (!tenant) throw new Error("Tenant not found");

  return mongoose.createConnection(
    `mongodb://127.0.0.1:27017/${tenant.database}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
};

router.get("/:tenantId/items", async (req, res) => {
  const tenantId = req.params.tenantId;
  const tenantDb = await getTenantDb(tenantId);
  if (!tenantDb) return res.status(404).json({ message: "Tenant not found" });

  const Item = tenantDb.model("Item", ItemSchema);

  const items = await Item.find();

  res.json(items);
});

// create a new item
/* Creating a new item in the database. */
router.post("/:tenantId/items", async (req, res) => {
  const tenantId = req.params.tenantId;
  const tenantDb = await getTenantDb(tenantId);
  if (!tenantDb) return res.status(404).json({ message: "Tenant not found" });

  const Item = tenantDb.model("Item", ItemSchema);

  const { name, description } = req.body;
  try {
    if (!(name && description))
      return res.status(400).json({ message: "All fields are required" });
    const item = new Item({
      name,
      description,
    });
    const newItem = await item.save();

    return res.status(201).json(newItem);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
