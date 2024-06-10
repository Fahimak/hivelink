import React from "react";

const PlayCircle: React.FC<SvgIconProps> = ({
  // className = "",
  color = "#0E606D",
}) => {
  return (
    <svg
      width="1em"
      height="1em"
      fontSize="inherit"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="1.5"
        fill="#ffffff"
      />
      <path
        d="M10 10.0554C10 9.1768 10.9792 8.65277 11.7102 9.14011L14.6271 11.0847C15.2802 11.5201 15.2802 12.4799 14.6271 12.9153L11.7102 14.8599C10.9792 15.3472 10 14.8232 10 13.9446V10.0554Z"
        stroke={color}
        strokeWidth="1.5"
        fill="#ffffff"
      />
    </svg>
  );
};

export default PlayCircle;
