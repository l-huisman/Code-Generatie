import Link from "next/link";
import React, { Fragment, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import {
  Bars3BottomRightIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { UserContext } from "@/components/context/UserContext";
import Button from "@/components/button";

export default function Nav() {
  const router = useRouter();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [oldScrollY, setOldScrollY] = useState(0);
  const [down, setDown] = useState(false);
  const { user } = useContext(UserContext);

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
        "w-screen fixed top-0 z-50 transform duration-300 shadow-lg",
        {
          "translate-y-0": !down,
          "-translate-y-[100%]": down,
          "shadow-xl": scrollY > 100,
        }
      )}
    >
      <nav className="p-7 px-4 md:px-6 lg:px-8 flex text-white max-w-screen-2xl mx-auto relative bg-white z-50">
        <Link
          className="font-poppins font-semibold tracking-wider text-xl mr-auto text-primary"
          href="/"
        >
          <h2 className="">Mr. Banky</h2>
        </Link>
        <ul className="lg:flex items-center gap-x-10 font-poppins font-medium tracking-wider uppercase text-primary hidden text-sm">
          {user ? (
            <>
              <li className="hover:font-bold flex w-18">
                <Link href="/deposit" className="w-full">
                  Deposit
                </Link>
              </li>
              <li className="hover:font-bold flex w-20">
                <Link href="/withdraw" className="w-full">
                  Withdraw
                </Link>
              </li>
              <li className="hover:font-bold flex w-20">
                <Link href="/transfer" className="w-full">
                  Transfer
                </Link>
              </li>
              <li className="hover:font-bold flex w-20">
                <Link href="/accounts" className="w-full">
                  Accounts
                </Link>
              </li>
              <li className="hover:text-emerald-400 flex">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      <UserIcon className="h-6 w-6 text-primary" />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/me"
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Me
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </>
          ) : (
            <>
              <li className="flex gap-x-2">
                <Button
                  variant="border-primary"
                  title="Login"
                  className="px-4"
                  to="/login"
                />
                <Button
                  variant="primary"
                  title="Signup"
                  className="px-4"
                  to="/signup"
                />
              </li>
            </>
          )}
        </ul>
        <button onClick={() => setOpenMobileNav(true)}>
          <Bars3BottomRightIcon className="h-8 w-8 text-gray-600 lg:hidden" />
        </button>
      </nav>
      <div
        className={`absolute right-0 top-0 h-screen w-80 bg-primary duration-300 z-20 shadow-lg p-7 px-4 md:px-6 ${
          openMobileNav ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <nav className="relative h-full flex flex-col text-gray-300">
          <div className="flex items-center justify-between">
            <Link href="/admin-login">
              <UserIcon className="h-6 w-6 hover:text-emerald-400" />
            </Link>
            <button onClick={() => setOpenMobileNav(false)}>
              <XMarkIcon className="h-8 w-8 text-gray-200" />
            </button>
          </div>
          <ul className="flex flex-col gap-16 mt-20 px-8 font-poppins">
            <li className="hover:text-emerald-400 flex">
              <Link href="/deposit" scroll={false} className="w-full">
                Deposit
              </Link>
            </li>
            <li className="hover:text-emerald-400 flex">
              <Link href="/withdraw" scroll={false} className="w-full">
                Withdraw
              </Link>
            </li>
            <li className="hover:text-emerald-400 flex">
              <Link href="/transfer" scroll={false} className="w-full">
                Transfer
              </Link>
            </li>
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
