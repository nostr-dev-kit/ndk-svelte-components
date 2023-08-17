import type { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";
import { truncatedBech32 } from "..";

export function truncatedNip05(userProfile: NDKUserProfile | undefined): string | undefined {
    if (!userProfile || !userProfile.nip05) return undefined;

    if (userProfile.nip05.startsWith("_@")) {
        return userProfile.nip05.substring(2);
    } else {
        return userProfile.nip05;
    }
}

export function truncatedNpub(user: NDKUser): string {
    return user.npub ? truncatedBech32(user.npub, 16) : "";
}
