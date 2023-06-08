<script>
	import ndk from "$lib/stores/ndk";
	import RelayList from "$lib/svelte/RelayList.svelte";

	let filter = "";

	$ndk.subscribe({ kinds: [1], authors: ["fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52"] });
</script>

<RelayList ndk={$ndk} />

<div>
	<button on:click={() => $ndk.connect()}>Connect</button>
</div>

<div>
	<textarea bind:value={filter} />
	<button on:click={() => $ndk.subscribe(JSON.parse(filter))}>Send</button>
</div>