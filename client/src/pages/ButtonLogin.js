import React from "react";
import { Button } from "primereact/button";
import { useAuth0 } from '@auth0/auth0-react';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

const ButtonLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Button
        label="Log In"
        className="p-button-raised p-button-success"
        onClick={() => loginWithRedirect()}
      />
    </div>
);

}

export default ButtonLogin;