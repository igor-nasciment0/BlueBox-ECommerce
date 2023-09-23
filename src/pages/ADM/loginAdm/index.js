import axios from "axios";
import CabecalhoLogo from "../../../components/cabecalhoLogo";
import './index.scss';
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function LoginAdm() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [msgErro, setMsgErro] = useState('');

    const navigate = useNavigate();
    
    async function logar() {
        try {
            let login = {
                email: email,
                senha: senha
            }

            let resposta = await axios.post('http://localhost:5000/adm/login', login);

            if (resposta.status === 204);
                navigate('/adm/consulta-produto');        
        } catch (error) {

            setMsgErro(error.response.data);
        }        
    }

    return(
        <div className="pagina-login-adm">
            <CabecalhoLogo />

            <main>
                <div>
                    <h1>Administração</h1>

                    <label>E-mail:</label>
                    <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)
                                                                        setMsgErro('')}}/>

                    <label>Senha:</label>
                    <input type="password" value={senha} onChange={(e) => {setSenha(e.target.value)
                                                                           setMsgErro('')}}/>

                    <button onClick={logar}>Entrar</button>

                    <p>{msgErro}</p>
                </div>
            </main>
        </div>
    )
}