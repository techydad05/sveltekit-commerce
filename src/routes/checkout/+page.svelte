<script>
  import { browser } from '$app/environment';
  import { lineItems, getMedusaCart } from '$lib/store.js';
  export let data;

  $: {
    console.log("Lineitems:", $lineItems)
  }

  if (!browser) {
      const cart = getMedusaCart().then((res) => {
        console.log("on the server", res);
    });
  }
</script>

<div>
  <h1 class="mb-12 text-5xl">Checkout Page</h1>
  {JSON.stringify(data.cart)}
  <h1 class="text-3xl">testing</h1>
  {JSON.stringify($lineItems)}
</div>
