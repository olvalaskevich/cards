import s from './DecksList.module.css'
import {useEffect} from "react";
import {AppRootState, useAppDispatch} from "../../../app/store.ts";
import {SetDecksTC} from "../decks-reducer.ts";
import {useSelector} from "react-redux";
import {DecksType} from "../decks-api.ts";
import {DeckItem} from "./DeckItem/DeckItem.tsx";

export const DecksList = () => {
  const dispatch = useAppDispatch()
  const decks = useSelector<AppRootState, DecksType[]>((state) => state.decksReducer.decks)
  useEffect(() => {
    dispatch(SetDecksTC())
  }, []);

  return <ul className={s.list}>
    {decks.map((d)=>{
      return <DeckItem key={d.id} deck={d}/>
    })}
  </ul>
}
