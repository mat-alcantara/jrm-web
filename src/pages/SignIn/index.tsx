import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core'; // List of props for form reference
import * as Yup from 'yup';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import AntButton from '../../components/AntButton';
import AntInput from '../../components/AntInput';

interface submitProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const validateLoginProps = useCallback(
    async ({ email, password }: submitProps) => {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });

      const isPropsValid = await schema.validate(
        { email, password },
        {
          // Faz com que todos os erros sejam pegos pelo catch
          abortEarly: false,
        },
      );

      return isPropsValid;
    },
    [],
  );

  const handleSubmit = useCallback(
    async ({ email, password }: submitProps) => {
      try {
        formRef.current?.setErrors({});

        await validateLoginProps({ email, password });

        await signIn({ email, password });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer login. Cheque as suas credenciais.',
        });
      }
    },
    [validateLoginProps, signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="JRM Compensados" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça o seu login</h1>
            <AntInput
              name="email"
              icon={FiMail}
              size="large"
              iconSize={20}
              type="text"
              placeholder="E-mail"
              autoFocus
            />
            <AntInput
              name="password"
              icon={FiLock}
              size="large"
              iconSize={20}
              type="password"
              placeholder="Senha"
            />
            <AntButton block type="primary" htmlType="submit" size="large">
              Entrar
            </AntButton>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Login;
