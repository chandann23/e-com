import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest , {params : {id}} : {params : {id :string}}){

const data = await db.product.findUnique({where : {id}  ,
select : {filePath : true , name : true},

})

if(product == null ) return notFound()

}