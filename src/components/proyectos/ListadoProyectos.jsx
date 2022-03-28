import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
  const nodeRef = React.useRef(null);
  // Extraer proyectos de state inicial
  const proyectosContext = useContext(proyectoContext);
  const { mensaje, proyectos, getProjects } = proyectosContext;

  const alertasContext = useContext(alertaContext);
  const { alerta, showAlert } = alertasContext;

  // Obtener proyectos cuando carga el componente
  useEffect( () => {
    // Si hay un error
    if(mensaje) {
      showAlert(mensaje.msg, mensaje.category);
    }

    getProjects();
  }, [mensaje, showAlert, getProjects]);

  // Revisar si proyectos tiene contenido
  if(!proyectos) return <p>No hay proyectos, comienza creando uno</p>;
  if(proyectos && proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;
  
  return (
    <ul className='listado-proyectos'>
      { alerta ? (<div className={`alerta ${alerta.category}`}>{ alerta.msg }</div>) : null}
      <TransitionGroup>
        {proyectos.map(project => (
          <CSSTransition
            key={project._id}
            timeout={200}
            classNames="proyecto"
            nodeRef={nodeRef}
          >
            <Proyecto
              project={project}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
}
 
export default ListadoProyectos;