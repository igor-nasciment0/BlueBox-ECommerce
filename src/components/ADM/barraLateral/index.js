import { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import {useMediaQuery} from '@mui/material';

export default function BarraLateral() {

    const [display, setDisplay] = useState(useMediaQuery('(max-width: 1024px)') ? 'none' : 'flex');

    function toogleDisplay() {
        if(display === 'flex') {
            setDisplay('none');
        } else {
            setDisplay('flex');
        }
    }

    return(
        <div className='container-barra'>
            <button className='botao-menu' onClick={toogleDisplay}>
                <img src="/assets/images/icons/menu.svg" alt="" />
            </button>
            <section className="barra-lateral" style={{display: display}}>
                <div className="user-info">
                    <img src="/assets/images/pessoa-aleatoria.png" alt="" />

                    <div>
                        <h2>Carlos H. S. Pinto</h2>
                        <h3>Dark Programmer</h3>
                    </div>
                </div>

                <hr/>

                <h2>Bem Vindo, Carlos.</h2>

                <nav>
                    <Link to={'/adm/grafico-vendas'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/casa.svg" alt="" />
                        </div>
                        
                        <h3>Início</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>

                    <Link to={'/adm/cadastro-produto'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/register.svg" alt="" />
                        </div>
                        
                        <h3>Registro de Produto</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>

                    <Link to={'/adm/consulta-produto'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/search.svg" alt="" />
                        </div>
                        
                        <h3>Consulta de Produto</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>

                    <Link to={'/adm/pedido-pendente'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/open-box.svg" alt="" />
                        </div>
                        
                        <h3>Pedidos Pendentes</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>

                    <Link to={'/adm/pedido-concluido'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/box-checked.svg" alt="" />
                        </div>
                        
                        <h3>Pedidos Concluídos</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>

                    <Link to={'/adm/promocoes'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/percentage.svg" alt="" />
                        </div>
                        
                        <h3>Promoções</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>

                    <Link to={'/adm/criar-cupom'}>
                        <div className="icone">
                            <img src="/assets/images/icons/adm/barraLateral/coupon.svg" alt="" />
                        </div>
                        
                        <h3>Cupons</h3>
                        
                        <img src="/assets/images/icons/adm/barraLateral/arrow-right.svg" alt="Início" />
                    </Link>
                </nav>

                <button className='mobile-sair' onClick={toogleDisplay}>
                    <img src="/assets/images/icons/arrow-left.svg" alt="" />
                </button>
            </section>    
        </div>
        
    )
}