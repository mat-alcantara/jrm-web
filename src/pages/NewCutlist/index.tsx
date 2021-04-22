import React, { useState } from 'react';

import api from '../../services/api';

import AntDashboard from '../../components/AntDashboard';
import AntContent from '../../components/AntContent';

interface ICustomersProps {
  id: string;
  name: string;
  telephone: string;
  email: string;
  street: string;
  area: string;
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
}

const NewCutlist: React.FC = () => {
  const token = localStorage.getItem('@JRMCompensados:token');

  const [allCustomers] = useState<Promise<ICustomersProps[]>>(async () => {
    const allCustomersFromApi = await api.get<ICustomersProps[]>('/customers', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    return allCustomersFromApi.data;
  });

  return (
    <AntDashboard>
      <AntContent>
        <div>
          <h1>Crie um novo serviço</h1>
        </div>
      </AntContent>
    </AntDashboard>
  );
};

export default NewCutlist;
