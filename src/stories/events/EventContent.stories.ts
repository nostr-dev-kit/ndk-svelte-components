import type { Meta, StoryObj } from '@storybook/svelte';
import NDK from '@nostr-dev-kit/ndk';

import EventContent from '../../lib/event/content/EventContent.svelte';

/**
 * Renders an event's content
 */

const meta = {
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

const event = await ndk.fetchEvent('note1zgft83adr408ngycf4hgqay3k3vyethfxc8a9wtq807waf3wwcdsys6wev');

event.relay = undefined;

export const Default: Story = {
    args: {
        ndk,
        event
    }
};
