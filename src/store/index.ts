import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './slices/nodesSlice';
import meshReducer from './slices/meshSlice';

export const store = configureStore({
    reducer: {
        nodes: nodesReducer,
        mesh: meshReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;