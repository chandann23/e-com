import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import ProductCard, { ProductCardSkeleton } from "./ProductCard";
import { Product } from "@prisma/client";







type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};



 export const ProductGridSection =  ({
  productsFetcher,
  title,
}: ProductGridSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={
          <>
          <ProductCardSkeleton
         /><ProductCardSkeleton />
         <ProductCardSkeleton />
         </>
        }>
<ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
};



const ProductSuspense = async ({productsFetcher} : {productsFetcher: () => Promise<Product[]>}) => {
  return (
      (await productsFetcher()).map((product) => (
<ProductCard key={product.id} {...product} />
        ))
  )
}