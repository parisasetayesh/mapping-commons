import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().trim().min(1);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD').refine(value => {
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, 'Use a valid calendar date');
const reviewed = (data: { status: string; last_reviewed?: string }) => data.status !== 'published' || !!data.last_reviewed;

const status = z.enum(['draft', 'review', 'published']);
const audience = z.enum(['student', 'educator', 'researcher', 'community']);

const category = z.enum(['understanding-maps', 'reading-maps-critically', 'working-with-data', 'making-maps']);
const lessonStatus = z.enum(['complete-draft', 'structured-stub', 'reviewed', 'classroom-tested']);
const list = z.array(text);
const lessons = defineCollection({
  loader: glob({ base: './src/content/lessons', pattern: '**/*.md', generateId: ({ data }) => String(data.id) }),
  schema: z.object({
    id: text, title: text, summary: text, primary_category: category,
    categories: z.array(category).min(1), status: lessonStatus,
    lesson_type: z.enum(['concept','critical-reading','data-workflow','technical-workflow','community-practice','behind-the-map']),
    level: z.enum(['beginner','intermediate','advanced']), duration_minutes: z.number().int().positive(),
    topics: list.default([]), tools: list.default([]), datasets: list.default([]), audiences: list.default([]),
    learning_objectives: list.min(1), prerequisites: list.default([]), materials: list.default([]), produces: text.optional(),
    accessibility: z.object({ installation_required: z.boolean(), account_required: z.boolean(), large_screen_recommended: z.boolean() }).optional(),
    authors: list.min(1), content_owner: text.optional(), license: text, source_ids: list.default([]), last_reviewed: date.nullable().optional(),
  }).strict().refine(d => d.categories.includes(d.primary_category), {message:'Primary category must appear in categories'}),
});
const pathways = defineCollection({
  loader: glob({base:'./src/content/pathways', pattern:'**/*.{yaml,yml}', generateId: ({data}) => String(data.id)}),
  schema: z.object({
    id:text, title:text, summary:text, audiences:list.min(1), level:text, estimated_minutes:z.number().int().positive(),
    outcome:text, example_case:text.optional(), course_example:text.optional(),
    steps:z.array(z.object({lesson:text,label:text,required:z.boolean(),note:text})).min(1),
  }).strict(),
});

const common = {
  title: text, summary: text, status, language: text.default('en'),
  authors: z.array(text).min(1), license: text.optional(), last_reviewed: date.optional(),
};
const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.md' }),
  schema: z.object({ ...common, question: text, setting: text,
    participants: z.array(text).min(1), audiences: z.array(audience).min(1),
    data_sources: z.array(text).min(1), ownership: text, method: text,
    tools: z.array(text), decisions: z.array(text).min(1), consent: text,
    changes: z.array(text).min(1), outputs: z.array(text).min(1), limits: z.array(text).min(1),
  }).refine(reviewed, { message: 'Published cases require last_reviewed', path: ['last_reviewed'] }),
});
const resources = defineCollection({
  loader: glob({ base: './src/content/resources', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({ title: text, summary: text, status, url: z.url(),
    access: z.enum(['open', 'account-required', 'institutional', 'unclear']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    audiences: z.array(audience).min(1), domain: z.enum(['foundations', 'literacy', 'data', 'building']),
    format: text, language: text.default('en'), license: text.optional(),
    lessons: z.array(text).default([]), pathways: z.array(text).default([]),
    last_checked: date.optional(), archived: z.boolean().default(false), replacement: z.url().optional(),
  }).refine(data => data.status !== 'published' || !!data.last_checked,
    { message: 'Published resources require last_checked', path: ['last_checked'] }),
});
const glossary = defineCollection({
  loader: glob({ base: './src/content/glossary', pattern: '**/*.{yaml,yml}' }),
  schema: z.object({ term: text, definition: text, status, language: text.default('en'),
    lessons: z.array(text).default([]), sources: z.array(z.url()).min(1),
  }),
});
export const collections = { lessons, pathways, cases, resources, glossary };

