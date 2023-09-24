import { useEffect, useState } from 'react';
import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {toast, toastContainer} from 'react-toastify';

export default function CadastroProduto() {
    const [foto, setFoto] = useState('');
    const [nomeProduto, setNomeProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [qtdEstoque, setQtdEstoque] = useState('0');
    const [descricao, setDescricao] = useState('');
    const [especificacoes, setEspecificacoes] = useState('');
    const [categoria, setCategoria] = useState(0);
    const [marca, setMarca] = useState(0);
    const [usado, setUsado] = useState(0);
    const [peso, setPeso] = useState(0);

    const [atualizar, setAtualizar] = useState(false);

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
            setPeso(produto.peso);

            setAtualizar(true);
        }
    }, [])

    async function atualizarProduto() {
        try {
            let infoProduto = {
                nome: nomeProduto,
                preco: preco,
                estoque: qtdEstoque,
                descricao: descricao,
                especificacoes: especificacoes,
                categoria: categoria,
                marca: marca,
                usado: usado,
                peso: peso
            }
    
            let url = 'http://localhost:5000/produto/' + produto.id;
    
            let resp = await axios.put(url, infoProduto);
    
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

    async function cadastrarProduto() {
        
    }

    return(
        <div className="pagina-cadastro-produto">
            <CabecalhoADM />
            <main>
                <BarraLateral/>
                <div className='informacoes-cadastro-produto'>

                    <h1>Registro de produto</h1>

                    <div className="detalhes-registro-produto">

                        <div className="info-foto-produto">

                            <div className="foto-produto"> 
                                <input className='foto-principal'  value={foto} onChange={e => (e.target.value)}/>

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
                                <input type="text" placeholder='Nome do produto' className="nome-produto" />
                                <input type="text" placeholder='Preço'/>
                                <input type="text" placeholder='Quantidade'/>
                            </div>
                            <p>Descrição</p>
                            <textarea cols="30" rows="10" placeholder='Ex: God of War: Collection tem como proposta central trazer o esplendor da série através de visuais em alta definição e uma jogabilidade ainda mais fluida. O game apresenta um compilado dos dois títulos mais aclamados da geração passada, agora com jogabilidade e gráficos melhorados, mas todas a qualidade da série mantida. A taxa estável de 60 quadros por segundo mostra que o terceiro PlayStation não encontra problemas em reproduzir os dois games com a aplicação de filtros de correção de...'></textarea>

                            <div className="caracteristicas-produto">
                                <div className='especificacoes'>
                                    <h4>Especificações</h4>
                                    <p>(Separe usando dois pontos e quebra de linha, e escreva as mais importantes ao cliente primeiro)</p>
                                    <input type="text" />
                                </div>

                                <div className='estado-produto'>
                                    <div className='check-usado'>
                                        <input type="radio" className='check'/>
                                        <p>Produto usado</p>
                                    </div>

                                    <select>
                                        <option value="0" key="">Categoria</option>
                                    </select>
                                    
                                    <select>
                                        <option value="0" key="">Marca</option>
                                    </select>
                                </div>

                            </div>

                        </div>

                    </div>

                    <button onclick={() => {
                        atualizar ? atualizarProduto() : cadastrarProduto()
                    }}>
                        {atualizar ? 'Atualizar produto' : 'Adicionar produto'}
                    </button>
                </div>
            </main>


        </div>
    )
}