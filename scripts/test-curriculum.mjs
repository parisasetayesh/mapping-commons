import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { validateCurriculum } from './validate-curriculum.mjs';
const root=fs.mkdtempSync(path.join(os.tmpdir(),'mapping-commons-validation-'));
try {
  fs.cpSync('src/content',path.join(root,'src/content'),{recursive:true});
  fs.cpSync('src/curriculum',path.join(root,'src/curriculum'),{recursive:true});
  assert.deepEqual(validateCurriculum(root),{lessons:29,pathways:4,drafts:12,planned:17});
  const lesson=path.join(root,'src/content/lessons/understanding-maps/what-counts-as-a-map.md');
  const duplicate=path.join(root,'src/content/lessons/duplicate.md');
  fs.copyFileSync(lesson,duplicate);assert.throws(()=>validateCurriculum(root),/Duplicate lesson ID/);fs.unlinkSync(duplicate);
  const original=fs.readFileSync(lesson,'utf8');fs.writeFileSync(lesson,original.replace('duration_minutes: 30','duration_minutes: 31'));
  assert.throws(()=>validateCurriculum(root),/Registry\/front-matter mismatch/);fs.writeFileSync(lesson,original);
  const pathway=path.join(root,'src/content/pathways/first-map-in-qgis.yml');
  const sequence=fs.readFileSync(pathway,'utf8');fs.writeFileSync(pathway,sequence.replace('lesson: start-mappable-question','lesson: nonexistent-lesson'));
  assert.throws(()=>validateCurriculum(root),/Missing pathway reference/);fs.writeFileSync(pathway,sequence.replace('estimated_minutes: 250','estimated_minutes: 251'));
  assert.throws(()=>validateCurriculum(root),/Required duration mismatch/);
  console.log('Curriculum integrity: valid package passes; duplicate IDs, metadata drift, missing references and duration drift fail.');
} finally {fs.rmSync(root,{recursive:true,force:true});}
