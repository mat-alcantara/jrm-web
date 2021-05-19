import React, { useCallback, useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Carousel,
  Divider,
  Menu,
  Grid,
  AutoComplete,
} from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

import AntButton from '../../components/AntButton';

import { CarouselItem, StyledMenu } from './styles';
import allData from '../../products';
import allWoorworkers from '../../woodworkers';

import Carr1 from '../../assets/carr1.png';
import Carr2 from '../../assets/carr2.png';

const { Header, Content, Footer } = Layout;

interface IProducts {
  name: string;
  product_code: number;
  image: string;
  description: string;
  brand: string;
  isTop: boolean;
  department: string;
  material: string[];
  technical_information: Object;
}

interface optionsProps {
  value: string;
  label: JSX.Element;
}

const MainWebsite: React.FC = () => {
  const [allProducts, setAllProducts] = useState<IProducts[]>([]);
  const [allOptions, setAllOptions] = useState<optionsProps[]>([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<
    optionsProps[]
  >([]);

  const { useBreakpoint } = Grid;
  const sizes = useBreakpoint();

  const formatOption = useCallback(
    (code: number, name: string, imgURL: string) => {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '0px 32px',
          }}
        >
          <Typography.Title level={4} style={{ fontWeight: 'normal' }}>
            {`${code} - ${name}`}
          </Typography.Title>
          <img style={{ width: '75px', height: '75px' }} src={imgURL} alt="" />
        </div>
      );
    },
    [],
  );

  const onSearchProduct = useCallback(
    (searchValue: string) => {
      const allAutoCompleteResults = allOptions.filter((option) => {
        const splittedValue = searchValue.split(' ');

        // Check if string contain all items from array of substrings
        return splittedValue.every((subs) =>
          option.value.toLocaleLowerCase().includes(subs.toLocaleLowerCase()),
        )
          ? option
          : '';
      });

      setAutoCompleteOptions(!searchValue ? [] : [...allAutoCompleteResults]);
    },
    [allOptions, autoCompleteOptions],
  );

  useEffect(() => {
    setAllProducts([...allData]);

    allData.forEach((data) => {
      setAllOptions((prevVal) => [
        ...prevVal,
        {
          value: `${data.product_code} - ${data.name}`,
          label: formatOption(data.product_code, data.name, data.image),
        },
      ]);
    });
  }, []);

  return (
    <Layout>
      <Header
        style={{
          background: '#fff',
          boxShadow: '0 2px 8px #f0f1f2',
          maxWidth: '100vm',
          height: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Row
          style={{
            display: 'flex',
            flexFlow: 'nowrap',
            height: '64px',
            rowGap: '0px',
            maxWidth: '100vm',
          }}
        >
          <Col
            xxl={4}
            xl={5}
            lg={6}
            md={6}
            sm={22}
            xs={22}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: sizes.md ? 'start' : 'center',
              textAlign: sizes.md ? 'left' : 'center',
            }}
          >
            <Typography.Title
              level={3}
              style={{
                color: '#8C4F19',
                textAlign: 'left',
                margin: '0',
                marginTop: !sizes.md ? '8px' : '0px',
              }}
            >
              JRM Compensados
            </Typography.Title>
          </Col>
          <Col
            xxl={20}
            xl={19}
            lg={18}
            md={18}
            sm={0}
            xs={0}
            style={{
              display: !sizes.md ? 'none' : 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <AutoComplete
              dropdownMatchSelectWidth={500}
              style={{ width: '100%' }}
              options={autoCompleteOptions}
              onSearch={onSearchProduct}
            >
              <Input.Search
                allowClear
                enterButton
                size="middle"
                placeholder="Digite o código ou nome do produto"
                style={{
                  verticalAlign: 'middle',
                  marginLeft: '8px',
                }}
              />
            </AutoComplete>
            <StyledMenu mode="horizontal" sizes={sizes} direction="ltr">
              <Menu.SubMenu
                title="Compre por Departamento"
                icon={<MenuOutlined />}
              >
                <Menu.Item>MDF e Fitas</Menu.Item>
                <Menu.Item>Ferragens</Menu.Item>
                <Menu.Item>Químicos</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item>Serviço de Corte</Menu.Item>
              <Menu.Item>Contato</Menu.Item>
              <Menu.Item style={{ margin: '0 auto', textAlign: 'center' }}>
                <Link to="/signin">
                  <AntButton type="link" size="middle" block>
                    Login
                  </AntButton>
                </Link>
              </Menu.Item>
            </StyledMenu>
          </Col>
          <Col sm={2} xs={2} md={0} xl={0} xxl={0}>
            <StyledMenu
              mode="horizontal"
              sizes={sizes}
              direction="ltr"
              triggerSubMenuAction="click"
              overflowedIndicator={<MenuOutlined />}
            >
              <Input.Search
                allowClear
                enterButton
                size="middle"
                placeholder="Código ou nome do produto"
                style={{
                  verticalAlign: 'middle',
                  marginLeft: '8px',
                }}
              />
              <Menu.SubMenu
                title="Compre por Departamento"
                icon={<MenuOutlined />}
              >
                <Menu.Item>MDF e Fitas</Menu.Item>
                <Menu.Item>Ferragens</Menu.Item>
                <Menu.Item>Químicos</Menu.Item>
              </Menu.SubMenu>
              <Menu.Item>Serviço de Corte</Menu.Item>
              <Menu.Item>Contato</Menu.Item>
              <Menu.Item>
                <Link to="/signin">
                  <AntButton
                    type="link"
                    size="middle"
                    style={{ paddingLeft: '0px' }}
                  >
                    Login
                  </AntButton>
                </Link>
              </Menu.Item>
            </StyledMenu>
          </Col>
        </Row>
      </Header>
      <Content style={{ background: '#fff', width: '100vm' }}>
        {/* Carousel */}
        <Row align="middle" justify="center">
          <Col xxl={17} xl={24} lg={24} md={0} sm={0} xs={0}>
            <Carousel style={{ height: '300px', marginTop: '16px' }}>
              <div>
                <CarouselItem>
                  <img src={Carr1} alt="Carrousel 1" />
                </CarouselItem>
              </div>
              <div>
                <CarouselItem>
                  <img src={Carr2} alt="Carrousel 2" />
                </CarouselItem>
              </div>
            </Carousel>
          </Col>
        </Row>

        <Divider orientation="center">
          <Typography.Title
            level={1}
            style={{ color: '#8C4F19', marginTop: '16px' }}
          >
            Produtos em destaque
          </Typography.Title>
        </Divider>

        {/* Lista com produtos mais vendidos */}
        <Row
          gutter={[24, 64]}
          align="top"
          justify="center"
          style={{ marginTop: '32px' }}
        >
          {allProducts.map((product) => (
            <Col lg={7} sm={24} md={11} style={{ textAlign: 'center' }}>
              <img
                src={product.image}
                alt="Ok"
                style={{
                  width: '150px',
                  height: '150px',
                  background: '#c1c1c1',
                  margin: '0 auto',
                }}
              />

              <a href="/">
                <h3 style={{ marginTop: '16px' }}>{product.name}</h3>
              </a>
              <p>
                {product.description.substring(0, 40)}
                ...
              </p>
            </Col>
          ))}
        </Row>

        <Divider>
          <Typography.Title
            level={1}
            style={{ color: '#8C4F19', marginTop: '64px' }}
          >
            Marceneiros parceiros
          </Typography.Title>
        </Divider>

        {/* Marceneiros Parceiros */}
        <Row
          align="middle"
          justify="center"
          gutter={[24, 64]}
          style={{ marginBottom: '32px', marginTop: '32px' }}
        >
          {allWoorworkers.map((woodworker) => (
            <Col lg={7} sm={24} md={11} style={{ textAlign: 'center' }}>
              <Typography.Title level={4}>{woodworker.name}</Typography.Title>
              <Typography>{woodworker.address}</Typography>
              <Typography>{woodworker.telephone}</Typography>
              <a href="/signin">Entre em contato</a>
            </Col>
          ))}
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#f1f1f1' }}>
        <Typography>
          Frade: (24) 99964-4953 | Japuíba: (24) 99969-4543
        </Typography>
        <Typography>Email: jrmcompensados@hotmail.com</Typography>

        <Typography style={{ marginTop: '32px' }}>
          JRM Compensados ©2021 Created by Mateus Alcantara
        </Typography>
      </Footer>
    </Layout>
  );
};

export default MainWebsite;
