import { AppConfig } from '../../app.config';
import type { TileModel } from '../tile/model/tile.model';

export class EditorService {
  public static getTilePath(tile: TileModel): string {
    return `${AppConfig.TILE_BASEPATH}/${tile.id}/${tile.tile}`;
  }
}
