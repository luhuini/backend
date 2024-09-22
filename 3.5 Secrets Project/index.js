//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

/* 
1.展示基础页面
2.使用body- parser获取到输入的密码
 -正确：跳转至秘密页面
 -错误：跳转至基础页面
3.使用的时候，使用自定义middleware

*/
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
let url = "";
// create application/json parser
let jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
const getURLMethod = (req, res, next) => {
  console.log(req.body);
  if (req.body.password === "ILoveProgramming") {
    url = "secret";
  } else {
    url = "index";
  }
  next();
};
app.use(getURLMethod);
app.get("/", (req, res) => {
  console.log("hello");
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/check", (req, res) => {
  console.log(url);

  res.sendFile(__dirname + `/public/${url}.html`);
});
app.listen(port, (req, res) => {
  console.log("your port started");
});
