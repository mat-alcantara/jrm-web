import styled from 'styled-components';

export const Container = styled.div``;

export const TagContainer = styled.div`
  margin: 64px 32px;
`;

export const OrderDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 32px;
  gap: 32px;
`;

export const TagItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 30%;
  font-size: 12px;
  text-align: center;
  padding: 16px;
  img {
    width: 60px;
    height: auto;
  }
`;

export const Checklist = styled.div`
  margin: 32px 0px 0px 64px;
  text-align: center;
`;

export const ChecklistItem = styled.div`
  gap: 16px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  text-align: left;
`;
