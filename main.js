const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT;

  app.listen(3000, () => {
    console.log(`server : http://localhost:${port}`);
  });
}

main();
