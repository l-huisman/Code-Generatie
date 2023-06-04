import Layout from "@/layout/layout";
import DataTable from "react-data-table-component";
import { withSessionSsr } from "@/lib/withSession";
import { transactionColumns } from "columns/transactionColumns";
import useTransaction from "hooks/useTransaction";
import Input from "@/components/input";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function Transaction({ ApiConfig, accountId, id }: any) {
  const router = useRouter();
  const { transaction } = useTransaction(ApiConfig, accountId, id);
  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">Transaction {id}</h1>
          <p>{transaction?.transaction_type}</p>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <ul className="flex flex-col gap-y-4">
                <li>
                  <p className="text-base font-medium">Amount</p>
                  <p className="text-sm">€{transaction?.amount}</p>
                </li>

                {transaction?.to_account_iban && (
                  <li>
                    <p className="text-base font-medium">To Account Iban</p>
                    <p className="text-sm">{transaction?.to_account_iban}</p>
                  </li>
                )}
                {transaction?.from_account_iban && (
                  <li>
                    <p className="text-base font-medium">From Account Iban</p>
                    <p className="text-sm">{transaction?.from_account_iban}</p>
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
                    {dayjs(transaction?.created_at).format("HH:mm YYYY-MM-DD")}
                  </p>
                </li>
              </ul>
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
        id: params?.transactionId,
        accountId: params?.id,
        ApiConfig: ApiConfig,
      },
    };
  }
);
