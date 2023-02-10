#### Introduction
Multi-tenancy is a software architecture that allows a single instance of a software application to serve multiple clients, also known as tenants. Each tenant has its own unique set of data, configuration, and user management, and is isolated from other tenants. This is in contrast to single-tenant architecture, where each instance of the software application serves a single client.


#### Multi-tenancy in MongoDB
MongoDB is a document database that provides high performance, high availability, and easy scalability. MongoDB supports multi-tenancy in two ways:

* Database per tenant: Each tenant has its own database. This is the most common approach to multi-tenancy in MongoDB. Each database is independent and isolated from other databases. This approach is also known as database per client or database per tenant.

* Collection per tenant: Each tenant has its own collection. This approach is less common than database per tenant. Each collection is independent and isolated from other collections. This approach is also known as collection per client or collection per tenant.



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
