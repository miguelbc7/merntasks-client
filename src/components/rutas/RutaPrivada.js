import React, { useContext, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import authContext from '../../context/autenticacion/authContext';
import Proyectos from "../proyectos/Proyectos";

const RutaPrivada = () => {
  const AuthContext = useContext(authContext);
  const { autenticado, cargando, authUser } = AuthContext;

  useEffect(() => {
    authUser();
    // eslint-disable-next-line
  }, []);

  return !autenticado && !cargando ? (<Navigate to="/" />) : (<Proyectos />);
};
 
export default RutaPrivada;