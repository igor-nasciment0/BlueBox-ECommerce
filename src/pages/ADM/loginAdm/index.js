import axios from "axios";
import CabecalhoLogo from "../../../components/cabecalhoLogo";
import './index.scss';
import { useState } from "react";
import {useNavigate} from "react-router-dom";

import storage from 'local-storage';
import { loginAdm } from "../../../api/admAPI";

export default function LoginAdm() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [msgErro, setMsgErro] = useState('');

    const navigate = useNavigate();
    
    async function logar() {
        try {
            let resposta = await loginAdm(email, senha);
            console.log(resposta);

            if (resposta.status === 200){
                storage('adm-login', resposta.data);
                navigate('/adm/consulta-produto');  
            }      

        } catch (error) {
            if(error.response)
                setMsgErro(error.response.data);
            else 
                setMsgErro(error.message);
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