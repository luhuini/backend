import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("hah");
  res.render("index.ejs", { length: 0 });
});

app.post("/submit", (req, res) => {
  let fullName = req.body["fName"] + req.body["lName"];
  let fullNameLen = fullName.length;
  console.log(fullNameLen);
  res.render("index.ejs", { length: fullNameLen });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
