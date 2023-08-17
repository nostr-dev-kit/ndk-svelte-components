import type { NDKUserProfile } from "@nostr-dev-kit/ndk";

export function truncatedNip05(userProfile: NDKUserProfile | undefined): string | undefined {
    if (!userProfile || !userProfile.nip05) return undefined;

    if (userProfile.nip05.startsWith("_@")) {
        return userProfile.nip05.substring(2);
    } else {
        return userProfile.nip05;
    }
}
