import React from 'react';

import { StyledLayout } from './styles';

import AntHeader from './AntHeader';
import AntFooter from './AntFooter';

interface AntDashboardProps {
  whereIAm: string;
}

const AntDashboard: React.FC<AntDashboardProps> = ({ children, whereIAm }) => {
  const selectedPage = whereIAm;

  return (
    <StyledLayout>
      <AntHeader selectedPage={selectedPage} />
      {children}
      <AntFooter />
    </StyledLayout>
  );
};

export default AntDashboard;
