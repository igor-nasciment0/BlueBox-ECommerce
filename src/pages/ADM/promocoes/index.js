import "./index.scss";
import CabecalhoADM from '../../../components/ADM/cabecalho'
import BarraLateral from '../../../components/ADM/barraLateral'
import { useContext, useEffect, useState } from "react";

import 'react-confirm-alert/src/react-confirm-alert.css';
import { buscarProdutos } from "../../../api/produtoAPI";
import { toast, ToastContainer } from "react-toastify";
import { TemaContext } from "../../../theme";
import { alterarValorPromocional, alternarPromocao } from "../../../api/promocoesAPI";
import LinhaTbPromocao from "./linhaTabela";

export default function Promocoes()
{
    const context = useContext(TemaContext);
    let tema = context.tema;

    const [listaProdutos, setListaProdutos] = useState([]);

    const [busca, setBusca] = useState('');
    const [ordem, setOrdem] = useState('');

    async function buscar() {
        try {
            let produtos = await buscarProdutos(busca, ordem);

            produtos.sort((produto, produto2) => {
                if(produto.promocao && !produto2.promocao)
                    return -1
                else if(!produto.promocao && produto2.promocao)
                    return 1
                else 
                    return 0
            });

            setListaProdutos(produtos);  

        } catch (error) {
            console.log(error.message);
        }
    }

    async function alterarValorPromo(novoValor, idProduto) {
        try {
            await alterarValorPromocional(novoValor, idProduto);
        } catch (error) {
            if(error.response)
                toast.error(error.response.data);
            else {
                toast.error(error.message);
            }
        }
    }

    async function alterarBtPromo(btPromo, idProduto) {
        try {
            await alternarPromocao(btPromo, idProduto);
            await buscar();

        } catch (error) {
            if(error.response)
                toast.error(error.response.data);
            else
                toast.error(error.message);
        }
    }

    useEffect(() => {
            buscar();
        }, [busca]
    );

    return(
        <div className={"pagina-promocoes " + tema}>
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
                                    <td>Valor do Produto</td>
                                    <td>Valor promocional</td>
                                    <td>Incluir/Remover</td>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProdutos.map(
                                    produto =>
                                    <LinhaTbPromocao produto={produto} alterarBtPromo={alterarBtPromo} alterarValorPromo={alterarValorPromo} buscar={buscar}/>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}