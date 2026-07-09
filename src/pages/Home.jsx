import { useEffect, useState } from 'react'

import {
  collection,
  getDocs
} from 'firebase/firestore'

import { db } from '../services/firebase'

import logo from '../assets/Logo.jpg'

function Home() {

  const [produtos, setProdutos] = useState([])

  useEffect(() => {

    async function carregar() {

      const snapshot = await getDocs(
        collection(db, 'produtos')
      )

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setProdutos(lista)
    }

    carregar()

  }, [])

  return (

    <div className="container">

      <div className="hero">

        <img
          src={logo}
          alt="Leidy Doces"
          className="logo"
        />

        <h1>Leidy Doces</h1>

        <p>Doces • Trufas • Bolos</p>

        <p className="slogan">
          Doces artesanais preparados com carinho
          para tornar seus momentos ainda mais especiais ✨
        </p>

      </div>

      <div className="produtos-grid">

        {produtos.map((produto) => (

          <div
            key={produto.id}
            className="produto-card"
          >

            {produto.imagemUrl && (
              <img
                src={produto.imagemUrl}
                alt={produto.nome}
                className="produto-imagem"
              />
            )}

            <div className="produto-info">

              <h3>{produto.nome}</h3>

              <p>{produto.descricao}</p>

              <p className="preco">
                R$ {Number(produto.preco).toFixed(2)}
              </p>

              <a
                href={`https://wa.me/5534999789679?text=${encodeURIComponent(
                  `Olá! Tenho interesse no produto ${produto.nome}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-whatsapp">
                  Pedir pelo WhatsApp
                </button>
              </a>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}

export default Home