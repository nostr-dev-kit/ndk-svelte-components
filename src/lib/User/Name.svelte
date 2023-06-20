<script lang="ts">
    import type { NDKUser } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
    import { truncatedNip05 } from '$lib/utils/user';
    import { truncatedBech32 } from '$lib/utils';

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
</script>

{#if user}
    {#await user.fetchProfile()}
        <span class={$$props.class} style={$$props.style}>«{truncatedBech32(_npub)}»</span>
    {:then value}
        <span class={$$props.class} style={$$props.style}>
            {user.profile?.displayName ||
                user.profile?.name ||
                truncatedNip05(user.profile) ||
                truncatedBech32(user.npub)}
        </span>
    {:catch error}
        <span class={$$props.class} style={$$props.style}>Error loading name</span>
    {/await}
{/if}
