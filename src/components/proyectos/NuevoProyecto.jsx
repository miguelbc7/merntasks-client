import React, { useState, useContext, Fragment } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
  // Obtener el state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { formulario, errorFormulario, showForm, addProject, showError } = proyectosContext;

  // State para proyecto
  const [project, setProject] = useState({
    name: ''
  });

  const { name } = project;

  const handleChange = e => {
    setProject({ 
      ...project,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    // Validar el proyecto
    if(name.trim() === "") {
      showError();
      return;
    }

    // Agregar al State
    addProject(project); 

    // Reiniciar el Form
    setProject({
      name: ''
    })
  }

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm() }
      >
        Nuevo Proyecto
      </button>

      { (formulario) ? 
        (
          <form
            className='formulario-nuevo-proyecto'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              className='input-text'
              placeholder='Nombre Proyecto'
              name='name'
              value={name}
              onChange={handleChange}
            />

            <input
              type='submit'
              className='btn btn-block btn-primario'
              value='Agregar Proyecto'
            />
          </form>
          
        ) : null
      }
      { errorFormulario ? (<p className='mensaje error'>El nombre del Proyecto es obligatorio</p>) : null}
    </Fragment>
  );
}
 
export default NuevoProyecto;