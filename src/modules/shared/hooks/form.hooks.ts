// import React from 'react';

import { useState } from 'react';

export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const handleInput = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleValue = (event: any) => {
    return (formState as any)[event.target.name as string];
  };

  const handleSubmit = (callback: (data: T) => void) => {
    return (event: any) => {
      event.preventDefault();
      callback(formState);
    };
  };

  return {
    handleInput,
    handleSubmit,
    handleValue,
    formState,
  };
};
