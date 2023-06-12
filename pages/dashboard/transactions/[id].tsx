import { sidebarItems } from "@/assets/data";
import Input from "@/components/input";
import Loading from "@/components/loading";
import DashboardLayout from "@/layout/dashboardLayout";
import { withSessionSsr } from "@/lib/withSession";
import { UsersIcon } from "@heroicons/react/24/solid";
import { transactionColumns } from "columns/transactionColumns";
import dayjs from "dayjs";
import useTransaction from "hooks/useTransaction";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";
import DataTable from "react-data-table-component";

export default function Transactions({ ApiConfig, id }: any) {
  const router = useRouter();
  const { transaction, loading } = useTransaction("single", ApiConfig, id);

  return (
    <>
      <DashboardLayout title={`Transaction ${id}`}>
        <div className="p-4">
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <Loading isLoading={loading}>
                <ul className="flex flex-col gap-y-4">
                  <li>
                    <p className="text-base font-medium">Type</p>
                    <p className="text-sm">{transaction?.transactionType}</p>
                  </li>
                  <li>
                    <p className="text-base font-medium">Amount</p>
                    <p className="text-sm">€{transaction?.amount}</p>
                  </li>

                  {transaction?.toAccountIban && (
                    <li>
                      <p className="text-base font-medium">To Account Iban</p>
                      <p className="text-sm">{transaction?.toAccountIban}</p>
                    </li>
                  )}
                  {transaction?.fromAccountIban && (
                    <li>
                      <p className="text-base font-medium">From Account Iban</p>
                      <p className="text-sm">{transaction?.fromAccountIban}</p>
                    </li>
                  )}
                  <li>
                    <p className="text-base font-medium">Label</p>
                    <p className="text-sm">{transaction?.label}</p>
                  </li>
                  <li>
                    <p className="text-base font-medium">Description</p>
                    <p className="text-sm">{transaction?.description}</p>
                  </li>
                  <li>
                    <p className="text-base font-medium">Date and time</p>
                    <p className="text-sm">
                      {dayjs(transaction?.created_at).format(
                        "HH:mm YYYY-MM-DD"
                      )}
                    </p>
                  </li>
                </ul>
              </Loading>
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
