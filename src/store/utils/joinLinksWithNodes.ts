import { Node, Link } from '../slices/meshSlice';

/**
 * Takes raw link data and enriches it with full node objects from the current node list.
 * Ensures each link contains coords for rendering polylines from node id to node id on the map.
 */

export interface JsonLink {
    from: number;
    to: number;
    status?: string;
}

export function joinLinksWithNodes(rawLinks: JsonLink[], nodes: Node[]): Link[] {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));
    const enrichedLinks: Link[] = [];

    const allowedStatuses = ['active', 'vpn', 'fiber'] as const;
    type AllowedStatus = typeof allowedStatuses[number];

    for (const link of rawLinks) {
        const fromNode = nodeMap.get(link.from);
        const toNode = nodeMap.get(link.to);

        if (fromNode?.coordinates && toNode?.coordinates) {
            const rawStatus = link.status?.toLowerCase() ?? 'active';
            const normalizedStatus: AllowedStatus = allowedStatuses.includes(rawStatus as AllowedStatus)
                ? (rawStatus as AllowedStatus)
                : 'active';

            enrichedLinks.push({
                fromNode,
                toNode,
                status: normalizedStatus
            });
        }
    }

    return enrichedLinks;
}
