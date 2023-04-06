import React from 'react'

interface HeadingProps {
  title: string
  subtitle: string
}

const Heading: React.FC<HeadingProps> = ({
  subtitle,
  title
}) => {
  return (
    <div
      className="
        w-full
        flex
        flex-col
        gap-1
        mb-8
      ">
      <h2 className="text-4xl font-bold text-start">
        {title}
      </h2>

      <p
        className="
          text-sm
         text-neutral-700
        ">
        {subtitle}
      </p>
    </div>
  )
}

export default Heading