import { useState } from "react";

export default function LinhaTbPromocao({produto, alterarBtPromo, alterarValorPromo, buscar}) {
    
    const [valorPromo, setValorPromo] = useState(produto.valorPromocional);
    
    return (
        <tr className={!produto.promocao && 'unchecked'}>
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td className="no-border-right">R$ {produto.preco}</td>
            <td><input type="number" value={valorPromo} onChange={e => {
                setValorPromo(e.target.value);
                alterarValorPromo(Number(e.target.value), produto.id);
            }}/></td>
            
            
            <td className="container-edit">
                <div>
                    {produto.promocao ? 
                        <button onClick={() => {
                            alterarBtPromo(false, produto.id);
                            buscar();
                        }}>
                            <img src="/assets/images/icons/adm/delete.svg" alt="" />
                        </button>

                        :

                        <button onClick={() => {
                            alterarBtPromo(true, produto.id);
                            buscar();
                        }}>
                            <img src="/assets/images/icons/adm/check.svg" alt="" />
                        </button>
                    }
                </div>
            </td>
        </tr>
    )
}