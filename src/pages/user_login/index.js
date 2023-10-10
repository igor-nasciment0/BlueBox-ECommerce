import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';

import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify'
import { TemaContext } from '../../theme';
import { loginCliente } from '../../api/clienteAPI';

import storage from 'local-storage';

export default function UserLogin() {

  const ref = useRef();
  const navigate = useNavigate();
  
  const context = useContext(TemaContext);
  let tema = context.tema;

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [logando, setLogando] = useState(false);

  async function logar() {
    setLogando(true);
    
    try {
      let resp = await loginCliente(email, senha);

      if (resp.status === 200)
      {
        storage('user-login', resp.data[0]);

        ref.current.continuousStart();
        toast.success('Logado com sucesso!')
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data)
      }
      else {
        toast.error(error.message)
      }

      setLogando(false);
    }
  }

  return (
    <div className={"Tela-Login " + tema}>
      <Cabecalho/>
        <div className="gradient">
          <main className="User-Login-container">
            <LoadingBar color='#308FFF' ref={ref}/>
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
                    
                <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}/>
              
                <Link to={""}>Esqueceu a senha?</Link>
                <button onClick={logar} disabled={logando}>Entrar</button>

                <p>Novo na BlueBox?</p>
                <Link className="link-cadastro" to={"/cadastro"}>Crie sua Conta</Link>
              
                <button className="Log-wit-google-resp"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
              </div>

              <div className="Login-google">
                <img src="/assets/images/usuario.png" alt="" />
                <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
              </div>
            </section>        
          </main>   
        </div>
      <Rodape/>
    </div>  
  )

}