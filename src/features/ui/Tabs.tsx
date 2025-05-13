import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setRenderer, RendererType } from './uiSlice';

const tabs = [
    { id: 'maplibre', label: 'MapLibre' },
    { id: 'deckgl', label: 'Deck.gl' },
    { id: 'cesiumgl', label: 'Cesium GL' },
    { id: 'svg', label: 'SVG' }
];

export default function Tabs() {
    const renderer = useAppSelector((state) => state.ui.renderer);
    const dispatch = useAppDispatch();

    return (
        <div className="border-b p-2 border-gray-200 dark:border-gray-700">
            <ul className="py-2 flex flex-wrap text-sm font-medium text-center" role="tablist">
                {tabs.map((tab) => (
                    <li key={tab.id} className="me-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-2 rounded-t-lg ${renderer === tab.id
                                    ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`}
                            type="button"
                            role="tab"
                            onClick={() => dispatch(setRenderer(tab.id as RendererType))}>
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
