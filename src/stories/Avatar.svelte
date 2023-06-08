<script lang="ts">
	import NDK from '@nostr-dev-kit/ndk';

	/**
	 * How large should the button be?
	 */
	export let ndk: NDK;

	/**
	 * How large should the button be?
	 */
	export let size: 'small' | 'medium' | 'large' = 'large';

	/**
	 * The npub of the user you want to display an avatar for?
	 */
	export let userNpub: string;

	const user = ndk.getUser({ npub: userNpub });

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
	<img src={user.profile?.image} alt={`Avatar for ${userNpub}`} style={styles} />
{/await}
