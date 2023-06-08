import Modal from "@/modals/modal";
import Button from "@/components/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function WarningModal({
  isOpen,
  setIsOpen,
  title,
  closeTitle,
  description,
  extraComponent,
  onClose,
}: any) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={title}
      description={description}
      icon={<ExclamationCircleIcon className="w-8 h-8" />}
      titleClassName="!text-gray-100 bg-red-600"
    >
      {extraComponent && extraComponent}
      <div className="w-full flex items-center justify-end gap-x-2">
        <Button
          variant="gray"
          title="Annuleren"
          onClick={() => setIsOpen(false)}
        />
        <Button
          variant="red"
          className="!ml-0"
          title={closeTitle}
          onClick={() => onClose && onClose()}
        />
      </div>
    </Modal>
  );
}
