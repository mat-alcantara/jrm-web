import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  // React.ComponentType allows to pass a component as a property
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputReference = useRef<HTMLInputElement>(null);

  // Values used by Unform
  const { defaultValue, fieldName, error, registerField } = useField(name);

  // Register the form field immediately after render
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputReference.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const [isInputFocused, setisInputFocused] = useState(false);
  const [isInputFilled, setisInputFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setisInputFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setisInputFocused(false);

    if (inputReference.current?.value) {
      setisInputFilled(true);
    } else {
      setisInputFilled(false);
    }
  }, []);

  return (
    <Container
      isErrored={!!error}
      isFocused={isInputFocused}
      isFilled={isInputFilled}
    >
      {Icon && <Icon size={20} />}
      <input
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputReference}
        defaultValue={defaultValue}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#b00020" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
