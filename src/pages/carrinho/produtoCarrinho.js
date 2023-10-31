import { useEffect, useState } from "react"
import { valorEmReais } from "../../api/funcoesGerais";
import { mostrarUrlImagem } from "../../api/produtoAPI";

export default function ProdutoCarrinho({ produto, resetar }) {

    const [qtd, setQtd] = useState(1);
    const [precoReal, setPrecoReal] = useState(produto.qtd);

    function adicionarQtd() {
        setQtd(qtd + 1);
        
        produto.qtd = produto.qtd + 1;
        resetar();
    }

    function subtrairQtd() {
        setQtd(qtd - 1);
        
        produto.qtd = produto.qtd - 1;
        resetar();
    }

    useEffect(() => {
        if (produto.promocao) {
            setPrecoReal(produto.valorPromocional);
        } else {
            setPrecoReal(produto.preco);
        }
    }, [])

    return (
        <div className='produto-container'>
            <div className='produto'>
                <div className="img">
                    <img src={mostrarUrlImagem(produto.img)} alt="" />
                </div>

                <div className='produto-especificacoes'>
                    <h2>{produto.nome}</h2>
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

                        <button>Excluir</button>
                        <a href="">Ver semelhantes</a>

                        <div className='preco-mobile'>{valorEmReais(produto.preco)}</div>
                    </div>
                </div>

                <div className='produto-preco'>
                    <h2>Preço:</h2>
                    <h4>{produto.promocao && valorEmReais(produto.valorPromocional)}</h4>
                    <h3>{valorEmReais(precoReal)}</h3>
                </div>
            </div>
        </div>
    )
}