import { NonIdealState, Tab, Tabs } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { CanvasModel } from '../../../canvas/canvas.model';
import { tabsSelector } from '../../editor.slice';
import { EditorCanvas } from '../editor-canvas/editor-canvas';
import styles from './editor-canvas-tabs.module.css';

const DEFAULT_TAB = 'default';

interface Props {
  images: Record<string, HTMLImageElement>;
  onActiveTabChanged?: (lastCanvas: CanvasModel) => void;
}

export const EditorCanvasTabs = ({ onActiveTabChanged, images }: Props) => {
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
              description={
                <div style={{ textAlign: 'left' }}>
                  <ol>
                    <li>Create a new project using the toolbar</li>
                    <li>
                      You can modifiy some parameters when creating a new
                      project, then start using your tools on the right panel
                    </li>
                    <li>
                      Select the "Paint Tool" then select a block from the
                      palette and start painting on your canvas
                    </li>
                    <li>
                      If you need to rotate a block choose the "Select Tool"
                      then select a block in the canvas and press "R" on your
                      keyboard
                    </li>
                    <li>
                      Use the "Eraser Tool" to delete any block on your canvas
                    </li>
                    <li>
                      When you're done with your design, just press the "Export
                      to PNG" button to save an image of your canvas
                    </li>
                  </ol>
                </div>
              }
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
              <EditorCanvas canvas={tab} images={images}></EditorCanvas>
            </>
          }
        />
      ))}
    </Tabs>
  );
};
