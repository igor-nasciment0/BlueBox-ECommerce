import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'

export default function UserLogin() {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function logar() {
    try {
      let credenciais = {
        email: email,
        senha: senha
      }

      let resp = await axios.post('http://localhost:5000/usuario/login', credenciais);

      if (resp.status === 200)
      {
        toast.success('Logado com sucesso!')
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data)
      }
      else {
        toast.error(error.message)
      }
    }
  }

  return (
    <div className="Tela-Login">
      <Cabecalho/>
        <main className="User-Login-container">

          <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

          <section className="Login">
            <div className="Dados-Container">
              <h1>Login</h1>
                  
              <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
              <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
            
              <Link to={""}>Esqueceu a senha?</Link>
              <button onClick={logar}>Entrar</button>

              <p>Novo na BlueBox?</p>
              <Link className="link-cadastro" to={"/cadastro"}>Crie sua Conta</Link>
            </div>

            <div className="Login-google">
              <img src="/assets/images/usuario.png" alt="" />
              <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o google</span></button>
            </div>
          </section>        
        </main>   
      <Rodape/>
    </div>  
  )

}