import React from 'react';
import { EditorTools } from '../../editor-tools';
import { EditorToolbarButton } from '../editor-toolbar-button/editor-toolbar-button';
import styles from './editor-toolbar.module.css';

interface Props {}

export const EditorToolbar = (props: Props) => {
  return (
    <div className={styles['editor-toolbar']}>
      <EditorToolbarButton
        icon="select"
        tooltip="Select tool"
        tool={EditorTools.SelectTool}
      ></EditorToolbarButton>
      <EditorToolbarButton
        icon="highlight"
        tooltip="Paint tool"
        tool={EditorTools.PaintTool}
      ></EditorToolbarButton>
      <EditorToolbarButton
        icon="eraser"
        tooltip="Eraser tool"
        tool={EditorTools.ErasetTool}
      ></EditorToolbarButton>
    </div>
  );
};
