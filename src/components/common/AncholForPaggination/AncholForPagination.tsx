import React, { HTMLAttributes } from "react";

const AncholForPaggination = React.forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement>
>((_props, ref) => {
  const defaultStyle = {
    width: "100%",
    minHeight: "1px",
    marginBottom: "-1px",
    opacity: 0,
  };

  return (
    <span ref={ref} {..._props} style={{ ...defaultStyle, ..._props.style }} />
  );
});

AncholForPaggination.displayName = "AncholForPaggination";

export default AncholForPaggination;
