import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ParticipantsSelectList from "@/components/chat/conversations/participantsSelectList";
import Input from "@/components/input";
import Button from "@/components/button";
import Modal from "../modal";

const ParticipantsModal = ({
  openParticipants,
  setOpenParticipants,
  participants,
}: any) => {
  const [search, setSearch] = useState("");

  return (
    <Modal
      isOpen={openParticipants}
      setIsOpen={setOpenParticipants}
      title="Alle beschikbare gebruikers"
    >
      <div className="flex justify-center w-full">
        <Input
          type="search"
          name="search"
          placeholder="Zoeken op naam"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 h-10 w-full rounded-lg border-2 border-primary  bg-white px-5 text-sm focus:outline-none"
          containerClassName="w-full"
        />
      </div>
      <div className="my-8 flex h-60 max-h-60 w-full flex-col items-center overflow-y-auto">
        <ParticipantsSelectList participants={participants} search={search} />
      </div>
    </Modal>
  );
};

export default ParticipantsModal;
