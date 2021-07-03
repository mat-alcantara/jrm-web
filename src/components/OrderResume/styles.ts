import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 64px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
    }

    page-break-after: auto;
  }
`;
