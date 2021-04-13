import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app.store';
import type { CanvasModel } from '../canvas/canvas.model';
import type { CellModel } from '../canvas/cell.model';
import type { TileModel } from '../tile/model/tile.model';
import { EditorTools } from './editor-tools';

export const EDITOR_REDUCER_NAME = 'editor';

export enum EditorAction {
  CreateCanvas = 'createCanvas',
  CloseCanvas = 'closeCanvas',
  ExportCanvas = 'exportCanvas',
  UpdateCanvas = 'updateCanvas',

  SetActivePaletteTile = 'setActivePaletteTile',

  SetActiveTool = 'setActiveTool',

  SetActiveCell = 'setActiveCell',
}

interface EditorState {
  tabs: CanvasModel[];
  activePaletteTile: TileModel | null;
  activeTool: EditorTools;
  activeCell: CellModel | null;
}

const initialState: EditorState = {
  tabs: [],
  activePaletteTile: null,
  activeTool: EditorTools.SelectTool,
  activeCell: null,
};

export const editorSlice = createSlice({
  name: EDITOR_REDUCER_NAME,
  initialState,
  reducers: {
    [EditorAction.CreateCanvas]: (
      state,
      action: PayloadAction<CanvasModel>,
    ) => {
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
      };
    },

    [EditorAction.UpdateCanvas]: (
      state,
      action: PayloadAction<CanvasModel>,
    ) => {
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === action.payload.id) {
            return action.payload;
          } else {
            return tab;
          }
        }),
      };
    },

    [EditorAction.SetActivePaletteTile]: (
      state,
      action: PayloadAction<TileModel>,
    ) => {
      return {
        ...state,
        activePaletteTile: action.payload,
      };
    },

    [EditorAction.SetActiveTool]: (
      state,
      action: PayloadAction<EditorTools>,
    ) => {
      return {
        ...state,
        activeTool: action.payload,
      };
    },

    [EditorAction.SetActiveCell]: (
      state,
      action: PayloadAction<CellModel | null>,
    ) => {
      return {
        ...state,
        activeCell: action.payload,
      };
    },
  },
});

export const tabsSelector = (state: RootState) => state.editor.tabs;
export const activePaletteTileSelector = (state: RootState) =>
  state.editor.activePaletteTile;
export const activeToolSelector = (state: RootState) => state.editor.activeTool;
export const activeCellSelector = (state: RootState) => state.editor.activeCell;

export const {
  createCanvas,
  updateCanvas,
  setActivePaletteTile,
  setActiveTool,
  setActiveCell,
} = editorSlice.actions;
