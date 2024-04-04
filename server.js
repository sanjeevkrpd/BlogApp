const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRouter");

// dotenv config
dotenv.config();

// config db
connectToDb();
const port = process.env.PORT;

// rest object
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// get route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(port, () => {
  console.log(`server is listining to the port ${port}`);
});
