import { useContext } from "react";
import CabecalhoLogo from "../../components/cabecalhoLogo";
import './index.scss';
import { TemaContext } from "../../theme";
import { Link } from "react-router-dom";

export default function NotFound() {
    const context = useContext(TemaContext);
    let tema = context.tema; 

    return (
        <div className={"pagina-not-found " + tema}>
            <CabecalhoLogo />
            
            <div className="gradient">
                <h2>Onde estamos?</h2>
                <h3>Alagoinha?</h3>
                <img src="/assets/images/kirby-flying.gif" 
                    alt="Kirby voa" />

                <p>Esta página não existe, ou você não tem permissão para acessá-la.</p>
                <Link to={'/'}>Voltar</Link>
            </div>
        </div>
    )
}