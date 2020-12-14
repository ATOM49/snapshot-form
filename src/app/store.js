import { configureStore } from '@reduxjs/toolkit';
import snapshotReducer from '../features/snapshot/snapshotSlice';
import formReducer from '../features/form/formSlice';

export default configureStore({
  reducer: {
    snapshot: snapshotReducer,
    form: formReducer
  }
});
