import "./index.scss";
import CabecalhoADM from '../../../components/ADM/cabecalho'
import BarraLateral from '../../../components/ADM/barraLateral'
import { useEffect, useState } from "react";
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function ConsultaProduto()
{

    const [listaProdutos, setListaProdutos] = useState([]);
    const [busca, setBusca] = useState('');

    async function buscarProduto()
    {
        let produtos = await axios.get('http://localhost:5000/produto?nome=' + busca);
        setListaProdutos(produtos.data);
    }

    async function deletarProduto(id, nome) {
        confirmAlert({
            title: 'Confirmar exclusão',
            message: `Tem certeza que deseja remocer o item ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    await axios.delete('http://localhost:5000/produto/' + id)
                    buscarProduto();
                }
              },
              {
                label: 'Não',
                onClick: () => {}
              }
            ]
          });      
    }

    useEffect(
        () => {
            buscarProduto()
        },
        [busca]
    );

    return(
        <div className="pagina-consulta-produto">
            <CabecalhoADM/>

            <main>
                <BarraLateral/>

                <div className="container-consulta">
                    <div className="input">
                        <img src="/assets/images/icons/search.svg" alt="" />
                        <input type="text" placeholder="Nome, Categoria, ou Marca do Produto" onChange={(e) => setBusca(e.target.value)}/>
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

                                {listaProdutos.map(
                                    produto =>
                                    <tr>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.estoque}</td>
                                        <td>{produto.usado ? 'Usado' : 'Novo'}</td>
                                        <td>{produto.preco}</td>
                                        <td>
                                            <button>
                                                <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                            </button>

                                            <button onClick={() => {
                                                deletarProduto(produto.id, produto.nome)
                                                buscarProduto()    
                                            }}>
                                                <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}