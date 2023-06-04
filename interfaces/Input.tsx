export interface IInput {
  icon?: JSX.Element;
  title?: string | JSX.Element;
  placeholder?: string;
  name?: string;
  type: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  value?: string;
  selectValue?: object;
  maxLength?: number;
  options?: { id: number; name: string; meta: any }[];
  onChange?: (e: any) => void;
  [x: string | number | symbol]: unknown;
}
