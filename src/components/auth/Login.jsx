import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Extraer proyectos de state inicial
  const alertasContext = useContext(alertaContext);
  const { alerta, showAlert } = alertasContext;

  const AuthContext = useContext(authContext);
  const { mensaje, autenticado, signIn } = AuthContext;

  let navigate = useNavigate();

  // State para iniciar sesion
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // Extraer del user
  const { email, password } = user;

  useEffect( () => {
    if(autenticado) {
      navigate('/proyectos');
    }

    if(mensaje) {
      showAlert(mensaje.msg, mensaje.category);
    }
  }, [mensaje, autenticado, navigate, showAlert]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if(email.trim() === '' || password.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }

    // Pasarlo al action
    signIn({ email, password });
  }

  return (
    <div className="form-usuario">
      { alerta ? (<div className={`alerta ${alerta.category}`}>{ alerta.msg }</div>) : null }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>

        <form
          onSubmit={handleSubmit}
        >
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
              value="Iniciar Sesion"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className='enlace-cuenta'>
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
}
 
export default Login;