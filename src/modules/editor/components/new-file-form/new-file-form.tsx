import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../../app.store';
import { useForm } from '../../../shared/hooks/form.hooks';
import { createCanvas } from '../../editor.slice';
import * as uuid from 'uuid';

interface Props {
  onSubmit: () => void;
}

interface NewFileFormData {
  name: string;
  width: number;
  height: number;
}

export const NewFileForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const { handleInput, handleSubmit } = useForm<NewFileFormData>({
    name: 'new-canvas-' + new Date().toISOString(),
    width: 32,
    height: 32,
  });

  const onSubmit = (data: NewFileFormData) => {
    dispatch(
      createCanvas({
        id: uuid.v4(),
        name: data.name,
        tileWidth: 32,
        tileHeight: 32,
        gridWidth: data.width,
        gridHeight: data.height,
        gridGap: 2,
      }),
    );

    props.onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Filename" labelFor="filename" labelInfo="(required)">
        <InputGroup id="filename" onChange={handleInput} name="filename" />
      </FormGroup>

      <FormGroup label="Grid Width" labelFor="gridWidth" labelInfo="(required)">
        <InputGroup id="gridWidth" type="number" />
      </FormGroup>

      <FormGroup
        label="Grid Height"
        labelFor="gridHeight"
        labelInfo="(required)"
      >
        <InputGroup id="gridHeight" type="number" />
      </FormGroup>

      <Button type="submit">Create</Button>
    </form>
  );
};
