require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const itemsRouter = require("./routes/items");
const tenantsRouter = require("./routes/tenant");
const app = express();

/* Connecting to the database. */
connectDB();

/* Parsing the body of the request. */
app.use(express.json({ extended: false }));

app.use("/items", itemsRouter);
app.use("/tenants", tenantsRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
