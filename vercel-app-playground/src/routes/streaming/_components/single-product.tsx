import { Pricing } from '#/routes/streaming/_components/pricing';
import type { Product } from '#/api/products/product';
import { ProductRating } from '#/ui/product-rating';

export const SingleProduct = async ({ data }: { data: Promise<Response> }) => {
  const product = (await data.then((res) => res.json())) as Product;

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-full lg:col-span-1">
        <div className="space-y-2">
          <img
            src={`/${product.image}`}
            className="hidden rounded-lg grayscale lg:block"
            alt={product.name}
            height={400}
            width={400}
          />

          <div className="flex gap-x-2">
            <div className="w-1/3">
              <img
                src={`/${product.image}`}
                className="rounded-lg grayscale"
                alt={product.name}
                height={180}
                width={180}
              />
            </div>
            <div className="w-1/3">
              <img
                src={`/${product.image}`}
                className="rounded-lg grayscale"
                alt={product.name}
                height={180}
                width={180}
              />
            </div>
            <div className="w-1/3">
              <img
                src={`/${product.image}`}
                className="rounded-lg grayscale"
                alt={product.name}
                height={180}
                width={180}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full space-y-4 lg:col-span-2">
        <div className="truncate text-xl font-medium text-white lg:text-2xl">
          {product.name}
        </div>

        <ProductRating rating={product.rating} />

        <div className="space-y-4 text-sm text-gray-200">
          <p>{product.description}</p>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="col-span-full lg:col-span-1">
        <Pricing product={product} cartCount={'0'} />
      </div>
    </div>
  );
};
