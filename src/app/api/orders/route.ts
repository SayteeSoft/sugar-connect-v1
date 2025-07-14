
import { NextResponse } from 'next/server';
import * as paypal from '@paypal/checkout-server-sdk';
import type { OrdersCreateRequest } from '@paypal/checkout-server-sdk/lib/orders/lib';

const creditPackages: Record<string, {name: string, value: string}> = {
    credits_100: { name: "100 Credits Pack", value: "49.99" },
    credits_250: { name: "250 Credits Pack", value: "99.99" },
    credits_500: { name: "500 Credits Pack", value: "179.99" },
    credits_1000: { name: "1000 Credits Pack", value: "299.99" },
};

function getPayPalClient() {
    const {
        PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET,
    } = process.env;

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
        throw new Error("PayPal client ID or secret is not configured in environment variables.");
    }

    const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
    return new paypal.core.PayPalHttpClient(environment);
}

export async function POST(req: Request) {
    try {
        const client = getPayPalClient();
        const { cart } = await req.json();
        const item = creditPackages[cart.id];
        if (!item) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }
        const totalValue = (parseFloat(item.value) * parseInt(cart.quantity)).toFixed(2);
        
        const request = new paypal.orders.OrdersCreateRequest() as OrdersCreateRequest;
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalValue,
                        breakdown: {
                            item_total: {
                                currency_code: "USD",
                                value: totalValue,
                            },
                        },
                    },
                    items: [
                        {
                            name: item.name,
                            unit_amount: {
                                currency_code: "USD",
                                value: item.value,
                            },
                            quantity: cart.quantity.toString(),
                            sku: cart.id,
                        },
                    ],
                },
            ],
        });

        const order = await client.execute(request);
        
        const status = order.statusCode ? order.statusCode : 500;
        return NextResponse.json({ id: order.result.id }, { status });

    } catch (error: any) {
        console.error("Failed to create order:", error);
        const message = error.message || "Failed to create order.";
        const status = error.statusCode || 500;
        return NextResponse.json({ error: message }, { status });
    }
}
