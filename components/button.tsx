import { IButton, variants } from "@/interfaces/Button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

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
