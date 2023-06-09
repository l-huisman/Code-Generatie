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
          {modalType === "DEPOSIT" ? (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-900 flex items-center justify-between">
                To account iban
              </p>
              <p className="text-gray-500 font-poppins text-sm">
                {state?.toAccountIban}
              </p>
            </div>
          ) : (
            <div>
              <p className="mb-2 text-sm font-medium text-gray-900 flex items-center justify-between">
                From account iban
              </p>
              <p className="text-gray-500 font-poppins text-sm">
                {state?.fromAccountIban}
              </p>
            </div>
          )}
          {modalType === "TRANSFER" && (
            <Input
              type="text"
              title="To account iban"
              name="toAccountIban"
              value={state?.toAccountIban}
              onChange={(e) =>
                setState({ ...state, toAccountIban: e.target.value })
              }
            />
          )}
          <Input
            title="Amount"
            name="amount"
            type="number"
            placeholder="0"
            value={state?.amount}
            onChange={(e) => setState({ ...state, amount: e.target.value })}
          />
          <Input
            title="Label"
            name="label"
            type="text"
            placeholder="Label..."
            value={state?.label}
            onChange={(e) => setState({ ...state, label: e.target.value })}
          />
          <Input
            title="Description"
            name="description"
            type="text"
            placeholder="Description..."
            value={state?.description}
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />

          <Button
            variant="black"
            onClick={() => addTransaction(modalType)}
            title={modalType?.toLowerCase()}
            className="w-full font-medium capitalize"
          />
        </form>
      </div>
    </Modal>
  );
}
