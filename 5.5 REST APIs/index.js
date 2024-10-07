import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "fd399607-70ab-46cf-85aa-5d89aadd4474";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  // try {
  //   const response = await axios.get(API_URL, {
  //     headers: { Authorization: `Bearer ${yourBearerToken}` },
  //   });
  //   console.log(response);
  // } catch (error) {
  //   console.error(error);
  // }
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
  console.log(req.body);
  let newSerect = {
    secret: req.body.secret,
    score: req.body.score,
  };
  console.log(newSerect);
  try {
    await axios.post(API_URL + "/secrets", newSerect, {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
  } catch (error) {
    console.error(error);
  }
});
// 使用 PUT 更新用户时，你必须发送完整的用户对象。
app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
  console.log(searchId);
  let putSerect = {
    secret: req.body.secret,
    score: req.body.score,
  };
  console.log(putSerect);
  try {
    await axios.put(`${API_URL}/secrets/${searchId}`, putSerect, {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
  } catch (error) {
    console.error(error.code);
  }
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
  // let patchSerect = {
  //   secret: req.body.secret,
  //   score: req.body.score,
  // };
  try {
    await axios.patch(`${API_URL}/secrets/${searchId}`, req.body, {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
  } catch (error) {
    console.log(error.code);
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
  try {
    await axios.delete(`${API_URL}/secrets/${searchId}`, {
      headers: { Authorization: `Bearer ${yourBearerToken}` },
    });
  } catch (error) {
    console.log(error.code);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
