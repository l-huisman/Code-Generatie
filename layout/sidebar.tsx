import Link from "next/link";
import {
  ArrowLeftOnRectangleIcon,
  ArrowSmallLeftIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/context/UserContext";
import { sidebarItems } from "@/assets/data";
import Button from "@/components/button";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function SideBar({ open, setOpen }: any) {
  const router = useRouter();
  const { user, logoutUser } = useContext(UserContext);

  useEffect(() => {
    const documentHeight = () => {
      const doc: any = document.getElementById("sidebar");
      if (doc) doc.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", documentHeight);
    documentHeight();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  return (
    <>
      <nav
        id="sidebar"
        className={classNames(
          "fixed top-0 left-0 w-60 h-screen bg-primary transform duration-200 z-30 text-white",
          {
            "-translate-x-full md:translate-x-0": !open,
            "translate-x-0 w-60": open,
          }
        )}
      >
        <Button
          variant="transparent"
          className={classNames(
            "!absolute top-2 -right-12 z-10 md:hidden transition-opacity duration-200 text-white",
            { "opacity-100": open, "opacity-0": !open }
          )}
          icon={<XMarkIcon className="w-7 h-7" />}
          onClick={() => setOpen(!open)}
        />
        <div className="p-4 h-full flex flex-col">
          <ul
            className={classNames(
              "h-full flex flex-col relative w-full overflow-y-auto"
            )}
          >
            <li className={classNames("flex items-center py-6 pl-4 mb-10")}>
              <Link
                className="font-poppins font-semibold tracking-wider text-3xl text-white"
                href="/"
              >
                <h1 className="">Mr. Banky</h1>
              </Link>
            </li>
            {sidebarItems?.map((item: any, index: number) => (
              <li key={index}>
                <Button
                  variant="transparent"
                  className={classNames(
                    "rounded-md p-3 hover:backdrop-brightness-75 flex gap-x-2 w-full font-medium !justify-start"
                  )}
                  title={item?.name}
                  icon={item?.icon}
                  to={item?.href}
                  download={item?.download}
                  onClick={() => {
                    item?.onClick();
                  }}
                  keepTitle
                />
              </li>
            ))}
          </ul>
          <div className="w-full p-3 mt-auto border-t border-white flex items-center justify-between">
            <h4 className="font-medium">
              {user?.firstName} {user?.lastName}
            </h4>
            <Button
              variant="transparent"
              icon={<ArrowLeftOnRectangleIcon className="h-6 w-6" />}
              onClick={() => logoutUser()}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
