'use client';

import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './dashboard/dashboardSlice';
import settingsReducer from './settings/settingsSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        settings: settingsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

