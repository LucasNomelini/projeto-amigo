import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from '../services/firebase'

function Admin() {
  
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [imagemUrl, setImagemUrl] = useState('')

  const [produtos, setProdutos] = useState([])
  const [editandoId, setEditandoId] = useState(null)
  
async function sair() {

    try {

      await signOut(auth)

      navigate('/login')

    } catch (error) {

      console.log(error)

      alert('Erro ao sair.')

    }

  }

async function carregarProdutos() {

  const snapshot = await getDocs(
    collection(db, 'produtos')
  )

  const lista = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  setProdutos(lista)
}

  useEffect(() => {
    carregarProdutos()
  }, [])

  function editarProduto(produto) {

    setNome(produto.nome)
    setCategoria(produto.categoria)
    setDescricao(produto.descricao)
    setPreco(produto.preco)
    setImagemUrl(produto.imagemUrl)

    setEditandoId(produto.id)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  async function adicionarProduto() {

    try {

      if (
        !nome ||
        !categoria ||
        !descricao ||
        !preco ||
        !imagemUrl
      ) {
        alert('Preencha todos os campos.')
        return
      }

      if (editandoId) {

        await updateDoc(
          doc(db, 'produtos', editandoId),
          {
            nome,
            categoria,
            descricao,
            preco: Number(preco),
            imagemUrl
          }
        )

        alert('Produto atualizado!')

        setEditandoId(null)

      } else {

        await addDoc(
          collection(db, 'produtos'),
          {
            nome,
            categoria,
            descricao,
            preco: Number(preco),
            imagemUrl,
            destaque: false,
            criadoEm: Date.now()
          }
        )

        alert('Produto salvo com sucesso!')
      }

      setNome('')
      setCategoria('')
      setDescricao('')
      setPreco('')
      setImagemUrl('')

      await carregarProdutos()

    } catch (error) {

      console.log(error)

      alert(error.message)
    }
  }

  async function excluirProduto(id) {

    const confirmar = window.confirm(
      'Deseja excluir este produto?'
    )

    if (!confirmar) return

    try {

      await deleteDoc(
        doc(db, 'produtos', id)
      )

      await carregarProdutos()

    } catch (error) {

      console.log(error)

      alert(error.message)
    }
  }

  return (

    <div className="container">

      <div className="admin-card">

        <div className="admin-header">

        <h1 className="admin-title">
          Painel Administrativo
        </h1>

        <button
          className="btn-sair"
          onClick={sair}
        >
          🚪 Sair
        </button>

      </div>

        <div className="admin-form">

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
              setCategoria(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) =>
              setDescricao(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) =>
              setPreco(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="URL da Imagem"
            value={imagemUrl}
            onChange={(e) =>
              setImagemUrl(e.target.value)
            }
          />

          <button
            className="login-btn"
            onClick={adicionarProduto}
          >
            {editandoId
              ? 'Atualizar Produto'
              : 'Salvar Produto'}
          </button>

        </div>

      </div>

      <div className="admin-produtos">

        {produtos.map(produto => (

          <div
            key={produto.id}
            className="admin-produto-card"
          >

            {produto.imagemUrl && (
              <img
                src={produto.imagemUrl}
                alt={produto.nome}
                className="admin-produto-imagem"
              />
            )}

            <div className="admin-produto-info">

              <h3>{produto.nome}</h3>

              <p>
                📂 {produto.categoria}
              </p>

              <p>
                📝 {produto.descricao}
              </p>

              <p className="preco">
                {Number(produto.preco).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL'
                  }
                )}
              </p>

              <div className="admin-botoes">

                <button
                  className="btn-editar"
                  onClick={() =>
                    editarProduto(produto)
                  }
                >
                  ✏️ Editar
                </button>

                <button
                  className="btn-excluir"
                  onClick={() =>
                    excluirProduto(produto.id)
                  }
                >
                  🗑 Excluir
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Admin