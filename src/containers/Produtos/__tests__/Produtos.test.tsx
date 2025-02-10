import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 199.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['Windows'],
    preco: 199.9,
    precoAntigo: 299.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Ação',
    imagem: '',
    plataformas: ['Windows'],
    preco: 150.9,
    precoAntigo: 200,
    titulo: 'Gotham Knights'
  },
  {
    id: 4,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Nintendo Switch'],
    preco: 189.9,
    precoAntigo: 299.9,
    titulo: 'Donkey Kong'
  }
]

const server = setupServer(
  rest.get(
    'http://localhost:4000/produtos',
    (requisicao, resposta, contexto) => {
      return resposta(contexto.json(mocks))
    }
  )
)

describe('Testes para o container produtos', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Deve renderizar corretamente com texto  de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    renderizaComProvider(<Produtos />)
    await waitFor(() => {
      expect(screen.getByText('Donkey Kong')).toBeInTheDocument()
    })
  })
})
