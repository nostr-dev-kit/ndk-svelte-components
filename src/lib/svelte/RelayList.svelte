<script lang="ts">
	import type { NDKRelay } from '@nostr-dev-kit/ndk';
	import type NDK from '@nostr-dev-kit/ndk';
	import { NDKRelayStatus } from '@nostr-dev-kit/ndk';
	import { onMount } from 'svelte';
	import RelayName from './relays/RelayName.svelte';

	export let ndk: NDK;

	let relays: NDKRelay[] = [];

	onMount(() => {
		update();
		ndk.pool.on('connect', () => { update() })
		ndk.pool.on('relay:connect', () => { update() })
		ndk.pool.on('disconnect', () => { update() })
	})

	function update() {
		// get the values from the map in ndk.pool
		relays = Array.from(ndk.pool.relays.values())
	}

	let expandSubscriptionList: Record<string, boolean> = {};

	function toggleSubList(relay: NDKRelay) {
		expandSubscriptionList[relay.url] = !expandSubscriptionList[relay.url]
		expandSubscriptionList = expandSubscriptionList;
	}
</script>

<ul>
	{#each relays as relay}
		<li>
			{#if relay.status === NDKRelayStatus.CONNECTING}
				<span class="relay-status relay-status--connecting"></span>
			{:else if relay.status === NDKRelayStatus.DISCONNECTED}
				<span class="relay-status relay-status--disconnected"></span>
			{:else if relay.status === NDKRelayStatus.CONNECTED}
				<span class="relay-status relay-status--connected"></span>
			{:else if relay.status === NDKRelayStatus.FLAPPING}
				<span class="relay-status relay-status--flapping"></span>
			{/if}
			<span class="relay-name"><RelayName {relay} /></span>
			{#if relay.activeSubscriptions.size > 0}
				<button
					class="relay-subscriptions"
					on:click={() => { toggleSubList(relay) }}
				>
					{relay.activeSubscriptions.size} subscriptions
				</button>

				{#if expandSubscriptionList[relay.url]}
					<ul>
						{#each Array.from(relay.activeSubscriptions) as subscription}
							<li>
								<div class="relay-subscription-filter">{JSON.stringify(subscription.filter)}</div>
								<span class="relay-subscription--event-count">
									{subscription.eventsPerRelay.get(relay)?.size ?? 0} events
								</span>

								{#if subscription.eosesSeen.has(relay)}
									<span class="small-note">EOSE received</span>
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</li>
	{/each}
</ul>

<style>
	.relay-name {
		font-weight: 400;
	}

	.relay-status {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		margin-left: 5px;
	}

	.relay-status--connecting {
		background-color: #f1c40f;
	}

	.relay-status--disconnected {
		background-color: #e74c3c;
	}

	.relay-status--connected {
		background-color: #2ecc71;
	}

	.relay-status--flapping {
		background-color: #3498db;
	}

	.relay-status--flapping::after {
		content: 'flapping';
		color: white;
		font-weight: 500;
		font-size: 0.6em;
	}

	.relay-subscriptions {
		margin-left: 5px;
		float: right;
		font-size: 0.8em;
		font-weight: 300;
		cursor: pointer;
	}

	.relay-subscription-filter {
		font-size: 0.9em;
		font-weight: 300;
		font-family: monospace;
		padding: 5px;
		background-color: white;
		border-radius: 5px;
		border: 1px solid #e1e1e1;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		margin-top: 5px;
		overflow: auto;
	}

	.relay-subscription--event-count, .small-note {
		font-size: 0.8em;
		font-weight: 300;
		margin-left: 5px;
	}
</style>