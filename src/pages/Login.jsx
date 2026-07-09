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

      console.log(error)

      alert(
        error.message
      )

    }

  }

  return (

    <div className="container">

      <div className="card">

        <h2>Login</h2>

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
          onClick={fazerLogin}
        >
          Entrar
        </button>

      </div>

    </div>

  )
}

export default Login