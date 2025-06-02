import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

interface MapLibreState {
    center: [number, number]; // [lng, lat]
    zoom: number;
    nodeLimit: number;
    isMapReady: boolean;
}

const initialState: MapLibreState = {
    center: [-73.9595798, 40.72],
    zoom: 11,
    nodeLimit: 1000,
    isMapReady: false,
};

const mapLibreSlice = createSlice({
    name: 'mapLibre',
    initialState,
    reducers: {
        setCenter(state, action: PayloadAction<[number, number]>) {
            state.center = action.payload;
        },
        setZoom(state, action: PayloadAction<number>) {
            state.zoom = action.payload;
        },
        setNodeLimit(state, action: PayloadAction<number>) {
            state.nodeLimit = action.payload;
        },
        setMapReady(state, action: PayloadAction<boolean>) {
            state.isMapReady = action.payload;
        },
    },
});

export const { setCenter, setZoom, setNodeLimit, setMapReady } = mapLibreSlice.actions;

export const selectMapLibre = (state: RootState) => state.mapLibre;

export default mapLibreSlice.reducer;
