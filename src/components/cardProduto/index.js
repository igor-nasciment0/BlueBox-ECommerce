import { Link, useActionData, useNavigate } from 'react-router-dom';
import './index.scss';
import { useContext, useEffect, useState } from 'react';
import { TemaContext } from '../../theme';
import { toast } from 'react-toastify';
import { buscarImagens, buscarProdutoPorID, mostrarUrlImagem } from '../../api/produtoAPI';
import { valorEmReais } from '../../api/funcoesGerais';

export default function CardProduto({infoProduto, idProduto})
{
    let context = useContext(TemaContext);
    let tema = context.tema;

    const [produto, setProduto] = useState({});
    const [imagem, setImagem] = useState('');
    const [precoReal, setPrecoReal] = useState(0);

    const navigate = useNavigate();

    async function getData() {
        try {
            if(infoProduto !== undefined) {
                setProduto(infoProduto);
                idProduto = infoProduto.id;
            } else {
                let resp = await buscarProdutoPorID(idProduto);
                setProduto(resp);
            }

            let respImg = await buscarImagens(idProduto);
            
            for(let i = 0; i < respImg.length; i++) {
                let imagem = respImg[i];

                if(imagem.primaria) {
                    setImagem(imagem);
                }
            }
            
        } catch (error) {
            if(error.response)
                toast.error(error.response.data);
            else 
                toast.error(error.message);
        }
    }

    useEffect(() => {
        getData();
        setPrecoReal(produto.promocao ? produto.valorPromocional : produto.preco)
    }, [infoProduto, idProduto, produto])
    
    return(
        <div className={'card-produto ' + tema} onClick={() => navigate('/produto/' + produto.id)}>
            <div>
               <img src={mostrarUrlImagem(imagem.url)} alt={produto.nome} /> 
            </div>

            <h2>{produto.nome}</h2>
            {produto.promocao && <h4 className='preco-anterior'>{valorEmReais(produto.preco)}</h4>}
            <h3 className='preco' style={{color: produto.promocao && 'var(--verde-claro)'}}>
                {valorEmReais(precoReal)}
            </h3>

            <p>Ou em até 10x de {valorEmReais(precoReal/10)}</p>
            <p>PIX: 10% de Desconto</p>

            <Link>Comprar</Link>
        </div>
    )
}