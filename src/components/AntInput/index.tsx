import React from 'react';
import { InputProps } from 'antd';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

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
  return <Container {...rest} prefix={Icon && <Icon size={iconSize} />} />;
};

export default AntInput;
