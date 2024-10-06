import { useDispatch, useSelector } from "react-redux"
import FiltroCard from "../../components/FiltroCard"
import { useNavigate } from "react-router-dom"

import * as S from './satyles'
import { RootReducer } from "../../store"
import { alteraTermo } from "../../store/reducers/filtro"
import * as enums from '../,,/../../utils/enums/Tarefa'
import { Botao, Campo } from "../../styles"


type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {termo} = useSelector((state: RootReducer) => state.filtro)
  return (
    <S.Aside>
      <div>
        {mostrarFiltros ? (
          <>
        <Campo type="text" placeholder="Buscar" value={termo}
        onChange={evento => dispatch(alteraTermo(evento.target.value))}/>
        <S.Filtros>
          <FiltroCard valor={enums.Status.PENDENTE} criterio="status" legenda="pendentes" />
          <FiltroCard valor={enums.Status.COMCLUIDA} criterio="status" legenda="concluídas" />
          <FiltroCard valor={enums.Prioridade.URGENTE} criterio="prioridade" legenda="urgentes" />
          <FiltroCard valor={enums.Prioridade.IMPORTANTE} criterio="prioridade" legenda="importantes" />
          <FiltroCard valor={enums.Prioridade.NORMAL} criterio="prioridade" legenda="normal" />
          <FiltroCard criterio="todas" legenda="todas"/>
        </S.Filtros>
          </>
        ): (
          <Botao onClick={() => navigate('/')}>
            Voltar a lista de tarefas
          </Botao>
        )}
      </div>
    </S.Aside>
  )
}

export default BarraLateral
