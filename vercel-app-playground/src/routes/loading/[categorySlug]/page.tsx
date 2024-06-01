import type { Category } from '#/api/categories/category';
import { SkeletonCard } from '#/ui/skeleton-card';
import { PageProps, createError } from '@hiogawa/react-server/server';
import React from 'react';
import { Loading } from '../_loading';

// TODO: userland `loading` implementation
export default function PageWithLoading(props: PageProps) {
  return (
    <React.Suspense fallback={<Loading />}>
      <Page {...(props as any)} />
    </React.Suspense>
  );
}

async function Page({ params }: { params: { categorySlug: string } }) {
  const res = await fetch(
    // We intentionally delay the response to simulate a slow data
    // request that would benefit from `loading.js`
    `https://app-playground-api.vercel.app/api/categories?delay=1000&slug=${params.categorySlug}`,
    {
      // We intentionally disable Next.js Cache to better demo
      // `loading.js`
      cache: 'no-cache',
    },
  );

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const category = (await res.json()) as Category;

  if (!category) {
    throw createError({ status: 404 });
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{category.name}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: category.count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
