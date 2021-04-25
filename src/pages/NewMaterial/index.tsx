import React, { useCallback } from 'react';
import { Form } from '@unform/web';

import { Container } from './styles';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

import AntInput from '../../components/AntInput';
import AntInputNumber from '../../components/AntInputNumber';
import AntButton from '../../components/AntButton';

const NewMaterial: React.FC = () => {
  const handleFormSubmit = useCallback(() => {
    console.log('ok');
  }, []);

  return (
    <AntDashboard>
      <AntContent>
        <Container>
          <h1>Crie um novo material</h1>
          <Form onSubmit={handleFormSubmit}>
            <AntInput name="name" placeholder="Material" />
            <div>
              <AntInputNumber name="price" placeholder="Preço" />
              <AntInputNumber name="width" placeholder="Largura" />
              <AntInputNumber name="height" placeholder="Altura" />
            </div>
            <AntButton htmlType="submit" type="primary" block>
              Criar
            </AntButton>
          </Form>
        </Container>
      </AntContent>
    </AntDashboard>
  );
};

export default NewMaterial;
