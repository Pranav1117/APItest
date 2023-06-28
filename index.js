const express = require("express");
const dotenv = require("dotenv");
const route = require("./Routes/routes");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/user", route);

app.listen(port);
