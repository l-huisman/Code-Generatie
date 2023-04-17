import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Input({
  value,
  onChange,
  title,
  name,
  type,
  icon,
  placeholder,
  className,
  ...otherProps
}: any) {
  return (
    <>
      <div>
        <label
          htmlFor={name}
          className="mb-2 text-sm font-medium text-gray-900 flex items-center justify-between"
        >
          {title}
          {icon}
        </label>
        {type != "textarea" ? (
          <input
            type={type}
            name={name}
            id={name}
            className={classNames(
              "bg-gray-50 border border-gray-300 placeholder:text-gray-900 sm:text-sm rounded-lg block w-full p-2.5",
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            {...otherProps}
          />
        ) : (
          <textarea
            name={name}
            id={name}
            className={classNames(
              "bg-gray-50 border border-gray-300 placeholder:text-gray-900 sm:text-sm rounded-lg block w-full p-2.5",
              className
            )}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e)}
            {...otherProps}
          />
        )}
      </div>
    </>
  );
}
