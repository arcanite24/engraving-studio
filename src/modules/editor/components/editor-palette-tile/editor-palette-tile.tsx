import React from 'react';
import type { TileModel } from '../../../tile/model/tile.model';
import { EditorService } from '../../editor.service';
import styles from './editor-palette-tile.module.css';
import classnames from 'classnames';
import { useAppDispatch } from '../../../../app.store';
import { setActivePaletteTile } from '../../editor.slice';

interface Props {
  tile: TileModel;
  selected?: boolean;
}

export const EditorPaletteTile = ({ tile, selected = false }: Props) => {
  const dispatch = useAppDispatch();

  const selectTile = (tile: TileModel) => {
    dispatch(setActivePaletteTile(tile));
  };

  return (
    <div
      className={classnames(styles['editor-palette-tile'], {
        [styles.selected]: selected,
      })}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        selectTile(tile);
      }}
    >
      <img src={EditorService.getTilePath(tile)} alt="" />
    </div>
  );
};
