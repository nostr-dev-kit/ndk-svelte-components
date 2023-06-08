import type { Meta, StoryObj } from '@storybook/svelte';
import NDK from '@nostr-dev-kit/ndk';

import RelayList from '../lib/relay/RelayList.svelte';

const meta = {
	title: 'Relays/RelayList',
	component: RelayList,
	tags: ['autodocs'],
	argTypes: {
		ndk: {
			control: 'object'
		},
	},
	parameters: {
		docs: {
			description: {
				component: 'Displays a list of relays the NDK instance is connected to, along with information about active subscriptions and connectivity stats.'
			},
			},
	},
} satisfies Meta<RelayList>;

export default meta;
type Story = StoryObj<typeof meta>;

const ndk = new NDK({
    explicitRelayUrls: [
        'wss://relay.f7z.io',
        'wss://nos.lol',
        'wss://relay.damus.io',
        'wss://relay.snort.social',
    ]
});
ndk.connect();

ndk.subscribe({ limit: 10 }, { closeOnEose: false })

export const Small: Story = {
	args: {
		ndk: ndk,
		npub: 'npub1zuuajd7u3sx8xu92yav9jwxpr839cs0kc3q6t56vd5u9q033xmhsk6c2uc',
		size: 'small'
	},
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
