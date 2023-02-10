const express = require("express");
const connectDB = require("./db/db");
const itemsRouter = require("./routes/items");
const tenantsRouter = require("./routes/tenant");
const app = express();

connectDB()

app.use(express.json({ extended: false }))

app.use("/items", itemsRouter);
app.use("/tenants", tenantsRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
