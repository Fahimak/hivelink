import React from "react";

const PauseCircle: React.FC<SvgIconProps> = ({
  className = "",
  color = "#FFFFFF",
}) => {
  return (
    <svg
      width="1em"
      height="1em"
      fontSize="inherit"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C6.475 2 2 6.475 2 12C2 17.525 6.475 22 12 22C17.525 22 22 17.525 22 12C22 6.475 17.525 2 12 2ZM10.9 14.5C10.9 15.125 10.4 15.6 9.8 15.6C9.175 15.6 8.7 15.1 8.7 14.5V9.5C8.675 8.9 9.175 8.4 9.775 8.4C10.4 8.4 10.9 8.9 10.9 9.5V14.5ZM15.325 14.5C15.325 15.125 14.825 15.6 14.225 15.6C13.6 15.6 13.125 15.1 13.125 14.5V9.5C13.1 8.9 13.6 8.4 14.2 8.4C14.825 8.4 15.325 8.9 15.325 9.5V14.5Z"
        fill={color}
      />
    </svg>
  );
};

export default PauseCircle;
