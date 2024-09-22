import express from "express";
import morgan from "morgan";
const app = express();
const port = 3000;

// 自定义中间件
const logger = (req, res, next) => {
  // 记录请求的 URL
  console.log(`req.originalUrl":${req.originalUrl}`);
  console.log(req.method);
  // 使用 morgan 记录请求
  next();
};
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
