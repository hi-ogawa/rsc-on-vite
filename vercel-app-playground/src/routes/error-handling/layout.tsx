import { getCategories } from '#/api/categories/getCategories';
import { Boundary } from '#/ui/boundary';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="space-y-9">
      <title>Error Handling</title>

      <div className="flex justify-between">
        <TabGroup
          path="/error-handling"
          items={[
            {
              text: 'Home',
            },
            ...categories.map((x) => ({
              text: x.name,
              slug: x.slug,
            })),
          ]}
        />

        <div className="self-start">
          <ClickCounter />
        </div>
      </div>

      <div>
        <Boundary>{children}</Boundary>
      </div>
    </div>
  );
}
