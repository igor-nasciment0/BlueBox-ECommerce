import { useContext } from "react";
import CabecalhoLogo from "../../components/cabecalhoLogo";
import './index.scss';
import { TemaContext } from "../../theme";

export default function NotFound() {
    const context = useContext(TemaContext);
    let tema = context.tema; 

    return (
        <div className={"pagina-not-found " + tema}>
            <CabecalhoLogo />
            
            <div className="gradient">
                <img src="https://custom-doodle.com/wp-content/uploads/doodle/kirby-flying-on-an-umbrella-pixel/kirby-flying-on-an-umbrella-pixel-doodle.gif" 
                    alt="Kirby voa" />
                <h2>Onde estamos?</h2>
                <h3>Alagoinha?</h3>

                <p>Esta página não existe, ou você não tem permissão para acessá-la.</p>
            </div>
        </div>
    )
}