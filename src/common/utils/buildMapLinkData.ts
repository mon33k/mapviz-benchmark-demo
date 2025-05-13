import { Link, Device, Node } from '../../types/models';

export interface MapLink {
    id: number;
    type: string;
    status: string;
    coordinates: [[number, number], [number, number]];
    deviceA?: Device;
    deviceB?: Device;
    nodeA?: Node;
    nodeB?: Node;
}

export function buildMapLinkData(
    fetchedLinks: Link[],
    devices: Device[],
    nodes: Node[]
): MapLink[] {
    const deviceMap = new Map(devices.map(d => [d.id, d]));
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    return fetchedLinks.map(link => {
        const deviceA = deviceMap.get(link.from_device.id);
        const deviceB = deviceMap.get(link.to_device.id);

        const nodeA = deviceA ? nodeMap.get(deviceA.node.id) : undefined;
        const nodeB = deviceB ? nodeMap.get(deviceB.node.id) : undefined;

        const coordA: [number, number] = deviceA
            ? [deviceA.longitude, deviceA.latitude]
            : [0, 0];
        const coordB: [number, number] = deviceB
            ? [deviceB.longitude, deviceB.latitude]
            : [0, 0];

        return {
            id: parseInt(link.id),
            type: link.type ?? '',
            status: link.status ?? '',
            coordinates: [coordA, coordB],
            deviceA,
            deviceB,
            nodeA,
            nodeB,
        };
    });
}
