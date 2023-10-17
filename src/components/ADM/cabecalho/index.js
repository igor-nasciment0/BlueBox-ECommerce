import { Link, useNavigate } from 'react-router-dom';
import storage from 'local-storage';
import './index.scss';
import { useEffect } from 'react';

export default function CabecalhoADM() {

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if(!storage('adm-login'))
    //         navigate('/adm/login');
    // })

    return(
        <header className="cabecalho-adm">
            <div className="container-logo">
                <img src="/assets/images/LogoComNome.svg" alt="" />
            </div>
            
            <nav>
                <div className="nav-icons">
                    <Link>
                        <img src="/assets/images/icons/adm/cabecalho/squares.svg" alt=""/>
                    </Link>

                    <div className='linha'/>

                    <Link>
                        <img src="/assets/images/icons/adm/cabecalho/mail.svg" alt="" />
                    </Link>

                    <div className='linha'/>

                    <Link>
                        <img src="/assets/images/icons/adm/cabecalho/bell.svg" alt="" />
                    </Link>
                </div>

                <div className="usuario">
                    <img src="/assets/images/pessoa-aleatoria.png" alt="" />
                    <h3>Carlos H. S. Pinto</h3>
                </div>
            </nav>
        </header>
    )
}