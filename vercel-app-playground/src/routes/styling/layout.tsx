import { Boundary } from '#/ui/boundary';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';

const items = [
  {
    text: 'Global CSS',
    slug: 'global-css',
  },
  {
    text: 'CSS Modules',
    slug: 'css-modules',
  },
  {
    text: 'Styled Components',
    slug: 'styled-components',
    disabled: true,
  },
  {
    text: 'Styled JSX',
    slug: 'styled-jsx',
    disabled: true,
  },
  {
    text: 'Tailwind CSS',
    slug: 'tailwind',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-9">
      <title>Styling</title>
      <TabGroup
        path="/styling"
        items={[
          {
            text: 'Home',
          },
          ...items,
        ]}
      />
      <div>
        <Boundary>{children}</Boundary>
      </div>
    </div>
  );
}
