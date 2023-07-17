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

    const dispatch = createEventDispatcher();
</script>

<span class="name">
    {#if user}
        {#await user.fetchProfile()}
            <span class={$$props.class} style={$$props.style}>[{truncatedBech32(_npub)}]</span>
        {:then value}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
                class={$$props.class}
                style={$$props.style}
                on:click|preventDefault|stopPropagation={() => {
                    dispatch('click', user);
                }}
            >
                {user.profile?.displayName ||
                    user.profile?.name ||
                    truncatedNip05(user.profile) ||
                    truncatedBech32(user.npub)}
            </a>
        {:catch error}
            <span class={$$props.class} style={$$props.style}>[{truncatedBech32(_npub)}]</span>
        {/await}
    {/if}
</span>
