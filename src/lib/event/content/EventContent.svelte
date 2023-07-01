<script lang="ts">
    import type { NDKEvent } from "@nostr-dev-kit/ndk";
    import Kind1 from "./Kind1.svelte"
    // import Kind40 from "./Kind40.svelte"
    // import Kind1985 from "./Kind1985.svelte"
    import Kind9802 from "./Kind9802.svelte"
    // import Kind1063 from "./Kind1063.svelte"
    // import Kind30023 from "./Kind30023.svelte"
    // import user from "src/agent/user"
    import type NDK from "@nostr-dev-kit/ndk";

    export let ndk: NDK;
    export let event: NDKEvent;
    export let anchorId: string | null = null
    export let maxLength = 700
    export let showEntire = true
    export let showMedia = true;
</script>

<!-- {#if event.kind === 40}
<Kind40 {event} />
{:else if event.kind === 1985}
<Kind1985 {event} {anchorId} {maxLength} {showEntire} />-->
{#if false}
    {true}
{:else if event.kind === 9802}
    <Kind9802 {ndk} {event} {anchorId} {maxLength} {showEntire} {showMedia} />
<!--{:else if event.kind === 1063}
<Kind1063 {event} {showMedia} />
{:else if event.kind === 30023}
<Kind30023 {event} {showEntire} {showMedia} />-->
{:else}
    <Kind1 {ndk} {event} {anchorId} {maxLength} {showEntire} {showMedia} on:click />
{/if}
