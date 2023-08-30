import Cabecalho from "../../components/cabecalho"
import Rodape from "../../components/rodape"
import './index.scss'


export default function TelaCadastro(){

    return(

        <div className="Tela-Cadastro">
            <Cabecalho/>

            <main className="Cadastro-container">

            <section className="Cadastro">
            <div className="Dados-container">
                <h1>Criar Conta</h1>
                <div className="inputs-irmaos">
                    <input type="text" placeholder="Nome"/>
                    <input type="text" placeholder="Sobrenome"/>
                </div>

                <input type="text" placeholder="E-mail"/>
                <input type="password" placeholder="Senha"/>
                <input type="password" placeholder="Confirmar Senha"/>
                <input type="text" placeholder="Telefone"/>
                <input type="text" placeholder="CPF"/>


                <div className="Confirmação-Licença">
                    <div className="Termos">
                        <p>Li e concordo com os <br/><span>termos e condições de uso </span></p>
                        <input type="checkbox" className="Confirmar"/>
                    </div>
                    
                    <button>Concluir</button>
                </div>
            </div>

            <div className="Login-google">
                <img src="/assets/images/usuario.png" alt="" />
                <p>Tenha acesso ao melhor da BlueBox com o seu cadastro de usuário</p>
                <button>Entrar</button>
                <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> Entrar com o google </button>
            </div>

            </section>
                
            </main>   

            <Rodape/>

        </div>

    )
}