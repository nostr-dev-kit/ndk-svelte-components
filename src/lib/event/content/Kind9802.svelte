<script lang="ts">
    import Kind1 from './Kind1.svelte';
    import type { NDKEvent } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
    // import NoteContentLink from "src/app/shared/NoteContentLink.svelte"

    export let ndk: NDK;
    export let event: NDKEvent;
    export let anchorId, maxLength, showEntire;
    export const showMedia = undefined; // Unused so far

    // const ref = event?.tagValue("r");
</script>

<div class="flex flex-col gap-2 overflow-hidden text-ellipsis">
    <div class="border-l-2 border-solid border-gray-5 pl-4">
        <Kind1 {ndk} {event} {anchorId} {maxLength} {showEntire} />
    </div>
</div>

<!-- {#if ref}
        {ref}
        <NoteContentLink {showMedia} value={{url: ref, isMedia: urlIsMedia(ref)}} />
{/if} -->
