import { getCollection, type CollectionEntry } from 'astro:content';
export async function curriculum() {
  const lessons = await getCollection('lessons');
  lessons.sort((a,b)=>a.data.title.localeCompare(b.data.title));
  const pathways = await getCollection('pathways');
  const lessonById = new Map(lessons.map(lesson => [lesson.id, lesson]));
  return { lessons, pathways, lessonById };
}
export const domains: Record<string,string> = {
  'understanding-maps':'Understanding Maps', 'reading-maps-critically':'Reading Maps Critically',
  'working-with-data':'Working with Data', 'making-maps':'Making Maps',
};
export const statusLabels = { 'complete-draft':'Draft lesson', 'structured-stub':'Planned lesson', reviewed:'Reviewed lesson', 'classroom-tested':'Classroom-tested lesson' };
export const readable = (value:string) => value.replaceAll('-', ' ');
export function requiredMinutes(pathway:CollectionEntry<'pathways'>, lessons:Map<string,CollectionEntry<'lessons'>>) {
  return pathway.data.steps.filter(s=>s.required).reduce((total,s)=>total+lessons.get(s.lesson)!.data.duration_minutes,0);
}

export function pathwayLessonHref(pathwayId:string, lessonId:string) {
  return `${import.meta.env.BASE_URL}pathways/${pathwayId}/${lessonId}/`;
}
