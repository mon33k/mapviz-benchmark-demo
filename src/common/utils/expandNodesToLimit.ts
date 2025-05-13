import { v4 as uuidv4 } from 'uuid';
import { Node } from '../../types/models';

export function expandNodesToLimit(existingNodes: Node[], nodeLimit: number): Node[] {
    const needed = nodeLimit - existingNodes.length;
    if (needed <= 0) return existingNodes;

    const hubs = existingNodes.filter(n => n.type === 'hub' || n.type === 'supernode');
    if (hubs.length === 0) return existingNodes;

    const statuses = ['Active', 'Inactive', 'Planned'];
    const types = ['ap', 'standard', 'remote'];

    const newNodes: Node[] = [];
console.log('Expanding by', needed);

    for (let i = 0; i < needed; i++) {
        const base = hubs[Math.floor(Math.random() * hubs.length)];
        const latOffset = (Math.random() - 0.5) * 0.01;
        const lngOffset = (Math.random() - 0.5) * 0.01;

        newNodes.push({
            id: uuidv4(),
            network_number: 900000 + i,
            name: null,
            type: types[Math.floor(Math.random() * types.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            latitude: base.latitude + latOffset,
            longitude: base.longitude + lngOffset,
            altitude: Math.floor(Math.random() * 60) + 10,
            install_date: new Date().toISOString(),
            abandon_date: null,
            notes: '',
            buildings: [],
            devices: [],
            installs: [],
        });
    }

    return [...existingNodes, ...newNodes];
}
