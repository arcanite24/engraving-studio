import {
  Alignment,
  Button,
  Classes,
  Dialog,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import React, { useState } from 'react';
import { AppConfig } from '../../../../app.config';
import { NewFileForm } from '../new-file-form/new-file-form';
import { FileMenu } from './file-menu';
import { HelpMenu } from './help-menu';

interface Props {}

export const EditorNavbar = (props: Props) => {
  const [newFileIsOpen, setNewFileIsOpen] = useState<boolean>(false);

  return (
    <>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <img
            src="https://deimos.app/static/logo-trans-70aac2c53c6f22ff55b9ff577db73a2e.svg"
            alt=""
            style={{ height: '50%', marginRight: '1rem' }}
          />
          <NavbarHeading>{AppConfig.APP_TITLE}</NavbarHeading>
          <NavbarDivider />
          <Popover2
            content={<FileMenu onNewFile={() => setNewFileIsOpen(true)} />}
            placement={'bottom-start'}
          >
            <Button className={Classes.MINIMAL} text="File" />
          </Popover2>
          <Popover2 content={HelpMenu} placement={'bottom-start'}>
            <Button className={Classes.MINIMAL} text="Help" />
          </Popover2>
        </NavbarGroup>
      </Navbar>

      <Dialog
        isOpen={newFileIsOpen}
        onClose={() => setNewFileIsOpen(false)}
        usePortal={true}
        autoFocus={true}
        canOutsideClickClose={true}
        canEscapeKeyClose={true}
        title="New File"
      >
        <div className={Classes.DIALOG_BODY}>
          <NewFileForm
            onSubmit={() => {
              setNewFileIsOpen(false);
            }}
          ></NewFileForm>
        </div>
      </Dialog>
    </>
  );
};
