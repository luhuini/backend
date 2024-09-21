/* 
1.use the inquirer npm package to get user input

2.use the qr-image npm package to rurn the user entered url into a QR code image

3.create a txt file to save the user input usng the native fs node module
*/

/* 

当你生成一个 QR 码图片时，Node.js 的 fs.createWriteStream() 方法只能将生成的文件保存到本地文件系统，即你的电脑或服务器上的一个具体文件夹，而不能直接保存到一个网络地址（URL）。也就是说，像 fs.createWriteStream('https://example.com/image.png') 这种使用 URL 的方式是错误的。你需要指定的是一个本地路径，比如 qr_code.png 或 ./images/qr_code.png。
*/

import inquirer from "inquirer";
import qr from "qr-image";
import { writeFile, createWriteStream } from "node:fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    { type: "input", name: "URL", message: "enter your URL" },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers.URL, "what is url?");
    const url = answers.URL;
    const qr_png = qr.image(`${url}`);
    //  The QR code is saved as qr_code.png by piping the stream to a writable file stream.
    qr_png.pipe(createWriteStream(`${url}.png`));
    console.log(qr_png);
    writeFile("url.txt", `${url}`, "utf8", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
