import s from './AddNewPostForm.module.css'
import { useForm } from 'react-hook-form'
import {useAppDispatch} from "../../../app/store.ts";
import {AddDeckTC} from "../decks-reducer.ts";

export type FormValues = {
  name: string
}

export const AddNewDeckForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
    },

  })
const dispatch=useAppDispatch()
  const onSubmit = (data: FormValues) => {
    dispatch(AddDeckTC(data))
    reset()
  }

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={s.label}>
        Deck name
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name must be longer than or equal to 3 characters',
            },
          })}
          autoComplete="off"
        />
        <p className={s.errorMessage}>{errors.name && errors.name.message}</p>
      </label>
      <button type="submit">Add new deck</button>
    </form>
  )
}