export function prettifyNip05(nip05: string): string {
    if (nip05.startsWith("_@")) {
        return nip05.substring(2);
    } else {
        return nip05;
    }
}

export function truncatedNpub(user: NDKUser): string {
    return user.npub ? truncatedBech32(user.npub, 16) : "";
}
