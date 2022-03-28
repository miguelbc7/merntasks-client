import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { deleteTask, getTasks, updateTask, setActualTask } = tareasContext;

  if(!proyecto) return null;
  if(!tarea) return null;

  const [proyectoActual] = proyecto;

  // Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
  const handleDelete = id => {
    deleteTask(id, proyectoActual._id);
    getTasks(proyectoActual._id)
  }

  // Funcion que modifica el estado de las tareas
  const handleStatus = task => {
    task.status = !task.status;

    updateTask(task);
  }

  // Agrega una tarea actual cuando el usuario desea editarla
  const handleEdit = task => {
    setActualTask(task);
  }

  return (
    <li className='tarea sombre'>
      <p>{ tarea.name }</p>
      <div className='estado'>
        { tarea.status
          ? 
          (
            <button
              type='button'
              className='completo'
              onClick={() => handleStatus(tarea)}
            >Completo</button>
          )
          :
          (
            <button
              type='button'
              className='incompleto'
              onClick={() => handleStatus(tarea)}
            >Incompleto</button>
          )
        }
      </div>
      <div className="acciones">
        <button
          type='button'
          className='btn btn-primario'
          onClick={() => handleEdit(tarea)}
        >
          Editar
        </button>
        <button
          type='button'
          className='btn btn-secundario'
          onClick={ () => handleDelete(tarea._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
 
export default Tarea;