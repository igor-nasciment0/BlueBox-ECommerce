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

                <input type="text" placeholder=""/>
                <input type="text" placeholder=""/>
                <input type="text" placeholder=""/>
                <input type="text" placeholder=""/>
                <input type="text" placeholder=""/>


                <div className="Confirmação-Licença">
                    <p>Li e concordo com os <span>termos e condições de uso</span></p>
                    <input type="checkbox" className="Confirmar"/>
                    <button></button>
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