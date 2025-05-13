import { useEffect, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import { Feature, FeatureCollection, GeoJsonProperties, LineString } from 'geojson';
import { useAppSelector } from '../../app/hooks';
import { selectLinks, selectFilters } from '../../features/links/linkSlice';
import { selectDevices } from '../../features/devices/deviceSlice';
import { selectNodes } from '../../features/nodes/nodeSlice';
import { buildCoordRenderLinks } from './buildCoordRenderLinks';
import { CoordRenderLink } from '../../types/models';

interface Props {
    map: maplibregl.Map;
    nodeLimit: number;
    // nodes: Node[];
}


const LinkLinesLayer = ({ map, nodeLimit }: Props) => {
    const fetchedLinks = useAppSelector(selectLinks);
    const devices = useAppSelector(selectDevices);
    const nodes = useAppSelector(selectNodes);
    const filters = useAppSelector(selectFilters);

    const links: CoordRenderLink[] = useMemo(
        () => buildCoordRenderLinks(fetchedLinks, devices, nodes),
        [fetchedLinks, devices, nodes]
    );

    useEffect(() => {
        if (!map || !links.length) return;

        const wirelessTypes = ['5 ghz', '24 ghz', '60 ghz', '70-80 ghz'];

        const filteredLinks = links.filter(link => {
            const type = link.type?.toLowerCase() ?? '';
            if (type === 'vpn' && !filters.vpn) return false;
            if (type === 'fiber' && !filters.fiber) return false;
            if (type === 'ethernet' && !filters.ethernet) return false;
            if (wirelessTypes.includes(type) && !filters.wireless) return false;
            return true;
        }).slice(0, nodeLimit); // Apply nodeLimit to restrict the number of links

        const features: Feature<LineString, GeoJsonProperties>[] = filteredLinks.map(link => ({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: link.coordinates
            },
            properties: {
                type: link.type?.toLowerCase() ?? 'unknown'
            }
        }));

        const geojson: FeatureCollection<LineString, GeoJsonProperties> = {
            type: 'FeatureCollection',
            features
        };

        const sourceId = 'link-lines';
        const layerId = 'link-lines-layer';

        const updateLayer = () => {
            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, {
                    type: 'geojson',
                    data: geojson
                });

                map.addLayer({
                    id: layerId,
                    type: 'line',
                    source: sourceId,
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': [
                            'match',
                            ['get', 'type'],
                            'vpn', '#cc99ff',
                            'fiber', '#f6be00',
                            'ethernet', '#0f0',
                            '5 ghz', '#0af',
                            '24 ghz', '#a0f',
                            '60 ghz', '#03fcf8',
                            '70-80 ghz', '#ff0',
                            '#aaa' // default
                        ]

                        ,
                        'line-width': 2,
                        'line-opacity': 1
                    }
                });
                if (map.getLayer('nodes-layer')) {
                    map.moveLayer('nodes-layer');
                }
            } else {
                const source = map.getSource(sourceId) as maplibregl.GeoJSONSource;
                source.setData(geojson);
            }
        };

        if (map.isStyleLoaded()) {
            updateLayer();
        } else {
            const onStyle = () => {
                if (map.isStyleLoaded()) {
                    updateLayer();
                    map.off('styledata', onStyle);
                }
            };
            map.on('styledata', onStyle);
        }

        return () => {
            if (map.style && map.getLayer(layerId)) {
                map.removeLayer(layerId);
            } 
            if (map.style && map.getSource(sourceId)) {
                map.removeSource(sourceId);
            } 
        };
    }, [map, links, filters, nodeLimit]); // Add nodeLimit 

    return null;
};

export default LinkLinesLayer;
