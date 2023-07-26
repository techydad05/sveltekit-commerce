import { writable } from 'svelte/store';
// import { browser } from '$app/environment';
// import { shopifyFetch } from '../utils/shopify.js';
// import { loadCart } from '$utils/shopify';
import { createClient } from "../client.js";
const client = createClient();

export const cartQuantity = writable('');
export const cartStore = writable([]);
// export const cartStore2 = writable([]);
export const search = writable('');
export const headerHeight = writable(0);
export const productStore = writable([]);
export const productTags = writable([]);
export const productsByTag = writable([]);
export const featuredProduct = writable([]);
export const collectionProducts = writable([]);
export const allProducts = writable([]);
export const collections = writable([]);


// const getAllProducts = () => {
//   return client.products.list().then((res) => {
//     allProducts.set(res.products);
//     return res;
//   })
// } 

export const initSetPaymentSession = async (cartId) => {
  console.log('inside initpaymentsessions')
  client.carts.createPaymentSessions(cartId)
  .then(async ({ cart }) => {
      const hasStripe = await cart.payment_sessions?.some((session) => session.provider_id === 'stripe');
      // SETUP STRIPE!!!!
      if (!hasStripe) {
          console.log("doesnt have stripe");
      } else {
          console.log("has stripe");
          if (cart) {
              client.carts.setPaymentSession(cart.id, {provider_id: "stripe"}).then(res => {
                  console.log("setting payment provider:", res.cart)
                  cartStore.set(res.cart)
              });
          }
      } 
  });
}

export const updateLineItem = async (line_id, quantity) => {
  const cart_id = localStorage.getItem("cart_id");
  await client.carts.lineItems.update(cart_id, line_id, { quantity }).then((res) => {
    console.log("lineitem updated:", res.cart);
    cartStore.set(res.cart);
  })
}

export const addToCart = async (variant_id) => {
  const cartId = localStorage.getItem("cart_id");
  console.log("cartId:", cartId)
  console.log("variantId:", variant_id)
  const { cart } = await client.carts.lineItems.create(cartId, {
    variant_id: variant_id,
    quantity: 1,
  })
  console.log("Item added", cart);
  cartStore.set(cart)
  if (cart.payment_session === undefined) {
    initSetPaymentSession(cart.id);
  }
  // FIND NOTIFICATION LIB OR MAKE ONE TO USE IN THESE AREAS OR SOMEWHERE ELSE...
  // toast.push(`<span class="text-4xl">😎</span> <h1 class="text-lg">Item Added!</h1>`)
}

export const getCart = async () => {
  console.log("getting cart function testies!!!!");
  // searching for NA region id to create cart with will change later
  let regionID = "reg_01H413JZSAFX46MF4J2BQEHDE3";
  const cartId = localStorage.getItem("cart_id");
  // client.regions.list().then((res) => {
  //   res.regions.forEach(region => {
  //     region.name === "NA" ? regionID = region.id : null; 
  //   });
  // });
  if (regionID) {
    if (cartId) {
      return await client.carts.retrieve(cartId).then((res) => {
        console.log("cart found in local.");
        cartStore.set(res.cart)
        return res.cart;
      });
  
    } else {
      return client.carts.create({region_id: regionID}).then((res) => {
        console.log("no cart in local.. creating cart.");
        cartStore.set(res.cart)
        return res.cart
      })
    }
  } else {
    console.log("must have NA region set in medusa admin or change code");
  }
}

export const getCollections = async () => {
  return client.collections.list().then((res) => {
    collections.set(res.collections);
    return res;
  });
}

export const getCollectionProducts = async (collection) => {
  const { collections } = await client.collections.list();
  let id = "";
  collections.forEach(col => {
    col.handle.includes(collection) ? id = col.id : null;
  });
  return client.products.list({ collection_id: [id] }).then((res) => {
    collectionProducts.set(res.products);
    return res;
  });
}

export const getProductByHandle = async (handle) => {
  return client.products.list({ handle: handle }).then((res) => res)
}

export const getProductsByTag = async (searchTags) => {
  let tagArr = await getProductTags();
  searchTags = searchTags.split(',');
  let filteredTags = [];
  (tagArr).forEach(tag => {
    if (searchTags.includes(tag.value)) {
      filteredTags.push(tag.id)
    }
  });
  return client.products.list({ tags: filteredTags }).then((res) => {
    productsByTag.set(res.products);
    return res;
  })
};

export const getProductTags = async () => {
  const client = createClient();
  return client.productTags.list().then((res) => {
    const tagArr = [];
    res.product_tags.forEach(({ id, value }) => {
      tagArr.push({ id, value });
    });
    productTags.set(tagArr);
    return tagArr;
  });
}

// todo: change this to medusa cart
// export const getCartItems = async () => {
//   let cartId = JSON.parse(localStorage.getItem('cartId'));
//   try {
//     const shopifyResponse = await loadCart(cartId);

//     let sum = 0;
//     shopifyResponse.body?.data?.cart?.lines?.edges?.forEach((d) => {
//       sum += d.node.quantity;
//     });
//     cartQuantity.set(sum);
//     return shopifyResponse;
//   } catch (error) {
//     console.log(error);
//   }
// };
