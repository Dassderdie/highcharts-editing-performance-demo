import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface HighchartsOptionsState {
    title: string;
}

const initialState: HighchartsOptionsState = {
    title: 'Lorem ipsum dolor sit amet',
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
