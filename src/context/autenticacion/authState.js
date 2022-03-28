import React, { useReducer } from "react";

import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "../../types";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Funciones
  const signUp = async datos => {
    try {
      const response = await clienteAxios.post("/api/users/sign-up", datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: response.data
      })

      // Obtener el usuario
      authUser();
    } catch(error) {
      const alert = {
        msg: error.response.data.errors.msg,
        category: 'alerta-error'
      }

      dispatch({
        type: REGISTRO_ERROR,
        payload: alert
      });
    }
  }

  // Retorna el usuario autenticado
  const authUser = async () => {
    const token = localStorage.getItem('token');

    if(token) {
      // TODO: Funcion para enviar el token por el headers
      tokenAuth(token);
    }

    try {
      const response = await clienteAxios.get('/api/auth/get-user');
      dispatch({
        type: OBTENER_USUARIO,
        payload: response.data.user
      })
    } catch(error) {
      console.log(error);

      dispatch({
        type: LOGIN_ERROR
      })
    }
  }

  // Cuando el usuario inicia sesion
  const signIn = async datos => {
    try {
      const response = await clienteAxios.post("/api/auth/sign-in", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: response.data,
      });

      // Obtener el usuario
      authUser();
    } catch(error) {
      console.log(error.response.data.errors.msg);
      const alert = {
        msg: error.response.data.errors.msg,
        category: "alerta-error",
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  }

  // Cierra la sesion del usuario
  const signOut = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        signUp,
        signIn,
        authUser,
        signOut
      }}
    >
      {props.children}
    </authContext.Provider>
  );
}

export default AuthState;
