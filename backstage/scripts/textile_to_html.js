const fs = require('fs');
const textile = require('textile-js');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

// Read the input Textile file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${inputFile}:`, err);
    return;
  }

  // Convert the Textile content to HTML
  const html = textile(data);

  // Write the HTML to the output file
  fs.writeFile(outputFile, html, (err) => {
    if (err) {
      console.error(`Error writing file ${outputFile}:`, err);
      return;
    }

    console.log(`Successfully processed ${inputFile} into ${outputFile}`);
  });
});