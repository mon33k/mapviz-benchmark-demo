import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from '../features/nodes/nodeSlice';
import linksReducer from '../features/links/linkSlice';
import devicesReducer from '../features/devices/deviceSlice';
import benchmarkReducer from '../features/benchmark/benchmarkSlice';

// import installsReducer from './slices/installsSlice';
// import sectorsReducer from './slices/sectorsSlice';

import mapLibreReducer from '../features/maps/mapLibreGL/mapLibreGLSlice';
import uiReducer from '../features/ui/uiSlice';


export const store = configureStore({ 
    reducer: {
        benchmark: benchmarkReducer,
        nodes: nodesReducer,
        links: linksReducer,
        devices: devicesReducer,
        mapLibre: mapLibreReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



