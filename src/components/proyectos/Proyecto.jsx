import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ project }) => {
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { actualProject } = proyectosContext;
  
  const tareasContext = useContext(tareaContext);
  const { getTasks } = tareasContext;

  // Funcion para agregar el proyecto actual
  const selectProject = id => {
    actualProject(id); // Fijar un proyecto actual
    getTasks(id); // Filtrar las tareas cuando se de click
  }

  return (
    <li>
      <button
        type='button'
        className='btn btn btn-blank'
        onClick={ () => selectProject(project._id)}
      >{project.name}</button> 
    </li>
  );
}
 
export default Proyecto;