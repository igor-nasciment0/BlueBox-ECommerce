import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

import Landpage from './pages/landpage/';
import Carrinho from './pages/carrinho/';
import User_Pedidos from './pages/user_pedidos/';
import Pesquisa from './pages/pesquisa';
import TelaCadastro from './pages/cadastro/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landpage/>}/>
        <Route path='/carrinho' element={<Carrinho/>} />
        <Route path='/meus-pedidos' element={<User_Pedidos/>} />
        <Route path='/pesquisa' element={<Pesquisa/>} />
        <Route path='/cadastro' element={<TelaCadastro/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);