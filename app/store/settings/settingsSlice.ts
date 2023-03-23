'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
    background: boolean;
    compactMode: boolean;
}

const initialState: SettingsState = {
    background: true,
    compactMode: false,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setCompactMode: (state, action) => { state.compactMode = action.payload },
        setBackground: (state, action) => { state.background = action.payload }
    }
})

export const { setCompactMode, setBackground } = settingsSlice.actions;

export default settingsSlice.reducer;