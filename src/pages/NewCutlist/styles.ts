import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

export const CustomerSelectionContainer = styled.div`
  text-align: center;
`;

export const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 128px;

  span {
    width: 100px;
    height: 100px;

    i {
      width: 40px;
      height: 40px;
    }
  }
`;
