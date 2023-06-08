import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout/layout";
import Section from "@/components/section";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Input from "@/components/input";
import useTransaction from "hooks/useTransaction";
import { withSessionSsr } from "@/lib/withSession";
import Button from "@/components/button";

export default function Deposit({ ApiConfig }: any) {
  const { state, addTransaction, setState } = useTransaction(
    "create",
    ApiConfig
  );
  return (
    <>
      <Layout>
        <div className="min-h-screen max-w-screen-2xl mx-auto py-20 mt-20 px-10 h-full">
          <h1 className="font-bold text-2xl font-poppins">Deposit</h1>
          <div className="h-0.5 w-60 bg-primary mt-4" />
          <div className="grid grid-cols-12 gap-10 mt-10 h-full">
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 shadow-md p-6 h-full gap-12">
              <form className="flex flex-col gap-y-4">
                <Input
                  type="select"
                  options={[
                    {
                      id: 1,
                      name: "Account 1",
                      meta: { balance: 200, iban: "NL12-MRBA-7175-5284-04" },
                    },
                  ]}
                  name="account"
                  title="Account"
                  selectValue={state?.toAccount}
                  onChange={(e) => setState({ ...state, toAccount: e })}
                />
                <Input
                  type="number"
                  name="amount"
                  title="Amount"
                  placeholder="Amount..."
                  value={state?.amount}
                  onChange={(e) =>
                    setState({ ...state, amount: e.target.value })
                  }
                />
                <Input
                  type="text"
                  name="label"
                  title="Label"
                  placeholder="Label..."
                  value={state?.label}
                  onChange={(e) =>
                    setState({ ...state, label: e.target.value })
                  }
                />
                <Input
                  type="textarea"
                  name="description"
                  title="Description"
                  placeholder="Description..."
                  rows={4}
                  value={state?.description}
                  onChange={(e) =>
                    setState({ ...state, description: e.target.value })
                  }
                />
                <Button
                  title="Deposit"
                  variant="primary"
                  className="w-full"
                  onClick={() => addTransaction("DEPOSIT")}
                />
              </form>
              <div className="">
                <h3 className="font-bold text-lg font-poppins">
                  Selected account
                </h3>
                <div className="h-0.5 w-24 bg-primary mt-2 mb-8" />
                {state?.toAccount && (
                  <>
                    <p className="font-medium text-base">IBAN</p>
                    <p className="text-sm">{state?.toAccount?.meta?.iban}</p>
                    <p className="font-medium text-base">Balance</p>
                    <p className="text-sm">
                      €{state?.toAccount?.meta?.balance}
                    </p>
                  </>
                )}
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
