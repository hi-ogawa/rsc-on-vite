import { Tab } from '#/ui/tab';
import React from 'react';
import { Boundary } from '#/ui/boundary';

const title = 'Static Data';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-9">
      <title>{title}</title>
      <div className="flex flex-wrap items-center gap-2">
        <Tab path="/ssg" item={{ text: 'Home' }} />
        <Tab path="/ssg" item={{ text: 'Post 1 (prerender)', slug: '1' }} />
        <Tab path="/ssg" item={{ text: 'Post 2 (prerender)', slug: '2' }} />
        <Tab path="/ssg" item={{ text: 'Post 3 (dynamic)', slug: '3' }} />
      </div>
      <div>
        <Boundary>{children}</Boundary>
      </div>
    </div>
  );
}
