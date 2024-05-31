import type { Category } from './category';
import { createError } from '@hiogawa/react-server/server';

export async function getCategories({ parent }: { parent?: string } = {}) {
  // TODO: not working on stackblitz?
  const res = await fetch(
    `https://app-playground-api.vercel.app/api/categories${
      parent ? `?parent=${parent}` : ''
    }`,
  );

  if (!res.ok) {
    throw new Error('Something went wrong!');
  }

  const categories = (await res.json()) as Category[];

  if (categories.length === 0) {
    throw createError({ status: 404 });
  }

  return categories;
}

export async function getCategory({ slug }: { slug: string }) {
  const res = await fetch(
    `https://app-playground-api.vercel.app/api/categories${
      slug ? `?slug=${slug}` : ''
    }`,
  );

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const category = (await res.json()) as Category;

  if (!category) {
    throw createError({ status: 404 });
  }

  return category;
}
