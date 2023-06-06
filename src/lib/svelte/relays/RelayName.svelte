<script lang="ts">
	import { formatRelayName } from "$lib/utils/relays";
	import type { NDKRelay } from "@nostr-dev-kit/ndk";

    export let relay: NDKRelay;
</script>

{formatRelayName(relay)}