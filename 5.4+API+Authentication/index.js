import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "lili778";
const yourPassword = "123456";
const yourAPIKey = "123-qaz";
const yourBearerToken = "mojito";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  let result = await axios.get(" https://secrets-api.appbrewery.com/random");
  let data = result.data;
  const jsonString = JSON.stringify(data);
  res.render("index.ejs", { jsonString });
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  //  first register
  try {
    let newUser = await axios.post(
      "https://secrets-api.appbrewery.com/register",
      {
        username: yourUsername,
        password: yourPassword,
      }
    );
  } catch (error) {
    console.log(error.data);
  }

  // then get list
  try {
    let result = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2",
      {
        auth: {
          username: yourUsername, // 替换为你的用户名
          password: yourPassword, // 替换为你的密码
        },
      }
    );

    let data = result.data;
    let jsonString = JSON.stringify(data);

    res.render("index.ejs", { jsonString });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/apiKey", async (req, res) => {
  // get key
  let result = await axios.get(
    "https://secrets-api.appbrewery.com/generate-api-key"
  );
  let yourAPIKey = result.data.apiKey;
  console.log(result.data.apiKey);
  // get data
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  let data = await axios.get(
    `https://secrets-api.appbrewery.com/filter?score=7&apiKey=${yourAPIKey}`
  );
  console.log(data.data);
  const jsonString = JSON.stringify(data.data);
  res.render("index.ejs", { jsonString });
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  let result = await axios.post(
    "https://secrets-api.appbrewery.com/get-auth-token",
    {
      username: yourUsername,
      password: yourPassword,
    }
  );
  console.log(result);
  let yourBearerToken = result.data.token;
  console.log(yourBearerToken);
  let secret = await axios.get("https://secrets-api.appbrewery.com/secrets/2", {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
  console.log(secret.data);
  const jsonString = JSON.stringify(secret.data);
  res.render("index.ejs", { jsonString });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
