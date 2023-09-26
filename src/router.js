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

import LoginAdm from './pages/ADM/loginAdm';
import CadastroProduto from './pages/ADM/cadastroProduto';
import ConsultaProduto from './pages/ADM/consultaProduto';
import { useContext, useState } from 'react';
import { TemaContext } from './theme';
import Contato from './pages/contato';

export default function Router() {

    let temaAtual = useContext(TemaContext);

    function trocarTema()
    {
        setTema((prevTheme) => ({
            tema: prevTheme.tema === 'light' ? 'dark' : 'light',
            trocarTema
        }))
    }

    const [tema, setTema] = useState({
        tema: temaAtual.tema,
        trocarTema 
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
                    <Route path='/pagamento' element={<TeladePagamento/>}/>

                    <Route path='/adm/login' element={<LoginAdm/>}/>
                    <Route path='/adm/cadastro-produto' element={<CadastroProduto/>}/>
                    <Route path='/adm/consulta-produto' element={<ConsultaProduto/>}/>   
                </Routes>
            </BrowserRouter>
        </TemaContext.Provider>
    )
}