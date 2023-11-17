import { Link, useNavigate } from 'react-router-dom';
import storage from 'local-storage';
import './index.scss';
import { useContext, useEffect } from 'react';
import { TemaContext } from '../../../theme';

export default function CabecalhoADM() {

    const navigate = useNavigate();

    useEffect(() => {
        if(!storage('adm-login'))
            navigate('/adm/login');
    })

    const tema = useContext(TemaContext);

    return(
        <header className="cabecalho-adm">
            <div className="container-logo">
                <img src="/assets/images/LogoComNome.svg" alt="" />
            </div>
            
            <nav>
                <div className="nav-icons">

                    <div className='linha'/>

                    <Link onClick={tema.trocarTema}>
                        <img src="/assets/images/icons/sun.svg" alt="" />
                    </Link>

                    <div className='linha'/>
                </div>

                <div className="usuario">
                    <img src="/assets/images/usuario.png" alt="" />
                    <h3>Admin</h3>
                </div>
            </nav>
        </header>
    )
}