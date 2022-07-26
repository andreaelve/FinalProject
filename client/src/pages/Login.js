import "../App.css"
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <div className="login">
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default Login;