import './index.scss'

export default function FaixaCategorias() {
    return (
        <section className='sec-categorias'>
            <ul>
                <div>
                    <li>
                        <h4>Playstation</h4> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <h4>Xbox</h4> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <h4>Nintendo</h4> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                </div>

                <div>
                    <li>
                        <h4>Consoles</h4> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <h4>Acessórios</h4> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                    <li>
                        <h4>Raridades</h4> <img src='/assets/images/icons/arrow-down.svg' alt=''/>
                    </li>
                </div>
            </ul>
        </section>
    )
}