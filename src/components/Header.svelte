<script>
  import { page } from '$app/stores';
  import Icons from '$components/Icons.svelte';
  import { cartQuantity } from '$lib/store';
  import SearchBar from '$components/SearchBar.svelte';
  import { createEventDispatcher } from 'svelte';
  import { fly } from 'svelte/transition';
  import { elasticInOut, quintInOut, quadInOut } from 'svelte/easing';

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

  // move this?
  let showMenu = false;
  let showThemeChange = true;
  export let menuItems;
  $: menuItems = menuItems.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });

  const dispatch = createEventDispatcher();

  $: currentRoute = $page.url.pathname;

  // let tabs = [
  //   { name: 'All', path: '/search' },
  //   { name: 'Featured', path: '/search/featured' },
  //   { name: 'Apparel', path: '/search/clothes' }
  // ];

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

  function openCart() {
    showMenu = false;
    dispatch('openCart', true);
  }

  const handleClick = () => {
    console.log(showMenu);
    showMenu = !showMenu;
    const elem = document.activeElement;
    dispatch('closeCart', true);
    if (elem) {
      elem?.blur();
    }
  };
</script>

<div class="navbar bg-base-100 relative z-[99] items-center shadow-md">
  <div class="flex-1" on:dblclick={() => (showThemeChange = !showThemeChange)}>
    <a href="/" class="btn btn-link logo mt-[-3%] text-xl normal-case"
      ><img
        alt="Svelte Logo"
        class="logo w-[75px]"
        decoding="async"
        loading="eager"
        src="/svelte_logo.png"
      /></a
    >
    <div class:hidden={showThemeChange} class="dropdown">
      <select
        data-choose-theme
        class="select select-bordered text-primary w-full"
        bind:value={new_theme}
      >
        <option value={new_theme} class="text-primary"
          ><Icons type="menu" />{new_theme ? new_theme : 'Select a theme'}</option
        >
        {#each theme_array as value}
          <option {value} class="text-primary">{value}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="flex-none">
    <button on:click={openCart} class="cart-btn btn btn-link relative z-[99] mx-4">
      <Icons type="cart" />
      <div class="cart-btn badge badge-secondary absolute top-7 left-8">{$cartQuantity}</div>
    </button>
    <div use:clickOutside={() => (showMenu = false)}>
      <label tabindex="0">
        <div
          class="m-4 w-10 items-center justify-center rounded-full"
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
          class="menu menu-normal bg-base-100 rounded-box visible absolute top-[90%] right-[.4%] z-50 mt-3 w-[30vw] min-w-[300px] p-4 opacity-100 shadow"
        >
          <li><SearchBar /></li>
          {#each menuItems as tab}
            <li on:click={() => (showMenu = false)}>
              <a
                data-sveltekit-prefetch
                href={`${$page.url.origin}/search/${tab.handle}`}
                class={`text-secondary border-b-secondary-focus hover:text-primary block border-b-2 px-2 py-1 text-center text-lg ${
                  currentRoute === tab.handle ? 'text-primary-focus' : 'text-secondary'
                }`}
                style="border-radius: 0 !important;">{tab.title}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  {#if !showMenu}
    <slot name="cart" />
  {/if}
</div>

<style>
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
