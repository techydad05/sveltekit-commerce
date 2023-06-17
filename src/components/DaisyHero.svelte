<script>
  // this is what will end up being components that are reusable and dynamic
  export let figure = null;
  export let figureReverse = null;
  export let form = null;
  export let featured = null;
  export let product = null;
  console.log(product)
</script>

<div>
  <!-- <div class="flex w-full h-screen bg-blue-400 justify-center items-center">
    <div class="w-[100px] h-[100px] bg-yellow-300 rounded-[100%]"></div>
  </div> -->
  {#if product}
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content flex-col lg:flex-row">
        <img
          src={product.thumbnail ? product.thumbnail : "https://picsum.photos/500/650"}
          class="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 class="text-5xl font-bold">{product.title}</h1>
          <p class="py-6">
            {product.description}
          </p>
          <button class="btn btn-primary"><a href="/">Get Started</a></button>
        </div>
      </div>
    </div>
  {:else}
    <div class="hero bg-base-200 min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Hello there</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  {/if}
  <slot/>
</div>

