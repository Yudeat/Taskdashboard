import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  searchQuery: string;
  statusFilter: 'all' | 'pending' | 'in-progress' | 'completed';
  priorityFilter: 'all' | 'low' | 'medium' | 'high';
  sortOrder: 'asc' | 'desc';
}

const initialState: UIState = {
  searchQuery: '',
  statusFilter: 'all',
  priorityFilter: 'all',
  sortOrder: 'asc',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) =>{ 
        state.searchQuery = action.payload;
       },
    setStatusFilter: (state, action: PayloadAction<UIState['statusFilter']>) => { 
      state.statusFilter = action.payload; 
    },
    setPriorityFilter: (state, action: PayloadAction<UIState['priorityFilter']>) => { 
      state.priorityFilter = action.payload; 
    },
    setSortOrder: (state, action: PayloadAction<UIState['sortOrder']>) => { 
      state.sortOrder = action.payload; 
    },
  },
});

export const { setSearch, setStatusFilter, setPriorityFilter, setSortOrder } = uiSlice.actions;
export default uiSlice.reducer;
