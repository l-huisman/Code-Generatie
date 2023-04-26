export interface IButton {
  icon?: JSX.Element;
  title?: string | JSX.Element;
  variant: keyof typeof variants;
  large?: boolean;
  className?: string;
  to?: string;
  download?: boolean | string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: any) => any;
}

export const variants = {
  primary: "bg-primary hover:bg-primary/80",
  gray: "bg-gray-400 hover:bg-gray-400/80",
  red: "bg-red-600 hover:bg-red-600/80 text-white",
  green: "bg-green-600 hover:bg-green-600/80",
  blue: "bg-blue-400 hover:bg-blue-400/80",
  white: "bg-white hover:bg-white/80",
  transparent: "bg-transparent",
  black: "bg-black hover:bg-black/80 text-white",
};
