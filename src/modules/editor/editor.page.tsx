import Grid from '@react-css/grid';
import React, { useState } from 'react';
import type { CanvasModel } from '../canvas/canvas.model';
import { EditorCanvasPropertiesPanel } from './components/editor-canvas-properties-panel/editor-canvas-properties-panel';
import { EditorCanvasTabs } from './components/editor-canvas-tabs/editor-canvas-tabs';
import { EditorNavbar } from './components/editor-navbar/editor-navbar';
import { EditorPalletePanel } from './components/editor-pallete-panel/editor-pallete-panel';
import { EditorToolbar } from './components/editor-toolbar/editor-toolbar';
import { TilesDefinition } from './editor-tiles';

import './editor.page.css';
import { EditorService } from './editor.service';
import useImage from './hooks/useImage';

interface Props {}

const imagesToLoad = Object.values(TilesDefinition).map((tile) => ({
  id: tile.id,
  url: EditorService.getTilePath(tile),
}));

export const EditorPage = (props: Props) => {
  const [activeCanvas, setActiveCanvas] = useState<CanvasModel | null>(null);

  // Load images
  const images = useImage(imagesToLoad);

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <EditorNavbar></EditorNavbar>

      <div className="tabs-container">
        <Grid columns="auto 20%" gap="8px">
          <EditorCanvasTabs
            onActiveTabChanged={(lastCanvas) => {
              setActiveCanvas(lastCanvas);
            }}
            images={images}
          ></EditorCanvasTabs>

          <div className="u-flex u-flexRow" style={{ gap: '4px' }}>
            <EditorToolbar></EditorToolbar>

            <div className="u-flex u-flexCol" style={{ gap: '4px' }}>
              {activeCanvas && (
                <EditorCanvasPropertiesPanel
                  canvas={activeCanvas}
                ></EditorCanvasPropertiesPanel>
              )}
              <EditorPalletePanel></EditorPalletePanel>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};
