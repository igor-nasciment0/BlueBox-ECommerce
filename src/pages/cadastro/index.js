import { useState } from "react"
import Cabecalho from "../../components/cabecalho"
import Rodape from "../../components/rodape"
import './index.scss'
import axios from "axios";
import InputMask from 'react-input-mask';

export default function TelaCadastro(){

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmar, setSenhaConfimar] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    const [msgErro, setMsgErro] = useState('');

    async function cadastrar() {
        try {
            if(senha !== senhaConfirmar) {
                setMsgErro('As senhas não coincidem.');
                return ;
            }

            let credenciais = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha,
                telefone: telefone,
                cpf: cpf,
                dataNascimento: dataNascimento
            }

            let resp = await axios.post('http://localhost:5000/usuario/cadastro', credenciais);   

        } catch (error) {
            setMsgErro(error.response.data)
        }
    }

    return(

        <div className="Tela-Cadastro">
            <Cabecalho/>

            <main className="Cadastro-container">

                <section className="Cadastro">
                    <div className="Dados-container">
                        <h1>Criar Conta</h1>
                        <div className="inputs-irmaos">
                            <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                            <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}/>
                        </div>

                        <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                        <input type="password" placeholder="Confirmar Senha" value={senhaConfirmar} onChange={(e) => setSenhaConfimar(e.target.value)}/>
                        <InputMask type="text" mask="(99) 99999-9999" maskChar=" " placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                        <InputMask type="text" mask="999.999.999-99" maskChar=" " placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                        
                        <div className="data-nascimento">
                            <p>Data de nascimento:</p>
                            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                        </div>  

                        <h3>{msgErro}</h3>

                        <div className="Confirmação-Licença">
                            <div className="Termos">
                                <p>Li e concordo com os <br/><span>termos e condições de uso </span></p>
                                <input type="checkbox" className="Confirmar"/>
                            </div>
                            
                            <button onClick={cadastrar}>Concluir</button>
                        </div>
                    </div>

                    <div className="Login-google">
                        <img src="/assets/images/usuario.png" alt="" />
                        <p>Tenha acesso ao melhor da BlueBox com o seu cadastro de usuário</p>
                        <button>Entrar</button>
                        <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
                    </div>

                </section>
                
            </main>   

            <Rodape/>

        </div>

    )
}