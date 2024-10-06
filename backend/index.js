const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT;

// Import Routers
const usersRouter = require("./routes/users");
const rolesRouter = require("./routes/roles");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use('/products', productRouter)
app.use('/carts', cartRouter)


// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
