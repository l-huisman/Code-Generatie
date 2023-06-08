import { sidebarItems } from "@/assets/data";
import Input from "@/components/input";
import DashboardLayout from "@/layout/dashboardLayout";
import { withSessionSsr } from "@/lib/withSession";
import { UsersIcon } from "@heroicons/react/24/solid";
import { accountColumns } from "columns/accountColumns";
import useAccounts from "hooks/useAccounts";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";
import DataTable from "react-data-table-component";

export default function Accounts({ ApiConfig }: any) {
  const { accounts } = useAccounts(ApiConfig);
  const router = useRouter();

  return (
    <>
      <DashboardLayout title="Accounts">
        <div className="p-4">
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <div className="mb-8 flex items-center justify-start gap-x-4">
                <Input
                  type="text"
                  placeholder="Search..."
                  title="Search"
                  name="Search"
                  containerClassName="w-56"
                  // value={filters.search}
                  // onChange={(e) =>
                  //   setFilters({ ...filters, search: e.target.value })
                  // }
                />
              </div>
              <DataTable
                data={accounts}
                columns={accountColumns}
                pagination
                paginationComponentOptions={{
                  rowsPerPageText: "Rows per page",
                  rangeSeparatorText: "from",
                }}
                noDataComponent={"No accounts."}
                highlightOnHover
                pointerOnHover
                onRowClicked={(row: any) =>
                  router.push(`/dashboard/accounts/${row?.id}`)
                }
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
