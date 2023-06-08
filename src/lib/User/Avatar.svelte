<script lang="ts">
	import type { NDKUser } from '@nostr-dev-kit/ndk';
	import type NDK from '@nostr-dev-kit/ndk';

	/**
	 * The NDK instance you want to use
	 */
	export let ndk: NDK;

	/**
	 * How large should the button be?
	 */
	export let size: 'small' | 'medium' | 'large' = 'large';

	/**
	 * The npub of the user you want to display an avatar for
	 */
	export let npub: string | undefined;

	/**
	 * The hexpubkey of the user you want to display an avatar for
	 */
	export let pubkey: string | undefined;

	/**
	 * The user object of the user you want to display an avatar for
	 */
	export let user: NDKUser;

	if (!user) {
		let opts = npub ? { npub } : { hexpubkey: pubkey };

		user = ndk.getUser(opts);
	}

	let styles: string;
	switch (size) {
		case 'small':
			styles = 'width: 24px; height: 24px; border-radius: 9999px;';
			break;
		case 'medium':
			styles = 'width: 36px; height: 36px; border-radius: 9999px;';
			break;
		case 'large':
			styles = 'width: 60px; height: 60px; border-radius: 9999px;';
			break;
		default:
			break;
	}
</script>

{#await user.fetchProfile() then eventSet}
	<img src={user.profile?.image} alt={`Avatar for ${npub}`} style={styles} />
{/await}
