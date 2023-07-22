import type { Meta, StoryObj } from '@storybook/svelte';
import NDK, {  NDKList } from '@nostr-dev-kit/ndk';

import Kind30001 from '../../../lib/event/content/Kind30001.svelte';

/**
 * Renders an event's card
 */

const meta = {
    title: 'Event/Kinds/Lists/30001',
    component: Kind30001,
    tags: ['autodocs'],
    argTypes: {
        ndk: {
            control: { type: null },
            type: { name: 'other', value: 'NDK', required: true },
            table: { type: { summary: 'NDK' } },
            description:
                'The NDK instance you want to use. This should be already connected to relays.'
        },
        id: {
            control: { type: null },
            type: { name: 'other', value: 'Event', required: true },
            table: { type: { summary: 'string' } },
            description: 'The event ID you want to render in hex or bech32 format'
        }
    }
} satisfies Meta<Kind30001>;

export default meta;
type Story = StoryObj<typeof meta>;

const ndk = new NDK({ explicitRelayUrls: ['wss://nos.lol'] });
await ndk.connect();

const id = 'naddr1qq9ygctfd3ujq4z0g38syg86np9a0kajstc8u9h846rmy6320wdepdeydfz8w8cv7kh9sqv02gpsgqqqw5csduh0vs';
const list = NDKList.from(await ndk.fetchEvent(id));

export const Default: Story = {
    args: {
        ndk,
        list
    }
};
