import classNames from "classnames";
import { IInput } from "@/interfaces/Input";
import Select from "./select";

export default function Input({
  value,
  selectValue,
  onChange,
  title,
  name,
  type,
  icon,
  placeholder,
  className,
  containerClassName,
  labelClassName,
  options,
  maxLength,
  ...otherProps
}: IInput) {
  return (
    <>
      <div className={classNames(containerClassName)}>
        {(title || icon) && (
          <label
            htmlFor={name}
            className={classNames(
              "mb-2 text-sm font-medium text-gray-900 flex items-center justify-between",
              labelClassName
            )}
          >
            {title}
            {icon}
          </label>
        )}
        {type == "textarea" ? (
          <textarea
            name={name}
            id={name}
            className={classNames(
              "bg-gray-50 border border-gray-300 placeholder:text-gray-500 sm:text-sm rounded-lg block w-full p-2.5",
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            {...otherProps}
          />
        ) : type == "select" ? (
          <Select
            value={selectValue}
            onChange={(e: any) => onChange && onChange(e)}
            options={options || []}
          />
        ) : type == "multiSelect" ? (
          <Select
            value={selectValue}
            onChange={(e: any) => onChange && onChange(e)}
            options={options || []}
            multiple={true}
          />
        ) : (
          <input
            type={type}
            name={name}
            id={name}
            className={classNames(
              "bg-gray-50 border border-gray-300 placeholder:text-gray-500 sm:text-sm rounded-lg block w-full p-2.5",
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            maxLength={maxLength || 255}
            {...otherProps}
          />
        )}
      </div>
    </>
  );
}
