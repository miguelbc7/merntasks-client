import React, { useReducer } from "react";

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types";
import clienteAxios from '../../config/axios';

const ProyectoState = (props) => {
  const initialState = {
    formulario: false,
    proyectos: [],
    errorFormulario: false,
    proyecto: null,
    mensaje: null
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const showForm = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    });
  }

  // Obtener los proyectos
  const getProjects = async () => {
    try {
      const response = await clienteAxios.get("/api/projects");
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: response.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        category: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  }

  // Agregar nuevo proyecto
  const addProject = async project => {
    try {
      const response = await clienteAxios.post("/api/projects/create", project);
      // Insertar proyecto en el state con un dispatch
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: response.data,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        category: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  }

  // Validar formulario
  const showError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    });
  }

  // Selecciona el proyecto que el usuario dio click
  const actualProject = (projectId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: projectId,
    });
  };

  // Elimina un proyecto
  const deleteProject = async (projectId) => {
    try {
      await clienteAxios.delete(`api/projects/delete/${projectId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: projectId,
      });
    } catch(error) {
      const alerta = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      });
    }
  }

  return (
    <proyectoContext.Provider
      value={{
        formulario: state.formulario,
        proyectos: state.proyectos,
        errorFormulario: state.errorFormulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        showForm,
        getProjects,
        addProject,
        showError,
        actualProject,
        deleteProject
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
