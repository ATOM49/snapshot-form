import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
  radio: '',
  checkbox: []
};

// This silce manages the value being stored and retireved from the snapshot HOC
export const snapshotSlice = createSlice({
  name: 'snapshot',
  initialState: {
    value: initialValue
  },
  reducers: {
    updateSnapshot: (state, action) => {
      const formComponent = action.payload;
      if (formComponent.type === 'radio') {
        state.value['radio'] = formComponent.value;
      }
      if (formComponent.type === 'checkbox') {
        const index = state.value['checkbox'].indexOf(formComponent.value);
        if (index > -1) {
          state.value['checkbox'].splice(index, 1);
        } else {
          state.value['checkbox'].push(formComponent.value);
        }
      }
    },
    clearSnapshot: state => {
      state.value = initialValue;
    },
    restoreSnapshot: (state, action) => {
      state.value = JSON.parse(action.payload);
    }
  }
});

export const {
  updateSnapshot,
  clearSnapshot,
  restoreSnapshot
} = snapshotSlice.actions;

// Get the current value being stored in the history redux
export const selectSnapshot = state => state.snapshot.value;

export default snapshotSlice.reducer;
