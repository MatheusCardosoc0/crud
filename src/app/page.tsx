'use client'

import axios from "axios"
import { FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { ZodError, z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { prisma } from "@/services/prisma"

const schema = z
  .object({
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    email: z.string(),
    name: z.string()
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
  })
  .transform((fields) => ({
    password: fields.password.toLowerCase(),
    email: fields.email,
    name: fields.name,
    confirmPassword: fields.confirmPassword.toLowerCase()
  }))

type FormProps = z.infer<typeof schema>

export default function Home() {

  const [loading, setLoading] = useState(false)


  const example = {
    password: '33',
    email: 'www',
    name: 'eeeee',
    confirmPassword: '3434'
  }

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema)
  })


  async function handleForm(data: FormProps) {
    setLoading(true)

    try {
      const response = await axios.post('/api/register', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      console.log(response)
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.flatten())
      }
    }

    setLoading(false)
  }

  //z0JCRMwOZFrI7yOL

  return (
    <main className="w-full h-screen items-center justify-center flex">
      <form className="bg-blue-300 flex flex-col gap-2 p-4"
        onSubmit={handleSubmit(handleForm)}>

        {errors.password?.message}
        {errors.confirmPassword?.message}

        <input placeholder="nome"
          {...register('name')}
          disabled={loading}
          type="text" />
        <input placeholder="email"
          {...register('email')}
          disabled={loading}
          type="email" />
        <input placeholder="senha"
          {...register('password')}
          disabled={loading}
          type="password" />

        <input placeholder="Confirme a senha"
          {...register('confirmPassword')}
          disabled={loading}
          type="password" />

        <button type="submit">
          Enviar
        </button>
      </form>
    </main>
  )
}
