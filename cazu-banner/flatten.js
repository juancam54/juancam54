// Renders the banner in horizontal bands at ~200 ppi and saves them as PNGs (stitched later).
const { chromium } = require('playwright');
const fs = require('fs');
const S = 8;            // device scale factor: 1020 css px -> 8160 px
const BANDS = 5;
const H = 2000.7;
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1020, height: 2001 }, deviceScaleFactor: S });
  await pg.goto('file:///home/user/juancam54/cazu-banner/index.html');
  await pg.waitForTimeout(1200);
  fs.mkdirSync('/tmp/bands', { recursive: true });
  const bh = Math.ceil(2001 / BANDS);
  for (let i = 0; i < BANDS; i++) {
    const y = i * bh, h = Math.min(bh, 2001 - y);
    await pg.screenshot({ path: `/tmp/bands/b${i}.png`, clip: { x: 0, y, width: 1020, height: h } });
    console.log('band', i, y, h);
  }
  await b.close();
})();
