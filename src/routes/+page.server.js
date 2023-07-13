// import { getAllCollections } from '$utils/shopify';
import { error } from '@sveltejs/kit';
// import axios from "axios";
import { getProducts } from '$lib/store';

/** @type {import('./$types').RequestHandler} */
export async function load() {
  // const { collections } = await getCollections();
  const products = getProducts();
  if (products) {
    return {
      products
    }
    throw error(404)
  } else {
    throw error("NO PRODUCTS FOUND!")
  }
}

// export async function load({ url }) {
//   const res = await getAllCollections();
//   if (res.status === 200) {
//     const products = res.body?.data?.collections?.edges;

//     if (products) {
//       return { products };
//     }
//     throw error(404);
//   } else {
//     throw error(res.status);
//   }
// }