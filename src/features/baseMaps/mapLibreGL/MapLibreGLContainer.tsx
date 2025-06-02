import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import MapLibreGLArea from './MapLibreGLArea';
import { useAppSelector } from '../../../app/hooks';
import { selectNodes } from '../../nodes/nodeSlice';
import { selectLinks } from '../../links/linkSlice';
import { selectDevices } from '../../devices/deviceSlice';
import { getNodeIconKey, nodeIconMap, loadedIcons } from '../../../common/utils/getNodeIconKey';
// import { setMapRenderTime } from '../../benchmark/benchmarkSlice';

const MapLibreGLContainer = () => {
    const mapRef = useRef<maplibregl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);
    const baseUrl = import.meta.env.BASE_URL;

    const [nodeLimit, setNodeLimit] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return parseInt(baseUrl + params.get('limit') || '1000');
    });

    const nodes = useAppSelector(selectNodes);
    const links = useAppSelector(selectLinks);
    const devices = useAppSelector(selectDevices);
    
    // const dispatch = useAppDispatch();


    // Update the URL with the current limit value
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        params.set('limit', nodeLimit.toString());
        window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    }, [nodeLimit]);

    // Create the map instance and attach event listeners (only once)
    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;

        const instance = new maplibregl.Map({
            container: mapContainerRef.current,
            style: {
                version: 8,
                sources: {
                    carto: {
                        type: 'raster',
                        tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'],
                        tileSize: 256,
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
            center: [-73.9595798, 40.72],
            zoom: 11,
        });

        mapRef.current = instance;
        setMapInstance(instance);

        instance.on('styleimagemissing', async (e) => {
            const id = e.id;
            if (instance.hasImage(id)) return;

            const fallback = nodeIconMap['default'];
            if (!fallback) return;
        });

        return () => {
            instance.remove();
            mapRef.current = null;
            setMapInstance(null);
        };
    }, []);

    // Load icons AFTER map is ready and nodes are available
    useEffect(() => {
        if (!mapRef.current || !nodes.length) return;

        const map = mapRef.current;

        const iconKeys = Array.from(
            new Set(nodes.slice(0, nodeLimit).map((n) => getNodeIconKey(n.type, n.status)))
        );

        for (const icon of iconKeys) {
            if (loadedIcons.has(icon) || map.hasImage(icon)) continue;

            const iconPath = nodeIconMap[icon];
            if (!iconPath) {
                console.warn(`Missing preloaded icon "${icon}"`);
                continue;
            }

            try {

                map.loadImage(iconPath).then((result) => {
                    map.addImage(icon, result.data);
                    loadedIcons.add(icon);
                }).catch((err) => {
                    console.warn(`Error loading icon "${icon}"`, err);
                });
            } catch (err) {
                console.warn(`Error loading icon "${icon}"`, err);
            }
        }
    }, [nodes, nodeLimit]);

    return (
        <div className="w-full h-full relative">
            <div ref={mapContainerRef} className="w-full h-full m-0 p-0" />
            {mapInstance && nodes.length && links.length && devices.length && (
                <MapLibreGLArea
                    map={mapInstance}
                    nodeLimit={nodeLimit}
                    setNodeLimit={setNodeLimit}
                />
            )}
        </div>
    );
};

export default MapLibreGLContainer;
