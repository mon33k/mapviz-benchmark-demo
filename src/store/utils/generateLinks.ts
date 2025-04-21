import { Node, Link } from '../slices/meshSlice';

/**
 * 
 * @param nodes 
 * @returns
 * This generates sequential dummy links node[i] → node[i+1].
 * Only for early stress-testing or sandbox visualizations. 
 */


export function generateLinksFromNodes(nodes: Node[]): Link[] {
    const links: Link[] = [];

    for (let i = 0; i < nodes.length - 1; i++) {
        const from = nodes[i];
        const to = nodes[i + 1];

        if (from.coordinates && to.coordinates) {
            links.push({
                fromNode: from,
                toNode: to,
                status: 'active' // from.status || 
            });
        }
    }

    return links;
}
