import React from 'react'

interface PlayIconProps {
  className?: string
}

const PlayIcon: React.FC<
  PlayIconProps & React.SVGAttributes<HTMLOrSVGElement>
> = ({ className = '', ...rest }) => {
  return (
    <svg
      width="29"
      height="36"
      viewBox="0 0 29 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M1.19995 2.05537C1.19995 1.17681 2.17911 0.652773 2.91012 1.14011L26.8271 17.0847C27.4802 17.5201 27.4802 18.4799 26.8271 18.9153L2.91012 34.8599C2.17911 35.3472 1.19995 34.8232 1.19995 33.9446V2.05537Z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export default PlayIcon
