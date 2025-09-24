import React from 'react';
import LoginBox from '../../components/LoginBox';

function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-screen gradient-dark-bg main-light-color-text'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-semibold mb-2'>Bem-vindo(a)</h1>
        <p className='text-lg alt-light-color-text max-w-md'>
          Ainda não há nenhum admin cadastrado, crie o primeiro usuário do sistema
        </p>
      </div>

      <div className='flex flex-col items-center gap-8'>
        <img src='/nimbus_logo.svg' alt='Nimbus Logo' className='h-24 w-auto mb-2' />
        <LoginBox />
      </div>
    </div>
  );
}

export default LoginPage;