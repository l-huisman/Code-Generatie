import Input from "@/components/input";
import Modal from "@/modals/modal";
import Button from "@/components/button";

export default function AddTransactionModal({
  isOpen,
  setIsOpen,
  modalType,
  state,
  setState,
  addTransaction,
}: any) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={modalType?.toLowerCase()}
    >
      <div>
        <form className="flex flex-col gap-y-4">
          <Button
            variant="black"
            onClick={(e) => addTransaction(e)}
            title={modalType?.toLowerCase()}
            className="w-full font-medium capitalize"
          />
        </form>
      </div>
    </Modal>
  );
}
