import { variants } from "./Button";

export interface IModal {
  children?: JSX.Element | JSX.Element[];
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  closeButtonVariant?: keyof typeof variants;
  className?: string;
  titleClassName?: string;
  customWidth?: string;
  isOpen: boolean;
  icon?: JSX.Element;
  overflowVisible?: boolean;
  setIsOpen: (e: boolean) => void;
}
