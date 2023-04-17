import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface IButton {
  icon?: JSX.Element;
  title?: string | JSX.Element;
  variant: keyof typeof variants;
  large?: boolean;
  className?: string;
  to?: string;
  download?: boolean | string;
  disabled?: boolean;
  onClick?: (e: any) => any;
}

const variants = {
  primary: "bg-primary hover:bg-primary/80",
  gray: "bg-gray-400 hover:bg-gray-400/80",
  red: "bg-red-600 hover:bg-red-600/80",
  green: "bg-green-600 hover:bg-green-600/80",
  blue: "bg-blue-400 hover:bg-blue-400/80",
  white: "bg-white hover:bg-white/80",
  transparent: "bg-transparent",
};

export default function Button({
  icon,
  title,
  variant,
  large,
  className,
  to,
  download,
  disabled,
  onClick,
}: IButton) {
  return !to ? (
    <button
      onClick={(e) => (onClick ? onClick(e) : null)}
      className={classNames(
        "p-2 flex items-center justify-center rounded-md ml-auto relative",
        className,
        variants[variant],
        {
          "gap-x-2": title && icon,
          "w-full": large,
          "cursor-not-allowed pointer-events-none !bg-gray-400 !text-gray-600":
            disabled,
        }
      )}
    >
      {icon}
      {title && <p className="">{title}</p>}
    </button>
  ) : (
    <Link
      href={to}
      className={classNames(
        "p-2 flex items-center rounded-md ml-auto relative",
        className,
        variants[variant],
        {
          "gap-x-2": title && icon,
          "w-full": large,
        }
      )}
      download={download}
    >
      {icon}
      {title && <p className="w-full">{title}</p>}
    </Link>
  );
}
