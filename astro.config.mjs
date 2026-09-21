import { defineConfig } from 'astro/config';
import { validateCurriculum } from './scripts/validate-curriculum.mjs';
validateCurriculum();
const repository = process.env.GITHUB_REPOSITORY;
const [owner, name] = repository?.split('/') ?? [];
export default defineConfig({
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'http://localhost:4321'),
  base: process.env.BASE_PATH || (name && name !== `${owner}.github.io` ? `/${name}/` : '/'),
  output: 'static',
  trailingSlash: 'always',
});
