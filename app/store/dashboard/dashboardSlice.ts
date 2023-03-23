'use client';

import { createSlice } from '@reduxjs/toolkit';
import { Table } from '@/app/model/table';

export interface DashboardState {
    filterValue: string;
    tables: Table[];
}

const initialState: DashboardState = {
    filterValue: '',
    tables: [],
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setFilterValue: (state, action) => {state.filterValue = action.payload},
        loadTables: (state, action) => {
            state.tables = action.payload
        }
    }
})

export const { setFilterValue, loadTables } = dashboardSlice.actions;

export default dashboardSlice.reducer;