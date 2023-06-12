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
        user = ndk.getUser(opts);
    }

    let defaultStyle = 'width:64px; height: 64px; background-color: #ccc;';
</script>

{#await user?.fetchProfile()}
    <img
        src="https://placehold.co/400/ccc/ccc/webp"
        alt={`Loading avatar for ${npub}`}
        title={`Loading avatar for ${npub}`}
        class={$$props.class}
        style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
    />
{:then value}
    <img
        src={user?.profile?.image}
        alt={`Avatar for ${npub}`}
        title={`Avatar for ${npub}`}
        class={$$props.class}
        style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
    />
{:catch error}
    <img
        src="https://placehold.co/400/faa/faa/webp"
        alt={`Error loading avatar for ${npub}`}
        title={`Error loading avatar for ${npub}`}
        class={$$props.class}
        style={!$$props.class && !$$props.style ? defaultStyle : $$props.style}
    />
{/await}
