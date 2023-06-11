import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { UserContext } from "@/components/context/UserContext";
import { withSessionSsr } from "@/lib/withSession";
import useTransaction from "hooks/useTransaction";
import Loading from "@/components/loading";

export default function Home({ ApiConfig }: any) {
  const { user } = useContext(UserContext);
  const { transactions, loading } = useTransaction("user", ApiConfig);

  const handleAmount = (transactionType: string, amount: number) => {
    switch (transactionType) {
      case "DEPOSIT":
        return <div className="text-green-600">{amount}</div>;
      case "WITHDRAW":
        return <div className="text-red-600">-{amount}</div>;
      case "TRANSFER":
        return <div className="text-gray-600">{amount}</div>;
    }
  };

  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl mx-auto py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-3xl font-poppins mb-2">
            Welcome{" "}
            <span className="text-primary">
              {user?.firstName} {user?.lastName}
            </span>
          </h1>
          <h2 className="font-bold text-xl font-poppins">
            Total balance: <span className="text-primary">€420.69</span>
          </h2>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <Link
              href="/accounts"
              className="col-span-12 md:col-span-6 shadow-md p-6 h-fit cursor-pointer rounded-lg group"
            >
              <h3 className="font-semibold text-xl text-primary font-barlow mb-4">
                My accounts
              </h3>
              <div className="flex flex-col gap-y-3">
                <Link
                  href="/accounts/1"
                  className="border border-primary hover:bg-primary hover:text-white p-4 flex justify-between"
                >
                  <h5 className="font-medium font-poppins">Betaalrekening 1</h5>
                  <p className="font-poppins">Current balance: €200.00</p>
                </Link>
                <div className="border border-primary hover:bg-primary hover:text-white p-4 flex justify-between">
                  <h5 className="font-medium font-poppins">Spaarrekening 1</h5>
                  <p className="font-poppins">Current balance: €220.69</p>
                </div>
              </div>
            </Link>
            <div className="col-span-12 md:col-span-6 shadow-md p-6 h-fit rounded-lg">
              <h3 className="font-semibold text-xl text-primary font-barlow mb-4">
                Recent transactions
              </h3>
              <div className="flex flex-col gap-y-3">
                <Loading isLoading={loading}>
                  {transactions &&
                    transactions?.map((transaction: any) => (
                      <Link
                        href={`/transactions/${transaction?.id}`}
                        className="border border-primary p-4 hover:bg-primary hover:text-white cursor-pointer flex justify-between"
                      >
                        <h5 className="font-medium font-poppins">
                          {transaction?.label}
                        </h5>
                        <p className="font-poppins flex">
                          €
                          {handleAmount(
                            transaction?.transactionType,
                            transaction?.amount
                          )}
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
