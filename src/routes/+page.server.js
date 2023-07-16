import { error } from '@sveltejs/kit';
import { getProductsByTag } from '$lib/store';

/** @type {import('./$types').RequestHandler} */
export async function load() {
  const resOne = await getProductsByTag('home');
  const resTwo = await getProductsByTag('featured');
  if (resOne.response.status === 200 && resTwo.response.status === 200) {
    if (resOne.products) {
      return {
        pageData: {
          homeProduct: resOne.products[0],
          featuredProducts: resTwo.products
        }
      };
    }
    throw error(404)
  } else {
    let status = resOne.response.status !== 200 ? resOne.response.status : resTwo.response.status;
    throw error(status);
  }
}
