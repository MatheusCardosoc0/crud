'use client'

import axios from "axios"
import { FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { ZodError, z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { prisma } from "@/services/prisma"
import Input from "@/components/Input"
import ToasterProvider from "@/providers/toastProvider"
import { Toaster, toast } from "react-hot-toast"
import Form from "@/components/Form"
import Heading from "@/components/Heading"
import Button from "@/components/Button"

const schema = z
  .object({
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    confirmPassword: z.string(),
    email: z.string()
      .email("Digite um email valido")
      .nonempty("Email obrigatório"),
    name: z.string()
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam ser iguais'
  })

  .refine((fields) => fields.name.length > 10, {
    path: ['name'],
    message: 'O nome deve ter pelo menos mais de 10 letras'
  })

  .transform((fields) => ({
    password: fields.password.toLowerCase(),
    email: fields.email,
    name: fields.name,
    confirmPassword: fields.confirmPassword.toLowerCase()
  }))

export type FormProps = z.infer<typeof schema>

export default function Home() {

  const [loading, setLoading] = useState(false)

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
      toast.success("Cadastro concluido")
    } catch (error) {
      toast.error("Erro ao fazer cadastro")
      if (error instanceof ZodError) {
        console.log(error.flatten())
      }
    }

    setLoading(false)
  }

  //z0JCRMwOZFrI7yOL

  return (
    <main className="w-full h-screen items-center justify-center flex">
      <ToasterProvider />
      <Toaster />
      <Form
        onSubmit={handleSubmit(handleForm)}
      >
        <div
          className="
            w-full
            h-full
            p-6
            bg-white
            flex flex-col
            gap-2
            inset-5
            z-10
          ">
          <Heading
            title="Registre-se"
            subtitle="Crie uma conta para entrar no site" />
          <Input
            id="name"
            disabled={loading}
            type="text"
            label="Nome"
            error={errors.name?.message}
            register={register} />

          <Input
            id="email"
            disabled={loading}
            type="email"
            label="Email"
            error={errors.email?.message}
            register={register} />

          <Input
            id="password"
            disabled={loading}
            type="password"
            label="Senha"
            error={errors.password?.message}
            register={register} />

          <Input
            id="confirmPassword"
            disabled={loading}
            type="password"
            label="Confirme sua senha"
            error={errors.confirmPassword?.message}
            register={register} />

          <Button
            text="Enviar"
            type="submit"
          />
        </div>
      </Form>
    </main>
  )
}
