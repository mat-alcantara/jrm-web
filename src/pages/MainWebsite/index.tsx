import React, { useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Menu,
  Carousel,
  Divider,
  Grid,
} from 'antd';
import { Link } from 'react-router-dom';

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

const MainWebsite: React.FC = () => {
  const [allProducts, setAllProducts] = useState<IProducts[]>([]);
  const { useBreakpoint } = Grid;
  const sizes = useBreakpoint();

  useEffect(() => {
    setAllProducts([...allData]);
  }, []);

  return (
    <Layout>
      <Header style={{ background: '#fff', width: '100vm' }}>
        <Row justify="center" align="middle">
          <Col
            xl={6}
            md={7}
            xs={15}
            xxl={3}
            sm={15}
            style={{ marginTop: '8px' }}
          >
            <Typography.Title
              level={4}
              style={{
                color: '#8C4F19',
                marginBottom: '0px',
                textAlign: 'center',
                verticalAlign: 'middle',
              }}
            >
              JRM Compensados
            </Typography.Title>
          </Col>
          <Col md={9} sm={17} xs={17} xxl={10}>
            <Input.Search
              allowClear
              enterButton="Search"
              size="large"
              placeholder="Digite o código ou nome do produto"
              style={{ verticalAlign: 'middle' }}
            />
          </Col>
          <Col sm={5} xs={5} xl={3} offset={2}>
            <Link to="/signin">
              <AntButton
                type="primary"
                size="large"
                style={{
                  verticalAlign: 'middle',
                  width: '100%',
                }}
              >
                Login
              </AntButton>
            </Link>
          </Col>
        </Row>
      </Header>
      <Content style={{ background: '#fff', width: '100vm' }}>
        {/* Menu */}
        <Row align="middle" justify="center">
          <Col xl={24} md={16} sm={1} xs={1}>
            <StyledMenu
              mode="horizontal"
              style={{
                textAlign: 'center',
                width: '100%',
                fontSize: '16px',
              }}
              sizes={sizes}
            >
              <Menu.Item>MDF e Fitas</Menu.Item>
              <Menu.Item>Ferragens</Menu.Item>
              <Menu.Item>Químicos</Menu.Item>
              <Menu.Item>Serviço de Corte</Menu.Item>
              <Menu.Item>Contato</Menu.Item>
              <Menu.Item>Encontre um Marceneiro</Menu.Item>
            </StyledMenu>
          </Col>
        </Row>

        {/* Carousel */}
        <Row align="middle" justify="center">
          <Col xxl={17} xl={24} lg={24} md={0} sm={0} xs={0}>
            <Carousel style={{ height: '300px' }}>
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
