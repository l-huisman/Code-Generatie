import { Transition, Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import Button from "@/components/button";

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  customWidth,
  className,
}: any) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={classNames(
                    "transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all",
                    {
                      "max-w-md w-full": !customWidth,
                      customWidth: customWidth,
                    }
                  )}
                >
                  <Dialog.Title
                    as="div"
                    className="flex items-center justify-between text-lg font-medium leading-6 text-gray-900 border-b p-6"
                  >
                    <h3>{title}</h3>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="primary"
                      icon={<XMarkIcon className="h-5 w-5" />}
                    />
                  </Dialog.Title>
                  {description && (
                    <Dialog.Description className="px-6 pt-3 text-sm text-gray-800">
                      {description}
                    </Dialog.Description>
                  )}
                  <div className={classNames("p-6", className)}>{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
