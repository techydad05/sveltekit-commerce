<script>
  export let items;
</script>

<div class="slider relative w-full overflow-scroll bg-light">
  <div class="slide-track flex">
    {#each items as item (item.id)}
      <a
        data-sveltekit-prefetch
        href={`/product/${item.handle}`}
        class="slide relative h-[40vh] flex-none md:w-1/3"
      >
        <img
          alt={item.title}
          class="h-full"
          decoding="async"
          loading="lazy"
          src={item.images[0].url}
        />
        <div class="absolute top-0 left-0 z-40 mt-32 ml-44 bg-black p-4">{item.title}</div>
      </a>
    {/each}
  </div>
</div>

<style>
  @-webkit-keyframes scroll {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
      transform: translateX(calc(-250px * 7));
    }
  }

  @keyframes scroll {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(calc(-250px * 7));
      transform: translateX(calc(-250px * 7));
    }
  }

  .slider::after {
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }

  .slider .slide-track {
    -webkit-animation: scroll 40s linear infinite;
    animation: scroll 40s linear infinite;
  }
</style>
