import { Link, Device, Node, CoordRenderLink } from '../../types/models';

/**
 * This function creates CoordRenderLink objects based on links, devices and nodes passed to the function. 
 * It uses two maps (deviceMap and nodeMap) that look up devices and nodes based on their IDs.
 * @param links - An array of Link objects between devices.
 * @param devices - An array of Device objects, each with detailed info about a device.
 * @param nodes - An array of Node objects, each node corresponds to a physical location. 
 * @returns CoordRenderLink[] objects, with lat long coordinates of fromDevice and toDevice.
 * 
 */


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