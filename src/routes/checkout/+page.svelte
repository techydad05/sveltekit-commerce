<script>
  import { browser } from '$app/environment';
  import { lineItems, getMedusaCart, addLineItemToCart } from '$lib/store.js';
  export let data;

//   let testies;
//   $: {
//     console.log('Lineitems:', $lineItems);
//   }

//   if (browser) {
//     testies = localStorage.getItem('lineitems');
//     console.log(testies);
//   }
//   let cart = {};
//   if (!browser) {
//     console.log(testies);
//     cart = getMedusaCart().then((res) => {
//       //   console.log('on the server', res);
//       return res;
//     });
//   }
const addToCart = () => {
    addLineItemToCart(data.cart.id, 'variant_01H413K0636R7CQ83RKQ4520GG');
}
</script>

<div>
  <h1 class="mb-12 text-5xl">Checkout Page</h1>
  {JSON.stringify(data.cart)}
  <div class="btn btn-xl" on:click={() => addToCart()}>click me</div>
  <!-- <h1 class="text-3xl">testing</h1>
  {JSON.stringify($lineItems)} -->
</div>
