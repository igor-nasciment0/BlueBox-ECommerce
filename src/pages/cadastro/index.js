import Cabecalho from "../../components/cabecalho"
import Rodape from "../../components/rodape"
import './index.scss'


export default function TelaCadastro(){

    return(

        <div className="Tela-Cadastro">
            <Cabecalho/>

            <main className="Cadastro-container">

            <div className="Dados-container">
                <h1>Criar Conta</h1>
                <div className="inputs-irmaos">
                    <input type="text" placeholder="Nome"/>
                    <input type="text" placeholder="Sobrenome"/>
                </div>

                <input type="text" placeholder="E-mail"/>
                <input type="text" placeholder="Senha"/>
                <input type="text" placeholder="Confirmar Senha"/>
                <input type="text" placeholder="Telefone"/>
                <input type="text" placeholder="CPF"/>


                <div className="Confirmação-Licença">
                    <div className="Termos">
                        <p>Li e concordo com os <br/><span>termos e condições de uso </span></p>
                        <input type="checkbox" className="Confirmar"/>
                    </div>
                    
                    <button>concluir</button>
                </div>
            </div>

            <div className="Login-google">
                <img src="" alt="" />
                <p></p>
                <button></button>
                <button> <img src="" alt="" /> </button>
            </div>
                
            </main>   

            <Rodape/>

        </div>

    )
}