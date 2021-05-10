import styled, { css } from 'styled-components';
import { Menu } from 'antd';

interface MenuProps {
  sizes: Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', boolean>>;
}

export const Container = styled.div``;

export const CarouselItem = styled.h3`
  height: 300px;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #364d79;
`;

export const StyledMenu = styled(Menu)<MenuProps>`
  text-align: center;
  width: 100%;
  font-size: 16px;
  ${(props) =>
    (props.sizes.sm || props.sizes.xs) &&
    css`
      margin-top: 32px;
    `}
`;
