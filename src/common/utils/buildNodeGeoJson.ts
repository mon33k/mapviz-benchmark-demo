import { Node } from '../../types/models';
import { FeatureCollection, Point } from 'geojson';
import { getNodeIconKey } from './getNodeIconKey';

export function buildNodeGeoJSON(nodes: Node[], limit = 1000): FeatureCollection<Point, { id: string; icon: string }> {
    return {
        type: 'FeatureCollection',
        features: nodes.slice(0, limit).map((node) => ({
            type: 'Feature' as const,
            geometry: {
                type: 'Point' as const,
                coordinates: [node.longitude, node.latitude],
            },
            properties: {
                id: node.id,
                icon: getNodeIconKey(node.type, node.status) || 'standard'
            },
        })),
    };
}
