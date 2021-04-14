import React from 'react';
import { InputProps } from 'antd';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface IInputProps extends InputProps {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const AntInput: React.FC<IInputProps> = ({ name, icon: Icon, ...rest }) => {
  return <Container {...rest} prefix={Icon && <Icon size={20} />} />;
};

export default AntInput;
