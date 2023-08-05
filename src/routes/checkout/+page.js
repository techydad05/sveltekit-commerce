import { browser } from '$app/environment';
import { getMedusaCart, lineItems } from '$lib/store';

let testies;
if (browser) {
    testies = localStorage.getItem('lineitems');
}
/** @type {import('./$types').PageLoad} */
export async function load(page) {
    // console.log(await page.parent());
    lineItems.subscribe(async (v) => {
        console.log(await page.parent());
        // getMedusaCart(v);
    })
}
