import { demos } from '#/lib/demos';
import { Link } from '@hiogawa/react-server/client';
import clsx from 'clsx';

export default function Page() {
  return (
    <div className="space-y-8">
      <title>RSC on Vite</title>
      <h1 className="text-xl font-medium text-gray-300">Examples</h1>

      <div className="space-y-10 text-white">
        {demos.map((section) => {
          return (
            <div key={section.name} className="space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {section.name}
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {section.items.map((item) => {
                  return (
                    <Link
                      preload
                      href={`/${item.slug}`}
                      key={item.name}
                      className={clsx(
                        'group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3',
                        item.ok
                          ? 'hover:bg-gray-800'
                          : 'cursor-not-allowed line-through opacity-80',
                      )}
                    >
                      <div
                        className={clsx(
                          'font-medium text-gray-200 group-hover:text-gray-50',
                          item.ok && 'group-hover:text-gray-50',
                        )}
                      >
                        {item.name}
                      </div>

                      {item.description ? (
                        <div
                          className={clsx(
                            'line-clamp-3 text-sm text-gray-400',
                            item.ok && 'group-hover:text-gray-300',
                          )}
                        >
                          {item.description}
                        </div>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
