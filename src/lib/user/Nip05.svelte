<script lang="ts">
    import type { NDKUser } from "@nostr-dev-kit/ndk";
    import type NDK from "@nostr-dev-kit/ndk";
    import { truncatedNip05 } from "$lib/utils/user";

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

<span class="name">
    {#if user}
        {#await user.fetchProfile()}
            <span class="nip05--loading {$$props.class}" style={$$props.style}>
                Loading NIP-05
            </span>
        {:then value}
            <span class="nip05 {$$props.class}" style={$$props.style}>
                {truncatedNip05(user.profile)}
            </span>
        {:catch error}
            <span class="nip05--error {$$props.class}" style={$$props.style}>
                Error loading user profile
            </span>
        {/await}
    {/if}
</span>
