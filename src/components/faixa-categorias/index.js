import { useEffect, useState } from 'react'
import './index.scss'
import { buscarProdutosPagina } from '../../api/produtoAPI';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useMediaQuery } from '@mui/material';
import CardProduto from '../cardProduto';
import { useNavigate } from 'react-router-dom';

export default function FaixaCategorias() {

    const navigate = useNavigate();

    function redirect(categoria) {
        navigate('/pesquisa', {state: {cat : categoria}})
    }

    return (
        <section className='sec-categorias'>
            <div>
                <ul>
                    <div>
                        <li onClick={() => redirect('Playstation')}>
                            <h4>Playstation</h4> <img src='/assets/images/icons/arrow-right.svg' alt='' />
                        </li>
                        <li onClick={() => redirect('Xbox')}>
                            <h4>Xbox</h4> <img src='/assets/images/icons/arrow-right.svg' alt='' />
                        </li>
                        <li onClick={() => redirect('Nintendo')}>
                            <h4>Nintendo</h4> <img src='/assets/images/icons/arrow-right.svg' alt='' />
                        </li>
                    </div>

                    <div>
                        <li onClick={() => redirect('Consoles')}>
                            <h4>Consoles</h4> <img src='/assets/images/icons/arrow-right.svg' alt='' />
                        </li>
                        <li onClick={() => redirect('Acessórios')}>
                            <h4>Acessórios</h4> <img src='/assets/images/icons/arrow-right.svg' alt='' />
                        </li>
                        <li onClick={() => redirect('Raridades')}>
                            <h4>Raridades</h4> <img src='/assets/images/icons/arrow-right.svg' alt='' />
                        </li>
                    </div>
                </ul>
            </div>
        </section >
    )
}