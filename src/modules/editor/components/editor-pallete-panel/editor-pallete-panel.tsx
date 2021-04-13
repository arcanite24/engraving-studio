import { Menu, MenuDivider, FormGroup, InputGroup } from '@blueprintjs/core';
import Grid from '@react-css/grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { TilesDefinition } from '../../editor-tiles';
import { activePaletteTileSelector } from '../../editor.slice';
import { EditorPaletteTile } from '../editor-palette-tile/editor-palette-tile';

interface Props {}

export const EditorPalletePanel = (props: Props) => {
  const tiles = Object.entries(TilesDefinition);
  const activePaletteTile = useSelector(activePaletteTileSelector);

  return (
    <Menu>
      <MenuDivider title="Palette" />
      <Grid gap="4px" columns="repeat(5, 32px)" rows="repeat(5, 32px)">
        {tiles.map(([tileId, tile]) => {
          return (
            <EditorPaletteTile
              selected={tileId === activePaletteTile?.id}
              key={tile.id}
              tile={tile}
            ></EditorPaletteTile>
          );
        })}
      </Grid>
    </Menu>
  );
};
