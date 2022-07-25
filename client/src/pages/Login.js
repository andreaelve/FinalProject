import '../App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import ButtonLogin from './ButtonLogin';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login">
      <h1>Login</h1>
      <ButtonLogin />
    </div>
  );
};

export default Login;
