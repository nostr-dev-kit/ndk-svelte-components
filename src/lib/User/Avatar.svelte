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
            console.error(`error trying to get user`, {opts}, e);
        }
        npub = user?.npub;
    }

    let defaultStyle = 'width:64px; height: 64px; background-color: #ccc;';
</script>

{#await user?.fetchProfile()}
    <img
        alt=""
        title=""
        class="animate-pulse {$$props.class}"
        style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
    />
{:then value}
    <img
        src={user?.profile?.image??"https://placehold.co/400/ccc/ccc/webp"}
        alt=""
        title=""
        class={$$props.class}
        style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
    />
{:catch error}
    <img
        alt={`Error loading avatar for ${npub}`}
        title={`Error loading avatar for ${npub}`}
        class={$$props.class}
        style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
    />
{/await}

<style>
    .animate-pulse {
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
