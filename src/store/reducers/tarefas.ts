import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Tarefa from '../../models/Tarefa';
import * as enums from '../../utils/enums/Tarefa';

type TarefasState = {
  itens: Tarefa[]
}

const initialState: TarefasState = {
  itens: [
    {
      id: 1,
      descricao: 'estudar javascript revendo o exercicio do módulo 7',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.COMCLUIDA,
      titulo: 'estudar javascript',
    },
    {
      id: 2,
      descricao: 'estudar material de apoio',
      prioridade: enums.Prioridade.NORMAL,
      status: enums.Status.PENDENTE,
      titulo: 'estudar typescript',
    },
    {
      id: 3,
      descricao: 'praticar a construção de um landing page',
      prioridade: enums.Prioridade.IMPORTANTE,
      status: enums.Status.PENDENTE,
      titulo: 'estudar bootstrap',
    },
  ]
}

const tarefasSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload);
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0 ){
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(tarefa =>
        tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert("Já existe uma tarefa com esse nome")
      } else {
        const ultimaTarefa = state.itens[state.itens.length -1]

        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alteraStadus: (state, action: PayloadAction<{id: number; finalizado: Boolean}>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )

      if (indexDaTarefa >= 0 ){
        state.itens[indexDaTarefa].status = action.payload.finalizado ? enums.Status.COMCLUIDA : enums.Status.PENDENTE
      }
    }
  }
});

export const { remover, editar, cadastrar, alteraStadus } = tarefasSlice.actions;
export default tarefasSlice.reducer;
