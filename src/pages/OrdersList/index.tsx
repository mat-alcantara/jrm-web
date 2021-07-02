import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  Space,
  Typography,
  Popconfirm,
  Input,
  Button,
  Form,
  Radio,
  DatePicker,
  Select,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Modal from 'react-modal';
import AppContainer from '../../components/AppContainer';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

import Tags from '../../components/Tags';

import { Container } from './styles';

interface IDataSource {
  key: string;
  customerName: string;
  order_code: number;
  orderStore: string;
  orderStatus: string;
  price: number;
  deliveryDate: string;
}

interface IOrdersParams {
  type: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '64px 128px',
    width: '800px',
  },
};

const AllOrders: React.FC = () => {
  const {
    loadOrders,
    removeOrder,
    generatePDF,
    updateOrderStatus,
    updateDeliveryDate,
    handleUpdateOrder,
  } = useOrder();
  const { loadCustomers } = useCustomer();
  const { type } = useParams<IOrdersParams>();
  const [form] = Form.useForm();

  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [tableDataSource, setTableDataSource] = useState<IDataSource[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const [addressUpdate, setAddressUpdate] = useState<boolean>(false);
  const [customerAddresses, setCustomerAddresses] = useState<
    { orderId: string; customerAddress: string }[]
  >([]);

  const handleUpdateTableDataSource = useCallback(() => {
    const filteredDataSource = dataSource.filter((data) => {
      const splittedSearchValue = orderSearch.split(' ');

      return splittedSearchValue.every(
        (subs) =>
          data.order_code
            .toString()
            .toLocaleLowerCase()
            .includes(subs.toLocaleLowerCase()) ||
          data.customerName
            .toLocaleLowerCase()
            .includes(subs.toLocaleLowerCase()),
      );
    });

    setTableDataSource([
      ...filteredDataSource.sort((a, b) => a.order_code - b.order_code),
    ]);
  }, [tableDataSource, dataSource, orderSearch]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let ordersFilter: string | null;

    switch (type) {
      case 'producao':
        ordersFilter = 'Em Produção';
        break;
      case 'liberado-para-transporte':
        ordersFilter = 'Liberado para Transporte';
        break;
      case 'transportado':
        ordersFilter = 'Transportado';
        break;
      case 'entregue':
        ordersFilter = 'Entregue';
        break;
      case 'orcamento':
        ordersFilter = 'Orçamento';
        break;
      case 'todas':
        ordersFilter = '';
        break;
      default:
        ordersFilter = null;
    }

    setPageTitle(
      ordersFilter === ''
        ? 'Lista de Pedidos'
        : `Lista de Pedidos - ${ordersFilter}`,
    );

    async function loadDataFromHook() {
      const allCustomersFromHook = await loadCustomers();

      const allOrdersFromHook = await loadOrders();

      // Filter orders with query param
      const filteredOrdersFromHook = allOrdersFromHook.filter((order) => {
        if (ordersFilter !== '') {
          return order.orderStatus === ordersFilter;
        }
        return order;
      });

      const dataToSetDataSource = filteredOrdersFromHook.map((order) => {
        const customerFound = allCustomersFromHook.find(
          (customer) => customer.id === order.customerId,
        );

        return {
          key: order.id,
          order_code: order.order_code,
          orderStore: order.orderStore,
          orderStatus: order.orderStatus,
          deliveryDate: order.deliveryDate,
          price: order.price,
          customerName: customerFound?.name || 'Cliente desconhecido',
        };
      });

      setDataSource([...dataToSetDataSource]);
      setTableDataSource([
        ...dataToSetDataSource.sort((a, b) => a.order_code - b.order_code),
      ]);
    }

    async function loadCustomersAddresses() {
      if (type === 'orcamento') {
        const allOrdersFromHook = await loadOrders();

        const allCustomersFromHook = await loadCustomers();

        allOrdersFromHook.forEach((order) => {
          const selectedCustomer = allCustomersFromHook.find(
            (customer) => customer.id === order.customerId,
          );

          if (selectedCustomer) {
            setCustomerAddresses((prevValue) => [
              ...prevValue,
              { orderId: order.id, customerAddress: selectedCustomer.street },
            ]);
          }
        });
      }
    }

    loadDataFromHook();
    handleUpdateTableDataSource();
    loadCustomersAddresses();
  }, []);

  const handleRemoveOrder = useCallback(
    async (id: string) => {
      await removeOrder(id);

      const filteredDataSource = dataSource.filter((order) => order.key !== id);

      setDataSource([...filteredDataSource]);
    },
    [dataSource],
  );

  const handleUpdateOrderStatus = useCallback(
    async (id: string, orderStatus: string) => {
      let orderUpdated: string;

      switch (orderStatus) {
        case 'Orçamento':
          orderUpdated = 'Em Produção';
          break;
        case 'Em Produção':
          orderUpdated = 'Liberado para Transporte';
          break;
        case 'Liberado para Transporte':
          orderUpdated = 'Entregue';
          break;
        case 'Entregue':
          orderUpdated = 'Em Produção';
          break;
        default:
          orderUpdated = 'Em Produção';
      }

      await updateOrderStatus(id, orderUpdated);

      window.location.reload();
    },
    [dataSource],
  );

  const handleSubmitEstimate = useCallback(
    async ({ ps, paymentStatus, id }) => {
      // Update delivery date
      if (deliveryDate) {
        await updateDeliveryDate(id, deliveryDate);
      } else {
        await updateDeliveryDate(id);
      }

      await handleUpdateOrder({ ps, paymentStatus }, id);
      await handleUpdateOrderStatus(id, 'Orçamento');
    },
    [deliveryDate],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onChangeDate(_: any, dateString: string) {
    const date = new Date(dateString);

    date.setDate(date.getDate() + 1);

    setDeliveryDate(date);
  }

  const columns = [
    {
      title: 'Codigo',
      dataIndex: 'order_code',
      key: 'order_code',
    },
    {
      title: 'Cliente',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Loja do Pedido',
      dataIndex: 'orderStore',
      key: 'oorderStore',
    },
    {
      title: 'Status do Pedido',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Data de Entrega',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: '',
      key: 'action',
      render: (text: string, record: IDataSource) => {
        let buttonMessage;

        switch (record.orderStatus) {
          case 'Orçamento':
            buttonMessage = 'Enviar para produção';
            break;
          case 'Em Produção':
            buttonMessage = 'Concluir etapa';
            break;
          case 'Liberado para Transporte':
            buttonMessage = 'Concluir etapa';
            break;
          case 'Transportado':
            buttonMessage = 'Concluir etapa';
            break;
          case 'Entregue':
            buttonMessage = 'Retornar para Produção';
            break;
          default:
            buttonMessage = null;
        }

        return (
          <Space size="middle">
            <Popconfirm
              title="Tem certeza de que deseja excluir esse pedido?"
              onConfirm={() => handleRemoveOrder(record.key)}
              okText="Sim"
              cancelText="Não"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button type="link">Deletar</Button>
            </Popconfirm>
            <Button type="link" onClick={() => generatePDF(record.key)}>
              Gerar PDF
            </Button>
            {record.orderStatus === 'Em Produção' && <Tags id={record.key} />}
            {buttonMessage && record.orderStatus !== 'Orçamento' && (
              <Popconfirm
                title="Atualizar o status do pedido?"
                onConfirm={() =>
                  handleUpdateOrderStatus(record.key, record.orderStatus)
                }
                okText="Sim"
                cancelText="Não"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button type="primary" style={{ width: '200px' }}>
                  {buttonMessage}
                </Button>
              </Popconfirm>
            )}
            {buttonMessage && record.orderStatus === 'Orçamento' && (
              <>
                <Button
                  onClick={openModal}
                  type="primary"
                  style={{ width: '200px' }}
                >
                  {buttonMessage}
                </Button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Atualizar orçamento"
                >
                  <Typography.Title
                    level={3}
                    style={{ textAlign: 'center', marginBottom: '32px' }}
                  >
                    Atualize o pedido antes de continuar
                  </Typography.Title>
                  <Form
                    onFinish={handleSubmitEstimate}
                    form={form}
                    name="control-hooks"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    labelAlign="left"
                    style={{ textAlign: 'left' }}
                  >
                    <Form.Item
                      name="id"
                      style={{ display: 'none' }}
                      initialValue={record.key}
                    >
                      <Select>
                        <Select.Option value={record.key}>ID</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Tipo de pagamento"
                      name="paymentStatus"
                      required={false}
                      rules={[
                        {
                          required: true,
                          message: 'Por favor, selecione o tipo de pagamento!',
                        },
                      ]}
                    >
                      <Radio.Group>
                        <Radio.Button value="Pago">Pago</Radio.Button>
                        <Radio.Button value="Parcialmente Pago">
                          Parcialmente Pago
                        </Radio.Button>
                        <Radio.Button value="Receber na Entrega">
                          Receber
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label="Data de Entrega">
                      <DatePicker onChange={onChangeDate} />
                    </Form.Item>
                    <Form.Item name="ps" label="Observações">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Tipo de Entrega"
                      name="delivery_type"
                      required={false}
                    >
                      <Radio.Group>
                        <Radio.Button
                          value="Entrega"
                          // onClick={() =>
                          //   selectedCustomer?.street ===
                          //   'Endereço não informado'
                          //     ? setAddressUpdate(true)
                          //     : setAddressUpdate(false)
                          // }
                        >
                          Entrega
                        </Radio.Button>
                        <Radio.Button
                          value="Retirar na Loja"
                          onClick={() => setAddressUpdate(false)}
                        >
                          Retirar na Loja
                        </Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Aprovar
                      </Button>
                      <Button type="default" onClick={() => setIsOpen(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                </Modal>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <AppContainer>
      <Container>
        <Typography.Title level={3}>{pageTitle}</Typography.Title>
        <Input.Search
          placeholder="Digite o código ou nome do cliente"
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
          onSearch={() => handleUpdateTableDataSource()}
          style={{
            maxWidth: '400px',
            margin: '32px auto',
            textAlign: 'center',
          }}
        />
        <Table columns={columns} dataSource={tableDataSource} />
      </Container>
    </AppContainer>
  );
};

export default AllOrders;
