import { error } from '@sveltejs/kit';
import { getMedusaCart, addLineItemToCart, lineItems } from '$lib/store';

export async function load() {
    // this logs the data from the parent layout which is currently
    // only collections for the menu *** look into use cases
    // console.log('testies:', await page.parent())
    const res = await getMedusaCart();
    if (res.response.status === 200) {
        const cart = res.cart;
        if (cart) {
            return {
                cart
            };
        }

        throw error(404)
    } else {
        throw error(res.status)
    }
}
