'use client'

import { HTMLInputTypeAttribute } from 'react'
import {
  FieldValues,
  UseFormRegister
} from 'react-hook-form'


interface InputProps{
  label: string
  placeholder: string
  error: string | undefined
  register: UseFormRegister<{ password: string; email: string; name: string; confirmPassword: string; }>
  type: HTMLInputTypeAttribute
  disabled: boolean
  id: 'name' | 'email' | 'password'
}

const Input = ({
  error,
  label,
  placeholder,
  register,
  type,
  disabled,
  id
}: InputProps) => {
  return (
    <>
      <input
        {...register(id)}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        className='
          bg-white
        ' />
    </>
  )
}

export default Input