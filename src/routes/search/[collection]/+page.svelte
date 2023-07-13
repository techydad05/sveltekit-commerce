<script>
  import GridTile from '$components/GridTile.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<svelte:head>
  <title>{data.collection[0].collection.title}</title>
</svelte:head>

<div>
  {#if data.collection}
    <ul class="grid grid-flow-row gap-4 sm:grid-cols-2 md:grid-cols-3">
      {#each data.collection as product, i (i)}
        <li>
          <div class="group relative block aspect-square overflow-hidden bg-dark">
            <GridTile
              href={`/product/${product?.handle}`}
              title={product?.title}
              price={product?.variants[0].prices[0].amount}
              currencyCode={product?.variants[0].prices[0].currency_code}
              imageSrc={product?.thumbnail}
            />
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <div>There are no products in this collection.</div>
  {/if}
</div>
