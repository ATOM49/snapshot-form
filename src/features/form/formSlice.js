import { createSlice } from '@reduxjs/toolkit';

// This silce manages the value being stored and retireved from the history HOC
export const formSlice = createSlice({
  name: 'form',
  initialState: {
    formItems: []
  },
  reducers: {
    addFormItem: (state, action) => {
      state.formItems = state.formItems.concat(action.payload);
    },
    removeFormItem: (state, action) => {
      state.formItems = state.formItems.filter(
        formItem => formItem.id !== action.payload.id
      );
    }
  }
});

export const { addFormItem, removeFormItem } = formSlice.actions;

// Get the components that have been created for the form
export const selectFormItems = state => state.form.formItems;

export default formSlice.reducer;
