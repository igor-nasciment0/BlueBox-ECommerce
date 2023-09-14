import './index.scss';

import Cabecalho from '../../components/cabecalho/';
import Rodape from '../../components/rodape/';

import { Link } from 'react-router-dom';

export default function UserPedidos() {
    return(
        <div className='pagina-pedidos'>
            <Cabecalho/>

            <main>
                <div className='container-tela'>
                    <h1>Meus Pedidos</h1>
                    <Link to={""}>
                        <img src='/assets/images/icons/arrow-left.svg' alt="" />
                        Minha conta
                    </Link>
                    
                    <div className='container-pedidos'>

                        <h2>Junho / 2023</h2>
                        <div className='compra'>
                            <div className='compra-especificacoes'>
                                <img src='/assets/images/foto_produto.png' alt="Imagem do Produto" />
                                <div>
                                    <h3>God of War: Saga (3 Jogos) (Seminovo) - PS3</h3>
                                    <p>Você comprou em <span>16/06/2023</span>.</p>

                                    <div>
                                        <Link to={""}>Encontrar na loja</Link>
                                        <Link to={""}>Ver semelhantes</Link>
                                    </div>    
                                </div>
                            </div>

                            <div>
                                <h3>Quantidade:</h3>
                                <div>1</div>
                            </div>

                            <div>
                                <h3>Preço Total:</h3>
                                <div>R$ 29,99</div>
                            </div>

                            <div className='compra-status'>
                                <h3>Status</h3>
                                <div>Pendente</div>
                                <Link to={""}>Ver pedido</Link>
                            </div>
                        </div>
                    </div>    
                </div>
                
            </main>

            <Rodape/>
        </div>
    )
}