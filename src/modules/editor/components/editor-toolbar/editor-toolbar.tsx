import React from 'react';
import { useSelector } from 'react-redux';
import { EditorTools } from '../../editor-tools';
import { activeToolSelector } from '../../editor.slice';
import { EditorToolbarButton } from '../editor-toolbar-button/editor-toolbar-button';
import styles from './editor-toolbar.module.css';

interface Props {}

export const EditorToolbar = (props: Props) => {
  const activeTool = useSelector(activeToolSelector);
  console.log('activeTool', activeTool === EditorTools.SelectTool);

  return (
    <div className={styles['editor-toolbar']}>
      <EditorToolbarButton
        icon="select"
        tooltip="Select tool"
        tool={EditorTools.SelectTool}
        isActive={activeTool === EditorTools.SelectTool}
      ></EditorToolbarButton>
      <EditorToolbarButton
        icon="highlight"
        tooltip="Paint tool"
        tool={EditorTools.PaintTool}
        isActive={activeTool === EditorTools.PaintTool}
      ></EditorToolbarButton>
      <EditorToolbarButton
        icon="eraser"
        tooltip="Eraser tool"
        tool={EditorTools.ErasetTool}
        isActive={activeTool === EditorTools.ErasetTool}
      ></EditorToolbarButton>
    </div>
  );
};
