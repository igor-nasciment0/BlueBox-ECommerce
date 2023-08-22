import './index.scss';

import { Link } from 'react-router-dom';

export default function Cabecalho()
{
    return(
        <header className='common-cabecalho'>
            <div class="container-cabecalho">
                <div class="logo">
                    <Link to="/">
                        <img src="/assets/images/LogoComNome.svg" alt="Logo da BlueBox"/>
                    </Link>
                </div>

                <div class="input">
                    <input type="text" placeholder="O que você está buscando?"/>
                    <img src='/assets/images/icons/search.svg' alt=""/>
                </div>
                
            
                <div class="nav">
                    <img src='/assets/images/icons/borg-head.svg' alt=""/>

                    <div>
                        <h2>Bem-vindo.</h2>
                        <Link to="/">Entre ou cadastre-se.</Link>
                    </div>
                </div>

                <div class="nav">
                    <img src='/assets/images/icons/gmail.svg' alt=""/>

                    <div>
                        <h2>Precisa de ajuda?</h2>
                        <Link to="/">Fale conosco</Link>
                    </div>
                </div>

                <button>
                    <img src='/assets/images/icons/sun.svg' alt="" />
                </button>
            </div>
        </header>
    );
}
