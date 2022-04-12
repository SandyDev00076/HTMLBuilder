let fs = require("fs");
let fetch = require("node-fetch");

/**
 *
 * @param {*} libraryName Name of the library whose code you want to include
 * @param {*} version Version of the library
 * @param {*} resource Resource that needs to be downloaded (eg. production.min.js file)
 * @param {*} headerContent Any content you want to add in the <head> of the HTML
 * @param {*} bodyContent Any content you want to add in the <body> of the HTML
 * @param {*} fileName Name of the generated HTML file
 * @param {*} title Title of the HTML document
 */
async function buildHTMLWithScript(
  libraryName = "",
  version = "",
  resource = "",
  headerContent = "",
  bodyContent = "",
  fileName = "index.html",
  title = "Document"
) {
  const res = await fetch(
    `https://cdnjs.cloudflare.com/ajax/libs/${libraryName}/${version}/umd/${resource}`
  );

  const text = await res.text();

  let stream = fs.createWriteStream(fileName);
  stream.once("open", () => {
    let header = `<head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${headerContent}</head>`;
    let body = `<body>${bodyContent}<script>${text}</script></body>`;
    let html = `<!DOCTYPE html><html lang="en">${header}${body}`;

    stream.end(html);
  });
}

module.exports = buildHTMLWithScript;
