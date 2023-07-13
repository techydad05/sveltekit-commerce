import { error } from '@sveltejs/kit';
import { getCollectionProducts } from '$lib/store.js';

export async function load({ params }) {
  const res = await getCollectionProducts(params.collection);
  if (res.response.status === 200) {
      return {
          collection: res.products,
      }
      throw error(404)
  } else {
      throw error("No Page Data ...")
  }
}