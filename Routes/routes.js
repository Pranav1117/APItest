const route = require("express").Router();

const {
  registrationApi,
  loginApi,
  changePassApi,
} = require("../controller/api");

route.post("/register", registrationApi);
route.use("/login", loginApi);
route.use("/changePass", changePassApi);

module.exports = route;
