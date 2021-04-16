import React from 'react';
import type { CellModel } from '../../cell.model';
import { Rect, Group, Text, Image } from 'react-konva';

interface Props {
  cell: CellModel;
  x: number;
  y: number;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
  showGrid?: boolean;

  image: HTMLImageElement | null;

  onClick: () => void;
}

export const CanvasFastCell = ({
  x,
  y,
  width = 32,
  height = 32,
  className,
  style = {},
  selected = false,
  onClick,
  cell,
  image,
  showGrid = true,
}: Props) => {
  return (
    <Group onClick={() => onClick()}>
      {showGrid && (
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="white"
          stroke={selected ? 'red' : '#eee'}
          strokeWidth={1}
          strokeEnabled={showGrid}
        ></Rect>
      )}

      {image && (
        <Image
          x={x}
          y={y}
          image={image}
          width={width}
          height={height}
          rotation={cell.rotation}
        ></Image>
      )}
    </Group>
  );
};
