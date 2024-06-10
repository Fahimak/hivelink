import { ElementType, ComponentProps } from "react";

type Variant = "main14" | "title20";

type Color =
  | "black"
  | "dark-grey"
  | "grey"
  | "grey2"
  | "grey3"
  | "light-grey"
  | "light-grey2"
  | "white"
  | "dark-green"
  | "light-green"
  | "light-green2"
  | "violet"
  | "blue"
  | "green";

type FontWeight = "w400" | "w500" | "w600" | "w700";

interface TextOwnProps<E extends ElementType = ElementType> {
  variant?: Variant;
  color?: Color;
  fontWeight?: FontWeight;
  className?: string;
  as?: E;
}

type TextProps<E extends ElementType> = TextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TextOwnProps>;

const defaultTagName = "span";

const Text = <E extends ElementType = typeof defaultTagName>({
  variant = "main14",
  color = "black",
  fontWeight = "w400",
  className = "",
  as,
  children,
  ...rest
}: TextProps<E>) => {
  const TagName = as || defaultTagName;

  const _className = `${className} ${variant} ${color} ${fontWeight}`.trim();

  return (
    <TagName className={_className} {...rest}>
      {children}
    </TagName>
  );
};

export default Text;
