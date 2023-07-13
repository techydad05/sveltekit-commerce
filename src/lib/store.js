import { writable } from 'svelte/store';
import { shopifyFetch } from '../utils/shopify.js';
import { loadCart } from '$utils/shopify';
import { createClient } from "../client.js";
const client = createClient();

export const cartQuantity = writable('');
export const cart = writable([]);
export const search = writable('');
export const headerHeight = writable(0);
export const productStore = writable([]);
export const productTags = writable([]);
export const productsByTag = writable([]);
export const featuredProduct = writable([]);
export const collectionProducts = writable([]);
export const allProducts = writable([]);
export const collections = writable([]);

const getAllProducts = async () => {
  return client.products.list().then((res) => {
    allProducts.set(res.products);
    return res;
  })
} 

export function getCollections() {
  return client.collections.list().then((res) => {
    collections.set(res.collections);
    return res;
  });
}

export async function getCollectionProducts(collection) {
  const { collections } = await client.collections.list();
  let id = "";
  collections.forEach(col => {
    col.handle.includes(collection) ?  id = col.id : null;
  });
  return client.products.list({collection_id: [id]}).then((res) => {
    collectionProducts.set(res.products);
    return res;
  });
}

// export const getCollections = async () => {
//   const client = createClient();
//   const collections = await  client.collections.list();
//   return collections;
// }

export const getProducts = async () => {
  const client = createClient();
  const { products } = await client.products.list();
  // console.log("Products:", products)
  // check for featured product to set main hero if it doesnt
  // exist then a default hero one will be used
  products.forEach(product => {
    if (product.tags[0] && product.tags[0].value === "featured") {
      featuredProduct.set(product);
    }
  });
  return products;
};

export const getProductsByTag = async (searchTags) => {
  const client = createClient();
  let tagArr = getProductTags();
  searchTags = searchTags.split(',');
  let filteredTags = [];
  (await tagArr).forEach(tag => {
    if (searchTags.includes(tag.value)) {
       filteredTags.push(tag.id)
    } 
  });
  const { products } = await client.products.list({tags: filteredTags})
  productsByTag.set(products);
  return products;
};

export const getProductTags = async () => {
  const client = createClient();
  const { product_tags } = await client.productTags.list();
  let tagArr = [];
  product_tags.forEach(({ id, value }) => {
    tagArr.push({ id, value });
  });
  productTags.set(tagArr);
  return tagArr;
}


// todo: change this to medusa cart
export const getCartItems = async () => {
  let cartId = JSON.parse(localStorage.getItem('cartId'));

  try {
    const shopifyResponse = await loadCart(cartId);

    let sum = 0;
    shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
      sum += d.node.quantity;
    });
    cartQuantity.set(sum);
    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};
