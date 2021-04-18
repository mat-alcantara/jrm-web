/* eslint-disable no-console */
/* eslint-disable react/jsx-curly-newline */
import React, { useRef } from 'react';
import { FormHandles } from '@unform/core'; // List of props for form reference

import { Form } from '@unform/web';
import { Select } from 'antd';
import { Container } from './styles';

import { areasOfAngraDosReis } from '../../../../utils/listOfAreas';

import AntDashboard from '../../../../components/AntDashboard';
import AntContent from '../../../../components/AntContent';

import AntInput from '../../../../components/AntInput';
import AntButton from '../../../../components/AntButton';
import AntSelect from '../../../../components/AntSelect';

const { Option } = Select;

interface ISubmitData {
  name: string;
  email: string;
  tel: string;
  area: string;
  city: string;
  state: string;
}

const CreateCustomer: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = ({
    name,
    email,
    state,
    area,
    city,
    tel,
  }: ISubmitData) => {
    console.log(name, email, state, area, city, tel);
  };

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Crie um novo cliente</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <AntInput size="large" name="name" placeholder="Nome completo" />
            <AntInput size="large" name="email" placeholder="Email" />
            <AntInput size="large" name="tel" placeholder="Telefone" />
            <AntInput size="large" name="area" placeholder="Bairro" />

            <div>
              <AntSelect
                name="city"
                showSearch
                style={{ width: 200 }}
                placeholder="Cidade"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {areasOfAngraDosReis.sort().map((area) => {
                  return (
                    <Option key={area.toLowerCase()} value={area.toLowerCase()}>
                      {area}
                    </Option>
                  );
                })}
              </AntSelect>
            </div>

            <AntButton block type="primary" htmlType="submit">
              Criar
            </AntButton>
          </Form>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default CreateCustomer;
