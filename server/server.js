//const scrapper = require('x-kom-scrapper');
const scrapper = require('x-kom-scrapper');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);

app.get('/scrap-x', async (req, res) => {
  const scrapData = await scrapper();
  res.send(scrapData);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* {
  paginationParameters: [ { success: true, current: '1-30', all: '77', pages: 3 } ],
  products: {
    items: [
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object],
      [Object], [Object]
    ],
    total: 77
  },
  message: 'Success'
} */

/* items: [{name: "KFA2 GeForce RTX 3060 Ti EX LHR 8GB GDDR6", lastPrice: "b/d", currentPrice: 3299,…},…]
0: {name: "KFA2 GeForce RTX 3060 Ti EX LHR 8GB GDDR6", lastPrice: "b/d", currentPrice: 3299,…}
currentPrice: 3299
image: "https://cdn.x-kom.pl/i/setup/images/prod/big/product-medium,,2022/2/pr_2022_2_24_15_4_41_482_00.jpg"
lastPrice: "b/d"
link: "/p/726430-karta-graficzna-nvidia-kfa2-geforce-rtx-3060-ti-ex-lhr-8gb-gddr6.html"
name: "KFA2 GeForce RTX 3060 Ti EX LHR 8GB GDDR6" */
