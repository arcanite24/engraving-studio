import React, { useEffect, useState } from 'react';
import styles from './editor-canvas.module.css';
import type { CanvasModel } from '../../../canvas/canvas.model';
import type { CellModel } from '../../../canvas/cell.model';
import * as uuid from 'uuid';
import { useSelector } from 'react-redux';
import {
  activeCellSelector,
  activePaletteTileSelector,
  activeToolSelector,
  setActiveCell,
} from '../../editor.slice';
import { useAppDispatch } from '../../../../app.store';
import { EditorTools } from '../../editor-tools';
import { useKeyPress } from '../../hooks/useKeyPress';
import { Stage, Layer } from 'react-konva';
import { CanvasFastCell } from '../../../canvas/components/canvas-fast-cell/canvas-fast-cell';

interface Props {
  canvas: CanvasModel;
  images: Record<string, HTMLImageElement>;
}

type CellState = Record<string, CellModel>;

const computeCanvas = (canvas: CanvasModel, oldState: CellState): CellState => {
  const cellCache: CellState = {};
  const padding = canvas.gridGap;

  for (
    let x = 0;
    x <= canvas.gridWidth * canvas.tileWidth + padding * canvas.gridWidth;
    x += canvas.tileWidth + padding
  ) {
    for (
      let y = 0;
      y <= canvas.gridHeight * canvas.tileHeight + padding * canvas.gridHeight;
      y += canvas.tileHeight + padding
    ) {
      const id = uuid.v5(
        Math.random().toString(),
        '1b671a64-40d5-491e-99b0-da01ff1f3341',
      );

      cellCache[id] = {
        id,
        img: null,
        rotation: 0,
        x,
        y,
      };
    }
  }

  return cellCache;
};

export const EditorCanvas = ({ canvas, images }: Props) => {
  const dispatch = useAppDispatch();
  const activeTool = useSelector(activeToolSelector);
  const activePaletteTile = useSelector(activePaletteTileSelector);
  const activeCell = useSelector(activeCellSelector);

  const isRPressed = useKeyPress('r');

  // TODO: Consider migrating this local state to a global state, include cells in the tabs array
  // TODO: Consider indexing the cells instead of using an array for better performance: { cells: Record<string, CellModel> }
  const [cellsLocalState, setCellsLocalState] = useState<
    Record<string, CellModel>
  >(() => {
    return computeCanvas(canvas, {});
  });

  useEffect(() => {
    if (isRPressed && activeCell?.id) {
      const currentCell = cellsLocalState[activeCell?.id];
      updateCell(activeCell.id, {
        rotation: (currentCell?.rotation ?? 0) + 90,
      });
    }
  }, [isRPressed]);

  // useEffect(() => {
  //   setCellsLocalState(computeCanvas(canvas, cellsLocalState));
  // }, [canvas]);

  const updateCell = (id: string, payload: Partial<CellModel>): void => {
    console.log('updateing', id, payload);
    setCellsLocalState((oldCells) => {
      const currentCell = oldCells[id];
      return {
        ...oldCells,
        [id]: {
          ...currentCell,
          ...payload,
        },
      };
    });
  };

  const handleCellClick = (cell: CellModel) => {
    switch (activeTool) {
      case EditorTools.SelectTool:
        if (activeCell?.id === cell.id) {
          dispatch(setActiveCell(null));
        } else {
          dispatch(setActiveCell(cell));
        }
        break;

      case EditorTools.PaintTool:
        if (activePaletteTile) {
          updateCell(cell.id, {
            img: activePaletteTile.id,
          });
        }
        break;

      case EditorTools.ErasetTool:
        updateCell(cell.id, { img: null });
        break;

      default:
        break;
    }
  };

  const getCellImage = (id: string): HTMLImageElement | null => {
    if (!images) {
      return null;
    }

    return images[id];
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className={styles['editor-canvas']}>
      <Stage width={1500} height={1500}>
        <Layer>
          {Object.values(cellsLocalState).map((cell, i) => {
            return (
              <CanvasFastCell
                key={i}
                className="animate__animated animate__bounceIn"
                style={{
                  animationDelay: `${i * 1}ms`,
                }}
                cell={cell}
                selected={activeCell?.id === cell.id}
                width={canvas.tileWidth}
                height={canvas.tileHeight}
                onClick={() => {
                  handleCellClick(cell);
                }}
                x={cell.x}
                y={cell.y}
                image={getCellImage(cell.img ?? '')}
              ></CanvasFastCell>
            );
          })}
          {/* <ColoredRect /> */}
        </Layer>
      </Stage>
    </div>
  );
};
