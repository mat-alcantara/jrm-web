import styled, { css } from 'styled-components';
import { Menu } from 'antd';

interface MenuProps {
  sizes: Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', boolean>>;
}

export const Container = styled.div``;

export const HeaderContainer = styled.div`
  margin: 0 auto;
`;

export const CarouselItem = styled.h3`
  height: 300px;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #364d79;
`;

export const StyledMenu = styled(Menu)<MenuProps>`
  text-align: center;
  min-width: 600px;
  margin-left: 8px;
  ${(props) =>
    !props.sizes.md &&
    css`
      min-width: 0;
    `}
`;
