import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 64px;
  margin: 0px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .ant-list-item {
    padding-left: 0px !important;
  }

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
    }

    page-break-after: auto;
  }
`;

export const MainContent = styled.div``;

export const Footer = styled.div`
  div {
    width: 60%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const JRMInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const CodeAndDataInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  gap: 8px;
  text-align: center;
  font-size: 14px;
`;

export const LowerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;

  > div {
    width: 48%;
    display: flex;
    flex-direction: column;
  }
`;
