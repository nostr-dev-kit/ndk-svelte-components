<script lang="ts">
    import type { NDKArticle } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
    import { cleanMarkdown } from '$lib/utils/markdown';

    export let ndk: NDK;
    export let article: NDKArticle;
    export let maxLength: number;
    export let showEntire: boolean = false;
    export let showMedia: boolean = true;
</script>

<div class="article">
    <h1 class="article-title">{article.title}</h1>
    <div class="article-content">
        {#await cleanMarkdown(article.content)}
            <span>Loading article...</span>
        {:then value}
            {@html value}
        {:catch error}
            <span>Error loading article: {error}</span>
        {/await}
    </div>
</div>

<style lang="postcss">
    * > :global(.article-content p) {
    }

    * > :global(.article-content img) {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
</style>
