<script>
    import { collections, getProducts, allProducts } from "$lib/store.js";
    getProducts();
</script>

<div>
    <h1 class="text-2xl p-10">Testies:
        {JSON.stringify($allProducts)}
    </h1>
</div>