// import { getAllCollections } from '$utils/shopify';
import { error } from '@sveltejs/kit';
// import axios from "axios";
import { getProducts } from '../store';

/** @type {import('./$types').RequestHandler} */
export async function load() {
  const products = getProducts();
  console.log(products);
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