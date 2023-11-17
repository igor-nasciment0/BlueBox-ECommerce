import './index.scss';
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import Cabecalho from '../../components/cabecalho'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rodape from '../../components/rodape';

import BarraProgresso from './barraProgresso';
import { toast } from 'react-toastify';
import { buscarPedidoPorID, buscarProdutosPedido, calcularPrecoProdutos, outrosProdutos, produtoAtual } from '../../api/pedidoAPI';
import { formatarData, limitarString, valorEmReais } from '../../api/funcoesGerais';
import { mostrarUrlImagem } from '../../api/produtoAPI';
import { get } from 'local-storage';

export default function StatusEntrega() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const idPedido = useParams().idPedido;
    const idProduto = useParams().idProduto;

    const [produtoPrincipal, setProdutoPrincipal] = useState({});
    const [produtosSecundarios, setProdutosSecundarios] = useState({});
    const [infoPedido, setInfoPedido] = useState({});

    const [imgPagamento, setImgPagamento] = useState('');

    const navigate = useNavigate();

    let login = get('user-login');

    if (!login) {
        navigate('/login')
    }

    async function BuscarPedido() {
        try {
            let informacaoPedido = await buscarPedidoPorID(idPedido);
            let todosProdutos = await buscarProdutosPedido(idPedido);
            let produtoAt = await produtoAtual(idProduto, todosProdutos);
            let outProdutos = await outrosProdutos(idProduto, todosProdutos);

            setInfoPedido(informacaoPedido);
            setProdutoPrincipal(produtoAt);
            setProdutosSecundarios(outProdutos);

            console.log(informacaoPedido);

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data);
            } else {
                toast.error(error.message);
            }
        }
    }

    useEffect(() => {
        BuscarPedido();
    }, [idPedido, idProduto])

    useEffect(() => {
        switch (infoPedido.tipoPagamento) {
            case 'Cartão de Crédito':
                setImgPagamento('/assets/images/credit-card.svg')
                break;
            case 'Cartão de Débito':
                setImgPagamento('/assets/images/credit-card.svg')
                break;
            case 'PIX':
                setImgPagamento('/assets/images/PIX-logo.png')
                break;
            default:
                setImgPagamento('/assets/images/icons/money.svg')
        }

        if (login) if (infoPedido.idCliente && infoPedido.idCliente != login.id) {
            navigate('/not-authorized');
        }
    }, [infoPedido])

    return (
        <div className={"pagina-entrega " + tema}>
            <Cabecalho />

            <div className='gradient'>
                <main>
                    <Link to={'/meus-pedidos'}><img src="/assets/images/icons/arrow-left.svg" alt="" />Voltar</Link>
                    <h1>Status da compra</h1>

                    <section>
                        <div className='cont-pedido-pgmt'>
                            <div className='cont-pedido'>
                                <div>
                                    <div>
                                        <h2>Pedido</h2>
                                        <h3 onClick={() => navigate('/produto/' + produtoPrincipal.idProduto)}>{produtoPrincipal.nomeProduto}</h3>
                                        <h4>{produtoPrincipal.quantidade} unidades /
                                            <span>Valor: {valorEmReais(produtoPrincipal.precoProduto * produtoPrincipal.quantidade)}</span>
                                        </h4>
                                    </div>

                                    <img onClick={() => navigate('/produto/' + produtoPrincipal.idProduto)} src={mostrarUrlImagem(produtoPrincipal.imagem)} alt={produtoPrincipal.nomeProduto} />
                                </div>

                                {produtosSecundarios.length > 0 &&
                                    <div className='cont-outros-produtos'>
                                        {produtosSecundarios.map(produto =>
                                            <div onClick={() => navigate(`/entrega/${idPedido}/produto/` + produto.idProduto)}>
                                                +
                                                <h4>{limitarString(produto.nomeProduto, 16)}</h4>
                                                <img src={mostrarUrlImagem(produto.imagem)} alt="" />
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>

                            <div className="cont-pagamento">
                                <div>
                                    <h2>Pagamento</h2>
                                    <h3>{infoPedido.tipoPagamento} – <span>{valorEmReais(infoPedido.valorFrete + infoPedido.valorProdutos)}</span></h3>

                                    <h4>
                                        {infoPedido.dataAprovacao ?
                                            `Aprovado em ${formatarData(infoPedido.dataAprovacao, true)}` :
                                            'Aguardando aprovação'
                                        }
                                    </h4>

                                </div>
                                <img src={imgPagamento} alt="" />
                            </div>
                        </div>

                        <div className='cont-detalhes'>
                            <h2>Detalhes da Compra</h2>
                            <h3>Efetuada em {formatarData(infoPedido.dataCompra)}</h3>
                            {infoPedido.tipoPagamento === 'PIX' &&
                                <h3 style={{ color: 'var(--verde-claro)' }}>Por você ter usado PIX, seus produtos receberam 15% de desconto.</h3>
                            }

                            <div>
                                <h4>Produtos</h4>
                                <p>{valorEmReais(infoPedido.valorProdutos)}</p>
                            </div>

                            <div className='subcategoria'>
                                <h4>Este Produto</h4>
                                <p>{valorEmReais(produtoPrincipal.precoProduto * produtoPrincipal.quantidade)}</p>
                            </div>

                            {produtosSecundarios.length > 0 &&
                                <div className='subcategoria'>
                                    <h4>Outros Produtos</h4>
                                    <p>{valorEmReais(calcularPrecoProdutos(produtosSecundarios))}</p>
                                </div>
                            }

                            <div>
                                <h4>Frete</h4>
                                <p>{valorEmReais(infoPedido.valorFrete)}</p>
                            </div>

                            <div>
                                <h4>Total</h4>
                                <p>{valorEmReais(infoPedido.valorFrete + infoPedido.valorProdutos)}</p>
                            </div>
                        </div>
                    </section>

                    <div className='processo-entrega'>
                        <h3>Entrega {infoPedido.dataEntrega ? 'Concluída' : 'Pendente'}</h3>
                        {
                            !infoPedido.dataEntrega &&
                            <h2>Data prevista de Entrega: {formatarData(infoPedido.previsaoEntrega)}</h2>
                        }

                        <p>Desculpe por fazer você esperar :(</p>

                        <BarraProgresso infoPedido={infoPedido} />
                    </div>

                    <h2>Problemas com esta compra?</h2>
                    <Link className='contato' to={'/contato'}>Contate-nos</Link>
                </main>
            </div>

            <Rodape />
        </div>
    )
}