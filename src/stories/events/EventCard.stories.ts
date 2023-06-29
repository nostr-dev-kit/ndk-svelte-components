import type { Meta, StoryObj } from '@storybook/svelte';
import NDK from '@nostr-dev-kit/ndk';

import EventCard from '../../lib/event/EventCard.svelte';

/**
 * Renders an event's card
 */

const meta = {
    title: 'Event/EventCard',
    component: EventCard,
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
} satisfies Meta<EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const ndk = new NDK({ explicitRelayUrls: ['wss://nos.lol'] });
await ndk.connect();

const id = 'note1zgft83adr408ngycf4hgqay3k3vyethfxc8a9wtq807waf3wwcdsys6wev';

export const Default: Story = {
    args: {
        ndk,
        id
    }
};
