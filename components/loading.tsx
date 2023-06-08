import Link from "next/link";
import Spinner from "./spinner";

export default function Loading({
  children,
  isLoading,
  showCustomLoading,
  customComponent,
}: {
  children: JSX.Element | JSX.Element[];
  isLoading: boolean;
  showCustomLoading?: boolean;
  customComponent?: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      {isLoading ? (
        <div className="h-full w-full flex items-center justify-center flex-1">
          {!showCustomLoading ? (
            <Spinner className="h-8 w-8" />
          ) : customComponent ? (
            customComponent
          ) : (
            ""
          )}
        </div>
      ) : showCustomLoading ? (
        customComponent ? (
          <div className="h-full w-full flex items-center justify-center flex-1">
            {customComponent}
          </div>
        ) : (
          ""
        )
      ) : (
        children
      )}
    </>
  );
}
