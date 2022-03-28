import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';

const NuevaCuenta = () => {
  // Extraer proyectos de state inicial
  const alertasContext = useContext(alertaContext);
  const { alerta, showAlert } = alertasContext;

  const AuthContext = useContext(authContext);
  const { mensaje, autenticado, signUp } = AuthContext;

  let navigate = useNavigate();

  // State para iniciar sesion
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // Extraer del user
  const { name, email, password, confirm } = user;

  // En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect( () => {
    if(autenticado) {
      navigate('/proyectos');
    }

    if(mensaje) {
      showAlert(mensaje.msg, mensaje.category);
    }
    // eslint-disable-next-line
  }, [mensaje, autenticado]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if(name.trim() === "" || email.trim() === "" || password.trim() === "" || confirm.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error")
      return;
    }

    // Password minimo de 6 caracteres
    if(password.length < 6) {
      showAlert("El password debe ser de al menos 6 caracteres", "alerta-error")
      return;
    }

    // Los 2 passwords sean 
    if(password !== confirm) {
      showAlert("Los passwords no son iguales", "alerta-error")
      return;
    }

    // Pasarlo al action
    signUp({
      name,
      email,
      password
    });
  };

  return (
    <div className="form-usuario">
      { alerta ? (<div className={`alerta ${alerta.category}`}>{ alerta.msg }</div>) : null }
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>

        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirmar Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repite tu Password"
              value={confirm}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={'/'} className="enlace-cuenta">
          Volver a Iniciar Sesion 
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
