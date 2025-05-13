import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type RendererType = 'maplibre' | 'deckgl';

interface UIState {
    renderer: RendererType;
}

const initialState: UIState = {
    renderer: 'maplibre',
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setRenderer: (state, action: PayloadAction<RendererType>) => {
            state.renderer = action.payload;
        },
    },
});

export const { setRenderer } = uiSlice.actions;
export default uiSlice.reducer;
