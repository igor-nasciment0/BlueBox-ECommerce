import { useContext, useState } from 'react';
import { TemaContext } from '../../theme';
import './index.scss';

import { Link } from 'react-router-dom';

export default function Cabecalho()
{
    let tema = useContext(TemaContext);

    const [display, setDisplay] = useState({display: 'none'});

    function barraLateral(params) {
        if (display.display === 'none') {
            setDisplay({display: 'flex'});
        } else {
            setDisplay({display: 'none'});
        }
    }

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

            <div className="container-cabecalho-mobile">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/images/LogoComNome.svg" alt="Logo da BlueBox"/>
                        <img src="/assets/images/logo.svg" alt="Logo da BlueBox" className="logo-sem-nome"/>
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?"/>
                    <img src='/assets/images/icons/search.svg' alt=""/>
                </div>

                <button onClick={barraLateral}>
                    <img src="/assets/images/icons/menu.svg" alt="" />
                </button>

                <button>
                    <img src="/assets/images/icons/cart.svg" alt="" />
                </button>
            </div>
            
            <div className='menu-cabecalho' style={display}>
                <ul>
                    <li>
                        <img src="/assets/images/icons/borg-head.svg" alt="" />
                        <Link to={'/login'}>Fazer login</Link>
                    </li>
                    <li>
                        <img src="/assets/images/icons/gmail.svg" alt="" />
                        <Link to={'/contato'}>Contato</Link>
                    </li>
                </ul>
                <button onClick={() => {tema.trocarTema()}}>
                    <div className='fade-image-sun'>
                        <img src={'/assets/images/icons/sun.svg'} alt="" />
                    </div>
                </button>
            </div>
        </header>
    );
}
