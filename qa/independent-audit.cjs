const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
const browser=await chromium.launch({...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {}),headless:true});
const report={checkedAt:new Date().toISOString(),checks:[],consoleErrors:[],pageErrors:[],requests:[],networkFailures:[]};
const expect=(name,pass,evidence)=>report.checks.push({name,pass,evidence});
const context=await browser.newContext({viewport:{width:1440,height:1000},acceptDownloads:true});
const page=await context.newPage();
page.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text());});
page.on('pageerror',e=>report.pageErrors.push(e.message));
page.on('request',r=>report.requests.push(r.url()));
page.on('requestfailed',r=>report.networkFailures.push({url:r.url(),failure:r.failure()}));
page.on('response',r=>{if(r.status()>=400)report.networkFailures.push({url:r.url(),status:r.status()});});
await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
await page.waitForTimeout(1500);
expect('Four service disclosure controls',await page.locator('details.service').count()===4,await page.locator('details.service').count());
for(const id of ['fiscal','laboral','mercantil','contable']){
const summary=page.locator(`#${id}>summary`); const before=await page.locator(`#${id}`).evaluate(e=>e.open);
await summary.focus();await page.keyboard.press('Enter');
expect(`${id} disclosure keyboard Enter toggles`,await page.locator(`#${id}`).evaluate(e=>e.open)!==before,{before,after:await page.locator(`#${id}`).evaluate(e=>e.open)});
await page.keyboard.press('Space');
expect(`${id} disclosure keyboard Space toggles back`,await page.locator(`#${id}`).evaluate(e=>e.open)===before,await page.locator(`#${id}`).evaluate(e=>e.open));
}
expect('Exactly five selector choices',await page.locator('[data-choice]').count()===5,await page.locator('[data-choice]').count());
for(const key of ['fiscal','laboral','mercantil','contable','general']){
await page.locator(`[data-choice=${key}]`).click();
const details=await page.evaluate(()=>({pressed:[...document.querySelectorAll('[data-choice][aria-pressed=true]')].map(e=>e.dataset.choice),title:document.querySelector('#guide-title').textContent,kicker:document.querySelector('#guide-kicker').textContent,items:document.querySelector('#guide-list').children.length}));
expect(`Selector ${key} updates unique state and guide`,details.pressed.length===1&&details.pressed[0]===key&&details.items===3,details);
const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.download-guide').click()]);
const target=path.join(__dirname,download.suggestedFilename());await download.saveAs(target);
const content=fs.readFileSync(target,'utf8');
expect(`Actual ${key} download`,download.suggestedFilename()===`FLM-guia-${key}.txt`&&content.includes(details.title)&&content.includes('No se ha enviado información'),{filename:download.suggestedFilename(),bytes:Buffer.byteLength(content),failure:await download.failure()});
}
for(const key of ['fiscal','laboral','mercantil','contable']){
await page.locator(`#${key}`).evaluate(e=>{e.open=true;});
await page.locator(`[data-area=${key}]`).click();
const active=await page.locator('[data-choice][aria-pressed=true]').getAttribute('data-choice');
expect(`data-area ${key} selects guide and navigates`,active===key&&new URL(page.url()).hash==='#empezamos',{active,hash:new URL(page.url()).hash});
}
const badLinks=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(e=>e.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1))));
expect('All internal anchor targets exist',badLinks.length===0,badLinks);
for(const width of [390,768,1024,1440,720]){
await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.waitForTimeout(1200);
const metrics=await page.evaluate(()=>({innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,bodyScrollWidth:document.body.scrollWidth,overflows:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).position!=='fixed'&&(r.left<-.5||r.right>innerWidth+.5)}).filter(e=>!e.closest('.hero-art')).map(e=>({tag:e.tagName,class:e.className,left:Math.round(e.getBoundingClientRect().left),right:Math.round(e.getBoundingClientRect().right)})).slice(0,15)}));
expect(`No horizontal document overflow at ${width}px${width===720?' (1440px at 200% reflow equivalent)':''}`,metrics.scrollWidth<=width&&metrics.bodyScrollWidth<=width,metrics);
await page.screenshot({path:path.join(__dirname,`independent-${width}.png`),fullPage:true});
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
const menu=page.locator('.menu-toggle');
expect('Mobile nav collapsed initially',await menu.getAttribute('aria-expanded')==='false'&&!(await page.locator('#navigation').isVisible()),{});
await menu.focus();await page.keyboard.press('Enter');
expect('Keyboard opens mobile menu',await menu.getAttribute('aria-expanded')==='true'&&await page.locator('#navigation').isVisible(),{});
await page.keyboard.press('Tab');
expect('Tab reaches first mobile navigation link',await page.evaluate(()=>document.activeElement?.getAttribute('href'))==='#enfoque',await page.evaluate(()=>document.activeElement.outerHTML));
await page.keyboard.press('Escape');
expect('Escape closes menu and returns focus',await menu.getAttribute('aria-expanded')==='false'&&await menu.evaluate(e=>e===document.activeElement),{});
await page.keyboard.press('Space');await page.keyboard.press('Tab');await page.keyboard.press('Enter');
expect('Mobile link activation closes menu and navigates',await menu.getAttribute('aria-expanded')==='false'&&new URL(page.url()).hash==='#enfoque',{hash:new URL(page.url()).hash});
await menu.focus();await page.keyboard.press('Enter');await page.setViewportSize({width:1024,height:900});
expect('Crossing mobile breakpoint resets menu state',await menu.getAttribute('aria-expanded')==='false'&&await page.locator('#navigation').isVisible(),{});
await page.locator('.motion-toggle').click();
expect('Motion pause control stops CSS animations',await page.evaluate(()=>document.documentElement.classList.contains('motion-paused')&&getComputedStyle(document.querySelector('.route-trace')).display==='none'),{});
const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const rp=await reduced.newPage();await rp.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await rp.locator('#metodo').scrollIntoViewIfNeeded();
const rm=await rp.evaluate(()=>({animations:document.getAnimations().length,motionDisabled:document.querySelector('.motion-toggle').disabled,motionText:document.querySelector('.motion-toggle').textContent,heroOpacity:getComputedStyle(document.querySelector('.hero h1')).opacity,scrollBehavior:getComputedStyle(document.documentElement).scrollBehavior}));
expect('Reduced motion has content and no animations',rm.animations===0&&rm.motionDisabled&&rm.heroOpacity==='1'&&rm.scrollBehavior==='auto',rm);
await rp.locator('[data-choice=general]').click();expect('Reduced motion selector works',await rp.locator('[data-choice=general]').getAttribute('aria-pressed')==='true',{});
const nojs=await browser.newContext({viewport:{width:390,height:844},javaScriptEnabled:false});const np=await nojs.newPage();await np.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await np.waitForTimeout(1500);
expect('NoJS mobile navigation remains visible',await np.locator('#navigation').isVisible()&&!(await np.locator('.menu-toggle').isVisible()),{});
await np.locator('#laboral summary').click();
expect('NoJS native disclosure works',await np.locator('#laboral .service-content').isVisible(),{});
expect('NoJS fallback and static guide available',await np.locator('noscript').isVisible()&&await np.locator('#guide-title').isVisible()&&!(await np.locator('.area-choices').isVisible())&&!(await np.locator('.download-guide').isVisible()),{fallback:await np.locator('noscript').innerText()});
const nMetrics=await np.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));expect('NoJS mobile no overflow',nMetrics.width>=nMetrics.scrollWidth,nMetrics);
await np.screenshot({path:path.join(__dirname,'independent-nojs-390.png'),fullPage:true});
const external=[...new Set(report.requests)].filter(u=>!u.startsWith('http://127.0.0.1:4173/')&&!u.startsWith('blob:http://127.0.0.1:4173/'));
expect('No external requests',external.length===0,{external,uniqueRequests:[...new Set(report.requests)]});
expect('No page or console errors',report.consoleErrors.length===0&&report.pageErrors.length===0,{consoleErrors:report.consoleErrors,pageErrors:report.pageErrors});
expect('No request failures',report.networkFailures.length===0,report.networkFailures);
report.summary={checks:report.checks.length,passed:report.checks.filter(c=>c.pass).length,failed:report.checks.filter(c=>!c.pass).length};
fs.writeFileSync(path.join(__dirname,'independent-audit.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({summary:report.summary,failures:report.checks.filter(c=>!c.pass),report:path.join(__dirname,'independent-audit.json')},null,2));
await browser.close();
})();
