import { configureStore } from '@reduxjs/toolkit';
import highchartsOptionsSlice from './highchartsOptionsSlice';

export const store = configureStore({
    reducer: {
        highchartsOptions: highchartsOptionsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
