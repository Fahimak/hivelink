import IconButtonMU, { IconButtonProps } from "@mui/material/IconButton";

const IconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <IconButtonMU
      {...props}
      className={`custom_icon_button ${props.className}`.trim()}
    >
      {children}
    </IconButtonMU>
  );
};

export default IconButton;
