  import './index.scss';

import Cabecalho from '../../components/cabecalho';
import Rodape from '../../components/rodape';

import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import storage from 'local-storage';
import { mostrarUrlImagem } from '../../api/produtoAPI';
import { atualizarDadosCliente, trocarFotoPerfil } from '../../api/clienteAPI';
import InputMask from 'react-input-mask';

import { toast, ToastContainer } from 'react-toastify';
import { TemaContext } from '../../theme';

export default function Perfil() {

  const context = useContext(TemaContext);
  let tema = context.tema;

  const [infoUser, setInfoUser] = useState({});
  const [nascimento, setNascimento] = useState(new Date());

  const [img, setImg] = useState();
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updateTel, setUpdateTel] = useState(false);
  const [updateFoto, setUpdateFoto] = useState();

  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let info = storage('user-login');

    if (info) {
      setInfoUser(info);
      console.log(info);
      setNascimento(new Date(info.dataNascimento));
      setImg(info.imgPerfil);
      setEmail(info.email);
      setTelefone(info.telefone);
    } else {
      navigate('/login')
    }
  }, [])

  function sair() {
    storage.remove('user-login');
    navigate('/');
  }

  async function alterarInfo() {
    try {
      if(!carregando)
      {
        setCarregando(true);

        await atualizarDadosCliente(infoUser.id, email, telefone);

        if(updateFoto)
          await trocarFotoPerfil(infoUser.id, img);

        toast.success('Dados alterados com sucesso! Faça login novamente.');
        storage.remove('user-login');

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }      
    } catch (error) {
      console.log(error);

      if (error.response)
        toast.error(error.response.data);
      else
        toast.error(error.message);

      setCarregando(false);
    }
  }

  function mostrarImagem() {
    if(img.type) {
      return URL.createObjectURL(img);
    } else {
      return mostrarUrlImagem(img);
    }
  }

  return (
    <div className={'pagina-perfil ' + tema}>
      <Cabecalho />

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

      <div className='secao'>
        <div className='perfil'>
          <div className='ladoEsq'>
            <div className='imagem'>
              <input type="file" id='inputImg' onChange={e => {
                setImg(e.target.files[0])
                setUpdateFoto(true)
              }} />
              
              {!img ? <img src="/assets/images/usuario.png" alt="Insira uma foto de perfil!" onClick={(() => document.getElementById('inputImg').click())} /> :
                <img src={mostrarImagem()} alt="FotoPerfil" />}
            </div>

            <div className='trocaImg'>
              <button onClick={(() => document.getElementById('inputImg').click())}>Adicionar Imagem</button>
            </div>

            <Link href="">Trocar Senha</Link>
            <Link to={'/meus-pedidos'}>Meus Pedidos</Link>
            <button onClick={sair}>Sair</button>
          </div>

          <div className='barra'></div>

          <div className='ladoDir'>
            <h1>Meu Perfil</h1>

            <h3>Nome de usuário</h3>
            <div className='info'>
              <p>{`${infoUser.nome} ${infoUser.sobrenome}`}</p>
            </div>

            <h3>CPF</h3>
            <div className='info'>
              <p>{infoUser.cpf}</p>
            </div>

            <h3>E-mail</h3>
            <div className='infoTrocavel'>
              <div>
                {updateEmail ?
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)}/> :
                  <p>{infoUser.email}</p>
                }
              </div>
              <button onClick={() => setUpdateEmail(true)}>Trocar</button>
            </div>

            <h3>Número de Telefone</h3>
            <div className='infoTrocavel'>
              <div>
                {updateTel ? 
                  <InputMask mask="+55 (99) 99999-9999" type="text" value={telefone} onChange={e => setTelefone(e.target.value)}/> :
                  <p>{infoUser.telefone}</p> 
                }
              </div>
              <button onClick={() => setUpdateTel(true)}>Trocar</button>
            </div>

            <h3>Data de Nascimento</h3>
            <div className='data'>
              <div>
                <p>{nascimento.getDate()}</p>
              </div>

              <div>
                <p>{nascimento.getMonth() + 1}</p>
              </div>

              <div>
                <p>{nascimento.getFullYear()}</p>
              </div>
            </div>
          </div>
        </div>

        {(updateFoto || updateEmail || updateTel) && <button className='confirm-btn' onClick={alterarInfo}>Confirmar mudanças</button>}
      </div>

      <Rodape />
    </div>
  )
}