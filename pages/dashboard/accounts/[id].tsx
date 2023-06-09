import { sidebarItems } from "@/assets/data";
import Button from "@/components/button";
import Input from "@/components/input";
import AddTransactionModal from "@/components/modals/AddTransactionModal";
import Spinner from "@/components/spinner";
import DashboardLayout from "@/layout/dashboardLayout";
import { withSessionSsr } from "@/lib/withSession";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import { accountColumns } from "columns/accountColumns";
import { transactionColumns } from "columns/transactionColumns";
import useAccounts from "hooks/useAccounts";
import useTransaction from "hooks/useTransaction";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";
import DataTable from "react-data-table-component";

export default function Accounts({ ApiConfig, id }: any) {
  const { accounts } = useAccounts(ApiConfig);
  const router = useRouter();
  const {
    transactions,
    filters,
    loading,
    state,
    openAddModal,
    modalType,
    setModalType,
    setState,
    addTransaction,
    setOpenAddModal,
    setFilters,
    getTransactionsByAccount,
  } = useTransaction("account", ApiConfig, undefined, id);

  return (
    <>
      <DashboardLayout title={id}>
        <div className="p-4">
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <div>
                <h3 className="font-semibold font-poppins text-2xl mb-4">
                  Transactions
                </h3>
              </div>
              <div className="mb-4 flex items-center justify-start gap-x-4">
                <Button
                  variant="primary"
                  title="Deposit"
                  className="!ml-0 px-8"
                  onClick={() => {
                    setModalType("DEPOSIT");
                    setOpenAddModal(true);
                    setState({ ...state, toAccountIban: id });
                  }}
                />
                <Button
                  variant="primary"
                  title="Withdraw"
                  className="!ml-0 px-8"
                  onClick={() => {
                    setModalType("WITHDRAW");
                    setOpenAddModal(true);
                    setState({ ...state, fromAccountIban: id });
                  }}
                />
                <Button
                  variant="primary"
                  title="Transfer"
                  className="!ml-0 px-8"
                  onClick={() => {
                    setModalType("TRANSFER");
                    setOpenAddModal(true);
                    setState({ ...state, fromAccountIban: id });
                  }}
                />
              </div>
              <div className="mb-8 flex items-end justify-start gap-x-4">
                <Input
                  type="text"
                  placeholder="Search..."
                  title="Search"
                  name="Search"
                  containerClassName="w-56"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
                <Input
                  type="date"
                  name="startDate"
                  title="From date"
                  value={filters.startDate}
                  onChange={(e) =>
                    setFilters({ ...filters, startDate: e.target.value })
                  }
                />
                <Input
                  type="date"
                  name="startDate"
                  title="From date"
                  value={filters.endDate}
                  onChange={(e) =>
                    setFilters({ ...filters, endDate: e.target.value })
                  }
                />
                <Button
                  variant="primary"
                  icon={<MagnifyingGlassIcon className="h-6 w-6" />}
                  onClick={() => getTransactionsByAccount()}
                />
              </div>
              <DataTable
                data={transactions}
                columns={transactionColumns}
                pagination
                paginationComponentOptions={{
                  rowsPerPageText: "Rows per page",
                  rangeSeparatorText: "from",
                }}
                noDataComponent={
                  loading ? (
                    <Spinner className="h-10 w-10" />
                  ) : (
                    "No transactions."
                  )
                }
                highlightOnHover
                pointerOnHover
                onRowClicked={(row) => router.push(`/transactions/${row.id}`)}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
      <AddTransactionModal
        isOpen={openAddModal}
        setIsOpen={setOpenAddModal}
        modalType={modalType}
        state={state}
        setState={setState}
        addTransaction={addTransaction}
      />
    </>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx: any) {
    const { req, params } = ctx;

    const user = req.session.user;
    const token = req.session.token;

    // if (!user) {
    //   return {
    //     redirect: {
    //       destination: "/",
    //       permanent: false,
    //     },
    //   };
    // }
    const ApiConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return {
      props: {
        id: params?.id,
        ApiConfig: ApiConfig,
      },
    };
  }
);
