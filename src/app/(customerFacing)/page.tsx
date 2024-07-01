
import { ProductGridSection } from "@/components/ProductGridSection";
import db from "@/db/db";
import { cache } from "@/lib/cache";


const getMostPopularProducts = cache(() => {
  // await wait(2000)
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
},["/" , "getMostPopularProducts"] , {revalidate : 60 * 60 * 24});

const getNewestProducts = cache(() => {
  // await wait(2000)
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/" , "getNewestProducts"] , {revalidate : 60 * 60 * 24});


const HomePage = async () => {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />

      <ProductGridSection title="Newest" productsFetcher={getNewestProducts} />
    </main>
  );
};




export default HomePage;
