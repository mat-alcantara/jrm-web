import React from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Menu,
  Carousel,
  Divider,
} from 'antd';
import { Link } from 'react-router-dom';

import AntButton from '../../components/AntButton';

import { CarouselItem } from './styles';

const { Header, Content, Footer } = Layout;

const MainWebsite: React.FC = () => {
  return (
    <Layout>
      <Header style={{ background: '#fff', width: '100vm' }}>
        <Row justify="center" align="middle">
          <Col span={3} />
          <Col span={6}>
            <Typography.Title
              level={2}
              style={{ color: '#8C4F19', marginBottom: '0px' }}
            >
              JRM Compensados
            </Typography.Title>
          </Col>
          <Col span={9}>
            <Input.Search
              allowClear
              enterButton="Search"
              size="large"
              placeholder="Digite o código ou nome do produto"
              style={{ verticalAlign: 'middle' }}
            />
          </Col>
          <Col span={3}>
            <AntButton
              size="large"
              shape="round"
              type="primary"
              style={{ float: 'right' }}
            >
              <Link to="/signin">Login</Link>
            </AntButton>
          </Col>
          <Col span={3} />
        </Row>
      </Header>
      <Content style={{ background: '#fff', width: '100vm' }}>
        {/* Menu */}
        <Row align="middle" justify="center">
          <Col span={24}>
            <Menu
              mode="horizontal"
              style={{ textAlign: 'center', width: '100%', fontSize: '16px' }}
            >
              <Menu.Item>MDF e Fitas</Menu.Item>
              <Menu.Item>Ferragens</Menu.Item>
              <Menu.Item>Químicos</Menu.Item>
              <Menu.Item>Serviço de Corte</Menu.Item>
              <Menu.Item>Contato</Menu.Item>
              <Menu.Item>Encontre um Marceneiro</Menu.Item>
            </Menu>
          </Col>
        </Row>

        {/* Carousel */}
        <Row>
          <Col span={24}>
            <Carousel>
              <div>
                <CarouselItem>Imagem com promoções</CarouselItem>
              </div>
              <div>
                <CarouselItem>Imagem com Promoções</CarouselItem>
              </div>
            </Carousel>
          </Col>
        </Row>

        <Divider orientation="center">
          <Typography.Title
            level={3}
            style={{ color: '#8C4F19', marginTop: '32px' }}
          >
            Produtos em destaque
          </Typography.Title>
        </Divider>

        {/* Lista com produtos mais vendidos */}

        <Row gutter={[24, 24]} align="middle" justify="center">
          <Col span={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: '#c1c1c1',
                margin: '0 auto',
              }}
            />
            <h3 style={{ marginTop: '16px' }}>Nome do Produto</h3>
            <p>Descrição do produto</p>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: '#c1c1c1',
                margin: '0 auto',
              }}
            />
            <h3 style={{ marginTop: '16px' }}>Nome do Produto</h3>
            <p>Descrição do produto</p>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: '#c1c1c1',
                margin: '0 auto',
              }}
            />
            <h3 style={{ marginTop: '16px' }}>Nome do Produto</h3>
            <p>Descrição do produto</p>
          </Col>
        </Row>
        <Row
          gutter={[24, 24]}
          align="middle"
          justify="center"
          style={{ marginTop: '32px' }}
        >
          <Col span={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: '#c1c1c1',
                margin: '0 auto',
              }}
            />
            <h3 style={{ marginTop: '16px' }}>Nome do Produto</h3>
            <p>Descrição do produto</p>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: '#c1c1c1',
                margin: '0 auto',
              }}
            />
            <h3 style={{ marginTop: '16px' }}>Nome do Produto</h3>
            <p>Descrição do produto</p>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                background: '#c1c1c1',
                margin: '0 auto',
              }}
            />
            <h3 style={{ marginTop: '16px' }}>Nome do Produto</h3>
            <p>Descrição do produto</p>
          </Col>
        </Row>

        <Divider>
          <Typography.Title
            level={3}
            style={{ color: '#8C4F19', marginTop: '32px' }}
          >
            Marceneiros parceiros
          </Typography.Title>
        </Divider>

        {/* Marceneiros Parceiros */}
        <Row
          align="middle"
          justify="center"
          gutter={[24, 24]}
          style={{ marginBottom: '32px' }}
        >
          <Col span={6} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Cliente de testes</Typography.Title>
            <Typography>Frade, Angra dos Reis - RJ</Typography>
            <Typography>(24) 99999 - 9999 | (24) 99999 - 9999</Typography>
            <a href="/signin">Entre em contato</a>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Cliente de testes</Typography.Title>
            <Typography>Frade, Angra dos Reis - RJ</Typography>
            <Typography>(24) 99999 - 9999 | (24) 99999 - 9999</Typography>
            <a href="/signin">Entre em contato</a>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Cliente de testes</Typography.Title>
            <Typography>Frade, Angra dos Reis - RJ</Typography>
            <Typography>(24) 99999 - 9999 | (24) 99999 - 9999</Typography>
            <a href="/signin">Entre em contato</a>
          </Col>
        </Row>
        <Row
          align="middle"
          justify="center"
          gutter={[24, 24]}
          style={{ marginBottom: '32px' }}
        >
          <Col span={6} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Cliente de testes</Typography.Title>
            <Typography>Frade, Angra dos Reis - RJ</Typography>
            <Typography>(24) 99999 - 9999 | (24) 99999 - 9999</Typography>
            <a href="/signin">Entre em contato</a>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Cliente de testes</Typography.Title>
            <Typography>Frade, Angra dos Reis - RJ</Typography>
            <Typography>(24) 99999 - 9999 | (24) 99999 - 9999</Typography>
            <a href="/signin">Entre em contato</a>
          </Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>Cliente de testes</Typography.Title>
            <Typography>Frade, Angra dos Reis - RJ</Typography>
            <Typography>(24) 99999 - 9999 | (24) 99999 - 9999</Typography>
            <a href="/signin">Entre em contato</a>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'left', background: '#f1f1f1' }}>
        <Typography>
          Aqui estarão todas as informações da loja: Telefones, emails, redes
          sociais, links de contato...
        </Typography>
        <Typography style={{ marginTop: '32px' }}>
          JRM Compensados ©2021 Created by Mateus Alcantara
        </Typography>
      </Footer>
    </Layout>
  );
};

export default MainWebsite;
