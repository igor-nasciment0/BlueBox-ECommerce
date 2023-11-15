import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import './index.scss';

import storage from 'local-storage';
import { Link, redirect, useNavigate } from 'react-router-dom';

export default function Cabecalho() {
    const [infoLogin, setInfoLogin] = useState();

    useEffect(() => {
        let login = storage('user-login')

        if (login) {
            setInfoLogin(login)
        }
    }, []);

    return (
        infoLogin ? <CabLogado login={infoLogin} /> : <CabDeslogado />
    );
}

function CabDeslogado() {
    let tema = useContext(TemaContext);

    const [display, setDisplay] = useState({ display: 'none' });
    const [pesquisa, setPesquisa] = useState('');
    const navigate = useNavigate();

    function pesquisar(pesquisa) {
        navigate('/pesquisa?busca=' + pesquisa)
    }

    function barraLateral() {
        if (display.display === 'none') {
            setDisplay({ display: 'flex' });
        } else {
            setDisplay({ display: 'none' });
        }
    }

    return (
        <header className='common-cabecalho'>
            <div className="container-cabecalho">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/images/LogoComNome.svg" alt="Logo da BlueBox" />
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?" value={pesquisa} onChange={e => setPesquisa(e.target.value)}
                        onKeyDown={e => { if (e.key === '13') pesquisar(pesquisa) }}
                    />
                    <img src='/assets/images/icons/search.svg' alt="" onClick={() => pesquisar(pesquisa)} />
                </div>


                <div className="cab-link">
                    <img src='/assets/images/icons/borg-head.svg' alt="" />

                    <div>
                        <h2>Bem-vindo.</h2>
                        <Link to="/login">Entre ou cadastre-se.</Link>
                    </div>
                </div>

                <div className="cab-link">
                    <img src='/assets/images/icons/gmail.svg' alt="" />

                    <div>
                        <h2>Precisa de ajuda?</h2>
                        <Link to="/contato">Fale conosco</Link>
                    </div>
                </div>

                <button onClick={() => {
                    tema.trocarTema()
                }}>
                    <div className='fade-image-sun'>
                        <img src={'/assets/images/icons/sun.svg'} alt="" />
                    </div>
                </button>
            </div>

            <div className="container-cabecalho-mobile">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/images/LogoComNome.svg" alt="Logo da BlueBox" />
                        <img src="/assets/images/logo.svg" alt="Logo da BlueBox" className="logo-sem-nome" />
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?" value={pesquisa} onChange={e => setPesquisa(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') pesquisar(pesquisa) }}
                    />
                    <img src='/assets/images/icons/search.svg' alt="" />
                </div>

                <button onClick={barraLateral}>
                    <img src="/assets/images/icons/menu.svg" alt="" />
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
                        <Link to={'/contato'}>Fale conosco</Link>
                    </li>
                </ul>
                <button onClick={() => { tema.trocarTema() }}>
                    <div className='fade-image-sun'>
                        <img src={'/assets/images/icons/sun.svg'} alt="" />
                    </div>
                </button>
            </div>
        </header>
    )
}

function CabLogado({ login }) {
    let tema = useContext(TemaContext);

    const [display, setDisplay] = useState({ display: 'none' });
    const [pesquisa, setPesquisa] = useState('');
    const navigate = useNavigate();

    function barraLateral() {
        if (display.display === 'none') {
            setDisplay({ display: 'flex' });
        } else {
            setDisplay({ display: 'none' });
        }
    }

    function sair() {
        storage.remove('user-login');
        redirect('/');
    }

    function pesquisar(pesquisa) {
        navigate('/pesquisa?busca=' + pesquisa)
    }

    return (
        <header className='common-cabecalho'>
            <div className="container-cabecalho">
                <div className="logo">
                    <Link to="/">
                        <img src='/assets/images/LogoComNome.svg' alt="Logo da BlueBox" />
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?" value={pesquisa} onChange={e => setPesquisa(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') pesquisar(pesquisa) }}
                    />
                    <img src='/assets/images/icons/search.svg' alt="" onClick={() => pesquisar(pesquisa)} />
                </div>


                <nav>
                    <div>
                        <img src="/assets/images/icons/user.svg" alt="" />
                        <Link to='/perfil'>{login.nome}</Link>
                    </div>

                    <div>
                        <img src="/assets/images/icons/cart.svg" alt="" />
                        <Link to='/carrinho'>Carrinho</Link>
                    </div>

                    <div>
                        <img src="/assets/images/icons/truckCabecalho.svg" alt="" />
                        <Link to='/meus-pedidos'>Pedidos</Link>
                    </div>
                </nav>

                <div className="cab-link">
                    <img src='/assets/images/icons/gmail.svg' alt="" />

                    <div>
                        <h2>Precisa de ajuda?</h2>
                        <Link to="/contato">Fale conosco</Link>
                    </div>
                </div>

                <button onClick={() => {
                    tema.trocarTema()
                }
                }>
                    <img src='/assets/images/icons/sun.svg' alt="" />
                </button>
            </div>
            <div className="container-cabecalho-mobile">
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/images/LogoComNome.svg" alt="Logo da BlueBox" />
                        <img src="/assets/images/logo.svg" alt="Logo da BlueBox" className="logo-sem-nome" />
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?" value={pesquisa} onChange={e => setPesquisa(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') pesquisar(pesquisa) }}
                    />
                    <img src='/assets/images/icons/search.svg' alt="" />
                </div>

                <button onClick={barraLateral}>
                    <img src="/assets/images/icons/menu.svg" alt="" />
                </button>

                <Link to={'/carrinho'} className='carrinho-button'>
                    <img src="/assets/images/icons/cart.svg" alt="" />
                </Link>
            </div>

            <div className='menu-cabecalho' style={display}>
                <ul>
                    <li>
                        <img src="/assets/images/icons/borg-head.svg" alt="" />
                        <Link to={'/perfil'}>{login.nome}</Link>
                    </li>
                    <li>
                        <img src="/assets/images/icons/truckCabecalho.svg" alt="" />
                        <Link to={'/meus-pedidos'}>Meus pedidos</Link>
                    </li>
                    <li>
                        <img src="/assets/images/icons/gmail.svg" alt="" />
                        <Link to={'/contato'}>Fale conosco</Link>
                    </li>
                    <li>
                        <button onClick={sair}>Sair</button>
                    </li>
                </ul>
                <button onClick={() => { tema.trocarTema() }}>
                    <div className='fade-image-sun'>
                        <img src={'/assets/images/icons/sun.svg'} alt="" />
                    </div>
                </button>
            </div>
        </header>
    )
}