<script>
  import GridTile from '$components/GridTile.svelte';
  import DescriptionToggle from '$components/DescriptionToggle.svelte';
  import Icons from '$components/Icons.svelte';
  import { lineItems, origCartStr } from '$lib/store';
  import { browser } from '$app/environment';

  /** @type {import('./$types').PageData} */
  export let data;
  const { pageData } = data;
  const product = pageData.product;
  const featuredProducts = pageData.featuredProducts;

  let selectedOptions = {};
  let cartLoading = false;
  let currentImageIndex = 0;
  let quantity = 1;

  $: highlightedImageSrc = product?.images[currentImageIndex].url;

  product?.options.forEach((option) => {
    selectedOptions = { ...selectedOptions, [option.name]: option.values[0] };
  });

  function changeHighlightedImage(direction) {
    if (direction === 'next') {
      if (currentImageIndex + 1 < product?.images?.length) {
        currentImageIndex = currentImageIndex + 1;
      } else {
        currentImageIndex = 0;
      }
    } else {
      if (currentImageIndex === 0) {
        currentImageIndex = product?.images?.length - 1;
      } else {
        currentImageIndex = currentImageIndex - 1;
      }
    }
  }

  const addToCart = (item, quantity) => {
    $lineItems = [
      ...$lineItems,
      {
        id: item.variants[0].id,
        title: item.title,
        amount: item.variants[0].prices[0].amount,
        quantity,
        thumbnail: item.thumbnail,
        subtotal: item.variants[0].prices[0].amount * quantity
      }
    ];
    localStorage.setItem('lineitems', JSON.stringify($lineItems));
    origCartStr.set(JSON.stringify($lineItems));
  };
</script>

<svelte:head>
  <title>{product.title}</title>
</svelte:head>

<div>
  {#if pageData.product}
    <div class="grid min-h-[calc(100vh-80px)] md:grid-cols-[2.5fr,1.5fr]">
      <div>
        {#key highlightedImageSrc}
          <div class="bg-light relative h-4/5">
            <GridTile
              title={product.title}
              price={(product.variants[0].prices[0].amount / 100).toFixed(2)}
              currencyCode={product.variants[0].prices[0].currency_code.toUpperCase()}
              imageSrc={highlightedImageSrc}
            />
            {#if product?.images?.length > 1}
              <div class="absolute right-0 bottom-0 z-40 p-6 ">
                <button
                  on:click={() => {
                    changeHighlightedImage('back');
                  }}
                  class="btn btn-primary"><Icons type="arrowLeft" /></button
                >
                <button
                  on:click={() => {
                    changeHighlightedImage('next');
                  }}
                  class="btn btn-primary"><Icons type="arrowRight" /></button
                >
              </div>
            {/if}
          </div>
        {/key}
        <div class="flex h-1/5 ">
          {#each pageData.product.images as variant, i}
            <div
              on:click={() => {
                currentImageIndex = i;
              }}
              class="h-full w-1/4 bg-white"
            >
              <GridTile imageSrc={variant.url} removeLabels={true} />
            </div>
          {/each}
        </div>
      </div>
      <div>
        <div class="h-full p-6 md:w-1/3">
          {#each product.options as option}
            <div class="mb-8">
              <div class="mb-4 text-sm uppercase tracking-wide">{option.title}</div>
              <div class="flex">
                {#each option.values as value}
                  <button
                    on:click={() => {
                      selectedOptions = { ...selectedOptions, [option.value]: value };
                      product.id = value.variant_id;
                      
                    }}
                    class={`${value.length <= 3 ? 'w-12' : 'px-6'} ${
                      selectedOptions[option.value] === value ? 'btn-primary' : 'btn-primary-accent'
                    } btn btn-lg mx-1`}
                  >
                    {value.value}
                  </button>
                {/each}
              </div>
            </div>
          {/each}
          <p class="text-sm">{product.description}</p>
          <div class="mt-8 flex items-center justify-between">
            <div class="flex items-center">
              <div class="mr-1">
                <Icons type="star" />
              </div>
              <div class="mr-1">
                <Icons type="star" />
              </div>
              <div class="mr-1">
                <Icons type="star" />
              </div>
              <div class="mr-1">
                <Icons type="star" />
              </div>
              <div class="mr-1 opacity-50">
                <Icons type="star" />
              </div>
            </div>
            <div class="text-sm opacity-50">36 Reviews **make this work</div>
          </div>
          <input
            value={quantity}
            class="input input-primary mt-4"
            type="number"
            on:change={(e) => (quantity = e.target.value)}
          />
          <button
            on:click={() => addToCart(product, quantity)}
            class="bg-light mt-6 flex w-full items-center justify-center p-4 text-sm uppercase tracking-wide text-black opacity-90 hover:opacity-100"
          >
            <span>Add To Cart</span>
            {#if cartLoading}
              <div class="lds-ring ml-4">
                <div />
                <div />
                <div />
                <div />
              </div>
            {/if}
          </button>
          {#if product.metadata}
            {#each Object.entries(product.metadata) as metadata}
              <DescriptionToggle
                title={metadata[0].charAt(0).toUpperCase() + metadata[0].slice(1)}
                description={metadata[1]}
              />
            {/each}
          {/if}
        </div>
      </div>
    </div>
    <div class="px-4 py-8">
      <div class="mb-4 text-3xl font-bold">Related Products</div>
      <ul class="grid grid-flow-row grid-cols-2 gap-4 md:grid-cols-4">
        {#each featuredProducts as product, i (product.id)}
          <li>
            <div
              class="group relative block aspect-square overflow-hidden border border-white/20 bg-zinc-800/50"
            >
              <GridTile
                removeLabels={true}
                imageSrc={product.images[0].url}
                href={`/product/${product.handle}`}
              />
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<style>
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
