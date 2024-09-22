import express from "express";
const app = express();
const port = 3001;
/* send方法
	1.	接收请求：当客户端（如浏览器）向服务器发送 GET 请求时，Express 会调用相应的路由处理函数。
	2.	请求对象（req）：在这个处理函数中，你会收到一个请求对象 req，它包含了关于请求的信息，比如请求的 URL、参数、查询字符串等。
	3.	响应对象（res）：你还会收到一个响应对象 res，它用于发送响应回客户端。
	4.	使用 res.send()：通过调用 res.send() 方法，你可以发送数据（如文本、JSON、HTML 等）回客户端。
	5.	客户端处理响应：当浏览器接收到这个响应后，它会根据响应的内容（例如 HTML、JSON 数据等）来修改页面或更新显示。
*/
app.get("/", (req, res) => {
  res.send("<h1>hello lulu</h1>");
});
app.get("/contact", (req, res) => {
  res.send("contact with my in app");
});
app.get("/about", (req, res) => {
  res.send("about me");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
