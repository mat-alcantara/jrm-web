import React, { useEffect, useRef } from 'react';
import { InputNumberProps } from 'antd';

import { useField } from '@unform/core';

import { StyledInputNumber } from './styles';

interface IInputNumberProps extends InputNumberProps {
  name: string;
}

const AntInputNumber: React.FC<IInputNumberProps> = ({ name, ...rest }) => {
  const inputReference = useRef<HTMLInputElement>(null);

  // Values used by Unform
  const { defaultValue, fieldName, registerField } = useField(name);

  // Register the form field immediately after render
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputReference.current,
      path: 'value', // Path where the input value is stored
    });
  }, [fieldName, registerField]);

  return (
    <StyledInputNumber
      defaultValue={defaultValue}
      ref={inputReference}
      {...rest}
    />
  );
};

export default AntInputNumber;
