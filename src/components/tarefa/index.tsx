import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'

import * as S from './styles'

import { remover, editar, alteraStadus } from '../../store/reducers/tarefas'

import tarefaClass from '../../models/Tarefa'
import { BataoSalvar, Botao } from '../../styles'
import * as enums from '../../utils/enums/Tarefa'

type Props = tarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(alteraStadus({
      id,
      finalizado: evento.target.checked,
    }))
  }

  return (
    <S.Card>
      <input
        type="checkbox"
        id={titulo}
        checked={status === enums.Status.COMCLUIDA}
        onChange={alteraStatusTarefa}
      />
      <S.Titulo>
        {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      <S.Tag Parametro='prioridade' prioridade={prioridade}>{prioridade}</S.Tag>
      <S.Tag Parametro='Status' status={status}>{status}</S.Tag>
      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BataoSalvar onClick={() => {
              dispatch(editar({
                descricao,
                prioridade,
                status,
                titulo,
                id
              }))
              setEstaEditando(false)
            }}>
              Salvar
            </BataoSalvar>
            <S.BataoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BataoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BataoCancelarRemover onClick={() => dispatch(remover(id))}>Remover</S.BataoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
