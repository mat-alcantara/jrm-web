import React from 'react';

import { StyledLayout } from './styles';

import AntHeader from './AntHeader';
import AntFooter from './AntFooter';

const AntDashboard: React.FC = ({ children }) => {
  return (
    <StyledLayout>
      <AntHeader />
      {children}
      <AntFooter />
    </StyledLayout>
  );
};

export default AntDashboard;
