<script lang="ts">
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
    import { prettifyNip05 } from '$lib/utils/user';
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

    /**
     * The user profile to display an avatar for
     */
    export let userProfile: NDKUserProfile | undefined = undefined;

    /**
     * Optionally specify the maximum length of the npub to display if a name is not available
     */
    export let npubMaxLength: number | undefined = undefined;

    if (!user) {
        let opts = npub ? { npub } : { hexpubkey: pubkey };
        user = ndk.getUser(opts);
        npub = user.npub;
    }

    const _npub = npub || user?.npub;
    const truncatedNpub = npubMaxLength ? truncatedBech32(_npub, npubMaxLength) : _npub;

    function chooseNameFromDisplay(profile?: NDKUserProfile) {
        return (
            profile?.displayName ||
            profile?.name ||
            (profile?.nip05 && prettifyNip05(profile.nip05)) ||
            truncatedNpub
        )
    }
</script>

<span class="name {$$props.class}" style={$$props.style}>
    {#if userProfile}
        {chooseNameFromDisplay(userProfile)}
    {:else if user}
        {#await user.fetchProfile()}
            {chooseNameFromDisplay()}
        {:then value}
            {chooseNameFromDisplay(user.profile)}
        {:catch error}
            <span
                class="name--error {$$props.class}"
                data-error={error}
            >
                {truncatedNpub}
            </span>
        {/await}
    {/if}
</span>
