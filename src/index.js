const { Translate } = require('@google-cloud/translate').v2;
const fs = require('fs');
const path = require('path');

const API_KEY = require('./key/credential.json').API_KEY;
const input = require('./content/input');

const translate = new Translate({
  key: API_KEY,
});

async function start() {
  const outputLanguages = ['en', 'es', 'pt'];

  outputLanguages.forEach(language => {
    let output = '';

    Object.keys(input).forEach(async (item, index) => {
      const [translation] = await translate.translate(input[item], language);
      output += `${item}: ${translation}\n`;

      if (Object.keys(input).length - 1 === index) {
        fs.writeFileSync(
          path.join(__dirname, `./content/output/${language}.txt`), output, 'utf8'
        );
      }
    });
  });
}

start();
