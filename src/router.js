import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landpage from './pages/landpage';
import Carrinho from './pages/carrinho';
import UserPedidos from './pages/user_pedidos';
import Pesquisa from './pages/pesquisa';
import TelaCadastro from './pages/cadastro';
import Produto from './pages/produto'
import Checkout from './pages/checkout';
import UserLogin from './pages/user_login';
import TeladePagamento from './pages/Teladepagamento';
import Perfil from './pages/perfil';
import Telacartao from './pages/Tela-dados-cartão';

import LoginAdm from './pages/ADM/loginAdm';
import CadastroProduto from './pages/ADM/cadastroProduto';
import ConsultaProduto from './pages/ADM/consultaProduto';
import PedidoConcluido from './pages/ADM/pedidosConcluidos';
import { useEffect, useState } from 'react';
import { TemaContext } from './theme';
import Contato from './pages/contato';
import Promocoes from './pages/ADM/promocoes';

export default function Router() {

    let temaSistema = window.matchMedia('(prefers-color-scheme: light)');

    function trocarTema()
    {
        setTema((prevTheme) => ({
            tema: prevTheme.tema === 'light' ? 'dark' : 'light',
            trocarTema
        }))
    }

    const [tema, setTema] = useState({
        tema: temaSistema.matches ? 'light' : 'dark',
        trocarTema 
    });

    useEffect(() => {
        let listener = e => setTema({
            tema: e.matches ? 'light' : 'dark',
            trocarTema
        });

        const verfTema = window.matchMedia("(prefers-color-scheme: light)");
        verfTema.addListener(listener);

        return () => verfTema.removeListener(listener);
      });

    return (
        <TemaContext.Provider value={tema}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landpage/>}/>
                    <Route path='/contato' element={<Contato/>} />
                    <Route path='/carrinho' element={<Carrinho/>}/>
                    <Route path='/meus-pedidos' element={<UserPedidos/>}/>
                    <Route path='/pesquisa' element={<Pesquisa/>}/>
                    <Route path='/cadastro' element={<TelaCadastro/>}/>
                    <Route path='/produto' element={<Produto/>}/>
                    <Route path='/checkout' element={<Checkout />}/>
                    <Route path='/login' element={<UserLogin/>}/>
                    <Route path='/pagamento' element={<TeladePagamento />} />
                    <Route path='/perfil' element={<Perfil />} />
                    <Route path='/tela-cartão' element={<Telacartao />} />

                    <Route path='/adm/login' element={<LoginAdm/>}/>
                    <Route path='/adm/cadastro-produto' element={<CadastroProduto/>}/>
                    <Route path='/adm/consulta-produto' element={<ConsultaProduto />} />   
                    <Route path='/adm/pedido-concluido' element={<PedidoConcluido />} />
                    <Route path='/adm/promocoes' element={<Promocoes />} />
                </Routes>
            </BrowserRouter>
        </TemaContext.Provider>
    )
}