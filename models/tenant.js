const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  database: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
