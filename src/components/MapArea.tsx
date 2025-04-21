import { useEffect, useRef, useState } from 'react';
import LinkLinesLayer from './LinkLinesLayer';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLinks } from '../store/slices/meshSlice';
import { Node, setNodes } from '../store/slices/nodesSlice';
import { joinLinksWithNodes, JsonLink } from '../store/utils/joinLinksWithNodes';
import { getMarkerSvgByStatus } from '../store/utils/markerIcon';
import testLinksRaw from '../data/final_realistic_100k_links_cleaned.json';
import testNodesRaw from '../data/final_realistic_100k_nodes_cleaned.json';

const testLinks = testLinksRaw as JsonLink[];
const testNodes = testNodesRaw as Node[];

const MapArea = () => {
    const dispatch = useAppDispatch();
    const { data: nodes } = useAppSelector((state) => state.nodes);
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [map, setMap] = useState<maplibregl.Map | null>(null);
    const [nodeLimit, setNodeLimit] = useState<number>(() => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('limit') || '50');
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('limit', nodeLimit.toString());
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }, [nodeLimit]);

    useEffect(() => {
        dispatch(setNodes(testNodes));

        if (mapContainer.current && !mapRef.current) {
            const instance = new maplibregl.Map({
                container: mapContainer.current,
                style: {
                    version: 8,
                    sources: {
                        carto: {
                            type: 'raster',
                            tiles: [
                                'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                                'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                                'https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                                'https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
                            ],
                            tileSize: 256,
                            attribution:
                                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
                        },
                    },
                    layers: [
                        {
                            id: 'carto-light',
                            type: 'raster',
                            source: 'carto',
                            minzoom: 0,
                            maxzoom: 22,
                        },
                    ],
                },
                center: [-74.006, 40.7128],
                zoom: 9.3,
            });

            mapRef.current = instance;
            setMap(instance);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (mapRef.current && nodes.length > 0) {
            const limitedNodes = nodes.slice(0, nodeLimit);
            const nodeIdSet = new Set(limitedNodes.map((n) => n.id));

            const markerElements = document.querySelectorAll('.maplibregl-marker');
            markerElements.forEach((el) => el.remove());

            if (mapRef.current.getLayer('link-lines-layer')) {
                mapRef.current.removeLayer('link-lines-layer');
            }
            if (mapRef.current.getSource('link-lines')) {
                mapRef.current.removeSource('link-lines');
            }

            limitedNodes.forEach((node: Node) => {
                console.log('Sample node status:', node);

                if (node.coordinates?.[0] && node.coordinates?.[1]) {
                    const el = document.createElement('div');
                    el.innerHTML = getMarkerSvgByStatus(node.type?.toLowerCase() || 'default');
                    el.style.width = '24px';
                    el.style.height = '24px';
                    el.style.transform = 'translate(-50%, -50%)';

                    new maplibregl.Marker({ element: el })
                        .setLngLat([node.coordinates[0], node.coordinates[1]])
                        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(`${node.id} (${node.status})`))
                        .addTo(mapRef.current!);
                }
            });

            const filteredLinks = testLinks.filter(link =>
                nodeIdSet.has(link.from) && nodeIdSet.has(link.to)
            );

            const links = joinLinksWithNodes(filteredLinks, limitedNodes);
            dispatch(setLinks(links));
        }
    }, [dispatch, nodes, nodeLimit]);

    return (
        <>
            <div className="absolute top-2 left-2 z-10 bg-white p-2 rounded shadow">
                <label htmlFor="nodeCount">Node Count: </label>
                <select
                    id="nodeCount"
                    value={nodeLimit}
                    onChange={(e) => setNodeLimit(Number(e.target.value))}
                >
                    <option value={50}>50</option>
                    <option value={1000}>1,000</option>
                    <option value={10000}>10,000</option>
                    <option value={25000}>25,000</option>
                    <option value={50000}>50,000</option>
                    <option value={100000}>100,000</option>
                </select>
            </div>

            <div ref={mapContainer} id="mapContainer" className="w-full h-full" />
            {map && <LinkLinesLayer map={map} />}
        </>
    );
};

export default MapArea;
