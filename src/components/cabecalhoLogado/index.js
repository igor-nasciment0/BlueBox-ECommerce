import { useContext } from 'react';
import { TemaContext } from '../../theme';
import './index.scss';

import { Link } from 'react-router-dom';

export default function CabecalhoLogado(props)
{
    let tema = useContext(TemaContext);

    return(
        <header className='common-cabecalho-logado'>
            <div className="container-cabecalho">
                <div className="logo">
                    <Link to="/">
                        <img src='/assets/images/LogoComNome.svg' alt="Logo da BlueBox"/>
                    </Link>
                </div>

                <div className="input">
                    <input type="text" placeholder="O que você está buscando?"/>
                    <img src='/assets/images/icons/search.svg' alt=""/>
                </div>
                
            
                <nav>
                    <div>
                        <img src="/assets/images/icons/user.svg" alt="" />
                        <Link to='/'>Fulano</Link>
                    </div>

                    <div>
                        <img src="/assets/images/icons/cart.svg" alt="" />
                        <Link to='/'>Carrinho</Link>
                    </div>

                    <div>
                        <img src="/assets/images/icons/truckCabecalho.svg" alt="" />
                        <Link to='/'>Pedidos</Link>
                    </div>
                </nav>

                <div className="container-contato">
                    <img src='/assets/images/icons/gmail.svg' alt=""/>

                    <div>
                        <h2>Precisa de ajuda?</h2>
                        <Link to="/contato">Fale conosco</Link>
                    </div>
                </div>

                <button onClick={() => {
                        tema.trocarTema()
                        console.log(tema.tema)
                    }
                }>
                    <img src='/assets/images/icons/sun.svg' alt="" />
                </button>
            </div>
        </header>
    );
}
