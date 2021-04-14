import React, { useEffect, useRef } from 'react';
import { InputProps, Input } from 'antd';
import { IconBaseProps } from 'react-icons';

import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface IInputProps extends InputProps {
  name: string;
  iconSize?: number;
  icon?: React.ComponentType<IconBaseProps>;
}

const AntInput: React.FC<IInputProps> = ({
  name,
  icon: Icon,
  iconSize,
  ...rest
}) => {
  const inputReference = useRef(null);

  // Values used by Unform
  const { defaultValue, fieldName, error, registerField } = useField(name);

  // Register the form field immediately after render
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputReference.current,
      path: 'state.value',
    });
  }, [fieldName, registerField]);

  return (
    <Container
      ref={inputReference}
      prefix={Icon && <Icon size={iconSize} />}
      {...rest}
      defaultValue={defaultValue}
      suffix={
        error && (
          <Error title={error}>
            <FiAlertCircle color="#b00020" size={20} />
          </Error>
        )
      }
    />
  );
};

export default AntInput;
