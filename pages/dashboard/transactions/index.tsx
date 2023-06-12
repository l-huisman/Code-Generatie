import { sidebarItems } from "@/assets/data";
import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";
import Spinner from "@/components/spinner";
import DashboardLayout from "@/layout/dashboardLayout";
import { withSessionSsr } from "@/lib/withSession";
import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/solid";
import { transactionColumns } from "columns/transactionColumns";
import useTransaction from "hooks/useTransaction";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";
import DataTable from "react-data-table-component";

export default function Transactions({ ApiConfig }: any) {
  const router = useRouter();
  const {
    transactions,
    filters,
    loading,
    pageSize,
    pageSizes,
    totalRows,
    pageNumber,
    amountRelationTypes,
    setPageNumber,
    setPageSize,
    setFilters,
    getTransactions,
  } = useTransaction("all", ApiConfig);

  return (
    <>
      <DashboardLayout title="Transactions">
        <div className="p-4">
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <div className="mb-8 flex items-end justify-start gap-x-4">
                <Input
                  type="text"
                  placeholder="Iban..."
                  title="Iban"
                  name="Iban"
                  containerClassName="w-56"
                  value={filters?.iban}
                  onChange={(e) =>
                    setFilters({ ...filters, iban: e.target.value })
                  }
                />
                <Input
                  type="select"
                  placeholder="Amount relation..."
                  title="Amount relation"
                  name="Amount relation"
                  containerClassName="w-56"
                  options={amountRelationTypes}
                  selectValue={filters?.amountRelation}
                  onChange={(e) =>
                    setFilters({ ...filters, amountRelation: e })
                  }
                />
                <Input
                  type="number"
                  placeholder="Amount..."
                  title="Amount"
                  name="Amount"
                  containerClassName="w-56"
                  value={filters?.amount}
                  onChange={(e) =>
                    setFilters({ ...filters, amount: e.target.value })
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
                  onClick={() => getTransactions()}
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
                onRowClicked={(row) =>
                  router.push(`/dashboard/transactions/${row.id}`)
                }
                paginationPerPage={pageSize}
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={async (
                  currentRowsPerPage,
                  currentPage
                ) => {
                  getTransactions(currentPage, currentRowsPerPage);
                  setPageSize(currentRowsPerPage);
                  setPageNumber(currentPage);
                }}
                onChangePage={async (currentPage) => {
                  setPageNumber(currentPage);
                  getTransactions(currentPage);
                }}
                paginationRowsPerPageOptions={pageSizes}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
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
        ApiConfig: ApiConfig,
      },
    };
  }
);
