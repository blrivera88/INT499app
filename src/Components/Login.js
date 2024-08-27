import React from "react";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const handleLoginSuccess = (response) => {
    console.log("Login Success:", response);
    // Handle successful login here (e.g., send the response token to your server)
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    // Handle login failure here
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </div>
  );
}

export default Login;

