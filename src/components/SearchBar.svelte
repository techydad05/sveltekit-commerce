<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import Icons from './Icons.svelte';

  let value = $page.url.searchParams.get('q');

  async function submit(e) {
    let query = new URLSearchParams();
    if (value) {
      query.set('q', value);
    }
    await goto(`/search${query ? `?${query}` : ''}`, { keepFocus: true });
  }
</script>

<form on:submit|preventDefault={submit} class="relative flex items-center">
  <div class="form-control w-full">
    <label class="input-group">
      <span><Icons type="search" /></span>
      <input
        id="searchInput"
        type="text"
        bind:value
        placeholder="Search for products..."
        autocomplete="off"
        class="input w-full input-bordered text-primary placeholder-secondary"
      />
    </label>
  </div>
</form>

