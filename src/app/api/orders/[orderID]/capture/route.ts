
import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';

const {
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
} = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    throw new Error("PayPal client ID or secret is not configured in environment variables.");
}

const environment = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET);
const client = new paypal.core.PayPalHttpClient(environment);


export async function POST(req: Request, { params }: { params: { orderID: string } }) {
    try {
        const { orderID } = params;
        if (!orderID) {
            return NextResponse.json({ error: "Order ID not found" }, { status: 400 });
        }
        
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({}); // This is required even if empty
        
        const capture = await client.execute(request);
        
        return NextResponse.json({ ...capture.result }, { status: capture.statusCode as number });

    } catch (error: any) {
        console.error("Failed to capture order:", error);
        const message = error.message || "Failed to capture order.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
