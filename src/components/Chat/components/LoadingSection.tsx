import React, { memo } from 'react'
import Skeleton from '@mui/material/Skeleton'

interface LoadingItemData {
  height: number
  width: string
}

const loadingData: LoadingItemData[] = Array(9)
  .fill({})
  .map<LoadingItemData>(() => ({
    height: 60,
    width: `${Math.max(Math.floor(Math.random() * 95), 60)}%`,
  }))

const LoadingSection = () => {
  return (
    <div className="chat_loading_messages_container">
      {loadingData.map((item, index) => (
        <Skeleton
          key={index}
          className="chat_loading_message_skeleton"
          variant="rounded"
          height={item.height}
          width={item.width}
        />
      ))}
    </div>
  )
}

export default memo(LoadingSection)
