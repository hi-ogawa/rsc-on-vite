'use server';

export let cartCount = 0;

export async function addCartCount() {
  cartCount++;
  return cartCount;
}
