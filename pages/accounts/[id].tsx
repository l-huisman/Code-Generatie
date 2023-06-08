import Layout from "@/layout/layout";
import DataTable from "react-data-table-component";
import { withSessionSsr } from "@/lib/withSession";
import { transactionColumns } from "columns/transactionColumns";
import useTransaction from "hooks/useTransaction";
import Input from "@/components/input";
import { useRouter } from "next/router";
import Button from "@/components/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Spinner from "@/components/spinner";

export default function Account({ ApiConfig, id }: any) {
  const router = useRouter();
  const {
    transactions,
    filters,
    loading,
    setFilters,
    getTransactionsByAccount,
  } = useTransaction("account", ApiConfig, undefined, id);

  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl mx-auto py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">{id}</h1>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
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
      </Layout>
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
