<script>
  import ThreeItemGrid from '$components/ThreeItemGrid.svelte';
  import Carousel from '$components/Carousel.svelte';
  import DaisyHero from '$components/DaisyHero.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  // $: clothesCollection = data.products[0]?.node?.products?.edges;
  // $: featuredCollection = data.products[1]?.node?.products?.edges;
  $: allProducts = data.products;
  $: homeProduct = data.products.filter((product) =>
    product.tags.some((tag) => tag.value === 'home')
  )[0];
  $: featuredProducts = data.products.filter((product) =>
    product.tags.some((tag) => tag.value === 'featured' || tag.value === 'hott')
  );
</script>

<svelte:head>
  <title>Home – SvelteKit Commerce</title>
</svelte:head>

<main>
  <section class="tails-selected-element bg-white px-2 py-32 md:px-0" contenteditable="true">
    <div class="container mx-auto max-w-6xl items-center px-8 xl:px-5">
      <div class="flex flex-wrap items-center sm:-mx-3">
        <div class="w-full md:w-1/2 md:px-3">
          <div
            class="w-full space-y-6 pb-6 sm:max-w-md sm:pr-5 md:space-y-4 md:pb-0 lg:max-w-lg lg:space-y-8 lg:pr-0 xl:space-y-9"
          >
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
            >
              <span class="block xl:inline">Beautiful Pages to</span>
              <span class="block text-indigo-600 xl:inline" data-primary="indigo-600"
                >Tell Your Story!</span
              >
            </h1>
            <p class="mx-auto text-base text-gray-500 sm:max-w-md md:max-w-3xl lg:text-xl">
              It's never been easier to build beautiful websites that convey your message and tell
              your story.
            </p>
            <div class="relative flex flex-col sm:flex-row sm:space-x-4">
              <a
                href="#_"
                class="mb-3 flex w-full items-center rounded-md bg-indigo-600 px-6 py-3 text-lg text-white hover:bg-indigo-700 sm:mb-0 sm:w-auto"
                data-primary="indigo-600"
                data-rounded="rounded-md"
              >
                Try It Free <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-1 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#_"
                class="flex items-center rounded-md bg-gray-100 px-6 py-3 text-gray-500 hover:bg-gray-200 hover:text-gray-600"
                data-rounded="rounded-md"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <div
            class="h-auto w-full overflow-hidden rounded-md shadow-xl sm:rounded-xl"
            data-rounded="rounded-xl"
            data-rounded-max="rounded-full"
          >
            <img src="https://cdn.devdojo.com/images/november2020/hero-image.jpeg" class="" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <section>
    {#if homeProduct}
      <DaisyHero featured product={homeProduct} />
    {:else}
      <DaisyHero figure="https://picsum.photos/500/650" />
    {/if}
    <div class="lg:h-[90vh]">
      <ThreeItemGrid products={featuredProducts} />
    </div>
  </section>
  <section>
    <Carousel items={allProducts} />
  </section>
  <section>
    <div
      class="bg-dark flex flex-col border border-black px-8 py-20 text-white lg:flex-row lg:items-center"
    >
      <div
        class="mb-4 mr-8 flex-none text-left text-3xl font-black md:text-4xl lg:mb-0 lg:w-1/3 lg:text-right lg:text-6xl"
      >
        Dessert dragée halvah croissant.
      </div>
      <div>
        <div class="lg:text-2xl">
          Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon
          bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans.
          Tiramisu sweet roll cheesecake pie carrot cake.
        </div>
        <button class="text-svelteOrange hover:text-svelteDark mt-4 font-bold lg:text-2xl">
          Read it here
        </button>
      </div>
    </div>
  </section>
</main>
