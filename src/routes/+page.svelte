<script>
  import ThreeItemGrid from '$components/ThreeItemGrid.svelte';
  import Carousel from '$components/Carousel.svelte';
  import DaisyHero from '$components/DaisyHero.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
  const { pageData } = data;
  const homeProduct = pageData.homeProduct;
  const featuredProducts = pageData.featuredProducts;
  // console.log(featuredProducts)

  // $: homeProduct = data.products.filter((product) =>
  //   product.tags.some((tag) => tag.value === 'home')
  // )[0];
  // $: featuredProducts = data.products.filter((product) =>
  //   product.tags.some((tag) => tag.value === 'featured' || tag.value === 'hott')
  // );

  
</script>

<svelte:head>
  <title>Home – SvelteKit Commerce</title>
</svelte:head>

<main>
  <section>
    {#if homeProduct}
      <DaisyHero featured product={homeProduct} />
    {:else}
      <DaisyHero figure="https://picsum.photos/500/650" />
    {/if}
    {#if featuredProducts}
      <div class="lg:h-[90vh]">
        {#if featuredProducts.length >= 3}
          <ThreeItemGrid products={featuredProducts} />
        {:else}
          <div class="flex p-[120px] text-2xl bg-secondary">
            No products in grid container.. add some or remove component?
          </div>
        {/if}
      </div>
    {/if}
  </section>
  <section>
    {#if featuredProducts}
      <Carousel items={featuredProducts} />
    {/if}
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
