import type { NDKUser, NDKUserProfile } from "@nostr-dev-kit/ndk";

export function truncatedNip05(userProfile: NDKUserProfile | undefined): string | undefined {
    if (!userProfile || !userProfile.nip05) return undefined;

    if (userProfile.nip05.startsWith("_@")) {
        return userProfile.nip05.substring(2);
    } else {
        return userProfile.nip05;
    }
}

export function truncatedBech(bech32: string, length?: number): string {
    return `${bech32.substring(0, length || 9)}...`;
}

export async function copyToClipboard(textToCopy: string | undefined) {
    try {
        await navigator.clipboard.writeText(textToCopy as string);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

export function truncatedNpub(user: NDKUser): string {
    return user.npub ? truncatedBech(user.npub, 16) : '';
}