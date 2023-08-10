import Medusa from "@medusajs/medusa-js";
let baseUrl = "http://192.168.1.42:9002";
const medusa = new Medusa({ baseUrl: baseUrl, maxRetries: 3 });

// Do something with userId or whatever you passed here
export async function GET() {
    return new Response(JSON.stringify({ testies: 'awdawdawdawd' }))
}

export async function POST({ request }) {
    const testies = await request.json();
    const cart = await medusa.carts.create()
        .then(({ cart }) => {
            console.log(cart.id);
            console.log("testies:", testies);
            testies.cart = cart.id;
        });
    return new Response(JSON.stringify(testies))
}