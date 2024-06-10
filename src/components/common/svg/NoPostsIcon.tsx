import React from 'react'

const NoPostsIcon = ({ className = '' }: { className?: string }) => {
  return (
    <svg
      width="38"
      height="35"
      viewBox="0 0 38 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.5 27.3707C1.5 26.3078 1.77088 25.2624 2.28706 24.3333L13.1124 4.84766C14.072 3.12043 15.7416 1.90168 17.6791 1.51417V1.51417C18.5511 1.33979 19.4489 1.33979 20.3209 1.51417V1.51417C22.2584 1.90168 23.928 3.12043 24.8876 4.84766L35.7129 24.3333C36.2291 25.2624 36.5 26.3078 36.5 27.3707V27.3707C36.5 30.8248 33.6998 33.625 30.2457 33.625H7.75434C4.30016 33.625 1.5 30.8248 1.5 27.3707V27.3707Z"
        stroke="#0A292E"
        strokeWidth="2.625"
      />
      <path
        d="M19 11.75L19 18.75"
        stroke="#0A292E"
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 24L19 24.875"
        stroke="#0A292E"
        strokeWidth="2.625"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default NoPostsIcon
