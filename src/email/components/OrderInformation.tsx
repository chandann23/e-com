import { formatCurrency } from "@/lib/formatters";
import { Button, Column, Img, Row, Section, Text, } from "@react-email/components";
import React from "react";

type OrderInformationProps = {
  order: {
    id: string;
    createdAt: Date;
    pricePaidInCents: number;
  };
  product: {
    name: string;
    imagePath: string;
    description: string;
  };
  downloadVerificationId: string;
};

const dateFomatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const OrderInformation = ({
  order,
  product,
  downloadVerificationId,
}: OrderInformationProps) => {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap">
              Order Id
            </Text>
            <Text className="mt-0 mr-4">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap">
              Purchased On
            </Text>
            <Text className="mt-0 mr-4">
              {dateFomatter.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap">
              Price paid
            </Text>
            <Text className="mt-0 mr-4">
              {formatCurrency(order.pricePaidInCents / 100)}
            </Text>
          </Column>
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img
          className="w-100%"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.imagePath}`}
          alt={product.name}
        />
        <Row className="mt-8">
<Column className="align-bottom ">
<Text className="text-lg font-bold m-0 mr-4">

  {product.name}
</Text>
</Column>
<Column align="right">
<Button
href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
className="bg-black texxt-white px-6  py-4 text-lg rounded">
  Download
</Button>
</Column>


        </Row>
        <Column>
       <Text className=" text-gray-500 mb-0">
         {product.description}
       </Text>
        </Column>
      </Section>
    </>
  );
};

export default OrderInformation;
