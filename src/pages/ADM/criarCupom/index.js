import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { TemaContext } from '../../../theme';
import { buscarProdutos } from '../../../api/produtoAPI';
import { toast } from 'react-toastify';
import { valorEmReais } from '../../../api/funcoesGerais';

export default function CriarCupom() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const [codigo, setCodigo] = useState('');
    const [porcentagem, setPorcentagem] = useState();
    const [dataExpiracao, setDataExpiracao] = useState('');

    const [listaProdutos, setListaProdutos] = useState([]);
    const [busca, setBusca] = useState('');

    async function buscar() {
        try {
            let p = await buscarProdutos(busca);
            console.log(p);
            setListaProdutos(p);
        } catch (error) {
            toast.error('Não foi possível carregar os produtos. Tente novamente mais tarde.')
        }
    }

    useEffect(() => {
        buscar();
    }, [])

    async function criarCupom() {

    }

    return (
        <div className={'pagina-criar-cupom ' + tema}>
            <CabecalhoADM />

            <div className='main'>
                <BarraLateral />

                <div className='container-cupom'>
                    <h1>Cupons</h1>

                    <p>Defina o cupom e selecione os produtos aplicáveis</p>

                    <div className='definir-cupom'>
                        <div>
                            <p>Definir Cupom:</p>
                            <input type="text" placeholder='Inserir Código' />
                        </div>
                        <div>
                            <input type="text" placeholder='Porcentagem de Desconto' />
                        </div>
                        <div>
                            <p>Data de Expiração:</p>
                            <input type="date" />
                        </div>
                    </div>

                    <div className='pesquisa'>
                        <div className="busca">
                            <img src="/assets/images/icons/search.svg" alt="" />
                            <input type="text" placeholder="Nome ou Código de Barra do Produto..." />
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
                                    <td>ID</td>
                                    <td>Nome do Produto</td>
                                    <td>Valor do Produto</td>
                                    <td>Válido para o Cupom</td>
                                </tr>
                            </thead>
                            <tbody>
                                {listaProdutos.map(produto => 
                                    <tr key="">
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{valorEmReais(produto.preco)}</td>
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
                                    </tr>
                                )}
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