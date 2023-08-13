import Medusa from "@medusajs/medusa-js";
import { getMedusaCart } from "$lib/store";
import { redirect } from "@sveltejs/kit";


let baseUrl = "http://192.168.1.42:9002";
const medusa = new Medusa({ baseUrl: baseUrl, maxRetries: 3 });

// Do something with userId or whatever you passed here
export async function GET() {
    // return new Response(JSON.stringify({ testies: 'figure out how to stop user from being able to reach this url?' }))
    throw redirect(303, '/');
}

export async function POST({ request }) {
    const testies = await request.json();
    const cart = await getMedusaCart();
    console.log("cart:", cart.id);
    testies.cart_id = cart.id;
    // const cart = await medusa.carts.create()
    //     .then(({ cart }) => {
    //         console.log(cart.id);
    //         console.log("testies:", testies);
    //         testies.cart = cart.id;
    //     });
    return new Response(JSON.stringify(testies))
}