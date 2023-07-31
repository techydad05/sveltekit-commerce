<script>
  import { page } from '$app/stores';
  import Icons from '$components/Icons.svelte';
  import SearchBar from '$components/SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quadInOut } from 'svelte/easing';
  import { updateLineItem, lineItems } from '$lib/store';

  function clickOutside(element, callbackFunction) {
    function onClick(event) {
      if (!element.contains(event.target)) {
        if (showMenu == true) {
          callbackFunction();
        }
      }
    }

    document.body.addEventListener('click', onClick);

    return {
      update(newCallbackFunction) {
        callbackFunction = newCallbackFunction;
      },
      destroy() {
        document.body.removeEventListener('click', onClick);
      }
    };
  }

  // LEARN HOW TO USE THIS EVENT DISPATCHER MAYBE FOR*****
  // MOVING THE CART STUFF BACK TO LAYOUT...
  const dispatch = createEventDispatcher();

  // export let cart;
  let dumpCart = true;
  // move this?
  let showMenu = true;
  let showThemeChange = true;

  export let menuItems;
  $: menuItems = menuItems.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });
  $: currentRoute = $page.url.pathname;
  // $: cartQuantities = getCartItemQuantities($lineItems);
  $: cartTotal = $lineItems.reduce((accumulator, item) => {
    return accumulator + item.subtotal * item.quantity;
  }, 0);
  
  let origCartStr = JSON.stringify($lineItems);
  

  let theme_array = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter'
  ];
  export let new_theme;

  // THIS CART STUFF NEEDS TO BE IN ITS OWN COMPONENTS WORK ON THAT!
  // ***** SET TOAST NOTIFICATIONS FOR ALL OF THE ADDING AND CHANGING ETC...
  // ALSO FOR UPDATING CART WITH ZERO TO JUST DELETE IT BUT WARN FIRST *****
  function updateCartQuantities(updateType, index, value) {
    value = Number.parseInt(value);
    if (updateType === 'dec') {
      if ($lineItems[index].quantity !== 0) {
        lineItems.update((v) => {
          v[index].quantity -= 1;
          return v;
        });
      }
    } else if (updateType === 'inc') {
      lineItems.update((v) => {
        v[index].quantity += 1;
        return v;
      });
    } else {
      if (value === 0) {
        // add alert for removing item with
        // an ok button to confirm
      } else {
        lineItems.update((v) => {
          v[index].quantity = value;
          return v;
        });
      }
    }
  }

  const updateLineItems = () => {
    localStorage.setItem('lineitems', JSON.stringify($lineItems));
    console.log("Cart updated!")
  }

  const handleClick = () => {
    showMenu = !showMenu;
    dumpCart = false;
  };
</script>

<div
  on:dblclick={() => (showThemeChange = !showThemeChange)}
  class="navbar bg-neutral text-neutral-content fixed z-[99] h-[88px] justify-between"
