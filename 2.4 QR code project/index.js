/* 
1.use the inquirer npm package to get user input

2.use the qr-image npm package to rurn the user entered url into a QR code image

3.create a txt file to save the user input usng the native fs node module
*/

import inquirer from "inquirer";

inquirer
  .prompt([
    /* Pass your questions in here */
    { type: "input", name: "URL", message: "enter your URL" },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
