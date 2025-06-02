import { useAppSelector } from '../../app/hooks';
import MapLibreGLContainer from '../../features/baseMaps/mapLibreGL/MapLibreGLContainer';

const MapArea = () => {
    const renderer = useAppSelector((state) => state.ui.renderer);

    return (
        <div id="mapContainer" className="w-full h-full m-0 p-0">
            {renderer === 'maplibre' && <MapLibreGLContainer />}
        </div>
    )
}

export default MapArea;