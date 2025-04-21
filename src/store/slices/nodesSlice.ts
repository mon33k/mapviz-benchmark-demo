import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
//     const res = await fetch('https://db.nycmesh.net/nodes.json');
//     if (!res.ok) throw new Error('Failed to fetch nodes');
//     return await res.json();
// });

export const fetchNodes = createAsyncThunk('nodes/fetchNodes', async () => {
    if (process.env.NODE_ENV === 'development') {
        const localData = await import('../../data/final_realistic_100k_nodes_cleaned.json');
        return localData.default;
    } else {
        const res = await fetch('https://node-db.netlify.app/nodes.json');
        if (!res.ok) throw new Error('Failed to fetch nodes');
        return await res.json();
    }
});


// Structure of each node
export interface Node {
    id: number;
    coordinates: [number, number, number]; // Longitude, Latitude, Elevation
    requestDate: number;
    roofAccess: boolean;
    panoramas: string[];
    status: string;
    type: string;
}

interface NodeState {
    data: Node[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NodeState = {
    data: [],
    status: 'idle',
    error: null,
};

const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        setNodes: (state, action) => {
            state.data = action.payload;
            state.status = 'succeeded';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNodes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNodes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchNodes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

export const { setNodes } = nodesSlice.actions;
export default nodesSlice.reducer;


