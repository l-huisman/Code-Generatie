import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Input from "@/components/input";
import Modal from "./modal";

export default function PhonenumberModal({
  isOpen,
  setIsOpen,
  modalType,
  phonenumberState,
  setPhonenumberState,
  addPhonenumber,
  editPhonenumber,
}: any) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Wijzig telefoonnummer"}
    >
      <div>
        <form
          className="flex flex-col gap-y-4"
          onSubmit={(e) =>
            modalType == "edit" ? editPhonenumber(e) : addPhonenumber(e)
          }
        >
          <Input
            type="text"
            title="Naam"
            name="username"
            placeholder="Naam..."
            value={phonenumberState?.name}
            onChange={(e: any) =>
              setPhonenumberState({
                ...phonenumberState,
                name: e?.target?.value,
              })
            }
          />
          <Input
            type="tel"
            title="Telefoonnummer"
            name="phonenumber"
            placeholder="Telefoonnummer..."
            value={phonenumberState?.phonenumber}
            onChange={(e: any) =>
              setPhonenumberState({
                ...phonenumberState,
                phonenumber: e?.target?.value,
              })
            }
          />
          <button
            type="submit"
            className="mt-4 w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Wijzigen
          </button>
        </form>
      </div>
    </Modal>
  );
}
