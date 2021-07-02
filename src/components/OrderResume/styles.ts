import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 64px;
  font-size: 12px;

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
    }

    page-break-after: auto;
  }
`;
