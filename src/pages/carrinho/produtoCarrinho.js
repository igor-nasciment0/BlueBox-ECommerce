import { useEffect, useState } from "react"
import { valorEmReais } from "../../api/funcoesGerais";
import { mostrarUrlImagem } from "../../api/produtoAPI";
import { Link, useNavigate } from "react-router-dom";
import { get, set } from "local-storage";
import { toast } from "react-toastify";

export default function ProdutoCarrinho({ produto, resetar, index }) {

    const navigate = useNavigate();

    const [qtd, setQtd] = useState(produto.qtd);
    const [precoReal, setPrecoReal] = useState(0);

    function adicionarQtd() {
        if(qtd + 1 <= produto.estoque) {
            setQtd(qtd + 1);

            produto.qtd = produto.qtd + 1;
            resetar();    
        } else {
            toast.info(`Só existem ${produto.estoque} desse produto no estoque.`)
        }
    }

    function subtrairQtd() {
        if(qtd > 0) {
            setQtd(qtd - 1);

            produto.qtd = produto.qtd - 1;
            resetar();    
        } 
    }

    function excluirProduto() {
        let arrayCarrinho = get("carrinho");

        let carrinhoSemItem = [...arrayCarrinho.slice(0, index), ...arrayCarrinho.slice(index + 1, arrayCarrinho.length)];

        set('carrinho', carrinhoSemItem);

        window.location.reload();
    }

    useEffect(() => {
        if (produto.promocao) {
            setPrecoReal(produto.valorPromocional);
        } else {
            setPrecoReal(produto.preco);
        }
    }, [produto])

    return (
        <div className='produto-container'>
            <div className='produto'>
                <div className="img" onClick={() => navigate(`/produto/${produto.id}`)}>
                    <img src={mostrarUrlImagem(produto.img)} alt="" />
                </div>

                <div className='produto-especificacoes'>
                    <h2 onClick={() => navigate(`/produto/${produto.id}`)}>{produto.nome}</h2>
                    <h3>{produto.usado ? 'Produto seminovo/usado' : 'Produto novo'}</h3>
                    <h4>{produto.estoque > 0 ? 'Disponível' : 'Indisponível'}</h4>

                    <div className='container-operadores'>
                        <div className='operador-qtd'>
                            <h4>Qtd.</h4>
                            <div>
                                <button onClick={subtrairQtd}> - </button>
                                <div> {qtd} </div>
                                <button onClick={adicionarQtd}> + </button>
                            </div>
                        </div>

                        <button onClick={excluirProduto}>Excluir</button>

                        <div className='preco-mobile'>{valorEmReais(produto.preco)}</div>
                    </div>
                </div>

                <div className='produto-preco'>
                    <h2>Preço:</h2>
                    <h4>{produto.promocao && valorEmReais(produto.preco)}</h4>
                    <h3>{valorEmReais(precoReal)}</h3>
                </div>
            </div>

            <div className='container-operadores mobile'>
                <div className='operador-qtd'>
                    <div>
                        <button onClick={subtrairQtd}> - </button>
                        <div> {qtd} </div>
                        <button onClick={adicionarQtd}> + </button>
                    </div>
                </div>

                <button onClick={excluirProduto}>Excluir</button>

                <div className='preco-mobile'>{valorEmReais(precoReal)}</div>
            </div>
        </div>
    )
}