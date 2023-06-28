const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();
SECRET_KEY = process.env.SECRET_KEY;

let userSavedData = [];

const registrationApi = (req, res) => {
  const data = req.body;
  // console.log(data);

  const user = userSavedData.find((item) => {
    if (data.email === item.email) {
      return item;
    }
  });

  if (user) {
    res.send("User already exist");
    return;
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const token = jwt.sign({ __idByToken: data.__id }, SECRET_KEY, {
      expiresIn: "2d",
    });
    console.log(hashedPassword);
    let tempObj = {
      id: data.__id,
      name: data.name,
      contactNo: data.number,
      email: data.email,
      password: hashedPassword,
      JwtToken: token,
    };
    userSavedData.push(tempObj);
    console.log("start");
    //res.send(userSavedData);
    res.send(" User registered Succuessfully");
    //console.log("a");
  }

  //console.log(userSavedData);
};

const loginApi = (req, res) => {
  const data = req.body;
  for (let i = 0; i < userSavedData.length; i++) {
    const user = userSavedData[i];
    if (user.email === data.email) {
      let passVerify = bcrypt.compareSync(data.password, user.password);
      console.log(passVerify);
      if (passVerify) {
        res.send("login Successfull");
        return;
      } else {
        res.send("plz enter correct Password ");
      }
    } else {
      res.send("User is not registered");
    }
  }
};

/*const changePass=(req,res)=>{
const {authorization}=req.headers
const{password,conf_password}=req.body
if(password!==conf_password){
    res.send("password not matches")
}
if(authorization){
    const token=authorization.spli(" ")[1]
    const {userID}=jwt.verify(token,process.env.JWT_SECRET_KEY)
    const userList
}
}*/

const changePassApi = (req, res) => {
  const { authorization } = req.headers;
  console.log(
    "-------------------------------------------------------------------------------"
  );
  const token = authorization.split(" ")[1];
  console.log(token);
  const { __idByToken } = jwt.verify(token, SECRET_KEY);
  console.log(
    "-------------------------------------------------------------------------------"
  );
  console.log(__idByToken);
};

module.exports = { registrationApi, loginApi, changePassApi };
