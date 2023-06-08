import type { Meta, StoryObj } from '@storybook/svelte';
import NDK from '@nostr-dev-kit/ndk';

import Avatar from '../lib/user/Avatar.svelte';

const meta = {
	title: 'User/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	argTypes: {
		ndk: {
			control: 'object'
		},
		npub: {
			control: 'text',
		},
		pubkey: {
			control: 'text',
		},
		user: {
			type: { name: 'NDKUser', required: false },
			description: 'The NDKUser object. Only one of `npub`, `pubkey`, or `user` is required.',
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large']
		}
	}
} satisfies Meta<Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const ndk = new NDK({ explicitRelayUrls: ['wss://purplepag.es'] });
ndk.connect();

export const Small: Story = {
	args: {
		ndk: ndk,
		npub: 'npub1zuuajd7u3sx8xu92yav9jwxpr839cs0kc3q6t56vd5u9q033xmhsk6c2uc',
		size: 'small'
	}
};

export const Medium: Story = {
	args: {
		ndk: ndk,
		npub: 'npub1zuuajd7u3sx8xu92yav9jwxpr839cs0kc3q6t56vd5u9q033xmhsk6c2uc',
		size: 'medium'
	}
};

export const Large: Story = {
	args: {
		ndk: ndk,
		npub: 'npub1zuuajd7u3sx8xu92yav9jwxpr839cs0kc3q6t56vd5u9q033xmhsk6c2uc',
		size: 'large'
	}
};
