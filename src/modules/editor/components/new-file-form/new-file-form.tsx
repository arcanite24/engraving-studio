import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../../app.store';
import { createCanvas } from '../../editor.slice';
import * as uuid from 'uuid';

interface Props {
  onSubmit: () => void;
}

interface NewFileFormData {
  name: string;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  gridGap: number;
}

export const NewFileForm = (props: Props) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NewFileFormData>({
    name: 'new-canvas',
    width: 32,
    height: 32,
    tileWidth: 32,
    tileHeight: 32,
    gridGap: 4,
  });

  const onSubmit = (data: NewFileFormData) => {
    console.log('creating new file', data);

    dispatch(
      createCanvas({
        id: uuid.v4(),
        name: data.name,
        tileWidth: data.tileWidth,
        tileHeight: data.tileHeight,
        gridWidth: data.width,
        gridHeight: data.height,
        gridGap: data.gridGap,
      }),
    );

    props.onSubmit();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <FormGroup label="Filename" labelFor="filename" labelInfo="(required)">
        <InputGroup
          id="filename"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="name"
          value={formData.name}
        />
      </FormGroup>

      <FormGroup label="Grid Width" labelFor="gridWidth" labelInfo="(required)">
        <InputGroup
          id="gridWidth"
          type="number"
          name="width"
          value={formData.width.toString()}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: parseInt(e.target.value, 10),
            })
          }
        />
      </FormGroup>

      <FormGroup
        label="Grid Height"
        labelFor="gridHeight"
        labelInfo="(required)"
      >
        <InputGroup
          id="gridHeight"
          type="number"
          name="height"
          value={formData.height.toString()}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: parseInt(e.target.value, 10),
            })
          }
        />
      </FormGroup>

      <FormGroup
        label="Tile Width (in pixels)"
        labelFor="tileWidth"
        labelInfo="(required)"
      >
        <InputGroup
          id="tileWidth"
          name="tileWidth"
          type="number"
          value={formData.tileWidth.toString()}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: parseInt(e.target.value, 10),
            })
          }
        />
      </FormGroup>

      <FormGroup
        label="Tile Height (in pixels)"
        labelFor="tileHeight"
        labelInfo="(required)"
      >
        <InputGroup
          id="tileHeight"
          name="tileHeight"
          type="number"
          value={formData.tileHeight.toString()}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: parseInt(e.target.value, 10),
            })
          }
        />
      </FormGroup>

      <FormGroup
        label="Grid Gap (in pixels)"
        labelFor="gridGap"
        labelInfo="(required)"
      >
        <InputGroup
          id="gridGap"
          name="gridGap"
          type="number"
          value={formData.gridGap.toString()}
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: parseInt(e.target.value, 10),
            })
          }
        />
      </FormGroup>

      <Button type="submit">Create</Button>
    </form>
  );
};
