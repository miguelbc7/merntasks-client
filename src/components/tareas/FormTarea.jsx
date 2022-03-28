import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  const tareasContext = useContext(tareaContext);
  const { tareaSeleccionada, errorTarea, addTask, validateTask, getTasks, updateTask, cleanTask } = tareasContext;

  // State del formulario
  const [tarea, setTarea] = useState({
    name: ''
  });
  
  useEffect( () => {
    if(tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        name: ''
      })
    }
  }, [tareaSeleccionada]);

  // Si no hay proyecto seleccionado
  if(!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;
  const { _id } = proyectoActual;
  const { name } = tarea;

  // Leer los valores del formulario
  const handleChange = e => {
    setTarea({
      ...tarea,
      [e.target.name] : e.target.value
    })
  }
  
  const handleSubmit = e => {
    e.preventDefault();

    // Validar
    if(name.trim() === "") {
      validateTask();
      return;
    }

    // Revisar si es edicion o si es nueva tarea
    if(tareaSeleccionada === null) {
      // Agregar la nueva tarea al state de tareas
      tarea.project = _id;
      addTask(tarea);
    } else {
      // Tarea existente
      updateTask(tarea);
      cleanTask();
    }

    // Obtener y filtrar las tareas del proyecto actual
    getTasks(_id);

    // Reiniciar el form
    setTarea({
      name: ''
    });
  }

  return (
    <div className="formulario">
      <form
        onSubmit={handleSubmit}
      >
        <div className="contenedor-input">
          <input
            type='text'
            className='input-text'
            placeholder='Nombre Tarea'
            name='name'
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type='submit'
            className='btn btn-primario btn-block'
            value={ tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
          />
        </div>
      </form>
      { errorTarea ? (<p className='mensaje error'>El nombre de la tarea es obligatorio</p>) : null}
    </div>
  );
}
 
export default FormTarea;