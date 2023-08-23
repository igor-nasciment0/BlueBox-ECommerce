import Cabecalho from "../../components/cabecalho"
import Rodape from "../../components/rodape"



export default function TelaCadastro(){

    return(

        <div className="Tela-Cadastro">
            <Cabecalho/>

            <main className="Cadastro-container">

            <div className="Dados-container">
                <h1>Criar Conta</h1>
                <div className="inputs-irmãos">
                    <input type="text" />
                    <input type="text" />
                </div>

                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />


                <div className="Confirmação-Licença">
                    <p></p>
                    <input type="checkbox"/>
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