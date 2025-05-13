const images = import.meta.glob('../assets/icons/*.png', { eager: true });

export const nodeIconMap: Record<string, string> = {};
export const loadedIcons = new Set<string>(); // shared icon load tracker

for (const path in images) {
    const fileName = path.split('/').pop()?.replace('.png', '');
    if (fileName) nodeIconMap[fileName] = (images[path] as { default: string }).default;
}

export function getNodeIconKey(type: string = '', status: string = ''): string {
    const t = type.toLowerCase().replace(/\s+/g, '-');
    const s = status.toLowerCase();

    if (s === 'inactive') return 'inactive';
    if (s === 'planned') return 'potential';
    if (['ap', 'hub', 'pop', 'remote', 'standard', 'supernode', 'vpn'].includes(t)) return t;

    return 'default';
}
