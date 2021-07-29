const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./configurations/db");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

dotenv.config();

connectDB();

// app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.static(__dirname + "/public"));

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Backend server is running");
});
