import { useEffect, useState } from 'react'

import {
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore'

import { db } from '../services/firebase'

function Admin() {

  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')

  const [produtos, setProdutos] = useState([])

  async function carregarProdutos() {

    try {

      const snapshot = await getDocs(
        collection(
          db,
          'produtos'
        )
      )

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setProdutos(lista)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    carregarProdutos()

  }, [])

  async function adicionarProduto() {

    try {

      if (
        !nome ||
        !categoria ||
        !descricao ||
        !preco ||
        !imagemUrl
      ) {

        alert(
          'Preencha todos os campos.'
        )

        return

      }

      await addDoc(
        collection(
          db,
          'produtos'
        ),
        {
          nome,
          categoria,
          descricao,
          preco: Number(preco),
          imagemUrl,
          destaque: false
        }
      )

      setNome('')
      setCategoria('')
      setDescricao('')
      setPreco('')
      setImagemUrl('')

            alert(
        'Produto salvo com sucesso!'
        )

        setNome('')
        setCategoria('')
        setDescricao('')
        setPreco('')
        setImagemUrl('')

        carregarProdutos()

    } catch (error) {

      console.log(error)

      alert(error.message)

    }

  }

  return (

    <div className="container">

      <div className="card">

        <h2>Produtos</h2>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) =>
            setNome(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) =>
            setCategoria(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) =>
            setDescricao(
              e.target.value
            )
          }
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) =>
            setPreco(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="URL da Imagem"
          value={imagemUrl}
          onChange={(e) =>
            setImagemUrl(
              e.target.value
            )
          }
        />

        <button
          onClick={adicionarProduto}
        >
          Salvar Produto
        </button>

        <hr />

        <h2>
          Produtos Cadastrados
        </h2>

        {produtos.map(produto => (

          <div
            key={produto.id}
            style={{
              marginBottom: '20px'
            }}
          >

            <h3>
              {produto.nome}
            </h3>

            <p>
              📂 {produto.categoria}
            </p>

            <p>
              📝 {produto.descricao}
            </p>

            <p>
              💰 R$ {produto.preco}
            </p>

            <p>
              🔗 {produto.imagemUrl}
            </p>

            <hr />

          </div>

        ))}

      </div>

    </div>

  )
}

export default Admin