'use client';

import { useTransition } from 'react';
import { useCartCount } from './cart-count-context';
import { addCartCount } from '../_action';

export function AddToCart({ initialCartCount }: { initialCartCount: number }) {
  const [isPending, startTransition] = useTransition();

  const [, setOptimisticCartCount] = useCartCount();

  const addToCart = () => {
    setOptimisticCartCount(initialCartCount + 1);

    // Use a transition and isPending to create inline loading UI
    startTransition(async () => {
      const newCount = await addCartCount();
      setOptimisticCartCount(newCount);
    });
  };

  return (
    <button
      className="relative w-full items-center space-x-2 rounded-lg bg-vercel-blue px-3 py-1  text-sm font-medium text-white hover:bg-vercel-blue/90 disabled:text-white/70"
      onClick={addToCart}
      disabled={isPending}
    >
      Add to Cart
      {isPending ? (
        <div className="absolute right-2 top-1.5" role="status">
          <div
            className="
          h-4 w-4 animate-spin rounded-full border-[3px] border-white border-r-transparent"
          />
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
    </button>
  );
}
