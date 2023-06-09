export * from './relay';
export * from './user';

export function truncatedBech32(bech32: string, length?: number): string {
    return `${bech32.substring(0, length || 9)}...`;
}
