import type { NDKUserProfile } from "@nostr-dev-kit/ndk";

export function truncatedNip05(userProfile: NDKUserProfile | undefined): string | undefined {
    // Return blank string if we don't have a NIP-05
    if (!userProfile || !userProfile.nip05) return undefined;

    if (userProfile.nip05.substring(0, 1) === "_") {
        return userProfile.nip05.substring(2) as string;
    } else {
        return userProfile.nip05 as string;
    }
}
