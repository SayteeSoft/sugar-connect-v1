
import { NextResponse } from 'next/server';
import * as paypal from '@paypal/checkout-server-sdk';

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

export async function POST(req: Request, { params }: { params: { orderID: string } }) {
    try {
        const client = getPayPalClient();
        const { orderID } = params;
        if (!orderID) {
            return NextResponse.json({ error: "Order ID not found" }, { status: 400 });
        }
        
        const request = new paypal.orders.OrdersCaptureRequest(orderID);
        request.requestBody({}); // This is required even if empty
        
        const capture = await client.execute(request);
        
        const status = capture.statusCode ? capture.statusCode : 500;

        return NextResponse.json({ ...capture.result }, { status: status });

    } catch (error: any) {
        console.error("Failed to capture order:", error);
        const message = error.message || "Failed to capture order.";
        const status = error.statusCode || 500;
        return NextResponse.json({ error: message }, { status });
    }
}
