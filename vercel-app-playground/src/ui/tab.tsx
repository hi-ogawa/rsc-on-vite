'use client';

import type { Item } from '#/ui/tab-group';
import { Link, useRouter } from '@hiogawa/react-server/client';
import clsx from 'clsx';

export const Tab = ({
  path,
  item,
}: {
  path: string;
  parallelRoutesKey?: string;
  item: Item;
}) => {
  const pathname = useRouter((s) => s.location.pathname);
  const segment = pathname.slice(path.length).split('/')[1];

  const href = item.slug ? path + '/' + item.slug : path;
  const isActive = item.slug ? item.slug === segment : !segment;
  item.disabled;

  return (
    <Link
      preload
      href={href}
      className={clsx(
        'rounded-lg px-3 py-1 text-sm font-medium',
        {
          'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
            !isActive,
          'bg-vercel-blue text-white': isActive,
        },
        item.disabled && 'pointer-events-none line-through opacity-70',
      )}
    >
      {item.text}
    </Link>
  );
};
