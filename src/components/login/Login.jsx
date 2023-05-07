import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import swal from 'sweetalert';

// import '../auth/authform.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";


function Login(props) {

  const history = useHistory();

  const [loginInput, setLogin] = useState({
    email:'',
    password:'',
    error_list: [],
    });
  const handleInput=(e)=>{
    e.persist();
    setLogin({...loginInput, [e.target.name]: e.target.value});
  }


  const loginSubmit = (e) => {
    e.preventDefault();

    const data ={
      email: loginInput.email,
      password: loginInput.password,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`api/login`, data).then(res => {
      if(res.data.status === 200)
      {
      localStorage.setItem('auth_token', res.data.token);
      localStorage.setItem('auth_name', res.data.username);
      swal("Success", res.data.message,"success");
      if(res.data.role === 'admin')
      {
      history.push('/admin');
      }
      else if(res.data.role === 'user')
      {
      history.push('/client');
      }

      else 
      {
      history.push('/error');
      }

      }
      else if(res.data.status === 401)
      {
      swal("Warning", res.data.message,"warning");
      }
      else
      {
      setLogin({...loginInput, error_list: res.data.validation_errors });
      }
      });
      });
      
      }
     



  return (
    <div className="form signin">
      <h2>Se connecter</h2>
      <form onSubmit={loginSubmit} >
      
        <div className="inputBox">
          <input type="email" name="email" id="email-input"  value={loginInput.email} onChange={handleInput} required />
          <FontAwesomeIcon icon={faEnvelope} className="i" />        
          <label htmlFor="email-input">Email</label>
          <span>{loginInput.error_list.email}</span>
        </div>
        <div className="inputBox">
          <input type="password" name="password" id="password-input" required value={loginInput.password} onChange={handleInput} />
          <FontAwesomeIcon icon={faLock} className="i" /> 
          <label htmlFor="password-input">Mot de passe</label>
          <span>{loginInput.error_list.password}</span>
        </div>
        <div className="inputBox">
          <input type="submit" value="se connecter" />
        </div>
      </form>
      <p>
        Vous n'avez pas de compte?{" "}
         <a href="https" className="a create" onClick={props.switchToSignUp}>
        {" "}
        Creer un compte
        </a>  
        {/* <Link to="/signup" className="a create" >Creer un compte</Link> */}
      </p>
    </div>
  );
}

export default Login;
