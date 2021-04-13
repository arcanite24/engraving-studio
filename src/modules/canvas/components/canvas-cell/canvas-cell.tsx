import React, { useState } from 'react';
import styles from './canvas-cell.module.css';
import classnames from 'classnames';
import type { CellModel } from '../../cell.model';

interface Props {
  cell: CellModel;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;

  onClick: () => void;
}

export const CanvasCell = ({
  width = '32px',
  height = '32px',
  className,
  style = {},
  selected = false,
  onClick,
  cell,
}: Props) => {
  return (
    <div
      onClick={() => onClick()}
      className={classnames(styles['canvas-cell'], className, {
        [styles.selected]: selected,
      })}
      style={{ width, height, ...style }}
    >
      {cell && cell.img && (
        <img
          src={cell.img}
          alt=""
          style={{
            width: '32px',
            height: '32px',
            transform: `rotate(${cell.rotation}deg)`,
            // transition: 'transform 0.5s ease-in-out',
          }}
          // className="animate__animated animate__bounceIn"
        />
      )}
    </div>
  );
};
