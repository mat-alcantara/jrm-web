import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  className?: string;
  title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ className, children, title }) => (
  // className needs to be sent to styled components style the component with styled()
  <Container className={className}>
    {children}
    <span>{title}</span>
  </Container>
);

export default Tooltip;
