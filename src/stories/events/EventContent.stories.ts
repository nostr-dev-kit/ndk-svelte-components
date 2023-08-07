import type { Meta, StoryObj } from '@storybook/svelte';
import NDK from '@nostr-dev-kit/ndk';

import EventContent from '../../lib/event/content/EventContent.svelte';
/**
 * Renders an event's content
 */

const meta: Meta<typeof EventContent> = {
    title: 'Event/EventContent',
    component: EventContent,
    tags: ['autodocs'],
    argTypes: {
        ndk: {
            control: { type: null },
            type: { name: 'other', value: 'NDK', required: true },
            table: { type: { summary: 'NDK' } },
            description:
                'The NDK instance you want to use. This should be already connected to relays.'
        },
        event: {
            control: { type: null },
            type: { name: 'other', value: 'Event', required: true },
            table: { type: { summary: 'NDKEvent' } },
            description: 'The event you want to render.'
        }
    }
} satisfies Meta<EventContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const ndk = new NDK({ explicitRelayUrls: ['wss://nos.lol'] });
await ndk.connect();

const event = await ndk.fetchEvent(
    'note194n247lecqgcskk5rmmfgrapt4jx7ppq64xec0eca3s4ta3hwkrsex7pxa'
);
event.relay = undefined;

const withEmbeddedNote = await ndk.fetchEvent(
    'nevent1qqsrjpqwtmwy2aw0t745d6vdj6k267wjv5xjklek7ucr2pv65p2ydgspz9mhxue69uhkummnw3ezuamfdejj7qmsa3q'
);
withEmbeddedNote.relay = undefined;

export const Kind1Event: Story = {
    args: {
        ndk,
        event
    }
};

export const Kind1EventWithEmbeddedNote: Story = {
    args: {
        ndk,
        event: withEmbeddedNote
    }
};