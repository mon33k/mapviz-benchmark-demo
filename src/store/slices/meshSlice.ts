import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index'; // adjust if needed

export interface Node {
    id: number;
    coordinates: [number, number, number]; // [lng, lat, elev]
}

export interface Link {
    fromNode: Node;
    toNode: Node;
    status: 'vpn' | 'fiber' | 'active';
}

export interface Filters {
    vpn: boolean;
    fiber: boolean;
    wireless: boolean;
}

interface MeshState {
    links: Link[];
    filters: Filters;
}

const initialState: MeshState = {
    links: [],
    filters: {
        vpn: true,
        fiber: true,
        wireless: true,
    },
};

const meshSlice = createSlice({
    name: 'mesh',
    initialState,
    reducers: {
        setLinks(state, action: PayloadAction<Link[]>) {
            state.links = action.payload;
        },
        toggleFilter(state, action: PayloadAction<keyof Filters>) {
            state.filters[action.payload] = !state.filters[action.payload];
        },
    },
});



export const { setLinks, toggleFilter } = meshSlice.actions;

// Selectors
export const selectLinks = (state: RootState) => state.mesh.links;
export const selectFilters = (state: RootState) => state.mesh.filters;

export default meshSlice.reducer;
