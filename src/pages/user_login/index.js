import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';
import { Link } from 'react-router-dom';

export default function UserLogin() {
  
  return (
    <div className="Tela-Login">
      <Cabecalho/>
        <main className="User-Login-container">
          <section className="Login">
            <div className="Dados-Container">
              <h1>Login</h1>
                  
              <input type="text" placeholder="E-mail"/>
              <input type="password" placeholder="Senha" />
            
              <Link to={""}>Esqueceu a senha?</Link>
              <button>ENTRAR</button>

              <p>Novo na BlueBox?</p>
              <button>crie sua conta</button>
            </div>

            <div className="Login-google">
              <img src="/assets/images/usuario.png" alt="" />
              <p>Tenha acesso ao melhor da BlueBox com o seu cadastro de usuário</p>
              <button>Entrar</button>
              <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o google</span></button>
            </div>
          </section>        
        </main>   
      <Rodape/>
    </div>  
  )

}