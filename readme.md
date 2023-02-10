##### The master db is :

```js
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/master");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

#### To create a new tenant

> http://localhost:3000/tenants POST
Ex1:

```json
{
  "name": "Tenant 1",
  "database": "tenant_1_db",
  "color":"red"
}

```
Ex2:
```json
{
  "name": "Tenant 2",
  "database": "tenant_2_db",
  "color":"blue"
}

```

#### Create  a new item
> localhost:3000/items/:tenantId/items POST
```json
{
  "name": "Item 1",
  "description": "Item 1 description"
}
```
