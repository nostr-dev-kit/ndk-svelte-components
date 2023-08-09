import type { Meta, StoryObj } from "@storybook/svelte";
import NDK from "@nostr-dev-kit/ndk";

import RelayList from "../../lib/relay/RelayList.svelte";

const meta = {
    title: "Relay/RelayList",
    component: RelayList,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Displays a list of relays the NDK instance is connected to, along with information about active subscriptions and connectivity stats.",
            },
        },
    },
} satisfies Meta<RelayList>;

export default meta;

type Story = StoryObj<typeof meta>;

const ndk = new NDK({
    explicitRelayUrls: [
        "wss://relay.f7z.io",
        "wss://nos.lol",
        "wss://relay.damus.io",
        "wss://relay.snort.social",
    ],
});
ndk.connect();

ndk.subscribe({ limit: 10 }, { closeOnEose: false });

export const Default: Story = {
    args: {
        ndk: ndk,
    },
};
