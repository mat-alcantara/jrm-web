import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  const inputReference = useRef<Input>(null);

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

  const [isInputFocused, setisInputFocused] = useState(false);
  const [isInputFilled, setisInputFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setisInputFocused(true);
  }, [isInputFocused]);

  const handleInputBlur = useCallback(() => {
    setisInputFocused(false);

    if (inputReference.current?.state.value) {
      setisInputFilled(true);
    } else {
      setisInputFilled(false);
    }
  }, [isInputFocused, isInputFilled]);

  return (
    <Container
      iserrored={error ? 1 : 0}
      isfocused={isInputFocused ? 1 : 0}
      isfilled={isInputFilled ? 1 : 0}
      ref={inputReference}
      prefix={Icon && <Icon size={iconSize} />}
      {...rest}
      defaultValue={defaultValue}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
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
