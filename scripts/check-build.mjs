import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import * as yaml from 'js-yaml';
import assert from 'node:assert/strict';
import { validateCurriculum } from './validate-curriculum.mjs';
assert.deepEqual(validateCurriculum(), { lessons:48, pathways:4, drafts:32, planned:16 });
const root = path.resolve('dist');
const base = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}`.replace(/\/?$/, '/');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const files = (await walk(root)).filter(file => file.endsWith('.html'));
const pathwayRecords = await Promise.all((await readdir('src/content/pathways')).filter(f=>/\.ya?ml$/.test(f)).map(async f=>yaml.load(await readFile(path.join('src/content/pathways',f),'utf8'))));
assert.equal(files.length, 60 + pathwayRecords.reduce((n,p)=>n+p.steps.length,0), 'Expected curriculum pages plus all contextual pathway lessons');
for (const file of files) {
  const html = await readFile(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file}: expected one h1`);
  assert(html.includes('name="robots" content="noindex"'), `${file}: pilot must remain noindex`);
  assert(html.includes('id="main"'), `${file}: missing main landmark`);
  const relative = path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (/^(?:[a-z]+:|\/\/)/i.test(href)) continue;
    const url = new URL(href, `https://test.invalid${base}${relative}`);
    assert(url.pathname.startsWith(base), `${file}: link escapes configured base: ${href}`);
    let target = path.join(root, decodeURIComponent(url.pathname.slice(base.length)));
    const info = await stat(target).catch(() => null);
    assert(info, `${file}: missing link target ${href}`);
    if (info.isDirectory()) target = path.join(target, 'index.html');
    if (url.hash && target.endsWith('.html')) {
      const content = await readFile(target, 'utf8');
      assert(content.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing anchor ${href}`);
    }
  }
}
assert(!(await walk(root)).some(file => /references|originals|lesson-intake/.test(path.relative(root, file))), 'Internal evidence must not be shipped');
console.log(`Verified ${files.length} static pages, internal links, anchors, landmarks, and base ${base}`);

const registry=yaml.load(await readFile('src/curriculum/lesson-registry.yml','utf8')).lessons;
for(const record of registry) {
 const html=await readFile(path.join(root,'lessons',record.id,'index.html'),'utf8');
 const label=record.status==='structured-stub'?'Planned lesson':'Draft lesson';
 assert(html.includes(label),`${record.id}: missing status label`);
 assert(html.includes(record.status==='structured-stub'?'Planned checkpoint':'Critical pause'),`${record.id}: missing learning structure`);
 assert(html.includes('class="lesson-footer"'),`${record.id}: missing printable provenance`);
 assert(html.includes('class="reader-fallback"'),`${record.id}: missing no-JavaScript contents`);
 assert(html.includes('class="prose"'),`${record.id}: missing server-rendered manuscript`);
 assert(!/<div class="prose"[^>]*hidden/.test(html),`${record.id}: manuscript hidden before enhancement`);
 for(const category of record.categories) {
  const index=await readFile(path.join(root,'categories',category,'index.html'),'utf8');
  assert(index.includes(`href="${base}lessons/${record.id}/"`),`${record.id}: missing cross-listing in ${category}`);
 }
}
console.log('Verified 48 lesson statuses, checkpoints, server-rendered reading, provenance, and all category cross-listings.');

const landing=await readFile(path.join(root,'pathways/index.html'),'utf8');
assert(!/Example pathways|Expo curriculum|Pilot edition/.test(landing),'Pathway landing should use the simplified heading and framing');
for(const p of pathwayRecords) {
  for(const [i,step] of p.steps.entries()) {
    const html=await readFile(path.join(root,'pathways',p.id,step.lesson,'index.html'),'utf8');
    const direct=await readFile(path.join(root,'lessons',step.lesson,'index.html'),'utf8');
    assert(!direct.includes('class="pathway-context"'),'Direct lessons must not acquire pathway context');
    assert(html.includes(`data-pathway="${p.id}"`),'Missing selected pathway');
    assert.equal(html.match(/<div class="prose">([\s\S]*?)<\/div>/)?.[1],direct.match(/<div class="prose">([\s\S]*?)<\/div>/)?.[1],`Lesson body changed in pathway ${p.id}/${step.lesson}`);
    const band=html.match(/<ol class="pathway-mini-steps"[\s\S]*?<\/ol>/)?.[0];
    assert(band,'Missing ordered band');
    const anchors=[...band.matchAll(/<a ([^>]+)>/g)].map(m=>m[1]);
    assert.equal(anchors.length,p.steps.length);
    anchors.forEach((a,j)=>{
      assert(a.includes(`href="${base}pathways/${p.id}/${p.steps[j].lesson}/"`),'Band loses pathway or sequence');
      assert.equal(a.includes('aria-current="step"'),i===j,'Incorrect current step');
      assert(a.includes(p.steps[j].required?'Required':'Optional'),'Missing optional/required label');
    });
    const navigation=html.match(/<nav class="pathway-reading-nav"[\s\S]*?<\/nav>/)?.[0];
    assert(navigation,'Missing previous/next navigation');
    if(i>0)assert(navigation.includes(`${base}pathways/${p.id}/${p.steps[i-1].lesson}/`),'Previous loses context');
    if(i<p.steps.length-1)assert(navigation.includes(`${base}pathways/${p.id}/${p.steps[i+1].lesson}/`),'Next loses context');
    assert(landing.includes(`${base}pathways/${p.id}/${step.lesson}/`),'Landing omits a step');
  }
}
console.log('Verified all 29 contextual lesson routes, original lesson bodies, ordered steps, optional labels, current position, and previous/next links.');

// Supplied visuals must remain traceable, accessible and available in both routes.
for (const [id,count] of [['read-map-anatomy',3],['color-classification-hierarchy',4]]) {
 const assets=JSON.parse(await readFile(`src/assets/lesson-images/${id}/asset-manifest.json`,'utf8'));
 assert.equal(assets.length,count,`${id}: expected selected visual set`);
 const html=await readFile(path.join(root,'lessons',id,'index.html'),'utf8');
 assert.equal((html.match(/<img\s/g)||[]).length,count,`${id}: missing instructional image`);
 for(const asset of assets) {
  assert(asset.alt_text&&asset.caption&&asset.credit&&asset.slide&&asset.rights_status,`${id}: incomplete visual provenance`);
  assert((await stat(`src/assets/lesson-images/${id}/${asset.file}`)).size>0,`${id}: missing original image`);
 }
 for(const match of html.matchAll(/<img\s[^>]*>/g))assert(/alt="[^"]+"/.test(match[0]),`${id}: image needs a text alternative`);
 assert(html.includes('Image reuse rights await confirmation'),`${id}: local image review status must remain visible`);
}
console.log('Verified seven instructional images with alt text, source manifests and explicit local-review status.');

const deckFigures={};
for(const id of await readdir('src/assets/lesson-images')) {
 if(['read-map-anatomy','color-classification-hierarchy'].includes(id))continue;
 deckFigures[id]=JSON.parse(await readFile(`src/assets/lesson-images/${id}/asset-manifest.json`,'utf8'));
}
let deckFigureCount=0;
for(const [id,assets] of Object.entries(deckFigures)) {
 const html=await readFile(path.join(root,'lessons',id,'index.html'),'utf8');
 assert.equal((html.match(/<img\s/g)||[]).length,assets.length,`${id}: missing deck figure`);
 for(const a of assets) {
  assert(a.alt_text&&a.caption&&a.credit&&a.slide&&a.source_deck,`${id}: missing provenance`);
  assert((await stat(`src/assets/lesson-images/${id}/${a.file}`)).size>0,`${id}: missing asset`);
 }
 for(const img of html.matchAll(/<img\s[^>]*>/g))assert(/alt="[^"]+"/.test(img[0]),`${id}: empty image alternative`);
 assert(html.includes('Shokran Rahiminejad'),`${id}: missing lesson credit`);
 deckFigureCount+=assets.length;
}
assert.equal(deckFigureCount,24);
console.log('Verified 24 additional deck figures, source references, text alternatives, and lesson credits.');
