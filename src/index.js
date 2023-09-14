import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

import Landpage from './pages/landpage/';
import Carrinho from './pages/carrinho/';
import UserPedidos from './pages/user_pedidos/';
import Pesquisa from './pages/pesquisa';
import TelaCadastro from './pages/cadastro/';
import Produto from './pages/produto'
import Checkout from './pages/checkout';
import UserLogin from './pages/user_login';

import LoginAdm from './pages/ADM/loginAdm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landpage/>}/>
        <Route path='/carrinho' element={<Carrinho/>}/>
        <Route path='/meus-pedidos' element={<UserPedidos/>}/>
        <Route path='/pesquisa' element={<Pesquisa/>}/>
        <Route path='/cadastro' element={<TelaCadastro/>}/>
        <Route path='/produto' element={<Produto/>}/>
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<UserLogin/>}/>

        <Route path='/adm/login' element={<LoginAdm/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);