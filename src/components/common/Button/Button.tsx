import React from 'react'

import ButtonMU, { ButtonProps } from '@mui/material/Button'

interface OwnButtonProps extends ButtonProps {}

const Button: React.FC<OwnButtonProps> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <ButtonMU className={`custom_button ${className}`} {...rest}>
      {children}
    </ButtonMU>
  )
}

export default Button
