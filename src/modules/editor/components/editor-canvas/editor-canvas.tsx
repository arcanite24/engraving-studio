import React, { useEffect, useState } from 'react';
import styles from './editor-canvas.module.css';
import Grid from '@react-css/grid';
import { CanvasCell } from '../../../canvas/components/canvas-cell/canvas-cell';
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
import { EditorService } from '../../editor.service';
import { useKeyPress } from '../../hooks/useKeyPress';

interface Props {
  canvas: CanvasModel;
}

export const EditorCanvas = ({ canvas }: Props) => {
  const totalCells = canvas.gridWidth * canvas.gridHeight;

  const dispatch = useAppDispatch();
  const activeTool = useSelector(activeToolSelector);
  const activePaletteTile = useSelector(activePaletteTileSelector);
  const activeCell = useSelector(activeCellSelector);

  const isRPressed = useKeyPress('r');

  // TODO: Consider migrating this local state to a global state, include cells in the tabs array
  const [cellsArray, setCellsArray] = useState<Array<CellModel>>(
    new Array<CellModel>(totalCells)
      .fill({
        id: uuid.v5(
          Math.random().toString(),
          '1b671a64-40d5-491e-99b0-da01ff1f3341',
        ),
        img: null,
        rotation: 0,
      })
      .map((cell, i) => ({
        ...cell,
        id: uuid.v5(`${i}`, '1b671a64-40d5-491e-99b0-da01ff1f3341'),
      })),
  );

  useEffect(() => {
    if (isRPressed && activeCell?.id) {
      const currentCell = cellsArray.find((c) => c.id === activeCell?.id);
      updateCell(activeCell.id, {
        rotation: (currentCell?.rotation ?? 0) + 90,
      });
    }
  }, [isRPressed]);

  const updateCell = (id: string, payload: Partial<CellModel>): void => {
    console.log('updateing', id, payload);
    setCellsArray((oldCells) =>
      oldCells.map((cell) => {
        if (cell.id === id) {
          return {
            ...cell,
            ...payload,
          };
        } else {
          return cell;
        }
      }),
    );
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
            img: EditorService.getTilePath(activePaletteTile),
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

  return (
    <div className={styles['editor-canvas']}>
      <Grid
        rows={`repeat(${canvas.gridHeight}, ${canvas.tileHeight}px)`}
        columns={`repeat(${canvas.gridWidth}, ${canvas.tileWidth}px)`}
        gap={`${canvas.gridGap}px`}
      >
        {cellsArray.map((cell, i) => {
          return (
            <CanvasCell
              key={i}
              className="animate__animated animate__bounceIn"
              style={{
                animationDelay: `${i * 1}ms`,
              }}
              cell={cell}
              selected={activeCell?.id === cell.id}
              width={`${canvas.tileWidth}px`}
              height={`${canvas.tileHeight}px`}
              onClick={() => handleCellClick(cell)}
            ></CanvasCell>
          );
        })}
      </Grid>
    </div>
  );
};
