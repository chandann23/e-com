
import { ProductGridSection } from "@/components/ProductGridSection";
import db from "@/db/db";


const getMostPopularProducts = async () => {
  // await wait(2000)
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  });
};

const getNewestProducts = async () => {
  // await wait(2000)
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
};


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
