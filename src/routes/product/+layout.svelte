<script>
  import { page } from '$app/stores';
  console.log($page);
</script>

<div class="text-primary breadcrumbs ml-2 text-md">
  <ul>
    <li>
      <a href="/">
        <i class="fa-solid fa-house mr-2" /> Home
      </a>
    </li>
    <li>
      <a href="/search">
        <i class="fa-solid fa-store mr-2" /> Products
      </a>
    </li>
    <li>
      <i class="fa-solid fa-at mr-2" /> {$page.params.handle.charAt(0).toUpperCase() + $page.params.handle.slice(1)}
    </li>
  </ul>
</div>
<slot />
