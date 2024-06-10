import React, { forwardRef, ForwardedRef } from "react";
import InputBase, { InputBaseProps } from "@mui/material/InputBase";

import Text from "components/common/Text";

type Variant = "standard" | "ountlined";
interface InputProps extends InputBaseProps {
  className?: string;
  classNameContainer?: string;
  label?: string;
  variant?: Variant;
  helperText?: string;
}

const Input = forwardRef(
  (
    {
      className = "",
      classNameContainer = "",
      label = "",
      variant = "standard",
      helperText = "",
      ...rest
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    return (
      <div className={`input_container ${classNameContainer} ${variant}`}>
        {!!label && (
          <Text fontWeight="w400" className="input_label_text">
            {label}
          </Text>
        )}
        <InputBase className={`${className}`} {...rest} inputRef={ref} />
        {!!helperText && (
          <Text fontWeight="w500" className="input_helper_text">
            {helperText}
          </Text>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
