<script lang="ts">
<<<<<<< HEAD
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
    import { truncatedNip05 } from '$lib/utils/user';
    import { truncatedBech32 } from '$lib/utils';
    import { createEventDispatcher } from 'svelte';
=======
    import type { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
    import type NDK from "@nostr-dev-kit/ndk";
    import { truncatedNip05 } from "$lib/utils/user";
    import { truncatedBech32 } from "$lib/utils";
    import { createEventDispatcher } from "svelte";
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)

    /**
     * The NDK instance you want to use
     */
    export let ndk: NDK;

    /**
     * The npub of the user you want to display a name for
     */
    export let npub: string | undefined = undefined;

    /**
     * The hexpubkey of the user you want to display a name for
     */
    export let pubkey: string | undefined = undefined;

    /**
     * The user object of the user you want to display a name for
     */
    export let user: NDKUser | undefined = undefined;

    /**
<<<<<<< HEAD
     * The user profile to display an avatar for
=======
     * An NDKUserProfile object for the user you want to display a name for
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)
     */
    export let userProfile: NDKUserProfile | undefined = undefined;

    if (!user) {
        let opts = npub ? { npub } : { hexpubkey: pubkey };
        try {
            user = ndk.getUser(opts);
        } catch (e) {
            console.error(`error trying to get user`, { opts }, e);
        }
    }

    const dispatch = createEventDispatcher();
</script>

<span class="name">
<<<<<<< HEAD
    {#if userProfile}
=======
    {#if userProfile && user}
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)
        <button
            class="name--button {$$props.class}"
            style={$$props.style}
            tabindex="0"
            on:click|preventDefault|stopPropagation={() => {
<<<<<<< HEAD
                dispatch('click', user);
=======
                dispatch("click", user);
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)
            }}
        >
            {userProfile.displayName ||
                userProfile.name ||
                truncatedNip05(userProfile) ||
<<<<<<< HEAD
                truncatedBech32(_npub)}
=======
                truncatedBech32(user.npub)}
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)
        </button>
    {:else if user}
        {#await user.fetchProfile()}
            <span class="name--loading {$$props.class}" style={$$props.style}>
                [{truncatedBech32(user.npub)}]
            </span>
        {:then value}
            <button
                class="name--button {$$props.class}"
                style={$$props.style}
                tabindex="0"
                on:click|preventDefault|stopPropagation={() => {
                    dispatch("click", user);
                }}
            >
                {user.profile?.displayName ||
                    user.profile?.name ||
                    truncatedNip05(user.profile) ||
                    truncatedBech32(user.npub)}
            </button>
        {:catch error}
            <span class="name--error {$$props.class}" style={$$props.style}>
                [{truncatedBech32(user.npub)}]
            </span>
        {/await}
    {/if}
</span>

<style lang="postcss">
    .name--button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    }
</style>
