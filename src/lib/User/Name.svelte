<script lang="ts">
    import type { NDKUser } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
    import { truncatedNip05 } from '$lib/utils/user';
    import { truncatedBech32 } from '$lib/utils';
    import { createEventDispatcher } from 'svelte';

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

    const _npub = npub || user?.npub;

    // Resets button to look like normal text if no other class or styles are passed in
    const defaultStyle = 'background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;';

    const dispatch = createEventDispatcher();
</script>

<span class="name">
    {#if user}
        {#await user.fetchProfile()}
            <span
                class={$$props.class}
                style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
            >
                [{truncatedBech32(_npub)}]
            </span>
        {:then value}
            <button
                class={$$props.class}
                style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
                tabindex="0"
                on:click|preventDefault|stopPropagation={() => {
                    dispatch('click', user);
                }}
            >
                {user.profile?.displayName ||
                    user.profile?.name ||
                    truncatedNip05(user.profile) ||
                    truncatedBech32(user.npub)}
            </button>
        {:catch error}
            <span
                class={$$props.class}
                style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
            >
                [{truncatedBech32(_npub)}]
            </span>
        {/await}
    {/if}
</span>
