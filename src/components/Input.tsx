'use client'

import { HTMLInputTypeAttribute, useState } from 'react'
import {
  FieldValues,
  UseFormRegister
} from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'


interface InputProps {
  label: string
  error: string | undefined
  register: UseFormRegister<{ password: string; email: string; name: string; confirmPassword: string; }>
  type: HTMLInputTypeAttribute
  disabled: boolean
  id: 'name' | 'email' | 'password' | 'confirmPassword'
}

const Input: React.FC<InputProps> = ({
  error,
  label,
  register,
  type,
  disabled,
  id
}) => {

  const [typeInput, setTypeInput] = useState(type)

  return (
    <div
      className='
      flex
      flex-col
      gap-1
      w-full
    '>
      <span
        className='
          text-sm
          text-orange-600
          font-semibold
          trasition
          duration-1000
          animate-alert
        '>
        {error}
      </span>

      <div className='w-full relative'>
        <input
          {...register(id)}
          disabled={disabled}
          type={typeInput}
          autoComplete={"off"}
          className='
            bg-black
            rounded-lg
            px-2
            pb-2
            pt-8
            w-full
            peer
            outline-none
            text-white
          ' />

        <label
          htmlFor={id}
          className='
            absolute
            transition
            duration-150
            left-2
            top-6
            -translate-y-1/2
            text-neutral-200
            font-bold
            origin-[0]
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:translate-y-12
            peer-focus:scale-75
            peer-focus:top-2
          '>
          {label}
        </label>

        {type == 'password' && (
          <span
            onClick={() => setTypeInput(
              prev => prev == 'password' ? 'text' : 'password'
            )}
            className='
              absolute
              text-white
              text-4xl
              right-2
              top-2
            '>
            {typeInput == 'password' ?
              <AiFillEyeInvisible /> :
              <AiFillEye className='text-white' />}
          </span>
        )}
      </div>
    </div>
  )
}

export default Input