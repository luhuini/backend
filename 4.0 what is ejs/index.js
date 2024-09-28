import express from "express";
let app = express();
let port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  console.log(dayOfWeek); // 输出当天是星期几，0 表示星期天，1 表示星期一，依此类推。
  let type = "weekend";
  let adv = "fun";
  if (dayOfWeek !== 0 || dayOfWeek !== 6) {
    type = "weekday";
    adv = "work";
  }
  //   res.render() 用于渲染模板文件（如 EJS、Pug 等），并将生成的 HTML 返回给客户端。
  //   index.ejs 是一个 EJS 模板文件，res.render() 会将模板文件中的占位符替换为传递的变量（dayType 和 advice），并将生成的 HTML 返回给客户端。
  res.render("index.ejs", { dayType: type, advice: adv });
});

app.listen(port, () => {
  console.log(`on work, port ${port}`);
});
