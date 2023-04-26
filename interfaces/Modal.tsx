import { variants } from "./Button";

export interface IModal {
  children?: JSX.Element | JSX.Element[];
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  closeButtonVariant?: keyof typeof variants;
  className?: string;
  customWidth?: string;
  isOpen: boolean;
  setIsOpen: (e: boolean) => void;
}
