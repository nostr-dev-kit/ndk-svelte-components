<script lang="ts">
    import type { NDKUser } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';

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
        try {
            user = ndk.getUser(opts);
        } catch (e) {
            console.error(`error trying to get user`, { opts }, e);
        }
        npub = user?.npub;
    }
</script>

{#await user?.fetchProfile()}
    <img
        alt="Loading avatar for {npub}"
        class="avatar avatar--loading {$$props.class}"
        style={$$props.style}
    />
{:then value}
    <img
        src={user?.profile?.image ?? 'https://placehold.co/400/ccc/ccc/webp'}
        alt="Avatar for {npub}"
        class="avatar avatar--image {$$props.class}"
        style={$$props.style}
    />
{:catch error}
    <img
        alt="Error loading avatar for {npub}"
        class="avatar avatar--error {$$props.class}"
        style={$$props.style}
    />
{/await}

<style lang="postcss">
    .avatar--loading {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
</style>
