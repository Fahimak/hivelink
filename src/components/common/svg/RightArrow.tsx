import React from "react";

const RightArrow: React.FC<SvgIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="10"
      height="10"
      fontSize="inherit"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 17.0023L9 9.00232L1 1.00232"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightArrow;
