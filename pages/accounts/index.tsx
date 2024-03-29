import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { withSessionSsr } from "@/lib/withSession";
import useAccounts from "hooks/useAccounts";
import { UserContext } from "@/components/context/UserContext";
import Loading from "@/components/loading";

export default function Accounts({ ApiConfig }: any) {
  const { user } = useContext(UserContext);
  const { accounts, loading } = useAccounts("user", ApiConfig, undefined, 3);
  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">My accounts</h1>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 shadow-md p-6 h-full">
              <div className="flex flex-col gap-y-3">
                <Loading isLoading={loading}>
                  {accounts?.map((account: any) => (
                    <Link
                      href={`/accounts/${account?.iban}`}
                      className="cursor-pointer border border-primary p-4 flex justify-between hover:bg-primary hover:text-white"
                    >
                      <h5 className="font-medium font-poppins">
                        {account?.name}
                      </h5>
                      <p className="font-poppins">
                        Current balance: €{account?.balance}
                      </p>
                    </Link>
                  ))}
                </Loading>
              </div>
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
