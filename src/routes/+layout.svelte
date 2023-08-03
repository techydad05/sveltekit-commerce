<script>
  import '../app.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import { lineItems, origCartStr } from '$lib/store';
  import { onMount } from 'svelte';

  export let data;
  // console.log("data in main layout:", data);
  
  let collections = data.collections;
  let theme = null;
  // let checkoutUrl;
  // let cartCreatedAt;
  // let cartItems = [];

  // function clickOutside(element, callbackFunction) {
  //   function onClick(event) {
  //     if (!element.contains(event.target) && !event.target.classList.contains('cart-btn')) {
  //       callbackFunction();
  //     }
  //   }

  //   document.body.addEventListener('click', onClick);

  //   return {
  //     update(newCallbackFunction) {
  //       callbackFunction = newCallbackFunction;
  //     },
  //     destroy() {
  //       document.body.removeEventListener('click', onClick);
  //     }
  //   };
  // }

  onMount(async () => {
    // getting lineitems out of local if theyre there
    if (typeof window !== 'undefined') {
      let localLineItems = JSON.parse(localStorage.getItem('lineitems'));
      if (localLineItems) {
        lineItems.set(localLineItems);
        console.log("local lineitems found lineitems set!", $lineItems);
      } else {
        console.log("no local lineitems");
      }
    }


    // if (typeof window !== 'undefined') {
      //   // CLEAN ALL OF THIS STUFF UP IN HERE SOME I MAY NEED
      //   // MAY NEED SOME OF THIS COMMENTED OUT STUFF ADD BACK IF NEEDED
      //   //  **** MOVE THIS CART STUFF OUT OF HERE AND INTO STORE USING LOCALSTORAGE IN STORE FILE ****
      //   // cartCreatedAt = JSON.parse(localStorage.getItem('cartCreatedAt'));
      //   // checkoutUrl = JSON.parse(localStorage.getItem('cartUrl'));
    //   // let currentDate = Date.now();
    //   // let difference = currentDate - cartCreatedAt;
    //   // let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    //   // let cartIdExpired = totalDays > 6;
    //   cartId = localStorage.getItem('cart_id');
    //   // if (cartId === 'undefined' || cartId === 'null' || cartIdExpired) {
      //   if (cartId === undefined || cartId === null) {
        //     const cart = await getCart();
        //     console.log('new cart:', cart);
        //     // localStorage.setItem('cart_id', cart.id);
        //   } else {
          //     const cart = await getCart(cartId);
          //     console.log('cart from local:', cart);
          //   }
          // }
    theme = localStorage.getItem('theme');
  });

</script>

<main data-theme={theme ?? 'dark'} class={`overflow-hidden text-white`}>
  <Header menuItems={collections} bind:new_theme={theme} />
  <div class="min-h-screen overflow-scroll mt-[88px]">
    <slot />
    <Footer />
  </div>
</main>
