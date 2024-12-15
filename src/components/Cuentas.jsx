import React, {useEffect, useState} from 'react';
import '../css/cuentaCss.css'
import '../controllers/cuentaController.js'
import { getCuenta } from '../controllers/cuentaController.js';

export const Cuentas = ({idUser,setIdAccounts}) => {
    const [cuentas, setCuentas] = useState([]);
    
    useEffect(()=>{
        getCuenta(idUser,setCuentas);
    }, []);
    useEffect(() => {
        const ids = cuentas.map((cuenta) => cuenta.idAccount);
        setIdAccounts(ids);
    }, [cuentas]);

  return ( 
        <div className='container-fluid p-0'>
            {cuentas.map((cuenta)=>{
                return (
                <div key={cuenta.idAccount}>
                    <div className='card container-fluid mb-3 border-3 border-success bg-dark'>
                        <a href="#" className='container-fluid bg-transparent text-light'>
                            <div className='container-fluid card-body d-lg-flex justify-content-between align-items-center'
                            width="100%">
                                <div>
                                    <h6 className='card-title mb-0 '>{cuenta.description}</h6>
                                    <small className='text-light'>{cuenta.noAccount}</small>
                                </div>
                                <div className = "d-flex justify-content-start justify-content-lg-end"> 
                                    <h5 className='mb-0'>{cuenta.description=='Caja de Ahorros en U$D' ? 'U$D ' : '$ '}{cuenta.balance}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                )
            })}
        </div>   
  );
}


