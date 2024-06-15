'use client';
import React from 'react';
import { useToast } from '~/components/ui/use-toast';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import useLocalStorageState from 'use-local-storage-state';
import { LocalBasketItem } from '~/types/basket';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';

const PayPalButtonComponent = (props:{
    value: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [basket, setBasket] = useLocalStorageState<LocalBasketItem[]>(
    "basket",
    {
      defaultValue: [],
    }
  );

  return (
    <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency:"GBP"}}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "GBP",
                value: "0.01"//props.value,
              }
            }],
            intent: 'CAPTURE'
          });
        }}
        onApprove={(data, actions) => {
          if (!actions?.order) {
            toast({
              title: 'Error',
              description: 'Something went wrong. Please try again.',
            });
            return Promise.resolve(); // Return a resolved Promise<void> when there is an error
          }
          return actions.order.capture().then(async details => {
            const res = await fetch('/api/createOrder', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                basketItems: basket
              }),
            });
            if(res.status !== 200){
              toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
              });
              return Promise.resolve(); // Return a resolved Promise<void> when there is an error
            }
            toast({
              title: 'Success',
              description: 'Payment successfully processed.',
            });
            setBasket([]);
            router.replace('/account#orders');
          }).then(() => {}); // Return an empty resolved Promise<void> after handling post-transaction actions
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonComponent;