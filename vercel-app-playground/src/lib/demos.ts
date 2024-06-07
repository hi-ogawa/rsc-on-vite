export type Item = {
  name: string;
  slug: string;
  description?: string;
  ok?: boolean;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Layouts',
    items: [
      {
        name: 'Nested Layouts',
        slug: 'layouts',
        description: 'Create UI that is shared across routes',
        ok: true,
      },
      {
        name: 'Grouped Layouts',
        slug: 'route-groups',
        description: 'Organize routes without affecting URL paths',
      },
      {
        name: 'Parallel Routes',
        slug: 'parallel-routes',
        description: 'Render multiple pages in the same layout',
      },
    ],
  },
  {
    name: 'File Conventions',
    items: [
      {
        name: 'Loading',
        slug: 'loading',
        description:
          'Create meaningful Loading UI for specific parts of an app',
        ok: true,
      },
      {
        name: 'Error',
        slug: 'error-handling',
        description: 'Create Error UI for specific parts of an app',
        ok: true,
      },
      {
        name: 'Not Found',
        slug: 'not-found',
        description: 'Create Not Found UI for specific parts of an app',
        ok: true,
      },
    ],
  },
  {
    name: 'Data Fetching',
    items: [
      {
        name: 'Streaming with Suspense',
        slug: 'streaming',
        description:
          'Streaming data fetching from the server with React Suspense',
        ok: true,
      },
      {
        name: 'Static Data',
        slug: 'ssg',
        description: 'Generate static pages',
        ok: true,
      },
      {
        name: 'Dynamic Data',
        slug: 'ssr',
        description: 'Server-render pages',
      },
      {
        name: 'Incremental Static Regeneration',
        slug: 'isr',
        description: 'Get the best of both worlds between static & dynamic',
      },
    ],
  },
  {
    name: 'Components',
    items: [
      {
        name: 'Client Context',
        slug: 'context',
        description:
          'Pass context between Client Components that cross Server/Client Component boundary',
        ok: true,
      },
    ],
  },
  {
    name: 'Misc',
    items: [
      {
        name: 'Patterns',
        slug: 'patterns',
        description: 'A collection of useful App Router patterns',
        ok: true,
      },
      {
        name: 'Client Component Hooks',
        slug: 'hooks',
        description: 'Preview the routing hooks available in Client Components',
      },
      {
        name: 'CSS and CSS-in-JS',
        slug: 'styling',
        description: 'Preview the supported styling solutions',
        ok: true,
      },
    ],
  },
];

export const demoSlugs = demos.flatMap((e) => e.items.map((e) => e.slug));
