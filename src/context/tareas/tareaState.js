import React, { useReducer } from "react";

import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from "../../types";
import clienteAxios from '../../config/axios';

const TareaState = (props) => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null
  }

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(tareaReducer, initialState);

  // Crear las funciones

  // Obtener las tareas de un proyecto
  const getTasks = async project => {
    try {
      const response = await clienteAxios.get(`api/tasks/${project}`);
      console.log(response.data.tasks);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: response.data.tasks,
      });
    } catch(error) {

    }
    
  }

  // Agregar una tarea al proyecto seleccionado
  const addTask = async task => {
    try {
      const response = await clienteAxios.post('/api/tasks/create', task);
      dispatch({
        type: AGREGAR_TAREA,
        payload: response.data,
      });
    } catch(error) {
      console.log(error);
    }
  }

  // Valida y muestra un error en caso de que sea necesario
  const validateTask = () => {
    dispatch({
      type: VALIDAR_TAREA
    });
  }

  // Eliminar tarea por id
  const deleteTask = async (id, project) => {
    try {
      await clienteAxios.delete(`/api/tasks/delete/${id}`, { params: { project } });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
    } catch(error) {
      console.log(error);
    }
  }

  // Extrae una tarea para edicion
  const setActualTask = task => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: task
    });
  }

  // Editar o modifica una tarea
  const updateTask = async task => {
    try {
      const response = await clienteAxios.put(`/api/tasks/update/${task._id}`, task);
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: response.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Elimina la tarea seleccionada
  const cleanTask = () => {
    dispatch({
      type: LIMPIAR_TAREA
    });
  }

  return (
    <tareaContext.Provider
      value={{
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        setActualTask,
        updateTask,
        cleanTask,
      }}
    >
      {props.children}
    </tareaContext.Provider>
  );
}

export default TareaState;
