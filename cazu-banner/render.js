const { chromium } = require('playwright');
const W=2948.03, H=5782.68, z=(W*96/72)/1020;
(async()=>{
  const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:1020,height:2001},deviceScaleFactor:1.6});
  await pg.goto('file:///home/user/juancam54/cazu-banner/index.html'); await pg.waitForTimeout(800);
  await pg.screenshot({path:'preview.png'});
  if(process.argv[2]){
    await pg.addStyleTag({content:`:root{--z:1} body{transform:scale(${z});transform-origin:0 0} html{overflow:hidden;width:${1020*z}px!important;height:${2000.7*z}px!important} @page{size:${W}pt ${H}pt;margin:0}`});
    await pg.waitForTimeout(500);
    await pg.pdf({path:'banner_cazu_feria_v2.pdf',width:`${W/72}in`,height:`${H/72}in`,printBackground:true,preferCSSPageSize:true});
  }
  await b.close();
})();
