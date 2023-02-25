import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface HighchartsOptionsState {
    title: string;
}

const initialState: HighchartsOptionsState = {
    title: 'Hello World!',
};

export const highchartsOptionsSlice = createSlice({
    name: 'highchartsOptions',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
    },
});

export const { setTitle } = highchartsOptionsSlice.actions;

export const selectTitle = (state: RootState) => state.highchartsOptions.title;

export default highchartsOptionsSlice.reducer;
