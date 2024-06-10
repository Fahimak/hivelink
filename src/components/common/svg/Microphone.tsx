const Microphone = ({ className = "", color = "#EC4F3C" }: SvgIconProps) => {
  return (
    <svg
      width="1em"
      height="1em"
      fontSize="inherit"
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="5"
        y="1"
        width="8"
        height="13"
        rx="4"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M17 10.5C17 14.9183 13.4183 18.5 9 18.5C4.58172 18.5 1 14.9183 1 10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 21V19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Microphone;
