import puppeteer from 'puppeteer-core';

const fetchProducts = async () => {
  const browser = await puppeteer.launch({
    executablePath: '/opt/google/chrome/chrome',
  });

  const _3080TiFilter =
    'https://www.x-kom.pl/szukaj?sort_by=accuracy_desc&q=3080%20ti&f%5Bgroups%5D%5B7%5D=1&f%5Bcategories%5D%5B2372%5D=1';
  const _RTX30Filter =
    'https://www.x-kom.pl/g-5/c/345-karty-graficzne.html?f%5B1702%5D%5B178106%5D=1&f%5B1702%5D%5B178114%5D=1&f%5B1702%5D%5B178141%5D=1&f%5B1702%5D%5B186579%5D=1&f%5B1702%5D%5B191561%5D=1&f%5B1702%5D%5B204166%5D=1&f%5B1702%5D%5B204758%5D=1';
  const xKom = 'https://x-kom.pl';
  const products = {
    items: [],
    total: 0,
  };
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

  // TODO make paginationParameters to be object, not array
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

  if (paginationParameters[0].success) {
    for (let index = 1; index <= paginationParameters[0].pages; index++) {
      await page.goto(getLinkWithPaginationParam(index));
      const pageResult = await getResults(
        page,
        index,
        paginationParameters[0].pages
      );

      products.items = products.items.concat(...pageResult.items);

      if (pageResult.allFetched) {
        products.total = products.items.length;

        await browser.close();
        return Promise.resolve({
          paginationParameters,
          products,
          message: 'Success',
        });
      }
    }
  } else {
    return Promise.resolve({
      message: 'Failure',
    });
  }
};

const getResults = async (page, pageNumber, pagesCount) =>
  await page.evaluate(
    (data) => {
      const productCardSelector = '#listing-container > div';
      const nameSelector = 'a.sc-1h16fat-0.irSQpN';
      const lastPriceSelector = 'span.sc-6n68ef-0.sc-6n68ef-2.iekuDC';
      const currentPriceSelector = 'span.sc-6n68ef-0.sc-6n68ef-3.iepkXv';
      const linkSelector = 'a.sc-1h16fat-0.irSQpN';
      const imageSelector = 'img';

      const parsePriceToNumber = (price) => {
        return Number(
          price.replace('zł', '').replace(' ', '').replace(',', '.').trim()
        );
      };

      const productsCards = Array.from(
        document.querySelectorAll(productCardSelector)
      ).map((element) => ({
        name: element.querySelector(nameSelector).textContent,
        lastPrice: element.querySelector(lastPriceSelector)
          ? parsePriceToNumber(
              element.querySelector(lastPriceSelector).textContent
            )
          : 'b/d',
        currentPrice: parsePriceToNumber(
          element.querySelector(currentPriceSelector).textContent
        ),
        link: element.querySelector(linkSelector).getAttribute('href'),
        image: element.querySelector(imageSelector).getAttribute('src'),
      }));

      return {
        items: productsCards,
        allFetched: data.pageNumber === data.pagesCount,
      };
    },
    { pageNumber, pagesCount }
  );

if (process.argv && process.argv[2] === 'standalone') {
  const result = await fetchProducts();
  console.log(result);
}

export default fetchProducts;
