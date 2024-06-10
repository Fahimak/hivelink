import React from 'react'

import TabsMU, { TabsProps } from '@mui/material/Tabs'
import TabMU, { TabProps } from '@mui/material/Tab'

interface TabsOwnProps extends TabsProps {
  className?: string
}

const Tabs: React.FC<TabsOwnProps> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <TabsMU className={`custom_tabs ${className}`} {...rest}>
      {children}
    </TabsMU>
  )
}

export const Tab: React.FC<TabProps> = (props) => {
  return <TabMU {...props} />
}

export default Tabs
