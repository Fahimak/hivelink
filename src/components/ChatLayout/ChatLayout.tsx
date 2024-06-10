import React from 'react'

interface ChatLayoutProps {}

const ChatLayout: React.FC<React.PropsWithChildren<ChatLayoutProps>> = ({
  children,
}) => {
  return <div className="chat_layout_container">{children}</div>
}

export default ChatLayout
