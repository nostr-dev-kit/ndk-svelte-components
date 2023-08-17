<script lang="ts">
<<<<<<< HEAD
    import type { NDKUser, NDKUserProfile } from '@nostr-dev-kit/ndk';
    import type NDK from '@nostr-dev-kit/ndk';
=======
    import type { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
    import type NDK from "@nostr-dev-kit/ndk";
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)

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
<<<<<<< HEAD
     * The user profile to display an avatar for
     */
    export let userProfile: NDKUserProfile | undefined = undefined;

    if (!user) {
=======
     * An NDKUserProfile object for the user you want to display an avatar for
     */
    export let userProfile: NDKUserProfile | undefined = undefined;

    if (!userProfile && !user) {
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)
        let opts = npub ? { npub } : { hexpubkey: pubkey };
        try {
            user = ndk.getUser(opts);
        } catch (e) {
            console.error(`error trying to get user`, { opts }, e);
        }
    }

    const fetchProfilePromise = new Promise<NDKUserProfile>((resolve, reject) => {
        if (userProfile) {
            resolve(userProfile);
        } else if (user) {
            user.fetchProfile().then(() => {
                userProfile = user!.profile;
                resolve(userProfile);
            }).catch(reject);
        } else {
            reject(`no user`);
        }
    });
</script>

<<<<<<< HEAD
{#await fetchProfilePromise}
    <img
        alt=""
        class="avatar avatar--loading {$$props.class}"
        style={$$props.style}
    />
{:then userProfile}
    <img
        src={userProfile?.image??"https://placehold.co/400/ccc/ccc/webp"}
=======
{#if userProfile}
    <img
        src={userProfile.image ?? "https://placehold.co/400/ccc/ccc/webp"}
>>>>>>> 1c96436 (Update to pass userProfile data where possible.)
        alt=""
        class="avatar avatar--image {$$props.class}"
        style={$$props.style}
    />
{:else}
    {#await user?.fetchProfile()}
        <img alt="" class="avatar avatar--loading {$$props.class}" style={$$props.style} />
    {:then value}
        <img
            src={user?.profile?.image ?? "https://placehold.co/400/ccc/ccc/webp"}
            alt=""
            class="avatar avatar--image {$$props.class}"
            style={$$props.style}
        />
    {:catch error}
        <img alt="" class="avatar avatar--error {$$props.class}" style={$$props.style} />
    {/await}
{/if}

<style lang="postcss">
    .avatar {
        background-color: #ccc;
    }

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
