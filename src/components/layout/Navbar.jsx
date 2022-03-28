import React, { useContext, useEffect } from 'react';
import authContext from '../../context/autenticacion/authContext';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const proyectosContext = useContext(authContext);
  const { usuario, authUser, signOut } = proyectosContext;

  let navigate = useNavigate();

  useEffect( () => {
    authUser();
    // eslint-disable-next-line
  }, []);

  return (
    <header className='app-header'>
      { usuario ? <p className='nombre-usuario'>Hola <span>{ usuario.name }</span> </p> : null }

      <nav className='nav-principal'>
        {/* <a href="#!">Cerrar Sesion</a> */}
        <button
          className='btn btn-blank cerrar-sesion'
          onClick={() => { signOut(); navigate('/') } }
        >Cerrar Sesion</button>
      </nav>
        
    </header>

  );
}
 
export default Navbar;