import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { TemaContext } from '../../../theme';
import { buscarProdutos } from '../../../api/produtoAPI';
import { toast } from 'react-toastify';
import { valorEmReais } from '../../../api/funcoesGerais';
import { adicionarCupom, adicionarProdutosCupom } from '../../../api/cupomAPI';
import ToastCont from '../../../components/toastContainer';

export default function CriarCupom() {

    const context = useContext(TemaContext);
    let tema = context.tema;

    const [codigo, setCodigo] = useState('');
    const [porcentagem, setPorcentagem] = useState();
    const [dataExpiracao, setDataExpiracao] = useState('');

    const [listaProdutos, setListaProdutos] = useState([]);
    const [prodSelecionados, setProdSelecionados] = useState([]);
    const [busca, setBusca] = useState('');
    const [filtro, setFiltro] = useState('');
    const [ordem, setOrdem] = useState('');

    const [selecionarTudo, setSelecionarTudo] = useState(true);

    async function buscar() {
        try {
            let p = await buscarProdutos(busca, ordem, filtro);

            p = p.filter(function (produtoLista) {
                return !prodSelecionados.find(produto => produto.id === produtoLista.id);
            })

            setListaProdutos(p);
        } catch (error) {
            toast.error('Não foi possível carregar os produtos. Tente novamente mais tarde.')
        }
    }

    useEffect(() => {
        buscar();
    }, [prodSelecionados, busca, ordem, filtro])

    async function criarCupom() {
        try {
            let cupom = await adicionarCupom(codigo, porcentagem, dataExpiracao);

            console.log(cupom);

            await adicionarProdutosCupom(prodSelecionados, cupom.id);

        } catch (error) {
            console.log(error);
            toast.error(error.response.data)
        }
    }

    function handleSelecionarTudo() {
        if(selecionarTudo) {
            setProdSelecionados([...prodSelecionados, ...listaProdutos]);
        } else {
            setProdSelecionados([]);
        }
    }

    return (
        <div className={'pagina-criar-cupom ' + tema}>
            <CabecalhoADM />

            <div className='main'>
                <ToastCont />
                <BarraLateral />

                <div className='container-cupom'>
                    <h1>Cupons</h1>

                    <p>Defina o cupom e selecione os produtos aplicáveis</p>

                    <div className='definir-cupom'>
                        <div>
                            <p>Definir Cupom:</p>
                            <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder='Inserir Código' />
                        </div>
                        <div>
                            <input type="text" value={porcentagem} onChange={e => setPorcentagem(e.target.value)} placeholder='Porcentagem de Desconto' />
                        </div>
                        <div>
                            <p>Data de Expiração:</p>
                            <input type="date" value={dataExpiracao} onChange={e => setDataExpiracao(e.target.value)} />
                        </div>
                    </div>

                    <div className='pesquisa'>
                        <div className="busca">
                            <img src="/assets/images/icons/search.svg" alt="" />
                            <input type="text" value={busca} onChange={e => setBusca(e.target.value)} placeholder="Nome, categoria ou marca do produto" />
                        </div>

                        <div className='tudo'>
                            <input type="checkbox" value={selecionarTudo} onChange={() => setSelecionarTudo(!selecionarTudo)} onClick={handleSelecionarTudo}/>
                            <p>Selecionar Tudo</p>
                        </div>

                        <div>
                            <select className='filtrar' value={filtro} onChange={e => setFiltro(e.target.value)}>
                                <option value="0" key="">Filtrar</option>
                                <option value="promocao" key="">Produtos em promoção</option>
                            </select>
                        </div>

                        <div>
                            <select className="ordenar" value={ordem} onChange={e => setOrdem(e.target.value)}>
                                <option value="" key="">Ordenar por</option>
                                <option value="alfabetico" key="">A-Z</option>
                                <option value="preco_asc" key="">Preço (crescente)</option>
                                <option value="preco_desc" key="">Preço (decrescente)</option>
                                <option value="data" key="">Data de cadastro</option>
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
                                {prodSelecionados.map((produto, index) =>
                                    <tr key="">
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{valorEmReais(produto.preco)}</td>
                                        <td>
                                            <div>
                                                <button onClick={() => setProdSelecionados(prodSelecionados.toSpliced(index, 1))}>
                                                    <img src="/assets/images/icons/adm/delete.svg" alt="" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {listaProdutos.map(produto =>
                                    <tr key="" className='unchecked'>
                                        <td>{produto.id}</td>
                                        <td>{produto.nome}</td>
                                        <td>{valorEmReais(produto.preco)}</td>
                                        <td>
                                            <div>
                                                <button onClick={() => setProdSelecionados([...prodSelecionados, produto])}>
                                                    <img src="/assets/images/icons/adm/check.svg" alt="" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className='salvar'>
                        <button onClick={criarCupom}>Salvar Cupom</button>
                    </div>
                </div>
            </div>
        </div>
    )
}