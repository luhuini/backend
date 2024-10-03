import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);

  // Step 2: Play around with the drop downs and see what gets logged.
  // { type: 'busywork', participants: '3' }
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // GET 请求无法通过请求体传递数据。你应该通过 URL 或使用 Axios 的 params 选项来传递查询参数。
  try {
    let result = await axios({
      method: "get",
      url: `https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`,
    });
    let randomIndex = Math.floor(Math.random() * result.data.length);
    console.log(result.data.length);
    console.log(randomIndex);
    let randomItem = result.data[randomIndex];
    console.log(randomItem); // Randomly selected
    res.render("index.ejs", { randomItem });
  } catch (error) {
    console.error("Failed to make request:", error.code);
    let error_msg = "No activities that match your criteria.";
    res.render("index.ejs", {
      error: error_msg,
    });
  }

  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
