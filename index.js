const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
  });

  const _3080TiFilter =
    'https://www.x-kom.pl/szukaj?sort_by=accuracy_desc&q=3080%20ti&f%5Bgroups%5D%5B7%5D=1&f%5Bcategories%5D%5B2372%5D=1';
  const _RTX30Filter =
    'https://www.x-kom.pl/g-5/c/345-karty-graficzne.html?f%5B1702%5D%5B178106%5D=1&f%5B1702%5D%5B178114%5D=1&f%5B1702%5D%5B178141%5D=1&f%5B1702%5D%5B186579%5D=1&f%5B1702%5D%5B191561%5D=1&f%5B1702%5D%5B204166%5D=1&f%5B1702%5D%5B204758%5D=1';
  const xKom = 'https://x-kom.pl';
  const page = await browser.newPage();
  await page.goto(_RTX30Filter);

  await page.waitForSelector(
    "button[class='sc-15ih3hi-0 sc-1p1bjrl-8 hdctio']"
  );

  await page.click(`button[class='sc-15ih3hi-0 sc-1p1bjrl-8 hdctio']`);

  await page.waitForTimeout(1000);

  // pagination selector: #listing-container-wrapper > div.hqmb1u-0.bfSNKf > div.hqmb1u-3.iBNYRN > div > div.hqmb1u-7.kbjFMb
  const paginationParameters = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        '#listing-container-wrapper > div.hqmb1u-0.bfSNKf > div.hqmb1u-3.iBNYRN > div > div.hqmb1u-7.kbjFMb'
      )
    ).map((element) => {
      const [current, all] = element.textContent.split(' z ');
      const [_, last] = current.split('-');
      return {
        current,
        all,
        pages: Math.ceil(Number(all) / Number(last)),
      };
    });
  });

  console.log(paginationParameters);

  // evaluate na kazdym page po goto()

  // After cookies
  /* const response = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(
        '#listing-container > div > div > div.sc-1yu46qn-4.zZmhy.sc-2ride2-0.eYsBmG > div.sc-1yu46qn-10.iQhjQS > div > a > h3 > span'
      )
    ).map((element) => {
      return {
        name: element.textContent,
      };
    });
  }); */

  //console.log(response); // undefined

  await browser.close();
})();
