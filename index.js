import express from "express";
const app = express();
const port = 3000;
/* 
res.sendStatus(200) 是 Express.js 中的一个方法，
用于发送 HTTP 响应状态码并结束请求。
这个方法会设置响应的状态码为 200（表示请求成功），
并且不返回任何响应体。
 */

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});
app.post("/register", (req, res) => {
  res.sendStatus(201);
});
app.put("/user/angela", (req, res) => {
  res.sendStatus(200);
});
app.patch("/user/angela", (req, res) => {
  res.sendStatus(200);
});
app.delete("/user/angela", (req, res) => {
  res.sendStatus(200);
});
app.listen(port, () => {
  console.log(`${port} created`);
});
