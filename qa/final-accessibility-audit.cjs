const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');const path=require('node:path');
(async()=>{
const browser=await chromium.launch({...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {}),headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
const report={checkedAt:new Date().toISOString(),checks:[],note:'Additional final checks after font-size and general-link accessibility adjustments; earlier functional audit retained.'};
const check=(name,pass,evidence)=>report.checks.push({name,pass,evidence});
for(const width of [320,390,720,768,1024,1440]){
await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.waitForTimeout(1300);
const metrics=await page.evaluate(()=>({innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body.scrollWidth,overflows:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).position!=='fixed'&&(r.left<-.5||r.right>innerWidth+.5)}).filter(e=>!e.closest('.hero-art')).map(e=>({tag:e.tagName,class:e.className,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)})).slice(0,15)}));
check(`Final responsive overflow ${width}px${width===720?' / 200% reflow equivalent':''}`,metrics.scrollWidth<=width&&metrics.bodyScrollWidth<=width&&metrics.overflows.length===0,metrics);
await page.screenshot({path:path.join(__dirname,`final-${width}.png`),fullPage:true});
}
await page.locator('[data-choice=fiscal]').click();
await page.locator('.services-heading [data-area=general]').click();
const general=await page.evaluate(()=>({selection:document.querySelector('[data-choice][aria-pressed=true]').dataset.choice,kicker:document.querySelector('#guide-kicker').textContent,hash:location.hash}));
check('No sé por dónde empezar selects general guide and navigates',general.selection==='general'&&general.hash==='#empezamos'&&general.kicker.includes('VISIÓN DE CONJUNTO'),general);
await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.waitForTimeout(2700);
const before=await page.locator('.route-trace').evaluate(el=>({animations:el.getAnimations().map(a=>({playState:a.playState,currentTime:a.currentTime})),display:getComputedStyle(el).display}));
await page.locator('.motion-toggle').click();
await page.waitForTimeout(150);
const after=await page.evaluate(()=>({paused:document.documentElement.classList.contains('motion-paused'),label:document.querySelector('.motion-label').textContent,pressed:document.querySelector('.motion-toggle').getAttribute('aria-pressed'),animations:document.getAnimations().map(a=>({playState:a.playState,target:a.effect?.target?.className})),traceDisplay:getComputedStyle(document.querySelector('.route-trace')).display}));
await page.locator('#metodo').scrollIntoViewIfNeeded();await page.waitForTimeout(100);
const methodAnimations=await page.evaluate(()=>document.getAnimations().map(a=>({playState:a.playState,target:a.effect?.target?.className})));
check('Pause stops motion and prevents method entry animations',before.animations.some(a=>a.playState==='running')&&after.paused&&after.traceDisplay==='none'&&after.animations.length===0&&methodAnimations.length===0,{before,after,methodAnimations});
const failContext=await browser.newContext({viewport:{width:390,height:844}});await failContext.addInitScript(()=>{URL.createObjectURL=()=>{throw new Error('QA simulated Blob URL failure');};});
const failurePage=await failContext.newPage();let downloads=0;const errors=[];failurePage.on('download',()=>downloads++);failurePage.on('pageerror',e=>errors.push(e.message));
await failurePage.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await failurePage.locator('[data-choice=general]').click();await failurePage.locator('.download-guide').click();
const failure={status:await failurePage.locator('.download-status').innerText(),downloads,pageErrors:errors,guideVisible:await failurePage.locator('#guide-list').isVisible()};
check('Simulated Blob failure reports honest error with copy fallback',failure.status.includes('No se pudo iniciar la descarga')&&failure.status.includes('copiar')&&failure.downloads===0&&failure.pageErrors.length===0&&failure.guideVisible,failure);
await failurePage.locator('.preparation').screenshot({path:path.join(__dirname,'final-download-failure.png')});
report.summary={checks:report.checks.length,passed:report.checks.filter(c=>c.pass).length,failed:report.checks.filter(c=>!c.pass).length};
fs.writeFileSync(path.join(__dirname,'final-accessibility-audit.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({summary:report.summary,failures:report.checks.filter(c=>!c.pass)},null,2));
await browser.close();
})();
