import React from 'react'

import Text from 'components/common/Text'

const ChatEmptySection = () => {
  return (
    <div className="empty_section">
      <Text className="empty_chat_symbol">👋</Text>
      <Text className="empty_chat_message" fontWeight="w500">
        Say hi to initiate a conversation
      </Text>
    </div>
  )
}

export default ChatEmptySection
