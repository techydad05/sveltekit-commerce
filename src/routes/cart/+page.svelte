<script>
  import { /** cart **/ lineItems } from '$lib/store';

  export let data;

  const { medusa, usRegionId } = data;

  let total;

  async function createCart() {
      medusa.carts.create().then(({ cart }) => {
        console.log(cart.id);
      });
  }

  // cart.subscribe((cartVal) => {
  //     let tTotal = 0;

  //     for (const pid in cartVal) {
  //         for (const vid in cartVal[pid]) {
  //             tTotal += cartVal[pid][vid]["prices"][1]["amount"] * cartVal[pid][vid]["quantity"];
  //         }
  //     }

  //     total = tTotal;
  // });

  // async function checkout() {
  //     const cartResponse = await medusa.carts.create({
  //         region_id: usRegionId,
  //     });

  //     for (const pid in $cart) {
  //         for (const vid in $cart[pid]) {
  //             await medusa.carts.lineItems.create(cartResponse.cart.id, {
  //                 variant_id: vid,
  //                 quantity: $cart[pid][vid]["quantity"],
  //             });
  //         }
  //     }

  //     let rand_num = Math.floor(Math.random() * 10000);
  //     const customerResponse = await medusa.customers.create({
  //         first_name: "Alec",
  //         last_name: "Reynolds",
  //         email: `user${rand_num}@example.com`,
  //         password: "supersecret",
  //     });

  //     await medusa.carts.update(cartResponse.cart.id, {
  //         customer_id: customerResponse.customer.id,
  //         shipping_address: {
  //             first_name: "Arno",
  //             last_name: "Willms",
  //             address_1: "14433 Kemmer Court",
  //             address_2: "Suite 369",
  //             city: "South Geoffreyview",
  //             country_code: "us",
  //             province: "Kentucky",
  //             postal_code: "72093",
  //             phone: "16128234334802",
  //         },
  //     });

  //     medusa.carts.createPaymentSessions(cartResponse.cart.id).then(({ cart }) => {
  //         medusa.carts.complete(cart.id).then(({ type, data }) => {
  //             alert("Order Placed Successfully!");
  //             window.location = "/";
  //         });
  //     });
  // }
</script>

<section>
<div class="text-5xl mb h-screen w-screen flex items-center justify-center">
    <p>Testies</p>
    <div on:click={() => createCart()} class="btn btn-lg btn-success ml-4">
        click
    </div>
</div> 

</section>
