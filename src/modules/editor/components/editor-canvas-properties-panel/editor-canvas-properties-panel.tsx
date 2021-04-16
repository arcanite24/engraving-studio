import {
  Button,
  FormGroup,
  InputGroup,
  Menu,
  MenuDivider,
} from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app.store';
import type { CanvasModel } from '../../../canvas/canvas.model';

interface Props {
  canvas: CanvasModel;
}

export const EditorCanvasPropertiesPanel = ({ canvas }: Props) => {
  const dispatch = useAppDispatch();

  const [localState, setLocalState] = useState<CanvasModel>(canvas ?? {});

  useEffect(() => {
    setLocalState(canvas);
  }, [canvas]);

  const updateCanvasProperties = (newCanvas: CanvasModel) => {
    // dispatch(updateCanvas(newCanvas));
    alert('For now updating the canvas is disabled 😢. Too complex for an MVP');
  };

  return (
    <Menu>
      <MenuDivider title="Canvas properties" />
      {localState && (
        <>
          <FormGroup label="Width" labelFor="width" labelInfo="(in blocks)">
            <InputGroup
              id="width"
              name="width"
              value={localState.gridWidth?.toString()}
              type="number"
              onChange={(e) => {
                setLocalState({
                  ...localState,
                  gridWidth: parseInt(e.target.value, 10),
                });
              }}
            />
          </FormGroup>
          <FormGroup label="Height" labelFor="Height" labelInfo="(in blocks)">
            <InputGroup
              id="Height"
              name="Height"
              value={localState.gridHeight?.toString()}
              type="number"
              onChange={(e) => {
                setLocalState({
                  ...localState,
                  gridHeight: parseInt(e.target.value, 10),
                });
              }}
            />
          </FormGroup>

          <FormGroup
            label="Tile width"
            labelFor="Tile width"
            labelInfo="(in pixels)"
          >
            <InputGroup
              id="Tile width"
              name="Tile width"
              value={localState.tileWidth?.toString()}
              type="number"
              onChange={(e) => {
                setLocalState({
                  ...localState,
                  tileWidth: parseInt(e.target.value, 10),
                });
              }}
            />
          </FormGroup>
          <FormGroup
            label="Tile height"
            labelFor="Tile height"
            labelInfo="(in pixels)"
          >
            <InputGroup
              id="Tile height"
              name="Tile height"
              value={localState.tileHeight?.toString()}
              type="number"
              onChange={(e) => {
                setLocalState({
                  ...localState,
                  tileHeight: parseInt(e.target.value, 10),
                });
              }}
            />
          </FormGroup>

          <FormGroup
            label="Grid Gap"
            labelFor="Grid Gap"
            labelInfo="(in pixels)"
          >
            <InputGroup
              id="Grid Gap"
              name="Grid Gap"
              value={localState.gridGap?.toString()}
              type="number"
              onChange={(e) => {
                setLocalState({
                  ...localState,
                  gridGap: parseInt(e.target.value, 10),
                });
              }}
            />
          </FormGroup>
        </>
      )}

      <Button
        text="Update"
        onClick={() => {
          updateCanvasProperties(localState);
        }}
      ></Button>
    </Menu>
  );
};
