import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import { get } from 'local-storage';
import ToastCont from '../../components/toastContainer';
import { toast } from 'react-toastify';
import { buscarPedidoPorCliente, buscarProdutosArrayPedidos } from '../../api/pedidoAPI';
import { formatarData, formatarMesAno, valorEmReais } from '../../api/funcoesGerais';
import { mostrarUrlImagem } from '../../api/produtoAPI';

export default function UserPedidos() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const navigate = useNavigate();

    let login = get('user-login');

    if (!login) {
        navigate('/login');
    }

    const [produtosPedidos, setProdutosPedidos] = useState([]);

    async function buscarPedidos() {
        try {
            let pedidos = await buscarPedidoPorCliente(login.id);

            let produtos = await buscarProdutosArrayPedidos(pedidos);

            console.log(produtos);
            setProdutosPedidos(produtos);

        } catch (error) {
            console.log(error);
            toast.error('Não foi possível carregar os seus pedidos.')
        }
    }

    function colocarNovaData(produto, index) {
        if (produtosPedidos[index - 1]) {
            if (produto) {
                console.log(formatarMesAno(produto.infoPedido.dataCompra));
                console.log(formatarMesAno(produtosPedidos[index - 1].infoPedido.dataCompra));

                return formatarMesAno(produto.infoPedido.dataCompra) !== formatarMesAno(produtosPedidos[index - 1].infoPedido.dataCompra)
            }
        } else {
            return true
        }
    }

    useEffect(() => {
        buscarPedidos();
    }, [])

    return (
        <div className={'pagina-pedidos ' + tema}>
            <Cabecalho />
            <ToastCont />

            <main>
                <div className='container-tela'>
                    <h1>Meus Pedidos</h1>
                    <Link to={"/"}>
                        <img src='/assets/images/icons/arrow-left.svg' alt="" />
                        Início
                    </Link>

                    <div className='container-pedidos'>

                        {produtosPedidos.length === 0 && 
                        <h4>Você ainda não fez nenhum pedido.</h4>}

                        {produtosPedidos.map((produto, index) => {
                            if (produto)
                                return (
                                    <div>
                                        {
                                            colocarNovaData(produto, index) && <h2>{formatarMesAno(produto.infoPedido.dataCompra)}</h2>
                                        }
                                        <div>
                                            <div className='compra'>
                                                <img src={mostrarUrlImagem(produto.imagem)} alt="Imagem do Produto" />

                                                <section>
                                                    <div className='compra-especificacoes'>
                                                        <h3>{produto.nomeProduto}</h3>
                                                        <p>Você comprou em <span>{formatarData(produto.infoPedido.dataCompra)}</span>.</p>

                                                        <div className='links'>
                                                            <Link to={'/produto/' + produto.idProduto}>Encontrar na loja</Link>
                                                        </div>
                                                    </div>

                                                    <div className="detalhes">
                                                        <div>
                                                            <h3>Quantidade:</h3>
                                                            <div>{produto.quantidade}</div>
                                                        </div>

                                                        <div>
                                                            <h3>Preço Total:</h3>
                                                            <div>{valorEmReais(produto.precoProduto * produto.quantidade)}</div>
                                                        </div>

                                                        <div className='compra-status'>
                                                            <h3>Status</h3>
                                                            <div>{produto.infoPedido.estado}</div>
                                                            <Link to={`/entrega/${produto.idPedido}/produto/${produto.idProduto}`}>Ver pedido</Link>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>

                                            <div className='compra mobile'>
                                                <div>
                                                    <img src={mostrarUrlImagem(produto.imagem)} alt="Imagem do Produto" />

                                                    <div className='compra-especificacoes'>
                                                        <h3>{produto.nomeProduto}</h3>
                                                        <p>Você comprou em <span>{formatarData(produto.infoPedido.dataCompra)}</span>.</p>

                                                        <div className='links'>
                                                            <Link to={'/produto/' + produto.idProduto}>Encontrar na loja</Link>
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr />

                                                <section>
                                                    <div className="detalhes">
                                                        <div>
                                                            <h3>Qtd:</h3>
                                                            <div>{produto.quantidade}</div>
                                                        </div>

                                                        <div>
                                                            <h3>Preço:</h3>
                                                            <div>{valorEmReais(produto.precoProduto * produto.quantidade)}</div>
                                                        </div>

                                                        <div className='compra-status'>
                                                            <h3>Status</h3>
                                                            <div>{produto.infoPedido.estado}</div>
                                                            <Link to={`/entrega/${produto.idPedido}/produto/${produto.idProduto}`}>Ver pedido</Link>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }

                    </div>
                </div>

            </main>

            <Rodape />
        </div>
    )
}