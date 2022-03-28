import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Tarea from '../tareas/Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {
  const nodeRef = React.useRef(null);
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, deleteProject } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareasProyecto } = tareasContext;

  // Si no hay proyecto seleccionado
  if(!proyecto) return <h2>Selecciona un proyecto</h2>

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;
  const { _id, name } = proyectoActual;

  return (
    <Fragment>
      <h2>Proyecto: { name }</h2>

      <ul className='listado-tareas'>
        { tareasProyecto.length === 0
          ?
            (<li className='tarea'><p>No hay tareas</p></li>)
          :
            <TransitionGroup>
              {tareasProyecto.map( tarea => (
                <CSSTransition
                  key={tarea._id}
                  timeout={200}
                  classNames="tarea"
                  nodeRef={nodeRef}
                >
                  <Tarea
                    tarea={tarea}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
        }
      </ul>
      <button
        type='button'
        className='btn btn-eliminar'
        onClick={() => deleteProject(_id)}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
}
 
export default ListadoTareas;