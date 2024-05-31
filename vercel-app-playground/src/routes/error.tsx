'use client';

import { demoSlugs } from '#/lib/demos';
import { Boundary } from '#/ui/boundary';
import { useRouter } from '@hiogawa/react-server/client';
import type { ErrorPageProps } from '@hiogawa/react-server/server';

export default function ErrorPage(props: ErrorPageProps) {
  const pathname = useRouter((s) => s.location.pathname);
  const demoNotFound = demoSlugs.includes(pathname.slice(1));

  return (
    <Boundary labels={['error.tsx']} color="pink">
      <div className="space-y-4 text-vercel-pink">
        {props.serverError?.status === 404 ? (
          <>
            <h2 className="text-lg font-bold">Not Found</h2>
            <p className="text-sm">
              {demoNotFound ? (
                <>TODO: Not implemented</>
              ) : (
                <>Could not find requested resource</>
              )}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">Unknown Error</h2>
            <pre>{JSON.stringify(props.serverError)}</pre>
          </>
        )}
      </div>
    </Boundary>
  );
}
