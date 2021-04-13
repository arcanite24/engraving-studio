export interface TileModel {
  id: string;
  name: string;
  tile: string;
  block: string;
  width: number;
  height: number;
  supportVariants: boolean;
  variants: Array<TileVariant>;
}

export interface TileVariant {
  file: string;
}
