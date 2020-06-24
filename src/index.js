const { Translate } = require('@google-cloud/translate').v2;
const fs = require('fs');
const path = require('path');

const API_KEY = require('./key/credential.json').API_KEY;

const translate = new Translate({
  key: API_KEY,
});

async function start() {
  const outputLanguages = ['en', 'es', 'pt'];

  const data = fs.readFileSync('./input.txt', 'utf-8');
  const lines = data.split('\n');

  for (const language of outputLanguages) {
    const translatedLines = [];

    for (const line of lines) {
      if (line.length === 0 || line[0] === '/')  {
        translatedLines.push(line);
        continue;
      }

      const phrase = line.split(": '")[1].replace("',", '');
      const [translation] = await translate.translate(phrase, language);
      const newLine = `${line.split(": '")[0]}: "${translation}",`
      translatedLines.push(newLine);
    }

    fs.writeFileSync(`./output/${language}.txt`, translatedLines.join('\n'), 'utf-8');
  }
}

start();
