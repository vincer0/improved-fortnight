### Very basic https://x-kom.pl scrapper for RTX 30xx GPU cards

ver. 0.0.1

Scrapper gets data from css selectors. Make sure css selectors are up to date.
Whole app has very poor error handling.

Roadmap:

- Refactor
- Better error handling
- Feeding CSS selectors to scrap from front-end app

##### Runs standalone and GUI.

###### To run standalone type:

```
cd scrapper

node puppeteer.js standalone
```

###### To run with GUI

1. Run server

```
cd server

node server.js
```

2. Run front

```
cd front

npm run start
```

3. Click `Reload` at the top
4. Wait
