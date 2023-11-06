import "./index.scss";
import CabecalhoADM from '../../../components/ADM/cabecalho'
import BarraLateral from '../../../components/ADM/barraLateral'
import { useContext, useEffect, useState } from "react";

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from "react-router-dom";
import { buscarImagens, buscarProdutos, deletarProduto, excluirImagem } from "../../../api/produtoAPI";
import { toast, ToastContainer } from "react-toastify";
import { buscarAvaliacoes, deletarAvaliacao, tirarLike, verificarNumeroLikes } from "../../../api/avaliacaoAPI";
import { TemaContext } from "../../../theme";

export default function ConsultaProduto()
{

    const context = useContext(TemaContext);
    let tema = context.tema;

    const [listaProdutos, setListaProdutos] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('');
    const [ordem, setOrdem] = useState('');

    const navigate = useNavigate();

    async function buscar() {
        try {
            let produtos = await buscarProdutos(busca, ordem, filtro);
            setListaProdutos(produtos);   
        } catch (error) {
            console.log(error.message);
        }
    }

    async function deletar(id, nome) {
        confirmAlert({
            title: 'Confirmar exclusão',
            message: `Tem certeza que deseja remover o item ${nome}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async () => {
                    try {
                        let imagens = await buscarImagens(id);
                        let avaliacoes = await buscarAvaliacoes(id);

                        for (let i = 0; i < imagens.length; i++) {
                            let imagem = imagens[i];

                            await excluirImagem(imagem.id);
                        }

                        for (let i = 0; i < avaliacoes.length; i++) {
                            let a = avaliacoes[i];
                            
                            let likes = await verificarNumeroLikes(a.id)
                            likes = likes.likes;
                            
                            for (let i = 0; i < likes.length; i++) {
                                let like = likes[i];
                                
                                await tirarLike(like.idCliente, like.idAvaliacao);
                            }

                            await deletarAvaliacao(a.id);
                        }

                        let resp = await deletarProduto(id);

                        if(resp.status === 204)
                            toast.success('Produto deletado com sucesso!')

                        buscar();
                    } catch (error) {
                        if(error.response) {
                            toast.error(error.response.data)
                        } else {
                            toast.error(error.message);
                        }   
                    }
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
            buscar()
        },
        [busca, ordem, filtro]
    );

    return(
        <div className={"pagina-consulta-produto " + tema}>
            <CabecalhoADM/>

            <main>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <BarraLateral/>

                <div className="container-consulta">
                    <div className="input">
                        <img src="/assets/images/icons/search.svg" alt="" />
                        <input type="text" placeholder="Nome, Categoria, ou Marca do Produto" value={busca} onChange={(e) => setBusca(e.target.value)}/>
                    </div>

                    <div className="filtros">
                        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
                            <option value="0" key="">Filtrar</option>
                            <option value="promocao" key="">Produtos em promoção</option>
                        </select>

                        <select value={ordem} onChange={e => setOrdem(e.target.value)}>
                            <option value="" key="">Ordenar por</option>
                            <option value="alfabetico" key="">A-Z</option>
                            <option value="preco_asc" key="">Preço (crescente)</option>
                            <option value="preco_desc" key="">Preço (decrescente)</option>
                            <option value="data" key="">Data de cadastro</option>
                        </select>
                    </div>
                    
                    <div className="container-tabela">
                        <table>
                            <thead>
                                <tr key="">
                                    <td>ID</td>
                                    <td>Nome do Produto</td>
                                    <td>QTD</td>
                                    <td>Novo/Usado</td>
                                    <td className="no-border-right">Valor do Produto</td>
                                    <td>Editar</td>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProdutos.map(
                                    produto =>
                                    <tr>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{produto.estoque}</td>
                                        <td>{produto.usado ? 'Usado' : 'Novo'}</td>
                                        <td className="no-border-right">{produto.preco}</td>
                                        <td className="container-edit">
                                            <div>
                                              <button onClick={() => navigate(`/adm/atualizar-produto/${produto.id}`)}>
                                                  <img src="/assets/images/icons/adm/edit.svg" alt="" />
                                              </button>

                                              <button onClick={() => {
                                                  deletar(produto.id, produto.nome)
                                                  buscar()    
                                              }}>
                                                  <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                              </button>
                                            </div>
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