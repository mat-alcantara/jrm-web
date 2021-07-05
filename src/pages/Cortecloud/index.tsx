import React, { useCallback } from 'react';
import { Input, Form, Typography, Radio, DatePicker, Button } from 'antd';

import { format } from 'date-fns';

import { useCortecloud } from '../../hooks/Cortecloud';

import { Container } from './styles';

interface ICortecloudOrder {
  code: string;
  name: string;
  store: 'Frade' | 'Japuíba';
  delivery: string;
  status:
    | 'Em Produção'
    | 'Liberado para Transporte'
    | 'Transportado'
    | 'Entregue';
}

export const CreateCortecloud: React.FC = () => {
  const { createCortecloud } = useCortecloud();
  const [cortecloudRef] = Form.useForm();

  const handleSubmitCortecloud = useCallback(
    ({
      code,
      delivery,
      name,
      status = 'Em Produção',
      store,
    }: ICortecloudOrder) => {
      const formatedDate = format(new Date(delivery), 'dd/MM/yyyy');
      createCortecloud({ code, delivery: formatedDate, name, status, store });
    },
    [],
  );

  return (
    <Container>
      <Typography.Title level={2}>Cadastre um novo cortecloud</Typography.Title>
      <Form
        onFinish={handleSubmitCortecloud}
        form={cortecloudRef}
        name="cortecloud-control"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        labelAlign="left"
        style={{ marginTop: '16px', marginBottom: '64px', textAlign: 'left' }}
      >
        <Form.Item
          name="code"
          label="Código"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, informe o código do pedido!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Cliente"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, informe o nome do cliente!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="store"
          label="Loja"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, informe a loja do pedido!',
            },
          ]}
        >
          <Radio>
            <Radio.Button value="Frade">Frade</Radio.Button>
            <Radio.Button value="Japuíba">Japuíba</Radio.Button>
          </Radio>
        </Form.Item>
        <Form.Item
          name="delivery"
          label="Data de entrega"
          required={false}
          rules={[
            {
              required: true,
              message: 'Por favor, informe a data de entrega do pedido!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Button htmlType="submit" block type="primary">
          Cadastrar cortecloud
        </Button>
      </Form>
    </Container>
  );
};

export const CortecloudList: React.FC = () => {
  return <h1>CortecloudList</h1>;
};
