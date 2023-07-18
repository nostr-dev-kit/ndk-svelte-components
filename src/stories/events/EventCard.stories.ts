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

const id = 'note194n247lecqgcskk5rmmfgrapt4jx7ppq64xec0eca3s4ta3hwkrsex7pxa';

const kind1063Image = 'nevent1qqs2vrx4ffqyq42yge95v3rfyr5gqr9z3pqpe7j7dymlk4lv3pwse6qfcjqkn';
const kind1063Video = 'nevent1qqs0qklqj3uwdjr7cuj8qf266fyw6vwf52gd0vlrqqplxn8krvz2j6ghkkw5n';

export const Default: Story = {
    args: {
        ndk,
        id
    }
};

export const Kind1063WithImage: Story = {
    args: {
        ndk,
        id: kind1063Image
    }
};

export const Kind1063WithVideo: Story = {
    args: {
        ndk,
        id: kind1063Video
    }
};
