import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Select({ value, onChange, options }: any) {
  return (
    <div className="relative w-full">
      <Listbox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="bg-gray-50 border border-gray-300 placeholder:text-gray-900 sm:text-sm rounded-lg block w-full p-2.5">
            <p className="text-start block h-full min-h-[1.25rem]">
              {value?.name}
            </p>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options?.map((option: any, index: number) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary/10 !font-semibold" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : ""
                        }`}
                      >
                        {option?.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
