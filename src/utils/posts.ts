/// <reference types="vite-plugin-pages/client-react" />

import routes from '~react-pages';
import { formatDate } from './formatDate';

const pathBase = 'posts';

interface BlogRoutes {
  path: any;
  date: string;
  year: string;
  title: any;
  description: any;
  tag: any;
}

export function handleBlogRoutes() {
  return routes
    .find((route) => route.path === pathBase)
    ?.children!.map((item) => {
      const { meta, path } = item as any;

      if (path === '') return undefined;
      return {
        path: path,
        date: formatDate(meta?.frontmatter.date),
        year: formatDate(meta?.frontmatter.date, 'YYYY'),
        title: meta?.frontmatter.title,
        description: meta?.frontmatter.description,
        tag: meta?.frontmatter.tag || [],
      };
    })
    .filter(Boolean)
    .sort((a: any, b: any) => +new Date(b.date) - +new Date(a.date)) as BlogRoutes[];
}

export function isFirstDate(post: any, posts: any[]) {
  const { year, path } = post;
  const filterList = posts.filter((item) => item.year === year);
  if (filterList.length === 1) return true;
  return filterList[0].path === path;
}
