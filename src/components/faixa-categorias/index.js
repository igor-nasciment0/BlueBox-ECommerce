import './index.scss'

export default function FaixaCategorias() {
    return (
        <section className='sec-categorias'>
            <ul>
                <div>
                    <li>
                        <a href="">Playstation</a> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <a href="">Xbox</a> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <a href="">Nintendo</a> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                </div>

                <div>
                    <li>
                        <a href="">Acessórios</a> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <a href="">Raridades</a> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <a href="">Outros</a> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                </div>
            </ul>
        </section>
    )
}