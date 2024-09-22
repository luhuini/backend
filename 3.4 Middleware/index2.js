import express from "express";
import morgan from "morgan";
/* Create a new morgan logger middleware function using the given format and options. 
The format argument may be a string of a predefined name (see below for the names),
 a string of a format string, 
 or a function that will produce a log entry. */
const app = express();
const port = 3000;
// Use morgan for logging requests
app.use(morgan("short")); // 'dev' "combined" is a predefined format
// result:  ::1 - - [22/Sep/2024:21:15:17 +0000] "GET / HTTP/1.1" 200 5 "-" "PostmanRuntime/7.42.0"
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
