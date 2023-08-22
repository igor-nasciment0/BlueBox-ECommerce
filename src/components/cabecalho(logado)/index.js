import './index.scss';

import logoComNome from '../../assets/images/LogoComNome.svg';
import searchIcon from '../../assets/images/icons/search.svg';
import borgIcon from '../../assets/images/icons/borg-head.svg';
import gmailIcon from '../../assets/images/icons/gmail.svg';

import { Link } from 'react-router-dom';

export default function Cabecalho()
{
    return(
        <header className='common-cabecalho'>
            <div class="container-cabecalho">
                <div class="logo">
                    <Link to="/">
                        <img src={logoComNome} alt="Logo da BlueBox"/>
                    </Link>
                </div>

                <div class="input">
                    <input type="text" placeholder="O que você está buscando?"/>
                    <img src={searchIcon} alt=""/>
                </div>
                
            
                <div class="nav">
                    <img src={borgIcon} alt=""/>

                    <div>
                        <h2>Bem-vindo.</h2>
                        <Link to="/">Entre ou cadastre-se.</Link>
                    </div>
                </div>

                <div class="nav">
                    <img src={gmailIcon} alt=""/>

                    <div>
                        <h2>Precisa de ajuda?</h2>
                        <Link to="/">Fale conosco</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
