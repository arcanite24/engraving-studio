import { Menu, MenuItem } from '@blueprintjs/core';
import React from 'react';

interface Props {
  onNewFile: () => void;
}

export const FileMenu = (props: Props) => {
  return (
    <Menu>
      <MenuItem text="New file" onClick={() => props.onNewFile()} />
      <MenuItem text="Open file..." />
      <MenuItem text="Save" />
      <MenuItem text="Save as..." />
      <MenuItem text="Export file..." />
    </Menu>
  );
};
