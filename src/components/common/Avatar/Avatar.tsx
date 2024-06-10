import React from 'react'

import AvatarMU, { AvatarProps } from '@mui/material/Avatar'

import { AppColors } from 'theme'

interface OwnAvatarProps extends AvatarProps {}

const Avatar: React.FC<OwnAvatarProps> = ({ className = '', alt, ...rest }) => {
  const firstLetter = alt?.at(0)?.toUpperCase() || 'Y'
  const color = AppColors[firstLetter]

  return (
    <AvatarMU
      className={`custom_avatar ${className}`}
      alt={alt}
      style={{
        backgroundColor: color,
      }}
      {...rest}
    />
  )
}

export default Avatar
