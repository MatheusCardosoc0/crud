interface ButtonProps {
  text: string
  type: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({
  text,
  type
}) => {
  return (
    <button
      type={type}
      className="
        bg-gradient-to-tr from-blue-400 via-sky-400 to-cyan-500
        rounded-lg
        p-4
        w-full
        max-w-[240px]
        mt-12
        font-black
        text-white
        text-2xl
        hover:brightness-125
      ">
      {text}
    </button>
  )
}

export default Button