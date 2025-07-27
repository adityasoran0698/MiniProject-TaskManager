const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8000;
const MongodbConnection = require("./Connection.js");
const userRoute = require("./routes/user.js");
const taskRoute = require("./routes/task.js");
const cookieParser = require("cookie-parser");
const path = require("path");

const cors = require("cors");

const url = process.env.Mongo_URI;
MongodbConnection(url);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoute);
app.use("/task", taskRoute);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
