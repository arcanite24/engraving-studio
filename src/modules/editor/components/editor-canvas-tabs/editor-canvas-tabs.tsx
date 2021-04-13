import { NonIdealState, Tab, Tabs } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { CanvasModel } from '../../../canvas/canvas.model';
import { tabsSelector } from '../../editor.slice';
import { EditorCanvas } from '../editor-canvas/editor-canvas';
import styles from './editor-canvas-tabs.module.css';

const DEFAULT_TAB = 'default';

interface Props {
  onActiveTabChanged?: (lastCanvas: CanvasModel) => void;
}

export const EditorCanvasTabs = ({ onActiveTabChanged }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(DEFAULT_TAB);

  const tabs = useSelector(tabsSelector);

  useEffect(() => {
    if (tabs.length > 0) {
      const lastCanvas = tabs.slice(-1)[0];
      setActiveTab(lastCanvas.id);

      if (onActiveTabChanged) {
        onActiveTabChanged(lastCanvas);
      }
    }
  }, [tabs]);

  return (
    <Tabs
      id="EditorCanvasTabs"
      onChange={(newTab: string) => setActiveTab(newTab)}
      selectedTabId={activeTab}
    >
      <Tab
        id={DEFAULT_TAB}
        title="Home"
        panel={
          <>
            <NonIdealState
              icon={'help'}
              title="Welcome to Engraving Studio!"
              description={'Create a new project using the toolbar'}
            />
          </>
        }
      />

      {tabs.map((tab) => (
        <Tab
          className={styles.tab}
          id={tab.id}
          title={tab.name.substr(0, 10)}
          key={tab.id}
          panel={
            <>
              <EditorCanvas canvas={tab}></EditorCanvas>
            </>
          }
        />
      ))}
    </Tabs>
  );
};
