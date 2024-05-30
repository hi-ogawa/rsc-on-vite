'use client';

import type { Item } from '#/ui/tab-group';
import { Link } from '@hiogawa/react-server/client';
import clsx from 'clsx';
// import { useSelectedLayoutSegment } from 'next/navigation';

export const Tab = ({
  path,
  parallelRoutesKey,
  item,
}: {
  path: string;
  parallelRoutesKey?: string;
  item: Item;
}) => {
  // TODO
  // const segment = useSelectedLayoutSegment(parallelRoutesKey);
  const segment = null;

  const href = item.slug ? path + '/' + item.slug : path;
  const isActive =
    // Example home pages e.g. `/layouts`
    (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;

  return (
    <Link
      href={href}
      className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
        'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
    >
      {item.text}
    </Link>
  );
};
