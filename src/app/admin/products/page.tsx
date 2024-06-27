import Link from "next/link";
import PageHeader from "../_components/PageHeader";
import { Button } from "@/components/ui/button"
import ProductsTable from "../_components/ProductsTable";

 const Page = () => {
return (
<>
<div className="flex justify-between items-center gap-4">
<PageHeader>Products</PageHeader>
<Button  asChild>
  <Link href="/admin/products/new">ADD PRODUCT</Link>
</Button>
</div>
<ProductsTable />

</>
)
}




export default Page;