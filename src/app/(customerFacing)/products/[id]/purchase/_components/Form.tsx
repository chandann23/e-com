"use client";

import { userOrderExists } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const Form = ({ priceInCents ,productId}: { priceInCents: number , productId : string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stripe  == null|| elements == null || email == null) return;
    setIsLoading(true);







    const orderExists =  await userOrderExists(email,productId);
    if(orderExists){
      setErrorMessage("You already have an order with this email")
      return;
    }


    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL!}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message)

      }else{
console.log(error);
setErrorMessage("unknown error occured")
      }
     }).finally(() => {
        setIsLoading(false);
      });
    }
  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>checkout</CardTitle>
          { errorMessage &&
          <CardDescription className="text-destructive">{errorMessage}</CardDescription>}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
          <LinkAuthenticationElement onChange={e => setEmail(e.value.email)} />
        </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "purchasing"
              : `pay - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};


export default Form;