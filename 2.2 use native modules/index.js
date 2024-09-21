const { writeFile, readFile } = require("node:fs");

// writeFile("message.txt", "hello to node", (err) => {
//   if (err) throw err;
//   console.log("The file has been saved!");
// });

readFile("./message.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
