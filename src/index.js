import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

import Landpage from './pages/landpage/landpage';
import Carrinho from './pages/carrinho/carrinho';
import User_Pedidos from './pages/user_pedidos/pedidos';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landpage/>}/>
        <Route path='/carrinho' element={<Carrinho/>} />
        <Route path='/meus-pedidos' element={<User_Pedidos/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);