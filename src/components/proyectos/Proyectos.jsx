import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import authContext from '../../context/autenticacion/authContext';

const Proyectos = () => {
  const AuthContext = useContext(authContext);
  const { authUser } = AuthContext;

  useEffect( () => {
    authUser();
  }, [authUser]);

  return (
    <div className='contenedor-app'>
      <Sidebar />
      <div className='seccion-principal'>
        <Navbar />
        <main>
          <FormTarea />
          <div className='contenedor-tareas'>
            <ListadoTareas />
          </div>
        </main>
      </div>
    </div>
  );
}
 
export default Proyectos;