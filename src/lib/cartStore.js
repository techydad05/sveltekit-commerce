export const ssr = false;
import { createClient } from "../client.js";
const client = createClient();

export const getCartt = async (cartID) => {
    console.log("getting cart function");
    // searching for NA region id to create cart with will change later
    const regionID = "reg_01H413JZSAFX46MF4J2BQEHDE3";
    // const cartID = localStorage.getItem("cart_id");

    if (!cartID) {
        return await client.carts.create({ region_id: regionID }).then((res) => {
            console.log("no cart in local.. creating cart:", res.cart);
            // cartStore.set(res.cart)
            return res.cart
        })
    } else {
        return await client.carts.retrieve(cartID).then((res) => {
            console.log("cart found in local:", res.cart);
            // cartStore.set(res.cart)
            return res.cart
        })
    }










    // const cartId = localStorage.getItem("cart_id");
    // await client.regions.list().then((res) => {
    //   res.regions.forEach(region => {
    //     region.name === "NA" ? regionID = region.id : null; 
    //   });
    // });
    // if (regionID) {
    //   if (cartId) {
    //     return client.carts.retrieve(cartId).then((res) => {
    //       console.log("cart found in local.");
    //       cartStore.set(res.cart)
    //       return res.cart;
    //     });

    //   } else {
    //     return client.carts.create({region_id: regionID}).then((res) => {
    //       console.log("no cart in local.. creating cart.");
    //       cartStore.set(res.cart)
    //       return res.cart
    //     })
    //   }
    // } else {
    //   console.log("must have NA region set in medusa admin or change code");
    // }
}