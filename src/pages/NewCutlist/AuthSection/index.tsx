import React, { useState, useCallback } from 'react';
import { Typography, Form, Input, Button, Grid, Row, Col } from 'antd';

import { useAuth } from '../../../hooks/Auth';

import { Container } from './styles';

interface IAuthSectionProps {
  setIsAuthenticated(authState: boolean): void;
}

const AuthSection: React.FC<IAuthSectionProps> = ({ setIsAuthenticated }) => {
  const [form] = Form.useForm();
  const { user, checkAuth } = useAuth();

  const breakpoint = Grid.useBreakpoint();

  const [isAuthErrored, setIsAuthErrored] = useState<boolean>(false);

  const handleSubmitAuth = useCallback(async (formData) => {
    setIsAuthErrored(false);

    const checkIfAuthIsCorrect = await checkAuth({
      email: user.email,
      password: formData.password,
    });

    if (checkIfAuthIsCorrect) {
      setIsAuthenticated(true);
    } else {
      setIsAuthErrored(true);
    }
  }, []);

  return (
    <Container>
      <Row align="middle" justify="center" style={{ textAlign: 'center' }}>
        <Col span={24}>
          <Typography.Title
            level={2}
            style={{ marginTop: breakpoint.md ? '32px' : '16px' }}
          >
            {`Olá, ${user.name}`}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Typography
            style={{
              fontSize: breakpoint.md ? '24px' : '16px',
              marginBottom: '16px',
            }}
          >
            Digite a sua senha para continuar...
          </Typography>
        </Col>
      </Row>

      <Form
        onFinish={handleSubmitAuth}
        form={form}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}
      >
        <Form.Item
          name="password"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, digite a sua senha!',
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Senha"
            style={{ textAlign: 'center' }}
          />
        </Form.Item>

        <Button htmlType="submit" type="primary" block>
          Confirmar
        </Button>
      </Form>
      {isAuthErrored && (
        <Typography
          style={{
            color: 'red',
            marginTop: '16px',
            textAlign: 'center',
          }}
        >
          SENHA INVÁLIDA
        </Typography>
      )}
    </Container>
  );
};

export default AuthSection;
