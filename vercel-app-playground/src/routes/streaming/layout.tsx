import { TabGroup } from '#/ui/tab-group';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-9">
      <title>Streaming</title>
      <div className="flex justify-between">
        <TabGroup
          path="/streaming"
          items={[
            {
              text: 'Home',
            },
            {
              text: 'Node runtime',
              slug: 'node/product/1',
              segment: 'node',
            },
            {
              text: 'Edge runtime',
              slug: 'edge/product/1',
              segment: 'edge',
              disabled: true,
            },
          ]}
        />
      </div>

      <div>{children}</div>
    </div>
  );
}
