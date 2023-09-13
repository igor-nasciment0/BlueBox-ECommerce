import './index.scss';

import { Link } from 'react-router-dom';

export default function CabecalhoLogado(props)
{
    return(
        <header className='common-cabecalho-logado'>
            <div class="container-cabecalho">
                <div class="logo">
                    <Link to="/">
                        <img src='/assets/images/LogoComNome.svg' alt="Logo da BlueBox"/>
                    </Link>
                </div>

                <div class="input">
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

                <div class="container-contato">
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
