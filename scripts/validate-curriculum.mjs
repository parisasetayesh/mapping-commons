import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import * as yaml from 'js-yaml';
export function validateCurriculum(root = process.cwd()) {
  const read = file => yaml.load(fs.readFileSync(path.join(root,file),'utf8'));
  const registry = read('src/curriculum/lesson-registry.yml').lessons;
  const sources = read('src/curriculum/source-crosswalk.yml').sources;
  const sourceIds = new Set(sources.map(s => s.id));
  assert.equal(sourceIds.size, sources.length, 'Duplicate source ID');
  const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
  const lessons = new Map();
  for (const file of walk(path.join(root,'src/content/lessons')).filter(f=>/\.md$/.test(f))) {
    const raw=fs.readFileSync(file,'utf8'); const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    assert(match,`Missing front matter: ${file}`); const data=yaml.load(match[1]);
    assert(!lessons.has(data.id),`Duplicate lesson ID: ${data.id}`);
    for (const id of data.source_ids ?? []) assert(sourceIds.has(id), `Unknown source ${id} in ${data.id}`);
    if (data.status === 'complete-draft') {
      for (const heading of ['At a glance', 'Critical pause', 'Checkpoint', 'Key takeaway', 'Continue', 'Sources and further exploration']) {
        assert(raw.includes(`## ${heading}`), `Missing ${heading} in ${data.id}`);
      }
      assert(/## Step \d/.test(raw), `Missing learning steps in ${data.id}`);
    }
    assert(!/\.pptx|lesson-intake\//i.test(raw), `Private source path in public lesson ${data.id}`);
    lessons.set(data.id,{data,file});
  }
  const ids=new Set();
  for(const record of registry) {
    assert(!ids.has(record.id),`Duplicate registry ID: ${record.id}`); ids.add(record.id);
    const lesson=lessons.get(record.id); assert(lesson,`Missing registered lesson: ${record.id}`);
    assert.equal(lesson.file,path.join(root,'src/content/lessons',record.file),`Registry file mismatch: ${record.id}`);
    for(const key of Object.keys(record).filter(k=>k!=='file')) assert.deepEqual(lesson.data[key],record[key],`Registry/front-matter mismatch: ${record.id}.${key}`);
    assert(lesson.data.categories.includes(lesson.data.primary_category),`Primary category missing from categories: ${record.id}`);
    for(const id of lesson.data.prerequisites ?? []) assert(lessons.has(id),`Missing prerequisite ${id} in ${record.id}`);
  }
  assert.equal(ids.size,lessons.size,'Unregistered lesson files');
  const pathwayIds=new Set();
  for(const file of walk(path.join(root,'src/content/pathways')).filter(f=>/\.ya?ml$/.test(f))) {
    const p=yaml.load(fs.readFileSync(file,'utf8')); assert(!pathwayIds.has(p.id),`Duplicate pathway ID: ${p.id}`); pathwayIds.add(p.id);
    const seen=new Set(); let total=0;
    for(const step of p.steps) {assert(lessons.has(step.lesson),`Missing pathway reference ${step.lesson}`);assert(!seen.has(step.lesson),`Repeated pathway step ${step.lesson}`);seen.add(step.lesson);if(step.required)total+=lessons.get(step.lesson).data.duration_minutes;}
    assert.equal(p.estimated_minutes,total,`Required duration mismatch: ${p.id}`);
  }
  return { lessons: registry.length, pathways: pathwayIds.size, drafts: registry.filter(r=>r.status==='complete-draft').length, planned:registry.filter(r=>r.status==='structured-stub').length };
}
if(process.argv[1]?.endsWith('validate-curriculum.mjs')) console.log(validateCurriculum());
