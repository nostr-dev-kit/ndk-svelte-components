<script lang="ts">
    import type { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
    import type NDK from "@nostr-dev-kit/ndk";
    import { truncatedNip05 } from "$lib/utils/user";
    import { truncatedBech32 } from "$lib/utils";
    import { createEventDispatcher } from "svelte";

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
     * An NDKUserProfile object for the user you want to display a name for
     */
    export let userProfile: NDKUserProfile | undefined = undefined;

    if (!userProfile && !user) {
        let opts = npub ? { npub } : { hexpubkey: pubkey };
        try {
            user = ndk.getUser(opts);
            npub = user.npub;
        } catch (e) {
            console.error(`error trying to get user`, { opts }, e);
        }
    }

    const fetchProfilePromise = new Promise<NDKUserProfile>((resolve, reject) => {
        if (userProfile) {
            resolve(userProfile);
        } else if (user) {
            user.fetchProfile()
                .then(() => {
                    userProfile = user!.profile;
                    resolve(userProfile!);
                })
                .catch(reject);
        } else {
            reject(`no user`);
        }
    });

    const dispatch = createEventDispatcher();
</script>

<span class="name">
    {#await fetchProfilePromise}
        <span class="name--loading {$$props.class}" style={$$props.style}>
            [{truncatedBech32(npub)}]
        </span>
    {:then userProfile}
        <button
            class="name--button {$$props.class}"
            style={$$props.style}
            tabindex="0"
            on:click|preventDefault|stopPropagation={() => {
                dispatch("click", user || userProfile);
            }}
        >
            {userProfile.displayName ||
                userProfile.name ||
                truncatedNip05(userProfile) ||
                truncatedBech32(npub)}
        </button>
    {:catch error}
        <span class="name--error {$$props.class}" style={$$props.style}>
            [{truncatedBech32(npub)}]
        </span>
    {/await}
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
