import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectLinks, selectFilters } from '../store/slices/meshSlice';
import maplibregl from 'maplibre-gl';
import { FeatureCollection, Feature, LineString, GeoJsonProperties } from 'geojson';

interface Props {
    map: maplibregl.Map;
}

const LinkLinesLayer = ({ map }: Props) => {
    const links = useAppSelector(selectLinks);
    const filters = useAppSelector(selectFilters);

    console.log('LinkLinesLayer mounted');
    console.log('Links from Redux:', links);
    console.log('Filters:', filters);

    useEffect(() => {
        if (!map || !links?.length) return;

        const filteredLinks = links.filter(link => {
            if (link.status === 'vpn' && !filters.vpn) return false;
            if (link.status === 'fiber' && !filters.fiber) return false;
            if (link.status === 'active' && !filters.wireless) return false;
            return true;
        });

        const features: Feature<LineString, GeoJsonProperties>[] = filteredLinks.map(link => ({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: [
                    link.fromNode.coordinates.slice(0, 2),
                    link.toNode.coordinates.slice(0, 2)
                ]                
            },
            properties: { status: link.status }
        }));

        const geojson: FeatureCollection<LineString, GeoJsonProperties> = {
            type: 'FeatureCollection',
            features
        };

        const updateLines = () => {
            if (map.getSource('link-lines')) {
                (map.getSource('link-lines') as maplibregl.GeoJSONSource).setData(geojson);
            } else {
                map.addSource('link-lines', {
                    type: 'geojson',
                    data: geojson
                });

                map.addLayer({
                    id: 'link-lines-layer',
                    type: 'line',
                    source: 'link-lines',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': [
                            'match',
                            ['get', 'status'],
                            'vpn', '#cc99ff',
                            'fiber', '#f6be00',
                            '60GHz', '#03fcf8',
                            'active', '#007aff',
                            '#aaa'
                        ],
                        'line-width': 2,
                        'line-opacity': 1
                    }

                });
            }
        };

        if (map.isStyleLoaded()) {
            updateLines();
        } else {
            const onLoad = () => {
                updateLines();
                map.off('load', onLoad); // remove listener after first run
            };
            map.on('load', onLoad);
        }
        
    }, [map, links, filters]);

    return null;
};

export default LinkLinesLayer;
