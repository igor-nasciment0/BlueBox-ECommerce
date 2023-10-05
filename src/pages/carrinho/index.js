import './index.scss'

import Cabecalho from '../../components/cabecalho/';
import Rodape from '../../components/rodape/';
import { useContext } from 'react';
import { TemaContext } from '../../theme';

export default function Carrinho()
{
    const context = useContext(TemaContext);
    let tema = context.tema;

    return(
        <div className={'pagina-carrinho ' + tema}>
            <Cabecalho/>

            <main>
                <h1>Meu Carrinho</h1>

                <div className='container-tela'>
                    <section className='sec-carrinho'>
                        <div className='container-carrinho'>
                            <div className='produto-container'>
                                <div className='produto'>
                                    <img src='/assets/images/foto_produto.png' alt="" />
                                
                                    <div className='produto-especificacoes'>
                                        <h2>God of War: Saga (3 Jogos) (Seminovo) - PS3</h2>
                                        <h3>Produto seminovo / usado</h3>
                                        <h4>Disponível</h4>

                                        <div className='container-operadores'>
                                            <div className='operador-qtd'>
                                                <h4>Qtd.</h4>
                                                <div>
                                                    <button> - </button>
                                                    <div> 1 </div>
                                                    <button> + </button>
                                                </div>
                                            </div>

                                            <button>Excluir</button>
                                            <a href="">Ver semelhantes</a>
                                        
                                            <div className='preco-mobile'>R$ 44,99</div>
                                        </div>
                                    </div>

                                    <div className='produto-preco'>
                                        <h2>Preço:</h2>
                                        <h4>R$ 44,99</h4>
                                        <h3>R$ 29,99</h3>
                                    </div>  
                                </div>

                                <div className='container-operadores mobile'>
                                    <div className='operador-qtd'>
                                        <div>
                                            <button> - </button>
                                            <div> 1 </div>
                                            <button> + </button>
                                        </div>
                                    </div>

                                    <button>Excluir</button>
                                    <a href="">Ver similares</a>
                                
                                    <div className='preco-mobile'>44,99</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className='sec-total'>
                        <div className='sec-total-precos'>
                            <div className='total'>
                                <h3>Total:</h3>
                                <p>R$ 40.98</p>
                            </div>

                            <div>
                                <h4>(1 produto)</h4>
                                <p>29.99</p>
                            </div>

                            <div className='total-produtos'>
                                <h4>Produtos</h4>
                                <p>29.99</p>
                            </div>

                            <div className='frete'>
                                <h4>Frete</h4>
                                <p>10.99</p>
                            </div>
                        </div>
                        
                        <div className='sec-total-input'>
                            <p>Escolha a forma de entrega</p>
                            <input type="text" placeholder='Digite seu CEP'/>                            
                        </div>

                        <div className='container-entregas'>
                            <div>
                                <img src='/assets/images/icons/loggi.svg' alt="Ícone Transportadora" />
                                <div>
                                    <h3>Entrega Loggi</h3>
                                    <p>Receba em até 2 dias úteis</p>
                                    <h4>R$ 10.99</h4>
                                </div>
                            </div>
                        </div>

                        <a href="">Prosseguir</a>

                    </section>    
                </div>
                
            </main>

            <Rodape/>
        </div>
    )
}