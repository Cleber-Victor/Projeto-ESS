import APIService from '../../../../shared/components/APIService/index';
import { useEffect, useState } from 'react';
import { UserContext } from '../../../../Provider';
import { useContext } from 'react';
import { Link , Navigate } from 'react-router-dom';

export const LoginClientPage = () => {
  const api = new APIService;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = (req: Request, res: Response) => {
    // Lógica de login aqui, pode chamar sua API ou realizar validações
    alert(`Tentativa de login do cliente com email: ${email} e senha: ${password}`);

  const userData = {
    email: email,
    password: password
  };

  api.postLoginClient(userData.email, userData.password)
    .then(response => {
      const token = response.data.header;
      console.log('Token recebido:', token);

      // Após obter o token, você pode chamar a função para obter mais informações do cliente
      api.postTokenClient(token)
        .then(tokenResponse => {
          console.log('Dados do cliente:', tokenResponse.data);
          // Aqui você pode redirecionar o usuário para a página home após o login
          setRedirectToHome(true);
        })
        .catch(tokenError => {
          console.log(token);
          console.error('Erro ao obter token:', tokenError);
        });
    })
    .catch(error => {
      console.error('Erro:', error);
      // Aqui você pode exibir uma mensagem de erro para o usuário
      alert('Erro ao fazer login');
    });
  };

  const handleVoltar = () => {
    alert('Voltando para a página inicial');
  };

  const handleEsqueciSenha = () => {
    alert('Redirecionando para a página de recuperação de senha');
  };

  if (redirectToHome) {
    return <Navigate to = "/client/home"/>;
  }

  return (
    <div>
      <h1>Login Cliente</h1>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Link to = '*'>
            <button type="button" onClick={handleVoltar}>Voltar</button>
          </Link>
          <button type="button" onClick={handleLogin}>Login</button>
          <Link to = 'recover/client'>
            <button type="button" onClick={handleEsqueciSenha}>Esqueci a Senha</button>
          </Link>
        </div>
      </form>
    </div>
  );
};