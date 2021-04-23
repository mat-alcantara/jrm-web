import styled from 'styled-components';

export const Container = styled.div``;

export const CustomerList = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 16px;

  span {
    text-align: left;

    & + span {
      margin-top: 8px;
    }
  }
`;

export const OrderContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;
