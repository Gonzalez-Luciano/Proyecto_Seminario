import React, {useState} from 'react';
import '../css/cuentaCss.css'
import '../controllers/cuentaController.js'

export const Cuentas = ({idUser}) => {
    let accounts = [{
        'NoCuenta':'6162358',
        'TipoCuenta':'Caja de Ahorros en $',
        'Saldo': '800,000.00'
    },{
        'NoCuenta':'6189321',
        'TipoCuenta':'Cta Corriente en $',
        'Saldo': '0.00'
    },
    {
        'NoCuenta':'6100231',
        'TipoCuenta':'Caja de Ahorros en U$D',
        'Saldo': '570.00'
    }];
    const [cuentas, setCuentas] = useState([]);
    

  return ( 
        <div className='container-fluid p-0'>
            {cuentas.map((cuenta)=>{
                return (
                <div>
                    <div className='card container-fluid mb-3 border-3 border-success bg-dark'>
                        <a href="#" className='container-fluid bg-transparent text-light'>
                            <div className='container-fluid card-body d-lg-flex justify-content-between align-items-center'
                            width="100%">
                                <div>
                                    <h6 className='card-title mb-0 '>{cuenta.TipoCuenta}</h6>
                                    <small className='text-light'>{cuenta.NoCuenta}</small>
                                </div>
                                <div className = "d-flex justify-content-start justify-content-lg-end"> 
                                    <h5 className='mb-0'>{cuenta.TipoCuenta=='Caja de Ahorros en U$D' ? 'U$D ' : '$ '}{cuenta.Saldo}</h5>
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


