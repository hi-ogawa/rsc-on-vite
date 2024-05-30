'use client';

import { Boundary } from '#/ui/boundary';
import type { ErrorPageProps } from '@hiogawa/react-server/server';

export default function ErrorPage(props: ErrorPageProps) {
  return (
    <Boundary labels={['error.tsx']} color="pink">
      <div className="space-y-4 text-vercel-pink">
        {props.serverError?.status === 404 ? (
          <>
            <h2 className="text-lg font-bold">Not Found</h2>
            <p className="text-sm">Could not find requested resource</p>
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
