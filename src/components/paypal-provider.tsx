
"use client";

import React, { useEffect } from 'react';
import Script from 'next/script';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

declare global {
  interface Window {
    paypal?: any;
  }
}

interface PayPalButtonsProps {
  cart: {
    id: string;
    quantity: string;
    amount: string;
  };
  onResult: (message: string) => void;
}

export function PayPalButtonsComponent({ cart, onResult }: PayPalButtonsProps) {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'AfJ7bhG_VDx0Z2o_EtExWS_Ps2eUiZKS0lABsQCbQC02V-c_Z59cOw8xq3yNqO763BAKwSRAf8n7fob8';

  useEffect(() => {
    if (window.paypal) {
      renderPaypalButtons();
    }
  }, [cart]);

  const renderPaypalButtons = () => {
    if(!window.paypal) return;

    // Clear previous buttons
    const container = document.getElementById("paypal-button-container");
    if (container) container.innerHTML = "";

    window.paypal.Buttons({
      style: {
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
      },
      async createOrder() {
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cart }),
          });

          const orderData = await response.json();

          if (orderData.id) {
            return orderData.id;
          }
          const errorMessage = orderData.error || 'Could not create order.';
          throw new Error(errorMessage);

        } catch (error) {
          console.error(error);
          onResult(`Could not initiate PayPal Checkout... ${error}`);
        }
      },
      async onApprove(data: any, actions: any) {
        try {
          const response = await fetch(`/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const orderData = await response.json();
          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            return actions.restart();
          } else if (errorDetail) {
            throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
          } else {
            const transaction = orderData.purchase_units[0].payments.captures[0];
            onResult(`Transaction ${transaction.status}: ${transaction.id}`);
            
            if (user && typeof user.credits === 'number') {
                const creditPackages: Record<string, number> = {
                    credits_100: 100,
                    credits_250: 250,
                    credits_500: 500,
                    credits_1000: 1000,
                };
                const creditsToAdd = creditPackages[cart.id] || 0;
                await updateUser(user.id, { credits: user.credits + creditsToAdd });
                toast({
                    title: "Purchase Successful!",
                    description: `${creditsToAdd} credits have been added to your account.`
                });
            }
          }
        } catch (error) {
          console.error(error);
          onResult(`Sorry, your transaction could not be processed... ${error}`);
        }
      },
    }).render("#paypal-button-container");
  };

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo,paylater,card`}
        data-sdk-integration-source="developer-studio"
        onLoad={renderPaypalButtons}
      />
      <div id="paypal-button-container"></div>
    </>
  );
}
