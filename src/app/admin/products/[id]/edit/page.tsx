import PageHeader from "@/app/admin/_components/PageHeader";
import ProductForm from "../../new/_components/ProductForm";
import db from "@/db/db";

const Page = async  ({params :{id}} : {
  params : {id:string}
}) => {
  const product =await db.product.findUnique({where : {
    id
  }})
return (
  <>
<PageHeader>Edit Product</PageHeader>
<ProductForm product={product}/>
  </>
)
}




export default Page;