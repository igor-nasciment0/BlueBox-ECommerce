import { useActionData } from 'react-router-dom';
import './index.scss';
import { useState } from 'react';

export default function CardProduto(props)
{
    const [classe, setClasse] = useState(`card-produto ${props.tema}`) ;
    
    return(
        <div className={classe}>
            <img src='/assets/images/foto_produto.png' alt="Assassin's Creed" />
            <h2>Assassins Creed Brotherhood (Seminovo)</h2>
            <h4 className='preco-anterior'>R$ 44,99</h4>
            <h3 className='preco'>R$ 29,99</h3>

            <p>Ou em até 10x de R$2,99</p>
            <p>PIX: 10% de Desconto</p>

            <a href="">Comprar</a>
        </div>
    )
}