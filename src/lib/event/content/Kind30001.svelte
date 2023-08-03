<script lang="ts">
    import type { NDKList } from "@nostr-dev-kit/ndk";

    export let list: NDKList;
</script>

{#each list.items as tag (tag[1])}
    {tag[1]}
{/each}