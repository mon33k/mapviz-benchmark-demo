import { Link, Device, Node, CoordRenderLink } from '../../types/models';

export function buildCoordRenderLinks(
    links: Link[],
    devices: Device[],
    nodes: Node[]
): CoordRenderLink[] {
    const deviceMap = new Map(devices.map(d => [d.id, d]));
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    return links.flatMap(link => {
        const fromDevice = deviceMap.get(link.from_device.id);
        const toDevice = deviceMap.get(link.to_device.id);
        if (!fromDevice || !toDevice) return [];

        const fromNode = nodeMap.get(fromDevice.node.id);
        const toNode = nodeMap.get(toDevice.node.id);
        if (!fromNode || !toNode) return [];

        return [{
            ...link,
            fromDevice,
            toDevice,
            fromNode,
            toNode,
            coordinates: [
                [fromDevice.longitude, fromDevice.latitude],
                [toDevice.longitude, toDevice.latitude]
            ]
        }];
    });
}