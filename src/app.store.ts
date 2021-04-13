import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  editorSlice,
  EDITOR_REDUCER_NAME,
} from './modules/editor/editor.slice';

export const store = configureStore({
  reducer: {
    [EDITOR_REDUCER_NAME]: editorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
