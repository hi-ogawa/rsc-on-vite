import { getCategories } from '#/api/categories/getCategories';
import { Boundary } from '#/ui/boundary';
import { ClickCounter } from '#/ui/click-counter';
import { TabGroup } from '#/ui/tab-group';
import type { LayoutProps } from '@hiogawa/react-server/server';

const title = 'Nested Layouts';

export default async function Layout({ children }: LayoutProps) {
  const categories = await getCategories();

  return (
    <div className="space-y-9">
      <title>{title}</title>
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

      <div>
        <Boundary>{children}</Boundary>
      </div>
    </div>
  );
}
