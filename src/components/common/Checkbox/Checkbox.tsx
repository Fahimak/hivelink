import React from 'react'
import CheckboxMU, { CheckboxProps } from '@mui/material/Checkbox'

import CheckBoxIcon from './CheckBoxIcon'
import CheckBoxCheckedIcon from './CheckBoxCheckedIcon'

interface OwnProps extends CheckboxProps {}

const Checkbox: React.FC<OwnProps> = ({ className = '', ...rest }) => {
  return (
    <CheckboxMU
      className={`custom_checkbox ${className}`}
      {...rest}
      icon={<CheckBoxIcon />}
      checkedIcon={<CheckBoxCheckedIcon />}
    />
  )
}

export default Checkbox
