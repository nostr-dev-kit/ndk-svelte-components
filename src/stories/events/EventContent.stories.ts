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

const event = await ndk.fetchEvent('nevent1qqsz62c5ll2fh4fmakmgcnhr0amv9da9z3r2yyez3xv5ua2ut9n35hspz9mhxue69uhkummnw3ezuamfdejj7qgwwaehxw309ahx7uewd3hkctcpzamhxue69uhhyetvv9ujumn0wd68ytnzv9hxgtcpz4mhxue69uhhyetvv9ujuerpd46hxtnfduhszymhwden5te0wfjkccte9enrw73wd9hj7dsra6u');
event.relay = undefined;

const withEmbeddedNote = await ndk.fetchEvent('note1zgft83adr408ngycf4hgqay3k3vyethfxc8a9wtq807waf3wwcdsys6wev');
withEmbeddedNote.relay = undefined;

export const Default: Story = {
    args: {
        ndk,
        event
    }
};

export const WithEmbeddedNote: Story = {
    args: {
        ndk,
        event: withEmbeddedNote
    }
};