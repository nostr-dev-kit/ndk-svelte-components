<script lang="ts">
    import type { NDKEvent, NDKTag } from '@nostr-dev-kit/ndk';
    import { humanFileSize } from '$lib/utils/event';

    export let event: NDKEvent;
    export let showMedia: boolean;

    const SUPPORTED_IMAGE_TYPES = [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/webp',
        'image/gif'
    ];

    const file: string = event.getMatchingTags('url')[0][1];
    const mimeType: string = event.getMatchingTags('m')[0][1];
    const sizeTags: NDKTag[] = event.getMatchingTags('size');
    const size: string = sizeTags ? humanFileSize(parseInt(sizeTags[0][1])) : '';
    const dimTags: NDKTag[] = event.getMatchingTags('dim');
    const dim: string = dimTags ? dimTags[0][1] : '';
</script>

<div class="kind1063--content">
    <h3>File metadata</h3>
    <div>{event.content}</div>
    {#if showMedia && SUPPORTED_IMAGE_TYPES.includes(mimeType)}
        <div class="kind1063--filePreview">
            <img src={file} alt={event.content} />
        </div>
    {/if}
    <div>File URL: <a href={file} target="_blank">{file}</a></div>
    <div>MIME type: {mimeType}</div>
    <div>File size: {size}</div>
    <div>Dimensions: {dim}</div>
</div>

<style lang="postcss">
    .kind1063--content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .kind1063--filePreview {
        width: 100%;
    }
    .kind1063--filePreview img {
        max-width: 60%;
        max-height: 60%;
    }
</style>
