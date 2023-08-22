import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';

<<<<<<< HEAD
import Landpage from './pages/landpage/landpage';
import Carrinho from './pages/carrinho/carrinho';
import User_Pedidos from './pages/user_pedidos/pedidos';
import Pesquisa from './pages/pesquisa/pesquisa';
=======
import Landpage from './pages/landpage/';
import Carrinho from './pages/carrinho/';
import User_Pedidos from './pages/user_pedidos/';
>>>>>>> 5b4861d7ed5c4fa342bd59ba91af4ea1d23a22e5

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landpage/>}/>
        <Route path='/carrinho' element={<Carrinho/>} />
        <Route path='/meus-pedidos' element={<User_Pedidos />} />
        <Route path='/pesquisa' element={<Pesquisa />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);