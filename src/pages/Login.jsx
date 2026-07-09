import { useState } from 'react'

import {
  signInWithEmailAndPassword
} from 'firebase/auth'

import {
  useNavigate
} from 'react-router-dom'

import {
  auth
} from '../services/firebase'

import logo from '../assets/Logo.jpg'

function Login() {

  const [email, setEmail] =
    useState('')

  const [senha, setSenha] =
    useState('')

  const navigate =
    useNavigate()

  async function fazerLogin() {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        senha
      )

      navigate('/admin')

    } catch (error) {

      alert(
        'Email ou senha inválidos.'
      )

    }

  }

  return (

    <div className="login-page">

      <div className="login-card">

      <img
        src={logo}
        alt="Leidy Doces"
        className="login-logo"
      />
      
        <h1>
          Leidy Doces
        </h1>

        <h2>
          Área Administrativa
        </h2>

        <p className="login-subtitle">
          Gerencie produtos, preços e categorias.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) =>
            setSenha(
              e.target.value
            )
          }
        />

        <button
          className="login-btn"
          onClick={fazerLogin}
        >
          Entrar
        </button>

      </div>

    </div>

  )

}

export default Login