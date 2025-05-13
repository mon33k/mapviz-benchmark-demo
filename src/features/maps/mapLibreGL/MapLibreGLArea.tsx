import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { useAppSelector } from '../../../app/hooks';
import { selectNodes } from '../../nodes/nodeSlice';
import LinkLinesLayer from '../../../common/utils/linkLinesLayer';
import { buildNodeGeoJSON } from '../../../common/utils/buildNodeGeoJson';

const MapLibreGLArea = ({
    map,
    nodeLimit,
    setNodeLimit,
}: {
    map: maplibregl.Map;
    nodeLimit: number;
    setNodeLimit: (val: number) => void;
}) => {
    const nodes = useAppSelector(selectNodes);

    useEffect(() => {
        if (!map || !nodes.length) return;

        const applyLayer = () => {
            const geojson = buildNodeGeoJSON(nodes, nodeLimit);

            const source = map.getSource('nodes') as maplibregl.GeoJSONSource | undefined;
            if (!source) {
                map.addSource('nodes', {
                    type: 'geojson',
                    data: geojson,
                });
            } else {
                source.setData(geojson);
            }

            if (!map.getLayer('nodes-layer')) {
                map.addLayer({
                    id: 'nodes-layer',
                    type: 'symbol',
                    source: 'nodes',
                    layout: {
                        'icon-image': ['get', 'icon'],
                        'icon-size': 0.5,
                        'icon-allow-overlap': true,
                    },
                });
            }
        };

        if (map.isStyleLoaded()) {
            applyLayer();
        } else {
            const onStyle = () => {
                applyLayer();
                map.off('styledata', onStyle);
            };
            map.on('styledata', onStyle);
        }

        return () => {
            try {
                if (map.style && map.getLayer('nodes-layer')) {
                    map.removeLayer('nodes-layer');
                }
                if (map.style && map.getSource('nodes')) {
                    map.removeSource('nodes');
                }
            } catch (err) {
                console.warn('Cleanup failed:', err);
            }
        };
    }, [map, nodes, nodeLimit]);

    return (
        <>
            <div className="absolute top-5 left-2 z-10 bg-white p-2 rounded shadow">
                <label htmlFor="nodeCount">Node Count: </label>
                <select
                    id="nodeCount"
                    value={nodeLimit}
                    onChange={(e) => setNodeLimit(Number(e.target.value))}
                >
                    <option value={1000}>1,000</option>
                    <option value={10000}>10,000</option>
                    <option value={25000}>25,000</option>
                    <option value={50000}>50,000</option>
                    <option value={100000}>100,000</option>
                </select>
            </div>

            <LinkLinesLayer map={map} nodeLimit={nodeLimit} />
        </>
    );
};

export default MapLibreGLArea;
