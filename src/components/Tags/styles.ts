import styled from 'styled-components';

export const Container = styled.div``;

export const TagContainer = styled.div`
  font-size: 13px;
  margin: 32px 64px;
  height: 90vh;

  @media all {
    .page-break {
      display: none;
    }
  }

  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }

  @media print {
    .page-break {
      margin-top: 1rem;
      display: block;
      page-break-before: auto;
      page-break-after: auto;
    }
  }

  @page {
    size: auto;
    margin: 20mm;
  }
`;

export const OrderDataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TagList = styled.ul`
  margin-top: 32px;
  display: block;
`;

export const TagItem = styled.li`
  float: left;
  width: 33%;
  height: 150px;
  list-style: none;
  font-size: 8px;
  text-align: center;
  padding: 16px;

  img {
    width: 60px;
    height: auto;
  }

  span {
    float: left;
    width: 100%;
  }
`;

export const Checklist = styled.div`
  margin-top: 16px;
  text-align: center;
`;

export const ChecklistItem = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  text-align: left;
`;
