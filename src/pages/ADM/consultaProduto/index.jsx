import "./index.scss";
import CabecalhoADM from '../../../components/ADM/cabecalho'
import BarraLateral from '../../../components/ADM/barraLateral'

export default function ConsultaProduto()
{
    return(
        <div className="pagina-consulta-produto">
            <CabecalhoADM/>

            <main>
                <BarraLateral/>

                <div className="container-consulta">
                    <div className="input">
                        <img src="/assets/images/icons/search.svg" alt="" />
                        <input type="text" placeholder="Nome ou Código de Barra do Produto"/>
                    </div>

                    <div className="filtros">
                        <select>
                            <option value="0" key="">Filtrar</option>
                        </select>

                        <select>
                            <option value="" key="">Ordenar por</option>
                        </select>
                    </div>
                    
                    <div className="container-tabela">
                        <table>
                            <thead>
                                <tr key="">
                                    <td>Código de Barra</td>
                                    <td>Nome do Produto</td>
                                    <td>QTD</td>
                                    <td>Novo/Usado</td>
                                    <td>Valor do Produto</td>
                                    <td>Editar</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>

                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>00000001</td>
                                    <td>Resident Evil 1 - Playstation 1</td>
                                    <td>10</td>
                                    <td>Usado</td>
                                    <td>R$100,00</td>
                                    <td>
                                        <button>
                                            <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                        </button>

                                        <button>
                                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}