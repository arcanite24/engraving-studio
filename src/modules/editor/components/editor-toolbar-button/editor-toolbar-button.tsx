import { Button, IconName } from '@blueprintjs/core';
import { Classes, Popover2, Tooltip2 } from '@blueprintjs/popover2';
import React from 'react';
import { useAppDispatch } from '../../../../app.store';
import type { EditorTools } from '../../editor-tools';
import { setActiveTool } from '../../editor.slice';

interface Props {
  icon: IconName;
  tooltip: string;
  tool: EditorTools;
  isActive: boolean;
}

export const EditorToolbarButton = ({
  icon,
  tooltip,
  tool,
  isActive,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Tooltip2
        // className={Classes.TOOLTIP2_INDICATOR}
        content={<em>{tooltip}</em>}
      >
        <Button
          icon={icon}
          onClick={() => {
            dispatch(setActiveTool(tool));
          }}
          intent={isActive ? 'primary' : 'none'}
        ></Button>
      </Tooltip2>
    </>
  );
};
