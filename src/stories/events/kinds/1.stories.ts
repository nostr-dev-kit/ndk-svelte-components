import type { Meta, StoryObj } from '@storybook/svelte';
import NDK from '@nostr-dev-kit/ndk';

import Kind1Component from '../../../lib/event/content/Kind1.svelte';

/**
 * Renders a Kind 1 event content
 */

const meta = {
    title: 'Event/Kinds/Kind 1',
    component: Kind1Component,
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
            type: { name: 'other', value: 'NDKEvent', required: true },
            table: { type: { summary: 'NDKEvent' } },
            description: 'The event you want to render'
        }
    }
} satisfies Meta<Kind1Component>;

export default meta;
type Story = StoryObj<typeof meta>;

const ndk = new NDK({ explicitRelayUrls: ['wss://nos.lol'] });
await ndk.connect();

const id = 'note194n247lecqgcskk5rmmfgrapt4jx7ppq64xec0eca3s4ta3hwkrsex7pxa';
const event = await ndk.fetchEvent(id);

event.relay = undefined;

export const Kind1: Story = {
    args: {
        ndk,
        event
    }
};
