import axios from 'axios'
import {FormValues} from "./AddNewDeckForm/AddNewDeckForm.tsx";

export const instance = axios.create({
  baseURL: 'https://api.flashcards.andrii.es',
  headers: {
    'x-auth-skip': true,
  },
})

export type DecksType={
    author: {
        id: string
        name: string
    },
    id: string
    userId: string
    name: string
    isPrivate: boolean
    cover: string
    created: string
    updated: string
    cardsCount: number
}

type ResponseDecks={
  items:DecksType[]
  pagination: {
    currentPage: number
    itemsPerPage: number
    totalPages: number
    totalItems: number
  },
  maxCardsCount: number
}
export const decksApi={

  getDecks() {
    return instance.get<ResponseDecks>('/v2/decks')
  },

  addDecks(name:FormValues) {
      return instance.post<DecksType>('/v1/decks', name)
  }
}