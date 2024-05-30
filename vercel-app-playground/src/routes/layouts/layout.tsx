import { getCategories } from '#/api/categories/getCategories';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import type { LayoutProps } from '@hiogawa/react-server/server';

export default async function Layout({ children }: LayoutProps) {
  const categories = await getCategories();

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path="/layouts"
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

      <div>{children}</div>
    </div>
  );
}
