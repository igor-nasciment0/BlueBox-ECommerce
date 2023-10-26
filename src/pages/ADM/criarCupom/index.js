import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';

export default function CriarCupom() {
    return (
        <div className='pagina-criar-cupom'>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />

                <div className='container-cupom'>
                    <h1>Cupons</h1>

                    <p>Defina o cupom e selecione os produtos aplicáveis</p>

                    <div className='definir-cupom'>
                        <div>
                            <p>Definir Cupom:</p>
                            <input type="text" />
                        </div>
                        <div>
                            <input type="text" />
                        </div>
                        <div>
                            <p>Data de Expiração:</p>
                            <input type="date" />
                        </div>
                    </div>

                    <div className='pesquisa'>
                        <div className="busca">
                            <img src="/assets/images/icons/search.svg" alt="" />
                            <input type="text" placeholder="Nome ou Código de Barra do Produto..."/>
                        </div>

                        <div className='tudo'>
                            <input type="checkbox" />
                            <p>Selecionar Tudo</p>
                        </div>

                        <div className='filtrar'>
                            <select>
                                <option value="0">Filtrar</option>
                            </select>
                        </div>

                        <div className="ordenar">
                            <select>
                                <option value="0">Ordenar por: A a Z</option>
                            </select>
                        </div>
                    </div>

                    <div className='tabela'>
                        <table>
                            <thead>
                                <tr key="">
                                    <td>Código de Barra</td>
                                    <td>Nome do Produto</td>
                                    <td>Valor do Produto</td>
                                    <td>Válido para o Cupom</td>
                                </tr>
                            </thead>
                            <tbody>
                                <td>12345678</td>
                                <td>Resident Evil 3: Nemesis - Playstation 1</td>
                                <td>R$100,00</td>
                                <td>
                                    <div>
                                        <button>
                                            <img src="/assets/images/icons/adm/check.svg" alt="" />
                                        </button>
                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </div>
                                </td>
                            </tbody>
                        </table>
                    </div>

                    <div className='salvar'>
                        <button>Salvar Cupom</button>
                    </div>
                </div> 
            </div>
        </div>
    )
}