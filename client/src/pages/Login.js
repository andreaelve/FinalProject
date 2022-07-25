import '../App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login">
      <h1>Login</h1>
      <Button
        label="Log In"
        icon="pi pi-check"
        className="p-button-rounded p-button-text"
        onClick={() => loginWithRedirect()}
      />
    </div>
  );
};

export default Login;
