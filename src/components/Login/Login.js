import React from 'react';
import './Login.sass';
import LoginForm from './LoginForm';

const Login = () => {
   return (
      <main className="login-container">
         <div className="big-logo">
            <img src="" alt="" />
            <p>FakePeople</p>
         </div>
         <LoginForm />
      </main>
   );
}

export default Login;