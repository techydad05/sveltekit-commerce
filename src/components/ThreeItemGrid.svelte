<script>
  import GridTile from '$components/GridTile.svelte';
  export let products;
</script>

<div class="flex flex-col lg:h-full lg:flex-row">
  <div class="bg-dark h-[60vh] w-full lg:h-full lg:w-2/3">
      <GridTile
      priority="eager"
      href={`/product/${products[0].handle}`}
      title={products[0].title}
      currencyCode={products[0].variants[0].prices[products[0].variants[0].prices.length -1].currency_code}
      price={(products[0].variants[0].prices[products[0].variants[0].prices.length -1].amount/100).toFixed(2)}
      imageSrc={products[0].images[0].url}
    />
  </div>
  <div class="w-full lg:h-full lg:w-1/3">
    <div class="bg-light h-[60vh] w-full lg:h-1/2">
      <GridTile
      priority="eager"
      href={`/product/${products[1].handle}`}
      title={products[1].title}
      currencyCode={products[1].variants[0].prices[products[1].variants[0].prices.length -1].currency_code}
      price={(products[1].variants[0].prices[products[1].variants[0].prices.length -1].amount/100).toFixed(2)}
      imageSrc={products[1].images[0].url}
    />
  </div>
  <div class="bg-svelteOrange h-[60vh] w-full lg:h-1/2">
    <GridTile
    priority="eager"
    href={`/product/${products[2].handle}`}
    title={products[2].title}
    currencyCode={products[2].variants[0].prices[products[2].variants[0].prices.length -1].currency_code}
    price={(products[2].variants[0].prices[products[2].variants[0].prices.length -1].amount/100).toFixed(2)}
    imageSrc={products[2].images[0].url}
  />
    </div>
  </div>
</div>
