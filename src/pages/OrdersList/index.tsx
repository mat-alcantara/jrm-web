import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  Spin,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Modal from 'react-modal';
import IAddressData from 'types/IAddressData';
import AppContainer from '../../components/AppContainer';
import OrderResume from '../../components/OrderResume';

import { useOrder } from '../../hooks/Order';
import { useCustomer } from '../../hooks/Customer';

import Tags from '../../components/Tags';

import { Container } from './styles';

import { areas } from '../../utils/listOfAreas';

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

interface IAddressForm extends IAddressData {
  orderId: string;
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

Modal.setAppElement('#root');

const AllOrders: React.FC = () => {
  const {
    loadOrders,
    removeOrder,
    updateOrderStatus,
    updateDeliveryDate,
    handleUpdateOrder,
  } = useOrder();
  const { loadCustomers, updateCustomerAddress } = useCustomer();
  const { type } = useParams<IOrdersParams>();
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const history = useHistory();

  const [dataSource, setDataSource] = useState<IDataSource[]>([]);
  const [tableDataSource, setTableDataSource] = useState<IDataSource[]>([]);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const [addressUpdate, setAddressUpdate] = useState<boolean>(false);
  const [customerAddresses, setCustomerAddresses] = useState<
    { orderId: string; customerAddress: string; customerId: string }[]
  >([]);
  const [orderId, setOrderId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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

  function openModal(id: string) {
    setOrderId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const options = {
    areaOptions: areas.sort().map((area: string) => {
      return {
        value: area,
        label: area,
      };
    }),
  };

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
        ...dataToSetDataSource.sort((a, b) => b.order_code - a.order_code),
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
              {
                orderId: order.id,
                customerAddress: selectedCustomer.street,
                customerId: selectedCustomer.id,
              },
            ]);
          }
        });
      }
    }

    loadDataFromHook();
    handleUpdateTableDataSource();
    loadCustomersAddresses();
    setLoading(false);
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
          orderUpdated = 'Transportado';
          break;
        case 'Transportado':
          orderUpdated = 'Entregue';
          break;
        case 'Entregue':
          orderUpdated = 'Em Produção';
          break;
        default:
          orderUpdated = 'Em Produção';
      }

      await updateOrderStatus(id, orderUpdated);

      if (type === 'orcamento') {
        history.push('/orders/producao');
      } else {
        window.location.reload();
      }
    },
    [dataSource],
  );

  const handleSubmitEstimate = useCallback(
    async ({ ps, paymentStatus, delivery_type }) => {
      // Update delivery date
      if (deliveryDate) {
        await updateDeliveryDate(orderId, deliveryDate);
      } else {
        await updateDeliveryDate(orderId);
      }

      await handleUpdateOrder({ ps, paymentStatus, delivery_type }, orderId);
      await handleUpdateOrderStatus(orderId, 'Orçamento');
    },
    [deliveryDate],
  );

  const handleSubmitCustomerAddress = useCallback(
    async (addressData: IAddressForm) => {
      const selectedCustomer = customerAddresses.find(
        (customer) => customer.orderId === orderId,
      );

      if (selectedCustomer) {
        await updateCustomerAddress(
          {
            area: addressData.area,
            city: addressData.city,
            street: addressData.street,
          },
          selectedCustomer.customerId,
        );
      }

      setAddressUpdate(false);
    },
    [addressUpdate],
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
            buttonMessage = 'Confirmar corte';
            break;
          case 'Liberado para Transporte':
            buttonMessage = 'Confirmar transporte';
            break;
          case 'Transportado':
            buttonMessage = 'Confirmar recebimento';
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

            <OrderResume orderId={record.key} />
            <Tags id={record.key} />
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
                  onClick={() => openModal(record.key)}
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
                          onClick={() => {
                            const selectedCustomer = customerAddresses.find(
                              (customer) => customer.orderId === record.key,
                            );

                            selectedCustomer?.customerAddress ===
                            'Endereço não informado'
                              ? setAddressUpdate(true)
                              : setAddressUpdate(false);
                          }}
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
                        marginTop: '32px',
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!!addressUpdate}
                      >
                        Aprovar
                      </Button>
                      <Button type="default" onClick={() => setIsOpen(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                  {addressUpdate && (
                    <Form
                      onFinish={handleSubmitCustomerAddress}
                      form={addressForm}
                      name="address-hooks"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      layout="horizontal"
                      labelAlign="left"
                      style={{ textAlign: 'left' }}
                    >
                      <Typography.Title
                        level={5}
                        type="danger"
                        style={{
                          marginTop: '32px',
                          marginBottom: '32px',

                          textAlign: 'center',
                        }}
                      >
                        Endereço do cliente não fornecido. Atualize para
                        continuar...
                      </Typography.Title>
                      <Form.Item
                        name="street"
                        label="Endereço"
                        rules={[
                          {
                            required: true,
                            message: 'Por favor, digite um endereço!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Bairro"
                        name="area"
                        rules={[
                          {
                            required: true,
                            message: 'Por favor, selecione um bairro!',
                          },
                        ]}
                      >
                        <Select showSearch>
                          {options.areaOptions.map((area) => (
                            <Select.Option value={area.value}>
                              {area.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Cidade"
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: 'Por favor, selecione a cidade!',
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Radio.Button value="Angra dos Reis">
                            Angra dos Reis
                          </Radio.Button>
                          <Radio.Button value="Paraty">Paraty</Radio.Button>
                          <Radio.Button value="Rio de Janeiro">
                            Rio de Janeiro
                          </Radio.Button>
                        </Radio.Group>
                      </Form.Item>

                      <Button block htmlType="submit" type="primary">
                        Atualizar endereço
                      </Button>
                    </Form>
                  )}
                </Modal>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  if (loading) {
    return <Spin style={{ margin: 'auto auto' }} />;
  }

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
