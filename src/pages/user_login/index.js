import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

export default function User_Login() {
  
  return (
    <div className="Tela-Login">
      <Cabecalho/>
        <main className="User-Login-container">
          <section className="Login">
            <div className="Dados-Container">
              <h1>Login</h1>
                  
              <input type="text" placeholder="E-mail"/>
              <input type="password" placeholder="Senha" />
            
              <a href="">Esqueceu a senha?</a>
              <button>ENTRAR</button>

              <p>Novo na BlueBox?</p>
              <button>CRIAR SUA CONTA AGORA</button>
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