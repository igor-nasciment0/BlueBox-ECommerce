import { useContext, useState } from "react"
import Cabecalho from "../../components/cabecalho"
import Rodape from "../../components/rodape"
import './index.scss'
import InputMask from 'react-input-mask';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { TemaContext } from "../../theme";
import { cadastroCliente } from "../../api/clienteAPI";

export default function TelaCadastro(){

    const context = useContext(TemaContext);
    let tema = context.tema;

    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmar, setSenhaConfimar] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');

    async function cadastrar() {
        try {
            if(senha !== senhaConfirmar) {
                throw new Error('As senhas não coincidem.');
            }

            let resp = await cadastroCliente(nome, sobrenome, email, senha, telefone, cpf, dataNascimento);

            if(resp.status === 200)
            {
                toast.success("Cadastrado com sucesso! Faça seu login.", {hideProgressBar: true})
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
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

    return(

        <div className={"Tela-Cadastro " + tema}>
            <Cabecalho/>
            <div className="gradient">
                <main className="Cadastro-container">                  
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
                            <InputMask type="text" mask="+55 (99) 99999-9999" maskChar=" " placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                            <InputMask type="text" mask="999.999.999-99" maskChar=" " placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                            
                            <div className="data-nascimento">
                                <p>Data de nascimento:</p>
                                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
                            </div>

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
                            <button onClick={() => navigate('/login')}>Entrar</button>
                            <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
                        </div>
                    </section>
                </main>

                <div className="google-cadastro-resp">
                      <h1>Cadastre-se com Google</h1>
                      <button className="Sing-wit-google-resp"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
                    </div>
            </div>
            <Rodape/>
        </div>

    )
}