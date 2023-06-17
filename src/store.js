import { writable } from 'svelte/store';
import { shopifyFetch } from './utils/shopify.js';
import { loadCart } from '$utils/shopify';
import { createClient } from "./client.js";

export const cartQuantity = writable('');
export const cart = writable([]);
export const search = writable('');
export const headerHeight = writable(0);
export const productStore = writable([]);
export const productTags = writable([]);
export const productsByTag = writable([]);
export const featuredProduct = writable([]);

// MAY END UP GETTING RID OF THIS AND USING SEVERAL SEPARATE STORES
// function setProductStores() {
//   const { subscribe, set, update } = writable(["flerp"]);

//   return {
//     subscribe,
//     set,
//     addTo: (n) => update(n => {
//       console.log(n);
//     }),
//     addTo: () => update(n => {
//       n.push("testies");
//       return n;
//     }),
//     increment: () => update(n => n + 1),
//     decrement: () => update(n => n - 1),
//     reset: () => set(0),
//   };
// }
// export const productStores = setProductStores();

// custom functions added by me

export const getProducts = async () => {
  const client = createClient();
  const { products } = await client.products.list();
  console.log("Products:", products)
  // check for featured product to set main hero if it doesnt
  // exist then a default hero one will be used
  products.forEach(product => {
    if (product.tags[0] && product.tags[0].value === "featured") {
      featuredProduct.set(product);
    }
  });
  productStore.set(products);
  // console.log(products)
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
