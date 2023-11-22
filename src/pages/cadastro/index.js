import { useContext, useRef, useState } from "react"
import Cabecalho from "../../components/cabecalho"
import Rodape from "../../components/rodape"
import './index.scss'
import InputMask from 'react-input-mask';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { TemaContext } from "../../theme";
import { cadastroCliente, loginCliente } from "../../api/clienteAPI";
import ToastCont from "../../components/toastContainer";
import { set } from "local-storage";
import LoadingBar from "react-top-loading-bar";

export default function TelaCadastro() {

    const ref = useRef();
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

    const [cadastrando, setCadastrando] = useState(false);

    async function cadastrar() {
        setCadastrando(true);

        try {
            if (senha !== senhaConfirmar) {
                throw new Error('As senhas não coincidem.');
            }

            let cad = await cadastroCliente(nome, sobrenome, email, senha, telefone, cpf, dataNascimento);

            if (cad.status === 200) {
                let login = await loginCliente(email, senha);

                if (login.status === 200) {
                    set('user-login', login.data[0]);
                    set('carrinho', []);
                }

                ref.current.continuousStart();
                toast.success("Cadastrado com sucesso!", {hideProgressBar: true})

                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }

        } catch (error) {
            setCadastrando(false);

            if (error.response) {
                toast.error(error.response.data)
            }
            else {
                toast.error(error.message)
            }
        }
    }

    return (

        <div className={"Tela-Cadastro " + tema}>
            <Cabecalho />
            <div className="gradient">
                <main className="Cadastro-container">
                    <LoadingBar color='#308FFF' ref={ref}/>
                    <ToastCont />

                    <section className="Cadastro">
                        <div className="Dados-container">
                            <h1>Criar Conta</h1>
                            <div className="inputs-irmaos">
                                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                            </div>

                            <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                            <input type="password" placeholder="Confirmar Senha" value={senhaConfirmar} onChange={(e) => setSenhaConfimar(e.target.value)} />
                            <InputMask type="text" mask="+55 (99) 99999-9999" maskChar=" " placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            <InputMask type="text" mask="999.999.999-99" maskChar=" " placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />

                            <div className="data-nascimento">
                                <p>Data de nascimento:</p>
                                <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                            </div>

                            <div className="Confirmação-Licença">
                                <div className="Termos">
                                    <p>Li e concordo com os <br /><span>termos e condições de uso </span></p>
                                    <input type="checkbox" className="Confirmar" />
                                </div>

                                <button onClick={() => {if(!cadastrando) cadastrar()}}>Concluir</button>
                            </div>
                        </div>

                        <div className="Login-google">
                            <img src="/assets/images/usuario.png" alt="" />
                            <p>Tenha acesso ao melhor da BlueBox com o seu cadastro de usuário</p>
                            <button onClick={() => navigate('/login')}>Entrar</button>
                            <button className="Log-wit-google"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
                        </div>
                    </section>

                    <div className="google-cadastro-resp">
                        <h1>Cadastre-se com Google</h1>
                        <button className="Sing-wit-google-resp"> <img src="/assets/images/google.png" alt="" /> <span>Entrar com o Google</span></button>
                    </div>
                </main>
            </div>
            <Rodape />
        </div>

    )
}