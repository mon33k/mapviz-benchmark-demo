import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BenchmarkState {
    method: string;
    mapRenderTime: number | null;
    fps: number;
    latency: number;
    cpu: number;
    memory: number;
    frameDrops: number;
    interactionDelay: number;
}

const initialState: BenchmarkState = {
    method: 'MapLibre',
    mapRenderTime: null,
    fps: 0,
    latency: 0,
    cpu: 0,
    memory: 0,
    frameDrops: 0,
    interactionDelay: 0,
};

const benchmarkSlice = createSlice({
    name: 'benchmark',
    initialState,
    reducers: {
        setMapRenderTime(state, action: PayloadAction<number>) {
            state.mapRenderTime = action.payload;
        },
        updateFPS(state, action: PayloadAction<number>) {
            state.fps = action.payload;
        },
        updateLatency(state, action: PayloadAction<number>) {
            state.latency = action.payload;
        },
        updateCPU(state, action: PayloadAction<number>) {
            state.cpu = action.payload;
        },
        updateMemory(state, action: PayloadAction<number>) {
            state.memory = action.payload;
        },
        updateFrameDrops(state, action: PayloadAction<number>) {
            state.frameDrops = action.payload;
        },
        updateInteractionDelay(state, action: PayloadAction<number>) {
            state.interactionDelay = action.payload;
        },
    },
});

export const {
    setMapRenderTime,
    updateFPS,
    updateLatency,
    updateCPU,
    updateMemory,
    updateFrameDrops,
    updateInteractionDelay,
} = benchmarkSlice.actions;

export default benchmarkSlice.reducer;
