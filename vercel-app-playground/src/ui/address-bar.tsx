'use client';

import { useRouter } from '@hiogawa/react-server/client';
import clsx from 'clsx';
import React, { Suspense } from 'react';

function Params() {
  const searchParams = new URLSearchParams(useRouter((s) => s.location.search));

  return searchParams.toString().length !== 0 ? (
    <div className="px-2 text-gray-500">
      <span>?</span>
      {Array.from(searchParams.entries()).map(([key, value], index) => {
        return (
          <React.Fragment key={key}>
            {index !== 0 ? <span>&</span> : null}
            <span className="px-1">
              <span
                key={key}
                className="animate-[highlight_1s_ease-in-out_1] text-gray-100"
              >
                {key}
              </span>
              <span>=</span>
              <span
                key={value}
                className="animate-[highlight_1s_ease-in-out_1] text-gray-100"
              >
                {value}
              </span>
            </span>
          </React.Fragment>
        );
      })}
    </div>
  ) : null;
}

export function AddressBar() {
  const pathname = useRouter((s) => s.location.pathname);
  const isPending = useRouter((s) => s.isPending);

  return (
    <div className="flex items-center gap-x-2 p-3.5 lg:px-5 lg:py-3">
      <div className="text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex gap-x-1 text-sm font-medium">
        <div>
          <span className="px-2 text-gray-400">acme.com</span>
        </div>
        {pathname ? (
          <>
            <span className="text-gray-600">/</span>
            {pathname
              .split('/')
              .slice(2)
              .map((segment) => {
                return (
                  <React.Fragment key={segment}>
                    <span>
                      <span
                        key={segment}
                        className="animate-[highlight_1s_ease-in-out_1] rounded-full px-1.5 py-0.5 text-gray-100"
                      >
                        {segment}
                      </span>
                    </span>

                    <span className="text-gray-600">/</span>
                  </React.Fragment>
                );
              })}
          </>
        ) : null}

        <Suspense>
          <Params />
        </Suspense>
      </div>
      <div className="flex-1"></div>
      {/* based on https://github.com/hi-ogawa/unocss-preset-antd/blob/94473f43c99481c9cfa0fe2ae25d6baf2b4e86f2/packages/lib/src/index.ts#L44-L46 */}
      <div
        className={clsx(
          'size-5 animate-spin rounded-full border border-transparent border-t-current text-gray-100 transition duration-500',
          isPending ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
