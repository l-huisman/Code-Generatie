import Link from "next/link";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import {
  Bars3BottomRightIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [oldScrollY, setOldScrollY] = useState(0);
  const [down, setDown] = useState(false);

  useEffect(() => {
    setOpenMobileNav(false);
  }, [router.asPath]);

  useEffect(() => {
    if (openMobileNav) {
      document.body.classList.add("overflow-hidden", "h-screen");
    } else {
      document.body.classList.remove("overflow-hidden", "h-screen");
    }
  }, [openMobileNav]);

  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      setScrollY(this.scrollY);
    });
  }, []);

  useEffect(() => {
    if (scrollY > oldScrollY) {
      setDown(true);
      setOldScrollY(scrollY);
    } else {
      setDown(false);
      setOldScrollY(scrollY);
    }
  }, [scrollY]);

  return (
    <div
      className={classNames(
        "w-screen fixed top-0 z-50 transform duration-300 bg-gray-900",
        {
          "translate-y-0": !down,
          "-translate-y-[100%]": down,
          "shadow-xl": scrollY > 100,
        }
      )}
    >
      <nav className="p-7 px-4 md:px-6 lg:px-8 flex text-white max-w-screen-2xl mx-auto">
        <h2 className="text-white font-mono font-thin tracking-wider text-lg mr-auto">
          Code generatie
        </h2>
        <ul className="lg:flex items-center gap-x-10 font-mono font-thin tracking-wider uppercase text-gray-200 hidden text-sm">
          <Link href="#over-mij" scroll={false}>
            <li className="hover:text-emerald-400 flex">
              <a>Kaas</a>
            </li>
          </Link>
        </ul>
        <button onClick={() => setOpenMobileNav(true)}>
          <Bars3BottomRightIcon className="h-8 w-8 text-gray-200 lg:hidden" />
        </button>
      </nav>
      <div
        className={`absolute right-0 top-0 h-screen w-80 bg-gray-900 duration-300 z-20 shadow-lg p-7 px-4 md:px-6 ${
          openMobileNav ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <nav className="relative h-full flex flex-col text-gray-300 font-mono font-thin">
          <div className="flex items-center justify-between">
            <Link href="/admin-login">
              <UserIcon className="h-6 w-6 hover:text-emerald-400" />
            </Link>
            <button onClick={() => setOpenMobileNav(false)}>
              <XMarkIcon className="h-8 w-8 text-gray-200" />
            </button>
          </div>
          <ul className="flex flex-col gap-16 mt-20 px-8">
            <Link href="#over-mij" scroll={false}>
              <li className="hover:text-emerald-400 flex">
                <a>Kaas</a>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div
        className={`${
          openMobileNav ? "translate-x-0" : "translate-x-[100%]"
        } h-screen w-screen absolute top-0 left-0 backdrop-blur-sm z-10 duration-300 overflow-hidden`}
      ></div>
    </div>
  );
}