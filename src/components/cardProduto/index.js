import { Link, useActionData, useNavigate } from 'react-router-dom';
import './index.scss';
import { useContext, useState } from 'react';
import { TemaContext } from '../../theme';

export default function CardProduto(props)
{
    let context = useContext(TemaContext);
    let tema = context.tema;

    const navigate = useNavigate();
    
    return(
        <div className={'card-produto ' + tema} onClick={navigate('/produto')}>
            <img src='/assets/images/foto_produto.png' alt="Assassin's Creed" />
            <h2>Assassins Creed Brotherhood (Seminovo)</h2>
            <h4 className='preco-anterior'>R$ 44,99</h4>
            <h3 className='preco'>R$ 29,99</h3>

            <p>Ou em até 10x de R$2,99</p>
            <p>PIX: 10% de Desconto</p>

            <Link href="">Comprar</Link>
        </div>
    )
}