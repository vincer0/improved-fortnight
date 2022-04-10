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

  const getLinkWithPaginationParam = (pageNumber) => {
    return `https://www.x-kom.pl/g-5/c/345-karty-graficzne.html?page=${pageNumber}&f%5B1702%5D%5B178106%5D=1&f%5B1702%5D%5B178114%5D=1&f%5B1702%5D%5B178141%5D=1&f%5B1702%5D%5B186579%5D=1&f%5B1702%5D%5B191561%5D=1&f%5B1702%5D%5B204166%5D=1&f%5B1702%5D%5B204758%5D=1`;
  };

  const paginationParameters = await page.evaluate(() => {
    const paginationSelector = `#listing-container-wrapper > div.hqmb1u-0.bfSNKf > div.hqmb1u-3.iBNYRN > div > div.hqmb1u-7.kbjFMb`;

    return Array.from(document.querySelectorAll(paginationSelector)).map(
      (element) => {
        if (element) {
          const [current, all] = element.textContent.split(' z ');
          const [_, last] = current.split('-');

          return {
            success: true,
            current,
            all,
            pages: Math.ceil(Number(all) / Number(last)),
          };
        }

        return {
          success: false,
        };
      }
    );
  });

  console.log(paginationParameters);

  if (paginationParameters[0].success) {
    const products = {
      pageData: {
        page: null,
        items: [],
      },
      total: 0,
    };

    const firstPageResult = await getResults(
      page,
      1,
      paginationParameters[0].pages
    );

    firstPageResult.pageData.forEach((result) => {
      console.log(result);
    });

    // TODO assign results and show...

    /*     if (paginationParameters[0].pages > 1) {
      for (let index = 2; index <= paginationParameters[0].pages; index++) {
        await page.goto(getLinkWithPaginationParam(index));
        const result = await getResults(
          page,
          index,
          paginationParameters[0].pages
        );

        // TODO assign results and show...
      }
    } */
  }

  await browser.close();
})();

const getResults = async (page, pageNumber, pagesCount) =>
  await page.evaluate(
    (data) => {
      // TODO Try to fetch whole product div and scrap from it...
      const productCardSelector = '#listing-container > div';
      // ? prices selector
      const wasPrice = {
        label: 'Was Price',
        selector:
          '#listing-container > div > div > div.sc-1yu46qn-4.zZmhy.sc-2ride2-0.eYsBmG > div.sc-1yu46qn-14.fTPISE > div > div > div > div > span.sc-6n68ef-0.sc-6n68ef-2.iekuDC',
      };
      const currentPrice = {
        label: 'Current Price',
        selector:
          '#listing-container > div > div > div.sc-1yu46qn-4.zZmhy.sc-2ride2-0.eYsBmG > div.sc-1yu46qn-14.fTPISE > div > div > div > div > span.sc-6n68ef-0.sc-6n68ef-3.iepkXv',
      };
      // ? link selector
      const linkToProduct = {
        label: 'Link',
        selector:
          '#listing-container > div:nth-child(1) > div > div.sc-1yu46qn-4.zZmhy.sc-2ride2-0.eYsBmG > div.sc-1yu46qn-11.dOfCZX > div > a',
      };
      // ? image selector
      const imageSelector = {
        label: 'Image',
        selector:
          '#listing-container > div:nth-child(1) > div > div.sc-1yu46qn-4.zZmhy.sc-2ride2-0.eYsBmG > div.sc-1yu46qn-11.dOfCZX > div > a > span > img',
      };
      // ? product name selector
      const productSelector = {
        label: 'Product name',
        selector: `#listing-container > div > div > div.sc-1yu46qn-4.zZmhy.sc-2ride2-0.eYsBmG > div.sc-1yu46qn-10.iQhjQS > div > a > h3 > span`,
      };

      const selectors = [wasPrice, currentPrice, productSelector];

      const selectorsResults = [];

      selectors.forEach((s) => {
        const result = Array.from(document.querySelectorAll(s.selector)).map(
          (element) => {
            return { label: s.label, value: 'b/d' };
          }
        );

        selectorsResults.push({
          page: data.pageNumber,
          items: result,
        });
      });

      return {
        pageData: selectorsResults,
        allFetched: data.pageNumber === data.pagesCount,
      };
    },
    { pageNumber, pagesCount }
  );
