import { useContext } from 'react';
import { TemaContext } from '../../theme';
import './index.scss';

import { Link } from 'react-router-dom';

export default function Cabecalho()
{
    let tema = useContext(TemaContext);

    return(
        <header className='common-cabecalho'>
            <div className="container-cabecalho">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/images/LogoComNome.svg" alt="Logo da BlueBox"/>
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?"/>
                    <img src='/assets/images/icons/search.svg' alt=""/>
                </div>
                
            
                <div className="nav">
                    <img src='/assets/images/icons/borg-head.svg' alt=""/>

                    <div>
                        <h2>Bem-vindo.</h2>
                        <Link to="/login">Entre ou cadastre-se.</Link>
                    </div>
                </div>

                <div className="nav">
                    <img src='/assets/images/icons/gmail.svg' alt=""/>

                    <div>
                        <h2>Precisa de ajuda?</h2>
                        <Link to="/contato">Fale conosco</Link>
                    </div>
                </div>

                <button onClick={() => {
                    tema.trocarTema()
                    console.log(tema.tema);
                }}>
                    <div className='fade-image-sun'>
                        <img src={'/assets/images/icons/sun.svg'} alt="" />
                    </div>
                </button>
            </div>
        </header>
    );
}