>
  <div class="h-full max-w-[200px]">
    <a href="/" class="logo btn btn-ghost h-full text-xl normal-case">
      <img src="/svelte_logo.png" alt="" class="h-[inherit]" />
    </a>
    <div class:hidden={showThemeChange} class="dropdown absolute">
      <select
        data-choose-theme
        class="select select-bordered text-primary w-full"
        bind:value={new_theme}
      >
        <option value={new_theme} class="text-primary"
          ><Icons type="menu" />{new_theme ? new_theme : 'Select a theme'}</option
        >
        {#each theme_array as value}
          <option {value} class="text-primary relative">{value}</option>
        {/each}
      </select>
    </div>
  </div>
  <div>
    <div use:clickOutside={() => (showMenu = false)}>
      <label tabindex="0">
        <div
          class="relative z-[100] m-4 w-10 items-center justify-center rounded-full"
          style="display:flex !important;"
        >
          <div class:open={showMenu} on:click={handleClick} id="nav-icon3">
            <span class="bg-primary rounded-btn" />
            <span class="bg-primary rounded-btn" />
            <span class="bg-primary rounded-btn" />
            <span class="bg-primary rounded-btn" />
          </div>
        </div>
      </label>
      {#if showMenu}
        <ul
          tabindex="0"
          transition:fly={{ x: '100', y: 0, easing: quadInOut, duration: 250 }}
          class="menu menu-normal bg-base-100 rounded-box visible absolute top-[90%] right-[.4%] z-50 mt-3 block h-[calc(100vh-94px)] w-[300px] overflow-hidden overflow-y-auto p-4 opacity-100 shadow-lg"
        >
          <li><SearchBar /></li>
          <div>
            <div
              class:rideCart={showMenu}
              on:click={() => (dumpCart = !dumpCart)}
              class="btn btn-link"
            >
              <div class:rotate={dumpCart} class:unrotate={!dumpCart}>
                <Icons type="shopping-cart" />
              </div>
            </div>
          </div>
          <div class:open={dumpCart} class="cartdiv h-0 overflow-hidden overflow-y-scroll">
            <!-- reworking cart section of menu -->
            {#if JSON.stringify($lineItems) === origCartStr}
              <div
                on:click={() => updateLineItems()}
                class="btn btn-sm btn-warning ml-[25%] w-1/2"
              >
                Update
              </div>
            {/if}
            <h2 class="text-center text-xl">
              Cart Subtotal: ${(cartTotal / 100).toFixed(2)}
            </h2>
            {#each $lineItems as item, i}
              <div
                class="grid-rows-[2, minmax(auto, 1fr)] relative mb-1 grid border-2 border-white p-1"
              >
                <div class="grid grid-cols-2">
                  <div><img class="h-[100px]" src={item.thumbnail} alt="" /></div>
                  <div class="relative">
                    <div class="btn btn-sm btn-warning absolute right-0 top-0 rounded-none">X</div>
                    <div class="absolute bottom-0">
                      <p>Price: ${(item.subtotal / 100).toFixed(2)}</p>
                      <p>Subtotal: ${((item.subtotal * item.quantity) / 100).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div class="mt-1 h-12">
                  <div class="grid w-full grid-cols-2">
                    <div class="flex h-12 items-center justify-center bg-gray-200">
                      <h1 class="text-primary w-[80%] overflow-hidden text-ellipsis">
                        {item.title}
                      </h1>
                    </div>
                    <div class="grid grid-cols-3 gap-1">
                      <div
                        on:click={() => updateCartQuantities('dec', i)}
                        class:btn-disabled={item.quantity === 0}
                        class="btn btn-secondary rounded-none"
                      >
                        -
                      </div>
                      <input
                        type="text"
                        value={item.quantity}
                        on:change={(e) => updateCartQuantities('input', i, e.target.value)}
                        class="text-center"
                      />
                      <!-- WORK ON ADDING AN INVENTORY LIMIT FOR INCREMENTING ITEM QUANTITY -->
                      <div
                        on:click={() => updateCartQuantities('inc', i)}
                        class="btn btn-secondary rounded-none"
                      >
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          <li>
            <a
              data-sveltekit-prefetch
              href={`${$page.url.origin}/search/`}
              class={`border-b-secondary-focus hover:text-primary block border-b-2 px-2 py-1 text-center text-lg ${
                currentRoute === '/search' ? 'text-primary-focus' : 'text-secondary'
              }`}
              style="border-radius: 0 !important;">All</a
            >
          </li>
          {#each menuItems as tab}
            <li on:click={() => (showMenu = false)}>
              <a
                data-sveltekit-prefetch
                href={`${$page.url.origin}/search/${tab.handle}`}
                class={`border-b-secondary-focus hover:text-primary block border-b-2 px-2 py-1 text-center text-lg ${
                  currentRoute === '/search/' + tab.handle ? 'text-primary-focus' : 'text-secondary'
                }`}
                style="border-radius: 0 !important;">{tab.title}</a
              >
            </li>
          {/each}
          <li class="mt-4 grid grid-rows-2 text-center">
            <h1 class="hover:bg-base-100 text-center text-2xl">Check us out on social media!</h1>
            <!-- svelte-ignore a11y-invalid-attribute -->
            <div class="hover:bg-base-100 grid grid-cols-3">
              <a href="#" class="btn btn-outline hover:bg-secondary-focus">
                <i class="fa-brands fa-facebook-f fa-2xl justify-center" />
              </a>
              <a href="#" class="btn btn-outline hover:bg-secondary-focus">
                <i class="fa-brands fa-twitter fa-2xl justify-center" />
              </a>
              <a href="#" class="btn btn-outline hover:bg-secondary-focus">
                <i class="fa-brands fa-instagram fa-2xl justify-center" />
              </a>
            </div>
          </li>
        </ul>
      {/if}
    </div>
  </div>
</div>

<!-- {#if $cartStore.items}
<h2 class="text-center text-xl">
  Cart Total: ${($cartStore.total / 100).toFixed(2)}
</h2>
{#each $cartStore.items as item, i}
  <div
    class="grid-rows-[2, minmax(auto, 1fr)] relative mb-1 grid border-2 border-white p-1"
  >
    <div class="grid grid-cols-2">
      <div><img class="h-full" src={item.thumbnail} alt="" height="100%" /></div>
      <div class="relative">
        <div class="btn btn-sm btn-warning absolute right-0 top-0 rounded-none">
          X
        </div>
        <div class="absolute bottom-0">
          <p>Price: ${(item.subtotal / item.quantity / 100).toFixed(2)}</p>
          <p>Total: ${(item.subtotal / 100).toFixed(2)}</p>
        </div>
      </div>
    </div>
    {#if cartQuantities[i] !== item.quantity}
      <div
        on:click={() => updateLineItem(item.id, cartQuantities[i])}
        class="btn btn-sm btn-warning absolute bottom-14 ml-[25%] w-1/2"
      >
        Update
      </div>
    {/if}
    <div class="h-12">
      <div class="grid w-full grid-cols-2">
        <div class="flex h-12 items-center justify-center bg-gray-200">
          <h1 class="text-primary w-[80%] overflow-hidden text-ellipsis">
            {item.title}
          </h1>
        </div>
        <div class="grid grid-cols-3 gap-1">
          <div
            on:click={() => updateCartQuantities('dec', i)}
            class:btn-disabled={cartQuantities[i] === 0}
            class="btn btn-secondary rounded-none"
          >
            -
          </div>
          <input
            type="text"
            value={cartQuantities[i]}
            on:change={(e) => updateCartQuantities('input', i, e.target.value)}
            class="text-center"
          />
          WORK ON ADDING AN INVENTORY LIMIT FOR INCREMENTING ITEM QUANTITY
          <div
            on:click={() => updateCartQuantities('inc', i)}
            class="btn btn-secondary rounded-none"
          >
            +
          </div>
        </div>
      </div>
    </div>
  </div>
{/each}
{:else}
<div>
  <h1 class="text-4xl">Your cart is empty.</h1>
  Add some products<a href="/search"> here</a>
</div>
{/if} -->
<style>
  .rideCart {
    animation: ridingCart 1.75s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.35s forwards;
  }

  .unrotate {
    animation: undumpCart 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  .rotate {
    animation: dumpCart 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes dumpCart {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(180deg);
    }
  }
  @keyframes undumpCart {
    from {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(0deg) translateY(0);
    }
  }

  @keyframes ridingCart {
    0% {
      transform: translateX(0) rotate(0deg);
      opacity: 0 !important;
    }
    50% {
      transform: translateX(270%) rotate(-25deg);
    }
    80% {
      transform: translateX(270%) scaleX(-1) rotate(-25deg);
    }
    100% {
      transform: translateX(135%) scaleX(-1) rotate(0deg);
    }
  }

  .cartdiv.open {
    height: 50%;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .open-menu {
    visibility: visible !important;
    opacity: 1 !important;
  }
  a.logo {
    text-decoration: none;
  }
  .logo::after {
    content: 'VEDUSA';
    text-decoration: none;
    font-size: 2rem;
    font-weight: 300;
  }
  #nav-icon3 {
    width: 60px;
    height: 40px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
  }

  #nav-icon3 span {
    display: block;
    position: absolute;
    height: 5px;
    width: 100%;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }
  #nav-icon3 span:nth-child(1) {
    top: 0px;
  }

  #nav-icon3 span:nth-child(2),
  #nav-icon3 span:nth-child(3) {
    top: 15px;
  }

  #nav-icon3 span:nth-child(4) {
    top: 30px;
  }

  #nav-icon3.open span:nth-child(1) {
    top: 12px;
    width: 0%;
    left: 50%;
  }

  #nav-icon3.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  #nav-icon3.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #nav-icon3.open span:nth-child(4) {
    top: 12px;
    width: 0%;
    left: 50%;
  }
</style>
