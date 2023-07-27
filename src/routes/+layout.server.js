// import { browser } from "$app/environment";
import { getCollections, getCart } from "$lib/store";

export async function load() {
    const res = await getCollections();
    const cart = await getCart();
    console.log(cart);
    if (res.response.status === 200) {
        return {
            collections: res.collections,
            cart
        }
    } else {
        throw error("No Page Data ...")
    }
}