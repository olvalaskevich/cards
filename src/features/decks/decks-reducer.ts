import {decksApi, DecksType} from "./decks-api.ts";
import {AppDispatch} from "../../app/store.ts";
import {Dispatch} from "redux";
import {FormValues} from "./AddNewDeckForm/AddNewDeckForm.tsx";

const initialState:{decks:DecksType[],searchParams:{name:string} } = {
  decks: [], // todo: add type
  searchParams: {
    name: '',
  },
}

export type DecksState = typeof initialState

export const decksReducer = (state: DecksState = initialState, action: DecksActions): DecksState => {
  switch (action.type) {
    case 'SET-DECKS':
      return {...state, decks:action.decks}
    case 'ADD-DECK':
      return {...state, decks:[action.deck, ...state.decks]}
    default:
      return state
  }
}

export type DecksActions = ReturnType<typeof SetDecksAC> | ReturnType<typeof AddDeckAC>


const SetDecksAC=(decks:DecksType[])=>{
  return ({type:'SET-DECKS', decks:decks} as const)
}

const AddDeckAC=(deck:DecksType)=>{
  return ({type:'ADD-DECK', deck:deck} as const)
}

export const SetDecksTC=()=>{
    return (dispatch:AppDispatch)=>{
      decksApi.getDecks()
          .then((res)=>{dispatch(SetDecksAC(res.data.items))})
    }
}

export const AddDeckTC=(name:FormValues)=>{
  return (dispatch:AppDispatch)=>{
    decksApi.addDecks(name)
        .then((res)=>{dispatch(AddDeckAC(res.data))})
  }
}