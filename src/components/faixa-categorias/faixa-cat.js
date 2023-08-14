import './faixa-cat.scss'
import Seta from '../../assets/images/icons/arrow-down.svg'

export default function FaixaCategorias() {
    return (
        <section className='sec-categorias'>
            <ul>
                <li>
                    <a href="">Playstation</a> <img src={Seta} alt=''/>
                </li>
                <li>
                    <a href="">Xbox</a> <img src={Seta} alt=''/>
                </li>
                <li>
                    <a href="">Nintendo</a> <img src={Seta} alt=''/>
                </li>
                <li>
                    <a href="">Acessórios</a> <img src={Seta} alt=''/>
                </li>
                <li>
                    <a href="">Raridades</a> <img src={Seta} alt=''/>
                </li>
                <li>
                    <a href="">Outros</a> <img src={Seta} alt=''/>
                </li>
            </ul>
        </section>
    )
}