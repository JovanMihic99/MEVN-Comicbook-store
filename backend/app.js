const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./api/v1/routes/products");
const orderRoutes = require("./api/v1/routes/orders");

const userRoutes = require("./api/v1/routes/user");

// CORS
app.use(cors());
app.use("/uploads", express.static("uploads"));

// MongoDB Database
mongoose.connect(
  "mongodb+srv://jovanmihic99:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.akbsv6h.mongodb.net/?retryWrites=true&w=majority"
);

// Logger
app.use(morgan("dev"));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/user", userRoutes);

// Not found route
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Erorr handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
