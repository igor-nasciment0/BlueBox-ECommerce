import './index.scss';

export default function BarraLateral() {
    return(
        <section className="barra-lateral">
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
                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/casa.svg" alt="" />
                    </div>
                    
                    <h3>Início</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>

                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/register.svg" alt="" />
                    </div>
                    
                    <h3>Registro de Produto</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>

                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/search.svg" alt="" />
                    </div>
                    
                    <h3>Consulta de Produto</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>

                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/open-box.svg" alt="" />
                    </div>
                    
                    <h3>Pedidos Pendentes</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>

                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/box-checked.svg" alt="" />
                    </div>
                    
                    <h3>Pedidos Concluídos</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>

                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/percentage.svg" alt="" />
                    </div>
                    
                    <h3>Promoções</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>

                <Link>
                    <div className="icone">
                        <img src="/assets/images/icons/barraLateral/coupon.svg" alt="" />
                    </div>
                    
                    <h3>Cupons</h3>
                    
                    <img src="/assets/images/icons/barraLateral/arrow-right.svg.svg" alt="Início" />
                </Link>
            </nav>
        </section>
    )
}