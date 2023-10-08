import { useContext, useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import { atualizarProduto, buscarCategorias, buscarMarcas, cadastrarProduto } from '../../../api/produtoAPI';
import { TemaContext } from '../../../theme';

export default function CadastroProduto() {

    const context = useContext(TemaContext);
    let tema = context.tema

    const [foto, setFoto] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [preco, setPreco] = useState();
    const [qtdEstoque, setQtdEstoque] = useState();
    const [descricao, setDescricao] = useState('');
    const [especificacoes, setEspecificacoes] = useState('');
    const [categoria, setCategoria] = useState(0);
    const [marca, setMarca] = useState(0);
    const [usado, setUsado] = useState(false);
    const [peso, setPeso] = useState(100);

    const [atualizacao, setAtualizacao] = useState(false);

    const [listaMarcas, setListaMarcas] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);

    const location = useLocation();
    const produto = location.state;

    useEffect(() => {
        if(produto)
        {
            setNomeProduto(produto.nome);
            setPreco(produto.preco);
            setQtdEstoque(produto.estoque);
            setDescricao(produto.descricao);
            setEspecificacoes(produto.especificacoes);
            setUsado(produto.usado);
            setCategoria(produto.categoria);
            setMarca(produto.marca);
            setPeso(100);

            setAtualizacao(true);
        }
    }, [produto])

    useEffect(() => {
        listarMarcasCategorias()
    }, [])

    async function atualizar() {
        try {
            let resp = await atualizarProduto(produto.id, nomeProduto, preco, qtdEstoque, descricao, especificacoes, categoria, marca, usado, peso)
    
            if(resp.status === 204) {
                toast.success('Produto atualizado com sucesso!');
            }      

        } catch (error) {
            if(error.response) {
                toast.error(error.response.data);
            } 
            else {
                toast.error(error.message);
            }
        }
    }

    async function cadastrar() {
        try{
            let resp = await cadastrarProduto(nomeProduto, preco, qtdEstoque, descricao, especificacoes, categoria, marca, usado, peso);

            if(resp.status === 200) {
                toast.success("Produto cadastrado com sucesso!")
            }
        }
        catch(error)
        {
            if(error.response) {
                toast.error(error.response.data);
            } 
            else {
                toast.error(error.message);
            }
        }
    }

    async function listarMarcasCategorias() {
        try {
            let categorias = await buscarCategorias();
            let marcas = await buscarMarcas();

            setListaCategorias(categorias);
            setListaMarcas(marcas);

        } catch (error) {
            console.log(error.message);
        }
    }

    return(
        <div className={"pagina-cadastro-produto " + tema}>
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

            <CabecalhoADM />
            <main>
                <BarraLateral/>

                <div className='informacoes-cadastro-produto'>

                    <h1>Registro de produto</h1>

                    <div className="detalhes-registro-produto">

                        <div className="info-foto-produto">

                            <div className="foto-produto"> 
                                <input className='foto-principal' value={foto} onChange={e => (e.target.value)}/>

                                <div className="fotos-adicionais">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>

                            <button>Adicionar Imagem Principal</button>
                            <button className="add-2nd-img">Adicionar Imagem Secundária</button>

                        </div>

                        <div className="info-abt-produto">
                            <div className="inicial-info">
                                <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} placeholder='Nome do produto' className="nome-produto" />
                                <input type="number" value={preco} onChange={e => setPreco(Number(e.target.value))} placeholder='Preço'/>
                                <input type="text" value={qtdEstoque} onChange={e => setQtdEstoque(Number(e.target.value))} placeholder='Quantidade'/>
                            </div>
                            <p>Descrição</p>
                            <textarea cols="30" value={descricao} onChange={e => setDescricao(e.target.value)} rows="10" placeholder='Ex: God of War: Collection tem como proposta central trazer o esplendor da série através de visuais em alta definição e uma jogabilidade ainda mais fluida. O game apresenta um compilado dos dois títulos mais aclamados da geração passada, agora com jogabilidade e gráficos melhorados, mas todas a qualidade da série mantida. A taxa estável de 60 quadros por segundo mostra que o terceiro PlayStation não encontra problemas em reproduzir os dois games com a aplicação de filtros de correção de...'></textarea>

                            <div className="caracteristicas-produto">
                                <div className='especificacoes'>
                                    <h4>Especificações</h4>
                                    <p>(Separe usando dois pontos e quebra de linha, e escreva as mais importantes ao cliente primeiro)</p>
                                    <textarea type="text" value={especificacoes} onChange={e => setEspecificacoes(e.target.value)}/>
                                </div>

                                <div className='estado-produto'>
                                    <div className='check-usado'>
                                        <input type="checkbox" onChange={e => setUsado(e.target.checked)} className='check'/>
                                        <p>Produto usado</p>
                                    </div>

                                    <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                                        <option value="0" key="">Categoria</option>
                                        {listaCategorias.map(item => 
                                            <option value={item.id} key={item.id}>{item.categoria}</option>    
                                        )}
                                    </select>
                                    
                                    <select value={marca} onChange={e => setMarca(e.target.value)}>
                                        <option value="" key="">Marca</option>
                                        {listaMarcas.map(item => 
                                            <option value={item.id} key={item.id}>{item.marca}</option>    
                                        )}
                                    </select>
                                </div>

                            </div>

                        </div>

                    </div>

                    <button onClick={() => {
                        if (atualizacao) {
                            atualizar();
                        } else {
                            cadastrar();
                        }
                    }}>
                        {atualizacao ? 'Atualizar Produto' : 'Salvar Produto'}
                    </button>
                </div>
            </main>


        </div>
    )
}