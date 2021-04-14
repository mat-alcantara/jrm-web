import React from 'react';
import { ButtonProps } from 'antd';

import { Container } from './styles';

type IButtonProps = ButtonProps;

const AntButton: React.FC<IButtonProps> = ({ children, ...rest }) => (
  <Container htmlType="button" {...rest}>
    {children}
  </Container>
);

export default AntButton;
