import React from 'react';

import { StyledContent } from './styles';

const AntContent: React.FC = ({ children }) => {
  return (
    <StyledContent>
      <div>{children}</div>
    </StyledContent>
  );
};

export default AntContent;
