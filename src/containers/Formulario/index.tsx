import { BataoSalvar, MainContainer, Titulo } from '../../styles'
import { Campo } from "../../styles"
import { Form, Opcoes, Opecao } from './styles'
import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as enums from '../../utils/enums/Tarefa'
import { cadastrar } from '../../store/reducers/tarefas'
import{ useNavigate } from 'react-router-dom'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)

  const cadastrarTarefa = (evento: FormEvent) => {
    evento.preventDefault()
      dispatch(cadastrar({
        titulo,
        prioridade,
        descricao,
        status: enums.Status.PENDENTE
      }))
      navigate('/')
  }


  return (
    <MainContainer>
      <Titulo>Nova Tarefa</Titulo>
    <Form onSubmit={cadastrarTarefa}>
      <Campo value={titulo} onChange={(evento) => setTitulo(evento.target.value)}
      type="text" placeholder="titulo" />
      <Campo value={descricao}
      onChange={({ target }) => setDescricao(target.value)}
      as="textarea" placeholder="Descrição da tarefa" />
      <Opcoes>
        <p>Prioridade</p>

    {Object.values(enums.Prioridade).map(prioridade => (
      <Opecao key={prioridade}>
        <input value={prioridade}
      name="prioridade"
      type="radio"
      onChange={evento =>
        setPrioridade(evento.target.value as enums.Prioridade)}
      id={prioridade}
      defaultChecked={prioridade === enums.Prioridade.NORMAL}
      />
      {' '}
      <label htmlFor={prioridade}>{prioridade}</label>
      </Opecao>
    ))}

      </Opcoes>
      <BataoSalvar type="submit">Cadastrar</BataoSalvar>
    </Form>
    </MainContainer>
  )
}

export default Formulario
