import React, { ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit: () => void
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className='
        className="
        p-2
        rounded-xl
        w-[90%]
        max-w-[500px]
        overflow-hidden
        relative
        Form
        bg-sky-500/60
        "
      '>
      {children}
    </form>
  )
}

export default Form