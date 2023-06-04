import classNames from "classnames";
import Link from "next/link";
import { variants, IButton } from "@/interfaces/Button";
import Spinner from "./spinner";
import { useState } from "react";

export default function Button({
  icon,
  title,
  variant,
  large,
  className,
  titleClassName,
  containerClassName,
  to,
  type,
  download,
  disabled,
  keepTitle,
  onClick,
}: IButton) {
  const [loading, setLoading] = useState(false);

  const onClickHandler = async (e: any) => {
    if (!onClick) return null;
    setLoading(true);

    await onClick(e);

    setLoading(false);
  };

  return !to ? (
    <button
      type={type || "button"}
      onClick={(e) => onClickHandler(e)}
      className={classNames(
        "p-2 ml-auto relative rounded-md",
        className,
        variants[variant],
        {
          "gap-x-2": title && icon,
          "w-full": large,
          "cursor-not-allowed pointer-events-none": disabled || loading,
          "!bg-gray-400 !text-gray-600": disabled,
        }
      )}
    >
      <div
        className={classNames(
          "flex items-center justify-center",
          containerClassName,
          {
            "gap-x-2": title && icon,
            invisible: loading,
          }
        )}
      >
        {icon}
        {(title || keepTitle) && (
          <p className={classNames(titleClassName)}>{title}</p>
        )}
      </div>
      {loading && (
        <Spinner className="w-6 h-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
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
      {(title || keepTitle) && (
        <p className={classNames("w-full", titleClassName)}>{title}</p>
      )}
    </Link>
  );
}
