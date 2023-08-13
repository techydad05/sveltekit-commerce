<script>
    export let data;
    console.log(data)
	// /** @type {number} */
	// let number;
	// async function medusa() {
	// 	const response = await fetch('/medusa', {testies: 'testies'});
	// 	number = await response.json();
	// }
</script>

<!-- <button on:click={medusa}>Roll the dice</button>

{#if number !== undefined}
	<p>You rolled a {number}</p>
{/if} -->
{JSON.stringify(data)}