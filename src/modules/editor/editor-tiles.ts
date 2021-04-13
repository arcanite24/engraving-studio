/*
  For now I'm leaving this solution, the idea is to make the tile library modular, requesting the tiles on demand and so on
*/

import type { TileModel } from '../tile/model/tile.model';

export enum EditorTiles {
  OneByOneTile = '1x1-tile',
  OneByOneRoundTile = '1x1-round-tile',
  OneByOneRoundPlate = '1x1-round-plate',
  OneByOneRoundPlateOpenStud = '1x1-round-plate-open',
  OneByOneRoundTileQuarter = '1x1-round-tile-quarter',
  OneByOneTileGrille = '1x1-tile-grille',
}

export const TilesDefinition: Record<EditorTiles, TileModel> = {
  [EditorTiles.OneByOneTile]: {
    id: EditorTiles.OneByOneTile,
    name: '1x1 Tile',
    tile: '1x1-tile.png',
    block: '1x1-tile__block.png',
    width: 1,
    height: 1,
    supportVariants: false,
    variants: [
      {
        file: '1x1-tile__var1.png',
      },
    ],
  },

  [EditorTiles.OneByOneRoundTile]: {
    id: EditorTiles.OneByOneRoundTile,
    name: '1x1 Round Tile',
    tile: '1x1-round-tile.png',
    block: '1x1-round-tile__block.png',
    width: 1,
    height: 1,
    supportVariants: false,
    variants: [
      {
        file: '1x1-round-tile__var1.png',
      },
    ],
  },

  [EditorTiles.OneByOneRoundPlate]: {
    id: EditorTiles.OneByOneRoundPlate,
    name: '1x1 Round Plate',
    tile: '1x1-round-plate.png',
    block: '1x1-round-plate__block.png',
    width: 1,
    height: 1,
    supportVariants: false,
    variants: [
      {
        file: '1x1-round-plate__var1.png',
      },
    ],
  },

  [EditorTiles.OneByOneRoundPlateOpenStud]: {
    id: EditorTiles.OneByOneRoundPlateOpenStud,
    name: '1x1 Round Plate w/open stud',
    tile: '1x1-round-plate-open.png',
    block: '1x1-round-plate-open__block.png',
    width: 1,
    height: 1,
    supportVariants: false,
    variants: [
      {
        file: '1x1-round-plate-open__var1.png',
      },
    ],
  },

  [EditorTiles.OneByOneRoundTileQuarter]: {
    id: EditorTiles.OneByOneRoundTileQuarter,
    name: '1x1 Round Tile Quarter',
    tile: '1x1-round-tile-quarter.png',
    block: '1x1-round-tile-quarter__block.png',
    width: 1,
    height: 1,
    supportVariants: false,
    variants: [
      {
        file: '1x1-round-tile-quarter__var1.png',
      },
    ],
  },

  [EditorTiles.OneByOneTileGrille]: {
    id: EditorTiles.OneByOneTileGrille,
    name: '1x1 Tile Grille',
    tile: '1x1-tile-grille.png',
    block: '1x1-tile-grille__block.png',
    width: 1,
    height: 1,
    supportVariants: false,
    variants: [
      {
        file: '1x1-tile-grille__var1.png',
      },
    ],
  },
};
