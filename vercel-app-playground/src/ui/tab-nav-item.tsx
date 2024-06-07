import { Link } from '@hiogawa/react-server/client';
import clsx from 'clsx';

export const TabNavItem = ({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}) => {
  return (
    <Link
      preload
      href={href}
      className={clsx('rounded-lg px-3 py-1 text-sm font-medium', {
        'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
    >
      {children}
    </Link>
  );
};
