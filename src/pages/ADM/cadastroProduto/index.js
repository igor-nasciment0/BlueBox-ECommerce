import BarraLateral from '../../../components/ADM/barraLateral';
import CabecalhoADM from '../../../components/ADM/cabecalho';
import './index.scss';

export default function CadastroProduto() {
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
                                <div className='foto-principal'></div>

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
                                <input type="text" placeholder='Nome do produto:' className="nome-produto" />
                                <input type="text" placeholder='Preço inicial:'/>
                                <input type="text" placeholder='Quantidade:'/>
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

                                    <select><option value="0" key="">Categoria</option></select>
                                    <select><option value="0" key="">Marca</option></select>
                                    <select><option value="0" key="">Plataforma</option></select>
                                </div>

                            </div>

                        </div>

                    </div>

                    <button>ADICIONAR PRODUTO</button>

                </div>
            </main>


        </div>
    )
}