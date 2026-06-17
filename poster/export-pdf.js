const path = require("path");
const puppeteer = require("puppeteer");

async function run() {
  const htmlPath = path.resolve(__dirname, "poster.html");
  const pdfPath = path.resolve(__dirname, "CRAFT_poster_24x18.pdf");
  const fileUrl = `file://${htmlPath}`;

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 2304,
      height: 1728,
      deviceScaleFactor: 2
    }
  });

  try {
    const page = await browser.newPage();
    await page.goto(fileUrl, { waitUntil: "networkidle0" });
    await page.emulateMediaType("screen");
    await page.pdf({
      path: pdfPath,
      printBackground: true,
      width: "24in",
      height: "18in",
      pageRanges: "1",
      margin: {
        top: "0in",
        right: "0in",
        bottom: "0in",
        left: "0in"
      }
    });
    console.log(`PDF created: ${pdfPath}`);
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error("Failed to export poster PDF:", err);
  process.exit(1);
});
