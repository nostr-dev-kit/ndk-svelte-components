<script lang="ts">
    import type { NDKUser } from "@nostr-dev-kit/ndk";
    import type NDK from "@nostr-dev-kit/ndk";
    import { truncatedNpub, copyToClipboard } from "$lib/utils";
    import { Copy, Check } from "lucide-svelte";
    import { fade } from "svelte/transition";

    /**
     * The NDK instance you want to use
     */
    export let ndk: NDK;

    /**
     * The npub of the user you want to display an avatar for
     */
    export let npub: string | undefined = undefined;

    /**
     * The hexpubkey of the user you want to display an avatar for
     */
    export let pubkey: string | undefined = undefined;

    /**
     * The user object of the user you want to display an avatar for
     */
    export let user: NDKUser | undefined = undefined;

    if (!user) {
        let opts = npub ? { npub } : { hexpubkey: pubkey };
        user = ndk.getUser(opts);
        npub = user.npub;
    }

    let checkVisible = false;

    function copyNpub() {
        copyToClipboard(npub);
        showCheck();
    }

    function showCheck() {
        checkVisible = true;
        setTimeout(() => {
            checkVisible = false;
        }, 1000);
    }
</script>

<span class="name">
    {#if user && user.npub}
        <span class="npub {$$props.class}" style={$$props.style}>
            {truncatedNpub(user)}
            <button on:click|preventDefault={copyNpub} class="npub--copyButton">
                <Copy size="16" />
            </button>
            {#if checkVisible}
                <span in:fade={{ duration: 100 }} out:fade>
                    <Check size="16" />
                </span>
            {/if}
        </span>
    {:else}
        <span class="npub--error {$$props.class}" style={$$props.style}> Error loading user </span>
    {/if}
</span>

<style lang="postcss">
    .npub {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }

    .npub--copyButton {
        border: none;
        padding: 0.25rem;
        background-color: var(--color-bg);
        cursor: pointer;
    }
</style>
