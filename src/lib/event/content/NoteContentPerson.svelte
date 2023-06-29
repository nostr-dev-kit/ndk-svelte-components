<script lang="ts">
    import Name from "$lib/user/Name.svelte";
    import type NDK from "@nostr-dev-kit/ndk";

    export let ndk: NDK;
    export let value: { pubkey: string };
</script>

<Name {ndk} pubkey={value.pubkey} />